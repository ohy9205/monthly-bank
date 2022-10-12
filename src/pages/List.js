import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import DayItem from "../components/DayItem";
import ControlMenu from "../components/ControlMenu";
import { useContext, useEffect } from "react";
import { DataContext } from "../App";

const List = () => {
  const { monthData } = useContext(DataContext);

  let days = [];
  for (let i = 0; i < 31; i++) {
    days[i] = i + 1;
  }
  console.log(days);

  /** 해당 월 리스트들을 일 단위로 구분 filter?*/
  return (
    <main>
      <section className="list-wrapper">
        <header>
          {/* filtering */}
          <h1>월간 내역</h1>
          <ControlMenu />
        </header>
        <div className="list">
          <article>
            <h1>10월22일 일</h1>
            {monthData.map((it) => {
              let curDay = new Date(it.date).getDate();
              const date = new Date(parseInt(it.date));
              const dateText = `${date.getMonth() + 1}월 ${date.getDate()}일`;
              return (
                <div className="dayItem-wrapper">
                  {console.log(curDay)}
                  {/* {curDay === date.getDate() : `<h1>${dateText}</h1>` : ''} */}
                  {/* <h1>{dateText}</h1> */}
                  <ul>
                    <DayItem key={it.id} {...it} />
                  </ul>
                </div>
              );
            })}
          </article>
          {/* </ul> */}
          {/* </article> */}
        </div>
      </section>
    </main>
  );
};
export default List;
