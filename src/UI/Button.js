const Button = ({ type, active, className, onClick, children }) => {
  return (
    <button
      type={type}
      className={`${className} ${active ? `active` : ``}`}
      onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
