import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DispatchContext } from "../App";

const DayItem = ({ name, type, money, id, onClick }) => {
  let moneyFormat = parseInt(money).toLocaleString();
  let { onRemove } = useContext(DispatchContext);

  return (
    <dl
      className={type}
      onClick={(e) => {
        let targetName = e.target.tagName;
        (targetName === "DL" || targetName === "DT" || targetName === "DL") &&
          onClick(id);
      }}>
      <dt>{name}</dt>
      <dd>{type === "income" ? `+${moneyFormat}` : `-${moneyFormat}`}</dd>
      <button>
        <FontAwesomeIcon
          className="del-btn"
          icon={faCircleXmark}
          onClick={() => onRemove(id)}
        />
      </button>
    </dl>
  );
};
export default DayItem;
