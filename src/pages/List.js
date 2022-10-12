import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import DayItem from "../components/DayItem";
import ControlMenu from "../components/ControlMenu";

const List = () => {
  return (
    <main>
      <section className="list-wrapper">
        <header>
          {/* filtering */}
          <h1>월간 내역</h1>
          <ControlMenu />
        </header>
        <div className="list">
          <DayItem />
        </div>
      </section>

      <aside>
        <button>
          <FontAwesomeIcon className="add-btn" icon={faCirclePlus} size="4x" />
        </button>
      </aside>
    </main>
  );
};
export default List;
