import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DataContext } from "../App";

const DayItem = ({ id, type, name, date, money }) => {
  let curDay = new Date(date).getDate();

  return (
    <li className={type}>
      <dt>{name}</dt>
      <dd>{type === "income" ? `+${money}` : `-${money}`}</dd>
      <button>
        <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
      </button>
    </li>
  );
};
export default DayItem;
