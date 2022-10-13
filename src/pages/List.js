import DayItem from "../components/DayItem";
import ControlMenu from "../components/ControlMenu";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

const List = () => {
  const { monthData } = useContext(DataContext);
  /** 내역 내림차순으로 정렬 */
  const compare = (a, b) => {
    return b.date - a.date;
  };
  const sortedData = monthData.sort(compare);

  /** 내역 일자 headText 전달 유무를 따지기 위한 변수 */
  let prevDate = 0;

  /** 해당 월 리스트들을 일 단위로 구분 filter?*/
  return (
    <main>
      <section className="list-wrapper">
        <header>
          {/* filtering */}
          <h1>월간 내역</h1>
          <ControlMenu />
        </header>
        <article>
          {sortedData.map((it) => {
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
