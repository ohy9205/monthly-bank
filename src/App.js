import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  return (
    <div className="App">
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
      <main>
        <section className="category">
          {/* category */}
          <button className="list_btn">내역</button>
          <button className="statistics_btn">통계</button>
        </section>
        <section className="list-wrapper">
          <header>
            {/* filtering */}
            <h1>월간 내역</h1>
            <div className="filter">
              <input type={"radio"} name="filtering" id="filter-all" />
              <label for="filter-all">총</label>
              <input type={"radio"} name="filtering" id="filter-income" />
              <label for="filter-income">수입</label>
              <input type={"radio"} name="filtering" id="filter-expenses" />
              <label for="filter-expenses">지출</label>
            </div>
          </header>
          <div className="list">
            <article>
              <h1>10월22일 일</h1>
              <ul>
                {/* item */}
                <li className="income">
                  <dt>월급</dt>
                  <dd>+200,000,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
                <li className="expenses">
                  <dt>점심식사-백반구십십</dt>
                  <dd>-50,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
                <li className="expenses">
                  <dt>점심식사-백반구십십</dt>
                  <dd>-50,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
                <li className="expenses">
                  <dt>점심식사-백반구십십</dt>
                  <dd>-50,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
                <li className="expenses">
                  <dt>점심식사-백반구십십</dt>
                  <dd>-50,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
                <li className="expenses">
                  <dt>점심식사-백반구십십</dt>
                  <dd>-50,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
                <li className="expenses">
                  <dt>점심식사-백반구십십</dt>
                  <dd>-50,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
                <li className="expenses">
                  <dt>점심식사-백반구십십</dt>
                  <dd>-50,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
                <li className="expenses">
                  <dt>점심식사-백반구십십</dt>
                  <dd>-50,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
                <li className="expenses">
                  <dt>점심식사-백반구십십</dt>
                  <dd>-50,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
              </ul>
            </article>
            <article>
              <h1>10월21일 토</h1>
              <ul>
                {/* item */}
                <li className="expenses">
                  <dt>리액트 인강</dt>
                  <dd>-48,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
                <li className="expenses">
                  <dt>점심식사-백반</dt>
                  <dd>-50,000</dd>
                  <button>
                    <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
                  </button>
                </li>
              </ul>
            </article>
          </div>
        </section>
      </main>
      <aside>
        <button>
          <FontAwesomeIcon className="add-btn" icon={faCirclePlus} size="4x" />
        </button>
      </aside>
    </div>
  );
}

export default App;
