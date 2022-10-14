import DayItem from "../components/DayItem";
import ControlMenu from "../components/ControlMenu";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

const List = () => {
  const { monthData } = useContext(DataContext);
  const [sortedData, setSortedData] = useState();
  const [filter, setFilter] = useState("filter-all");

  /** filtering 동작할 함수 */
  const filterAction = (type) => {
    let filterData = [];
    if (type) {
      filterData = monthData.filter((it) => it.type === type).sort(compare);
    } else {
      filterData = monthData.sort(compare);
    }
    setSortedData(filterData);
  };

  /** 내역 내림차순으로 정렬 */
  const compare = (a, b) => {
    return b.date - a.date;
  };
  // const sortedData = monthData.sort(compare);

  /** 내역 일자 headText 전달 유무를 따지기 위한 변수 */
  let prevDate = 0;

  return (
    <main>
      <section className="list-wrapper">
        <header>
          {/* filtering */}
          <h1>월간 내역</h1>
          {/* 총, 지출, 수입 선택시 동작할 함수 생성하고 props로 전달 */}
          <ControlMenu onClick={filterAction} />
        </header>
        <article>
          {sortedData &&
            sortedData.map((it) => {
              let date = new Date(parseInt(it.date)); // 내역날짜
              const headText = `${date.getMonth() + 1}월 ${date.getDate()}일`;
              let isExit = parseInt(date.getDate()) === prevDate;
              prevDate = parseInt(date.getDate());

              if (isExit) {
                return <DayItem key={it.id} {...it} />;
              } else {
                return (
                  <React.Fragment key={it.id}>
                    <h1>{headText}</h1>
                    <DayItem key={it.id} headText={headText} {...it} />
                  </React.Fragment>
                );
              }
            })}
        </article>
      </section>
    </main>
  );
};
export default List;
