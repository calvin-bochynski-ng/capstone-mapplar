import "./Input.scss";
import TextField from "@mui/material/TextField";

const Input = ({ label, name, type, handleFormChange, value }) => {
  return (
    <div className="input">
      <TextField
        label={label}
        name={name}
        type={type}
        variant="outlined"
        onChange={handleFormChange}
        required
        fullWidth
        value={value}
      />
    </div>
  );
};
export default Input;
