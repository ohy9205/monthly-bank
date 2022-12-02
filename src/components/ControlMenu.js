const ControlMenu = ({ onClick }) => {
  /** 필터 클릭시 동작 함수 */
  const clickToggle = (e, type) => {
    let btn = document.querySelectorAll(".filter");
    for (let it of btn) {
      it.classList.remove("filter-on");
    }
    e.target.classList.add("filter-on");

    onClick(type);
  };

  return (
    <div className="filter-wrapper">
      <button
        className={`filter filter-on`}
        onClick={(e) => clickToggle(e, "ALL")}>
        총
      </button>
      <button className={`filter`} onClick={(e) => clickToggle(e, "INCOMES")}>
        수입
      </button>
      <button className={`filter`} onClick={(e) => clickToggle(e, "EXPENSES")}>
        지출
      </button>
    </div>
  );
};
export default ControlMenu;
