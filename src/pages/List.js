import DayItem from "../components/DayItem";
import ControlMenu from "../components/ControlMenu";
import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Add from "../components/Add";

const List = () => {
  const { monthData } = useContext(DataContext);
  const [sortedData, setSortedData] = useState();
  const [filter, setFilter] = useState("all");

  /** filtering 동작 */
  useEffect(() => {
    let filterData = [];
    if (monthData.length > 0 && filter === "all") {
      filterData = monthData.sort(compare);
    } else {
      filterData = monthData.filter((it) => it.type === filter).sort(compare);
    }
    setSortedData(filterData);
  }, [monthData, filter]);

  /** 내역 내림차순으로 정렬 */
  const compare = (a, b) => {
    return b.date - a.date;
  };

  /** 내역 일자 headText 전달 유무를 따지기 위한 변수 */
  let prevDate = 0;

  /** 내역 추가 화면 on */
  const addRef = useRef();
  const onClickAdd = () => {
    addRef.current.classList.add("add-on");
  };

  return (
    <main>
      <section className="list-wrapper">
        <header>
          {/* filtering */}
          <h1>월간 내역</h1>
          {/* 총, 지출, 수입 선택시 동작할 함수 생성하고 props로 전달 */}
          <ControlMenu onClick={setFilter} />
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
      <aside>
        <button>
          <FontAwesomeIcon
            className="add-btn"
            icon={faCirclePlus}
            size="4x"
            onClick={(e) => {
              onClickAdd();
            }}
          />
        </button>
      </aside>
      <Add isEdit={false} addRef={addRef} />
    </main>
  );
};
export default List;
