import { useContext } from "react";
import { DataContext } from "../App";

const Header = () => {
  const { account } = useContext(DataContext);
  const total = parseInt(account.total).toLocaleString();
  const income = parseInt(account.income).toLocaleString();
  const expenses = parseInt(account.expenses).toLocaleString();

  return (
    <header className="main-header">
      <div className="left-col">
        <h1>2022-10월 자산현황</h1>
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
    </header>
  );
};
export default Header;
