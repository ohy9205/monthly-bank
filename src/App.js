import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import dummy from "./util/dummy";
import React, { useEffect, useReducer, useRef, useState } from "react";
import Add from "./components/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const listReducer = (list, action) => {
  let newList = [];
  switch (action.type) {
    case "INIT": {
      newList = action.data;
      break;
    }
    case "CREATE": {
      newList = [action.newData, ...list];
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
      return list;
    }
  }
  localStorage.setItem("list", JSON.stringify(newList));
  return newList;
};

/** context 생성 */
export const DataContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  /** 돈정보를 저장하는 state */
  const [account, setAccount] = useState({});
  /** 내역리스트 저장하는 state */
  const [list, listDispatch] = useReducer(listReducer, []);
  /** 선택 월 저장하는 state */
  const [curDate, setCurDate] = useState(new Date());
  /** 월에 해당하는 내역 state*/
  const [monthData, setMonthData] = useState([]);

  const [isAdd, setIsAdd] = useState(false);
  const [targetId, setTargetId] = useState();

  /** 내역 번호 */
  const id = useRef(0);

  /** 내역 추가 동작 */
  const onCreate = (date, name, money, type) => {
    let newData = {
      id: id.current++,
      date: new Date(date).getTime(),
      name,
      money: money,
      type,
    };
    listDispatch({ type: "CREATE", newData });
  };

  /** 내역 수정 동작 */
  const onEdit = (targetId, date, name, money, type) => {
    let newData = {
      id: id.current++,
      date: new Date(date).getTime(),
      name,
      money: money,
      type,
    };
    listDispatch({ type: "EDIT", newData, targetId });
  };

  /** 내역 제거 동작 */
  const onRemove = (targetId) => {
    listDispatch({ type: "REMOVE", targetId });
  };

  /** header에 전달할 년-월 정보 */
  const headText = `${curDate.getFullYear()}-${
    curDate.getMonth() + 1 < 10
      ? `0${curDate.getMonth() + 1}`
      : curDate.getMonth() + 1
  } 자산현황`;

  /** 이전 월로 변경 */
  const prevMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };
  /** 다음 월로 변경 */
  const nextMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  /** 최초 렌더링 시 localStage에 저장된 일기를 꺼내온다 */
  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("list")) || [];
    if (localData.length >= 1) {
      localData = localData.sort((a, b) => parseInt(a.date) - parseInt(b.date));
      id.current = parseInt(localData[0].id) + 1;
      listDispatch({ type: "INIT", data: localData });
    }
  }, []);

  /** 내역 수정이나 월 변경 시 account, monthData state 업데이트 */
  useEffect(() => {
    // list가 빈값이 아니면 account 상태 업데이트
    if (list.length < 0) return;
    updateMonthData();
  }, [list, curDate]);

  /** 월 데이터가 바뀌면 돈 정보도 업데이트*/
  useEffect(() => {
    updateAccount();
    id.current = monthData.length + 1;
  }, [monthData]);

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
      list.filter(
        (it) =>
          parseInt(firstDay) <= parseInt(it.date) &&
          parseInt(lastDay) >= parseInt(it.date)
      )
    );
  };

  /** 돈 정보 업데이트 */
  const updateAccount = () => {
    let total = 0;
    let income = 0;
    let expenses = 0;

    for (let item of monthData) {
      income += item.type === "income" && parseInt(item.money);
      expenses += item.type === "expenses" && parseInt(item.money);
    }
    total = income - expenses;
    setAccount({
      total: total.toString(),
      income: income.toString(),
      expenses: expenses.toString(),
    });
  };

  /** context 전달 value */
  const dataValue = { account, monthData };
  const dispatchValue = { onCreate, onEdit, onRemove };

  return (
    <DataContext.Provider value={dataValue}>
      <DispatchContext.Provider value={dispatchValue}>
        <div className="App">
          <Header
            headText={headText}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          />
          <List />
        </div>
      </DispatchContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
