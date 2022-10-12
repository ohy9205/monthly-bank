import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import List from "./pages/List";
import dummy from "./util/dummy";
import React, { useEffect, useReducer } from "react";

const accountReducer = (account, action) => {
  return {
    total: action.income + action.expenses,
    income: action.income,
    expenses: action.expenses,
  };
};

const listReducer = (list, action) => {
  let newList = [];
  switch (action.type) {
    case "INIT": {
      newList = [...action.data];
      break;
    }
    case "CREATE": {
      newList = [action.data, ...list];
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
  const [account, accountDispatch] = useReducer(accountReducer, {
    total: 0,
    income: 0,
    expenses: 0,
  });

  /** 내역리스트 저장하는 state */
  const [list, listDispatch] = useReducer(listReducer, dummy);

  useEffect(() => {
    // list가 빈값이 아니면 account 상태 업데이트
    if (list && list.length > 0) {
      let total = 0;
      let income = 0;
      let expenses = 0;

      for (let item of list) {
        income += item.type === "income" && item.money;
        expenses += item.type === "expenses" && item.money;
      }
      total = income - expenses;
      console.log(total, income, expenses);
      accountDispatch({ total, income, expenses });
    }
  }, []);

  return (
    <DataContext.Provider>
      <DispatchContext.Provider>
        <div className="App">
          <Header />
          <Nav />
          <List />
        </div>
      </DispatchContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
