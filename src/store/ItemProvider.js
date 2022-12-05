import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import ItemContext from "./item-context";

// 내역 리스트 reducer
const listReducer = (list, action) => {
  let newList = [];
  switch (action.type) {
    case "INIT": {
      newList = action.items;
      break;
    }
    case "ADD": {
      newList = [action.newItem, ...list];
      break;
    }
    case "EDIT": {
      newList = list.map((it) =>
        action.targetId === it.id ? action.newData : it
      );
      break;
    }
    case "REMOVE": {
      newList = list.filter((it) => action.targetId !== it.id);
      break;
    }
    default: {
      return newList;
    }
  }
  localStorage.setItem("list", JSON.stringify(newList));
  return newList;
};

const ItemProvider = ({ children }) => {
  const [list, listDispatch] = useReducer(listReducer, []);
  const [monthData, setMonthData] = useState([]);
  const [account, setAccount] = useState({});
  const [curDate, setCurDate] = useState(new Date());
  const itemId = useRef(0);

  /** 최초 렌더링 시 localStage에 저장된 일기를 꺼내온다 */
  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("list")) || [];
    if (localData.length >= 1) {
      localData = localData.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      itemId.current = parseInt(localData[0].id);
      initItem(localData);
    }
  }, []);

  /** 해당 월에 해당되는 내역 추출 */
  const updateMonthData = useCallback(() => {
    const thisMonthfirstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();

    const nextMonthfirstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      1
    ).getTime();

    setMonthData(
      list.filter((it) => {
        return (
          parseInt(thisMonthfirstDay) <= parseInt(it.date) &&
          parseInt(nextMonthfirstDay) > parseInt(it.date)
        );
      })
    );
  }, [curDate, list]);

  /** 월 돈 정보 업데이트 */
  const updateAccount = useCallback(() => {
    let total = 0;
    let income = 0;
    let spending = 0;

    for (let item of monthData) {
      income += item.type === "INCOME" && parseInt(item.money);
      spending += item.type === "SPENDING" && parseInt(item.money);
    }
    total = income - spending;
    setAccount({
      total: total.toString(),
      income: income.toString(),
      spending: spending.toString(),
    });
  }, [monthData]);

  /** 내역 수정이나 월 변경 시 account, monthData state 업데이트 */
  useEffect(() => {
    if (list.length < 0) return;
    updateMonthData();
  }, [list, curDate, updateMonthData]);

  /** 월 데이터가 바뀌면 돈 정보도 업데이트*/
  useEffect(() => {
    updateAccount();
  }, [monthData, updateAccount]);

  /** 내역 초기화 */
  const initItem = (items) => {
    listDispatch({ type: "INIT", items });
  };

  /** 내역 추가 동작 */
  const addItem = (item) => {
    itemId.current += 1;
    const newItem = {
      id: itemId.current,
      ...item,
      date: new Date(item.date).getTime(),
    };
    listDispatch({
      type: "ADD",
      newItem,
    });
  };

  /** 내역 수정 동작 */
  const editItem = (targetId, item) => {
    const newData = {
      id: targetId,
      ...item,
      date: new Date(item.date).getTime(),
    };
    listDispatch({ type: "EDIT", targetId, newData });
  };

  /** 내역 제거 동작 */
  const removeItem = (targetId) => {
    listDispatch({ type: "REMOVE", targetId: targetId });
  };

  /** 월 변경 */
  const changeMonth = (month) => {
    setCurDate(new Date(curDate.getFullYear(), month, curDate.getDate()));
  };

  const itemValue = {
    account, // 돈
    monthData, //해당 월 내역
    changeMonth,
    addItem,
    editItem,
    removeItem,
    initItem,
    curDate,
  };

  return (
    <ItemContext.Provider value={itemValue}>{children}</ItemContext.Provider>
  );
};
export default ItemProvider;
