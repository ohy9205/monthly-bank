const ControlMenu = () => {
  return (
    <div className="filter">
      <input type={"radio"} name="filtering" id="filter-all" />
      <label htmlFor="filter-all">총</label>
      <input type={"radio"} name="filtering" id="filter-income" />
      <label htmlFor="filter-income">수입</label>
      <input type={"radio"} name="filtering" id="filter-expenses" />
      <label htmlFor="filter-expenses">지출</label>
    </div>
  );
};
export default ControlMenu;
