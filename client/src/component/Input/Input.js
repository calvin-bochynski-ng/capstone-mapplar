import "./Input.scss";
import TextField from "@mui/material/TextField";

const Input = ({ label, name, type, handleFormChange }) => {
  return (
    <div className="input">
      <TextField
        // id="standard-basic"
        label={label}
        name={name}
        type={type}
        variant="standard"
        onChange={handleFormChange}
      />
      {/* <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="input__input"
        onChange={handleFormChange}
      /> */}
    </div>
  );
};
export default Input;
