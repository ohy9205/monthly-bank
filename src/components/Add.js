import { useState } from "react";
import Nav from "./Nav";

const Add = () => {
  return (
    <div className="add-wrapper">
      <h1>내역 추가</h1>
      <div className="add-list">
        <label htmlFor="datee">날짜</label>
        <input type="date" id="datee" />
        <label htmlFor="name">설명</label>
        <input type="text" id="name" />
        <label htmlFor="money">금액</label>
        <input type="number" id="money" min="1" max="999999999" />
      </div>
      <div className="add-btn">
        <button className="cancle-btn">취소</button>
        <button className="submit-btn">등록</button>
      </div>
    </div>
  );
};

export default Add;
