import "./App.css";
import Header from "./components/Header";
import List from "./pages/List";
import dummy from "./util/dummy";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Add from "./components/Add";

const listReducer = (list, action) => {
  let newList = [];
  switch (action.type) {
    case "INIT": {
      newList = [...action.data];
      break;
    }
    case "CREATE": {
      newList = [action.newData, ...list];
      break;
    }
    case "EDIT": {
      newList = list.map((it) =>
        action.targetId === it.id ? action.data : it
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
  return newList;
};

/** context 생성 */
export const DataContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  /** 돈정보를 저장하는 state */
  const [account, setAccount] = useState({});
  /** 내역리스트 저장하는 state */
  const [list, listDispatch] = useReducer(listReducer, dummy);
  /** 선택 월 저장하는 state */
  const [curDate, setCurDate] = useState(new Date());
  /** 월에 해당하는 내역 state*/
  const [monthData, setMonthData] = useState([]);
  /** 내역 번호 */
  const id = useRef();

  /** 내역 추가 동작 */
  const onCreate = (date, name, money, type) => {
    console.log(date, name, money, type);
    let newData = {
      id: id.current++,
      date: new Date(date).getTime(),
      name,
      money: parseInt(money),
      type,
    };
    listDispatch({ type: "CREATE", newData });
  };

  /** 내역 수정 동작 */
  const onEdit = () => {};

  /** 내역 제거 동작 */
  const onRemove = () => {};

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

  /** 내역 수정이나 월 변경 시 account, monthData state 업데이트 */
  useEffect(() => {
    // list가 빈값이 아니면 account 상태 업데이트
    if (list && list.length > 0) {
      updateMonthData();
    }
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
      income += item.type === "income" && item.money;
      expenses += item.type === "expenses" && item.money;
    }
    total = income - expenses;
    setAccount({
      total: total,
      income: income,
      expenses: expenses,
    });
  };

  /** 내역 추가 화면 on */
  const addRef = useRef();
  const onClickAdd = () => {
    addRef.current.classList.add("add-on");
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
          {/* <Nav /> */}
          <List />
          <aside>
            <button>
              <FontAwesomeIcon
                className="add-btn"
                icon={faCirclePlus}
                size="4x"
                onClick={(e) => {
                  onClickAdd();
                }}
              />
            </button>
          </aside>
          <Add isEdit={false} addRef={addRef} />
        </div>
      </DispatchContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
