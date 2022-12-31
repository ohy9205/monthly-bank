import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ItemContext from "../store/item-context";

const Header = () => {
  const itemCtx = useContext(ItemContext);
  const account = itemCtx.account;
  const curDate = itemCtx.curDate;

  const total = parseInt(account.total).toLocaleString();
  const income = parseInt(account.income).toLocaleString();
  const spending = parseInt(account.spending).toLocaleString();

  /** header에 전달할 년-월 정보 */
  const headText = `${curDate.getFullYear()}-${
    curDate.getMonth() + 1 < 10
      ? `0${curDate.getMonth() + 1}`
      : curDate.getMonth() + 1
  } 자산현황`;

  /**이전 달로 변경 */
  const prevMonthHandler = () => {
    itemCtx.changeMonth(curDate.getMonth() - 1);
  };

  /**다음달로 변경 */
  const nextMonthHandler = () => {
    itemCtx.changeMonth(curDate.getMonth() + 1);
  };

  return (
    <header className="main-header">
      <button type="button" className={"left-btn"}>
        <FontAwesomeIcon icon={faChevronLeft} onClick={prevMonthHandler} />
      </button>
      <div className="left-col">
        <h1>{headText}</h1>
        <p>{total}</p>
      </div>
      <div className="right-col">
        <div className="total-money">
          <h2>수입</h2>
          <p>{income}</p>
        </div>
        <div className="total-money">
          <h2>지출</h2>
          <p>{spending}</p>
        </div>
      </div>
      <button type="button" className={"right-btn"}>
        <FontAwesomeIcon icon={faChevronRight} onClick={nextMonthHandler} />
      </button>
    </header>
  );
};
export default Header;
