import React from "react";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import ItemProvider from "./store/ItemProvider";

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
