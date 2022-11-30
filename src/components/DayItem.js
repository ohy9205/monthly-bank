import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ItemContext from "../store/item-context";

const DayItem = ({ name, type, money, id, onEdit }) => {
  let moneyFormat = parseInt(money).toLocaleString();
  let itemCtx = useContext(ItemContext);

  /**내역 제거 핸들러 */
  const removeItemHandler = () => {
    itemCtx.removeItem(id);
  };

  return (
    <dl
      className={type}
      onClick={(e) => {
        let targetName = e.target.tagName;
        (targetName === "DL" || targetName === "DT" || targetName === "DD") &&
          onEdit(id);
      }}>
      <dt>{name}</dt>
      <dd>{type === "INCOMES" ? `+${moneyFormat}` : `-${moneyFormat}`}</dd>
      <button>
        <FontAwesomeIcon
          className="del-btn"
          icon={faCircleXmark}
          onClick={removeItemHandler}
        />
      </button>
    </dl>
  );
};
export default DayItem;
