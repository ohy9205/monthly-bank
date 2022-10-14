const Button = ({ type, className, text, onClick }) => {
  return (
    <button
      className={`${className}${type ? ` active` : ``}`}
      onClick={() => onClick}>
      {text}
    </button>
  );
};
export default Button;
