import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DispatchContext } from "../App";

const DayItem = ({ name, type, money, id }) => {
  let moneyFormat = parseInt(money).toLocaleString();
  let { onEdit, onRemove } = useContext(DispatchContext);

  return (
    <dl className={type}>
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
