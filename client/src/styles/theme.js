import { createTheme } from "@mui/material/styles";

const themeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4c82f6",
    },
    secondary: {
      main: "#f08c00",
    },
    background: {
      default: "#f1f5fe",
      paper: "#f1f5fe",
    },
    text: {
      primary: "#020812",
    },
    success: {
      main: "#bddaa4",
    },
  },
  typography: {
    fontFamily: "Noto Sans",
    button: {
      fontSize: "0.8rem",
      lineHeight: 1.14,
      fontWeight: 300,
    },
    caption: {
      fontSize: "0.8rem",
      lineHeight: 0.88,
    },
    body1: {
      fontSize: "0.8rem",
    },
  },
});
export default themeOptions;
