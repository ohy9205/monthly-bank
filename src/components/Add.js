import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
    setIsAdd(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-backdrop" onClick={() => setIsAdd(false)}></div>
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
          <Input
            input={{
              type: "date",
              id: "date",
              value: dateFormat(date),
              event: (e) => setDate(e.target.value),
            }}
            labelText="날짜"
          />
          <Input
            input={{
              ref: useName,
              type: "name",
              id: "name",
              value: name,
              event: (e) => setName(e.target.value),
            }}
            labelText="설명"
          />
          <Input
            input={{
              ref: useMoney,
              type: "number",
              id: "money",
              value: money || "",
              event: (e) => setMoney(e.target.value),
              placeholder: "숫자만 입력하세요",
            }}
            labelText="금액"
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
    </form>
  );
};

export default Add;
