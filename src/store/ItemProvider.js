import { useEffect, useReducer, useRef, useState } from "react";
import ItemContext from "./item-context";

// 내역 리스트 reducer
const listReducer = (list, action) => {
  let newList = [];
  switch (action.type) {
    case "INIT": {
      console.log("INIT");
      newList = action.items;
      break;
    }
    case "ADD": {
      console.log("ADD");
      newList = [action.newItem, ...list];
      break;
    }
    case "EDIT": {
      console.log("EDIT", action.targetId, action.newData);
      newList = list.map((it) =>
        action.targetId === it.id ? action.newData : it
      );
      break;
    }
    case "REMOVE": {
      console.log("REMOVE");
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
  const itemId = useRef(0); // 외부(List컴포)에서 받으면 달마다 id가 중복될 가능성이 있음

  /** 최초 렌더링 시 localStage에 저장된 일기를 꺼내온다 */
  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("list")) || [];
    if (localData.length >= 1) {
      localData = localData.sort((a, b) => parseInt(a.date) - parseInt(b.date));
      itemId.current = parseInt(localData[0].id) + 1;
      // console.log(itemCtx.initItem);
      // itemCtx.initItem(localData);
      initItem(localData);
    }
  }, []);

  /** 내역 수정이나 월 변경 시 account, monthData state 업데이트 */
  useEffect(() => {
    // list가 빈값이 아니면 account 상태 업데이트
    if (list.length < 0) return;
    updateMonthData();
    // updateAccount();
  }, [list, curDate]);

  /** 월 데이터가 바뀌면 돈 정보도 업데이트*/
  useEffect(() => {
    updateAccount();
    itemId.current = monthData.length + 1;
    console.log("monthData", monthData);
  }, [monthData]);

  /** 내역 초기화 */
  const initItem = (items) => {
    console.log("init");
    listDispatch({ type: "INIT", items });
  };

  /** 내역 추가 동작 */
  const addItem = (item) => {
    console.log("add");
    const newItem = {
      id: itemId.current++,
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
    console.log("edit");
    //newData: 날짜, 내역, 금액, 분류
    const newData = {
      id: targetId,
      ...item,
      date: new Date(item.date).getTime(),
    };
    listDispatch({ type: "EDIT", targetId, newData });
  };

  /** 내역 제거 동작 */
  const removeItem = (targetId) => {
    console.log("remove");
    listDispatch({ type: "REMOVE", targetId: targetId });
  };

  /** 월 변경 */
  const changeMonth = (month) => {
    setCurDate(new Date(curDate.getFullYear(), month, curDate.getDate()));
  };

  /** 해당 월에 해당되는 내역 추출 */
  const updateMonthData = () => {
    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();

    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0,
      23,
      59,
      59
    ).getTime();

    setMonthData(
      list.filter((it) => {
        return (
          parseInt(firstDay) <= parseInt(it.date) &&
          parseInt(lastDay) >= parseInt(it.date)
        );
      })
    );
  };

  /** 월 돈 정보 업데이트 */
  const updateAccount = () => {
    let total = 0;
    let income = 0;
    let expenses = 0;

    for (let item of monthData) {
      income += item.type === "INCOMES" && parseInt(item.money);
      expenses += item.type === "EXPENSES" && parseInt(item.money);
    }
    total = income - expenses;
    setAccount({
      total: total.toString(),
      income: income.toString(),
      expenses: expenses.toString(),
    });
  };

  const itemValue = {
    account, // 돈
    monthData, //해당 월 내역
    changeMonth,
    addItem,
    editItem,
    removeItem,
    initItem,
    // filteredList,
    curDate,
  };

  return (
    <ItemContext.Provider value={itemValue}>{children}</ItemContext.Provider>
  );
};
export default ItemProvider;
