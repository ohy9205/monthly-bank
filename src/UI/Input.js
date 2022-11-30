const Input = ({ input, labelText }) => {
  return (
    <div>
      <label htmlFor={input.id}>{labelText}</label>
      <input
        ref={input.ref}
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
