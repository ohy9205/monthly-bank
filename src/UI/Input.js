const Input = ({ input, labelText }) => {
  console.log(input);
  return (
    <div>
      <label htmlFor={input.id}>{labelText}</label>
      <input
        type={input.type}
        id={input.id}
        value={input.value}
        onChange={input.event}
        placeholder={input.placeholder && input.placeholder}
      />
    </div>
  );
};
export default Input;
