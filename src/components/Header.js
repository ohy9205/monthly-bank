import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { DataContext } from "../App";

const Header = ({ headText, prevMonth, nextMonth }) => {
  const { account } = useContext(DataContext);
  const total = parseInt(account.total).toLocaleString();
  const income = parseInt(account.income).toLocaleString();
  const expenses = parseInt(account.expenses).toLocaleString();

  /**현재 월 state */
  const [month, setMonth] = useState();

  return (
    <header className="main-header">
      <button className="left-btn" onClick={prevMonth}>
        <FontAwesomeIcon icon={faChevronLeft} />
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
          <p>{expenses}</p>
        </div>
      </div>
      <button className="right-btn">
        <FontAwesomeIcon icon={faChevronRight} onClick={nextMonth} />
      </button>
    </header>
  );
};
export default Header;
