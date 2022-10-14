import { useState } from "react";
import Button from "./Button";
import Nav from "./Nav";

const Add = () => {
  return (
    <div className="add-wrapper">
      <h1>내역 추가</h1>
      <div className="add-list">
        <div className="type-wrapper">
          <Button className={"income-btn type-on"} text="지출" />
          <Button className={"expenses-btn"} text="수입" />
        </div>
        <label htmlFor="date">날짜</label>
        <input
          type="date"
          id="date"
          name="date"
          value={dateFormat(data.date)}
          onChange={handleChangeState}
        />
        <label htmlFor="name">설명</label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChangeState}
        />
        <label htmlFor="money">금액</label>
        <input
          type="number"
          id="money"
          name="money"
          min="1"
          max="999999999"
          value={data.money}
          onChange={handleChangeState}
        />
      </div>
      <div className="add-btn">
        <Button className={"cancle-btn"} text="취소" />
        <Button className={"submit-btn"} text="등록" type="active" />
      </div>
    </div>
  );
};

export default Add;
