import { useContext, useEffect, useRef, useState } from "react";
import { DataContext, DispatchContext } from "../App";
import Button from "./Button";

/** 날짜 포맷 변환 */
const dateFormat = (msdate) => {
  const date = new Date(msdate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
};

const Add = ({ setIsAdd, targetId }) => {
  const { onCreate, onEdit } = useContext(DispatchContext);
  const { monthData } = useContext(DataContext);

  const [date, setDate] = useState(new Date().getTime());
  const [name, setName] = useState("");
  const [money, setMoney] = useState();
  const [type, setType] = useState("expenses");

  const useName = useRef();
  const useMoney = useRef();

  /** add나 edit창의 state 초기화 */
  useEffect(() => {
    if (!targetId) {
      setDate(new Date());
      setMoney(0);
      setType("expenses");
      setName("");
      return;
    }
    const targetData = monthData.find((it) => it.id === targetId);
    setDate(parseInt(targetData.date));
    setName(targetData.name);
    setMoney(parseInt(targetData.money));
    setType(targetData.type);
  }, [targetId, monthData]);

  /** submit 버튼 클릭시 데이터 저장 */
  const handleSubmit = () => {
    if (name.length < 1) {
      useName.current.focus();
      return false;
    } else if (!money) {
      useMoney.current.focus();
      return false;
    }
    targetId
      ? onEdit(targetId, date, name, money, type)
      : onCreate(date, name, money, type);
    setIsAdd(false);
    // resetState();
  };

  return (
    <section className="add-wrapper">
      <h1>{targetId ? `내역 수정` : `내역 추가`}</h1>
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
            setMoney(parseInt(e.target.value));
          }}
          onKeyDown={(e) => e.keyCode === 13 && handleSubmit()}
        />
      </div>
      <div className="add-btn">
        <Button
          className={"cancle-btn"}
          text="취소"
          onClick={() => setIsAdd(false)}
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
