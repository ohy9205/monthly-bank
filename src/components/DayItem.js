import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DayItem = ({ name, type, money, id }) => {
  let moneyFormat = parseInt(money).toLocaleString();

  return (
    <dl className={type}>
      <dt>{name}</dt>
      <dd>{type === "income" ? `+${moneyFormat}` : `-${moneyFormat}`}</dd>
      <button>
        <FontAwesomeIcon className="del-btn" icon={faCircleXmark} />
      </button>
    </dl>
  );
};
export default DayItem;
