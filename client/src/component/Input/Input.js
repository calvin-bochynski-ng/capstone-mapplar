import "./Input.scss";
import TextField from "@mui/material/TextField";

const Input = ({
  label,
  name,
  type,
  handleFormChange,
  value,
  error,
  message,
}) => {
  return (
    <div className="input">
      <TextField
        label={!message ? label : `${label} - ${message}`}
        name={name}
        type={type}
        variant="outlined"
        onChange={handleFormChange}
        required
        fullWidth
        value={value}
        error={error}
      />
    </div>
  );
};
export default Input;
