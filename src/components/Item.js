import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
const Item = () => {
  return (
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
  );
};
export default Item;
