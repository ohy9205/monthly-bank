import { useEffect, useRef, useState } from "react";

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
        onClick={(e) => clickToggle(e, "all")}>
        총
      </button>
      <button className={`filter`} onClick={(e) => clickToggle(e, "income")}>
        수입
      </button>
      <button className={`filter`} onClick={(e) => clickToggle(e, "expenses")}>
        지출
      </button>
    </div>
  );
};
export default ControlMenu;
