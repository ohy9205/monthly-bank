const Header = () => {
  return (
    <header className="main-header">
      <div className="left-col">
        <h1>2022-10월 자산현황</h1>
        <p>25,000,000</p>
      </div>
      <div className="right-col">
        <div className="total-money">
          <h2>수입</h2>
          <p>30,000,000</p>
        </div>
        <div className="total-money">
          <h2>지출</h2>
          <p>5,000,000</p>
        </div>
      </div>
    </header>
  );
};
export default Header;
