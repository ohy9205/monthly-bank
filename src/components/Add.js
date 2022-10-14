import { useState } from "react";
import Button from "./Button";

const Add = () => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [money, setMoney] = useState(0);
  const [type, setType] = useState("expenses");

  const dateFormat = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const handleChangeState = (e) => {};

  return (
    <div className="add-wrapper">
      <h1>내역 추가</h1>
      <div className="add-list">
        <div className="type-wrapper">
          <Button
            className={`expenses-btn${type === "expenses" ? " type-on" : ""}`}
            text="지출"
            onClick={() => setType("expenses")}
          />
          <Button
            className={`income-btn${type === "income" ? " type-on" : ""}`}
            text="수입"
            onClick={() => setType("income")}
          />
        </div>
        <label htmlFor="date">날짜</label>
        <input
          type="date"
          id="date"
          name="date"
          value={dateFormat(date)}
          onChange={(e) => setDate(new Date(e.target.value))}
        />
        <label htmlFor="name">설명</label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="money">금액</label>
        <input
          id="money"
          name="money"
          value={money || ""}
          onChange={(e) => {
            /[0-9]/.test(e.target.value)
              ? setMoney(e.target.value)
              : setMoney(0);
          }}
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
