import "./LoginPage.scss";
import Input from "../../component/Input/Input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../../assets/images/main-logo.svg";
const LoginPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const [errorArray, setErrorArray] = useState([]);
  const [errorLogin, setErrorLogin] = useState(false);
  const [formDetail, setFormDetail] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (event) => {
    setFormDetail({ ...formDetail, [event.target.name]: event.target.value });

    setErrorArray(
      errorArray.filter((property) => property !== event.target.name)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorChecking = [];
    const submittedForm = {
      username: formDetail.username,
      password: formDetail.password,
    };

    for (let property in submittedForm) {
      if (!submittedForm[property]) {
        errorChecking.push(property);
      }
    }

    setErrorArray(errorChecking);

    if (errorChecking.length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/login`,
          submittedForm
        );

        sessionStorage.setItem("token", response.data.token);
        setIsToken(true);
        navigate("/social");
      } catch (error) {
        setErrorLogin(true);
        console.log(error);
      }
    }
  };

  return (
    <main className="login">
      <img src={logo} alt="" className="login__img" />
      <h1 className="login__title">Log In</h1>
      <form className="login__container">
        <div className="login__input-container">
          <Input
            label="Username"
            name="username"
            type="text"
            handleFormChange={handleFormChange}
            error={
              errorLogin ? true : errorArray.includes("username") ? true : false
            }
            message={
              !errorLogin
                ? errorArray.includes("username")
                  ? "Please fill in your username!"
                  : ""
                : "Incorrect Username or Password"
            }
          />
          <Input
            label="Password"
            name="password"
            type="password"
            handleFormChange={handleFormChange}
            error={
              errorLogin ? true : errorArray.includes("password") ? true : false
            }
            message={
              !errorLogin
                ? errorArray.includes("password")
                  ? "Please fill in your password!"
                  : ""
                : "Incorrect Username or Password"
            }
          />
        </div>
        <div className="login__button">
          <Button variant="contained" onClick={handleSubmit}>
            Log In
          </Button>
        </div>
      </form>
    </main>
  );
};
export default LoginPage;
