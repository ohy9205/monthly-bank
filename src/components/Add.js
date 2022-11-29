import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ItemContext from "../store/item-context";
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
  const selectTypeHandler = (type) => {
    setType(type);
  };

  /** submit 버튼 클릭시 데이터 저장 */
  const handleSubmit = () => {
    if (name.length < 1) {
      useName.current.focus();
      return false;
    } else if (!money) {
      useMoney.current.focus();
      return false;
    }

    console.log(date, name, money, type);

    targetId
      ? editItem(targetId, { date, name, money, type })
      : addItem({ date, name, money, type });
    setIsAdd(false);
  };

  return (
    <Fragment>
      <div className="add-overlay" onClick={() => setIsAdd(false)}></div>
      <div className="add-wrapper">
        <h1>{targetId ? `내역 수정` : `내역 추가`}</h1>
        <div className="add-list">
          <div className="type-wrapper">
            <Button
              className={`expenses-btn${type === "EXPENSES" ? " type-on" : ""}`}
              text="지출"
              onClick={() => setType("EXPENSES")}
            />
            <Button
              className={`income-btn${type === "INCOMES" ? " type-on" : ""}`}
              text="수입"
              onClick={() => setType("INCOMES")}
            />
          </div>
          <label htmlFor="date">날짜</label>
          <input
            type="date"
            id="date"
            name="date"
            value={dateFormat(date)}
            onChange={(e) => setDate(e.target.value)}
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
            placeholder="숫자만 입력하세요"
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
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Add;
