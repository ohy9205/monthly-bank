import React from "react";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import ItemProvider from "./store/ItemProvider";

/** context 생성 */
export const DataContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  return (
    <ItemProvider>
      <div className="App">
        <Header />
        <List />
      </div>
    </ItemProvider>
  );
}

export default App;
