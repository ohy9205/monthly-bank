import React, { useContext, useEffect, useRef, useState } from "react";
import ItemContext from "../store/item-context";
import Button from "../UI/Button";
import Input from "../UI/Input";

/** 날짜 포맷 변환 */
const dateFormat = (msdate) => {
  const date = new Date(msdate);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
};

const Add = ({ onClose, targetId }) => {
  const { addItem, editItem } = useContext(ItemContext);
  const { monthData } = useContext(ItemContext);

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [money, setMoney] = useState();
  const [type, setType] = useState("EXPENSES");

  const useName = useRef();
  const useMoney = useRef();

  /** add나 edit창의 state 초기화 */
  useEffect(() => {
    if (!targetId) {
      setDate(new Date());
      setMoney(0);
      setType("EXPENSES");
      setName("");
      return;
    }
    const targetData = monthData.find((it) => it.id === targetId);
    setDate(parseInt(targetData.date));
    setName(targetData.name);
    setMoney(parseInt(targetData.money));
    setType(targetData.type);
  }, [targetId, monthData]);

  /**날짜 선택 */
  const selectDateHandler = (e) => {
    setDate(new Date(e.target.value).getTime());
  };

  /**분류 선택 */
  const selectTypeHandler = (e) => {
    setType(e.target.dataset.type);
  };

  /**이름 입력 */
  const enteredName = (e) => {
    setName(e.target.value);
  };

  /**금액 입력 */
  const enteredMoney = (e) => {
    setMoney(e.target.value);
  };

  /** submit 버튼 클릭시 데이터 저장 */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 1) {
      useName.current.focus();
      return false;
    } else if (!money) {
      useMoney.current.focus();
      return false;
    }

    targetId
      ? editItem(targetId, { date, name, money, type })
      : addItem({ date, name, money, type });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-backdrop" onClick={onClose}></div>
      <div className="add-wrapper">
        <h1>{targetId ? `내역 수정` : `내역 추가`}</h1>
        <div className="add-list">
          <div className="type-wrapper">
            <Button
              type="button"
              dataset="EXPENSE"
              className={`expenses-btn ${type === "EXPENSES" ? "type-on" : ""}`}
              onClick={selectTypeHandler}>
              지출
            </Button>
            <Button
              type="button"
              dataset="INCOMES"
              className={`income-btn ${type === "INCOMES" ? "type-on" : ""}`}
              onClick={selectTypeHandler}>
              수입
            </Button>
          </div>
          <Input
            input={{
              type: "date",
              id: "date",
              value: dateFormat(date),
              event: selectDateHandler,
            }}
            labelText="날짜"
          />
          <Input
            input={{
              ref: useName,
              type: "name",
              id: "name",
              value: name,
              event: enteredName,
            }}
            labelText="설명"
          />
          <Input
            input={{
              ref: useMoney,
              type: "number",
              id: "money",
              value: money || "",
              event: enteredMoney,
              placeholder: "숫자만 입력하세요",
            }}
            labelText="금액"
          />
        </div>
        <div className="add-btn">
          <Button className={"cancle-btn"} onClick={onclose}>
            취소
          </Button>
          <Button className={"submit-btn"} active="on" onClick={handleSubmit}>
            등록
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Add;
