const Button = ({ type, active, className, onClick, dataset, children }) => {
  return (
    <button
      type={type}
      data-type={dataset}
      className={`${className} ${active ? `active` : ``}`}
      onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
