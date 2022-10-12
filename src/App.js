import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import List from "./pages/List";
import React, { useReducer } from "react";

const accountReducer = (account, action) => {
  return {
    total: action.income + action.expenses,
    income: action.income,
    expenses: action.expenses,
  };
};

const listReducer = (list, action) => {
  let newList = {};
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
  const [list, listDispatch] = useReducer(listReducer, {});

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
