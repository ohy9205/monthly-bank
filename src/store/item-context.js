import React from "react";
const ItemContext = React.createContext({
  account: {}, // 돈
  monthData: [], //해당 월 내역
  changeMonth: (month) => {},
  addItem: (item) => {},
  editItem: (item) => {},
  removeItem: (id) => {},
  curDate: new Date(),
});
export default ItemContext;
