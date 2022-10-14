import { useContext, useRef, useState } from "react";
import { DispatchContext } from "../App";
import Button from "./Button";

/** 날짜 포맷 변환 */
const dateFormat = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month}-${day}`;
};

const Add = ({ isEdit, addRef }) => {
  const { onCreate, onEdiit } = useContext(DispatchContext);

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  const [type, setType] = useState("expenses");

  const useName = useRef();
  const useMoney = useRef();

  /** submit 버튼 클릭시 데이터 저장 */
  const handleSubmit = (e) => {
    if (name.length < 1) {
      useName.current.focus();
      return false;
    } else if (money.length < 1) {
      useMoney.current.focus();
      return false;
    }
    isEdit ? onEdiit() : onCreate(date, name, money, type);
    offAddPage();
    resetState();
  };

  /** 내역 추가 페이지 닫기 */
  const offAddPage = () => {
    addRef.current.classList.remove("add-on");
  };

  /** 데이터 초기화 */
  const resetState = () => {
    setDate(new Date());
    setMoney(0);
    setType("expenses");
    setName("");
  };

  return (
    <section className="add-wrapper" ref={addRef}>
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
          ref={useName}
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="money">금액</label>
        <input
          ref={useMoney}
          id="money"
          name="money"
          value={money || ""}
          onChange={(e) => {
            /[0-9]/.test(e.target.value) && setMoney(e.target.value);
          }}
          onKeyDown={(e) => e.keyCode === 13 && handleSubmit()}
        />
      </div>
      <div className="add-btn">
        <Button
          className={"cancle-btn"}
          text="취소"
          onClick={() => addRef.current.classList.remove("add-on")}
        />
        <Button
          className={"submit-btn"}
          text="등록"
          type="active"
          onClick={() => handleSubmit()}
        />
      </div>
    </section>
  );
};

export default Add;
