import "./Input.scss";

const Input = ({ label, name, type, handleFormChange }) => {
  return (
    <div className="input">
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="input__input"
        onChange={handleFormChange}
      />
    </div>
  );
};
export default Input;
