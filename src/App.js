import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import dummy from "./util/dummy";
import React, { useContext, useEffect, useRef, useState } from "react";
import Add from "./components/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ItemContext from "./store/item-context";
import ItemProvider from "./store/ItemProvider";

/** context 생성 */
export const DataContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  return (
    <ItemProvider>
      <div className="App">
        <Header headText={"test"} />
        <List />
      </div>
    </ItemProvider>
  );
}

export default App;
