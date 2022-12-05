import DayItem from "./DayItem";
import ControlMenu from "./ControlMenu";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Add from "./Add";
import ItemContext from "../store/item-context";

const List = () => {
  const { monthData } = useContext(ItemContext);
  const [sortedData, setSortedData] = useState();
  const [filter, setFilter] = useState("ALL");
  const [isAdd, setIsAdd] = useState(false);
  const [targetId, setTargetId] = useState();

  /** 내역 내림차순으로 정렬 */
  const compare = (a, b) => {
    return b.date - a.date;
  };

  /** filtering 동작 */
  useEffect(() => {
    let filterData = [];
    if (monthData.length > 0 && filter === "ALL") {
      filterData = monthData.sort(compare);
    } else {
      filterData = monthData.filter((it) => it.type === filter).sort(compare);
    }
    setSortedData(filterData);
  }, [monthData, filter]);

  /**필터링 핸들러 */
  const onFilteringHandler = (filter) => {
    setFilter(filter);
  };

  /** 내역 클릭하면 edit 창이 열린다 */
  const onEditHandler = (id) => {
    setTargetId(id);
    setIsAdd(true);
  };

  /** add/edit창을 닫는다 */
  const onCloseHandler = () => {
    setIsAdd(false);
  };

  /** add/edit창을 닫으면 target을 초기화한다 */
  useEffect(() => {
    isAdd || setTargetId(null);
  }, [isAdd]);

  /** 내역 렌더링 */
  const itemRendering = () => {
    if (!sortedData) return;

    let prevDate = 0;
    let isExist = false;
    const result = sortedData.map((it) => {
      const date = new Date(parseInt(it.date)); // 내역날짜
      const dateText = `${date.getMonth() + 1}월 ${date.getDate()}일`;

      isExist = prevDate === date.getDate();
      prevDate = date.getDate();

      return (
        <Fragment key={it.id}>
          {!isExist && <h1>{dateText}</h1>}
          <DayItem key={it.id} onEdit={onEditHandler} {...it} />
        </Fragment>
      );
    });
    return result;
  };

  return (
    <main className="list-wrapper">
      <header>
        <h1>월간 내역</h1>
        <ControlMenu onFilter={onFilteringHandler} />
      </header>
      <section>
        <article>{itemRendering()}</article>
      </section>
      <footer>
        <button>
          <FontAwesomeIcon
            className="add-btn"
            icon={faCirclePlus}
            size="4x"
            onClick={(e) => {
              setIsAdd(true);
            }}
          />
        </button>
      </footer>
      {isAdd && <Add onClose={onCloseHandler} targetId={targetId} />}
    </main>
  );
};
export default List;
