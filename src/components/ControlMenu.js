const ControlMenu = ({ onFilter }) => {
  /** 필터 클릭시 동작 함수 */
  const onClickHandler = (e) => {
    let btn = document.querySelectorAll(".filter");
    for (let it of btn) {
      it.classList.remove("filter-on");
    }
    e.target.classList.add("filter-on");

    onFilter(e.target.dataset.type);
  };

  return (
    <div className="filter-wrapper">
      <button
        className={`filter filter-on`}
        data-type={"ALL"}
        onClick={onClickHandler}>
        총
      </button>
      <button
        className={`filter`}
        data-type={"INCOME"}
        onClick={onClickHandler}>
        수입
      </button>
      <button
        className={`filter`}
        data-type={"SPENDING"}
        onClick={onClickHandler}>
        지출
      </button>
    </div>
  );
};
export default ControlMenu;
