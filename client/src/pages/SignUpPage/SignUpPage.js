import "./SignUpPage.scss";
import { useState } from "react";
import axios from "axios";
import Input from "../../component/Input/Input";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import logo from "../../assets/images/main-logo.svg";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [errorArray, setErrorArray] = useState([]);

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const [formDetail, setFormDetail] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleFormChange = async (event) => {
    await setFormDetail({
      ...formDetail,
      [event.target.name]: event.target.value,
    });

    if (!errorPassword) {
      setErrorArray(
        errorArray.filter((property) => property !== event.target.name)
      );
    } else {
      if (formDetail.password === event.target.value) {
        setErrorPassword(false);
        setErrorArray(
          errorArray.filter((property) => property !== event.target.name)
        );
      }
    }

    if (!errorEmail) {
      setErrorArray(
        errorArray.filter((property) => property !== event.target.name)
      );
    } else {
      const validateEmail = formDetail.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (validateEmail) {
        setErrorEmail(false);
        setErrorArray(
          errorArray.filter((property) => property !== event.target.name)
        );
      }
    }

    if (!errorPhone) {
      setErrorArray(
        errorArray.filter((property) => property !== event.target.name)
      );
    } else {
      const validatePhoneNumber = formDetail.phone_number.match(
        /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{5}$/gi
      );
      if (validatePhoneNumber) {
        setErrorPhone(false);
        setErrorArray(
          errorArray.filter((property) => property !== event.target.name)
        );
      }
    }
  };

  const handleClearForm = () => {
    setFormDetail({
      username: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
      password_confirm: "",
    });
    setErrorArray([]);
    setErrorPassword(false);
    setErrorEmail(false);
    setErrorPhone(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorChecking = [];
    const submittedForm = {
      username: formDetail.username,
      first_name: formDetail.first_name,
      last_name: formDetail.last_name,
      phone_number: formDetail.phone_number,
      email: formDetail.email,
      password: formDetail.password,
      password_confirm: formDetail.password_confirm,
    };

    for (let property in submittedForm) {
      if (!submittedForm[property]) {
        errorChecking.push(property);
      }
    }

    setErrorArray(errorChecking);

    if (errorChecking.length === 0) {
      const validatePhoneNumber = submittedForm.phone_number.match(
        /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{5}$/gi
      );

      const validateEmail = submittedForm.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

      if (!validatePhoneNumber) {
        setErrorPhone(true);
        errorChecking.push("phone_number");
      }

      if (!validateEmail) {
        setErrorEmail(true);
        errorChecking.push("email");
      }

      if (submittedForm.password !== submittedForm.password_confirm) {
        setErrorPassword(true);
        errorChecking.push("password_confirm");
      }

      setErrorArray(errorChecking);

      if (errorChecking.length === 0) {
        const validatedDetails = {
          username: submittedForm.username,
          first_name: submittedForm.first_name,
          last_name: submittedForm.last_name,
          phone_number: submittedForm.phone_number,
          email: submittedForm.email,
          password: submittedForm.password,
        };
        try {
          await axios.post(
            `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/signup`,
            validatedDetails
          );
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <main className="sign-up">
      <img src={logo} alt="" className="sign-up__img" />
      <section className="sign-up__section">
        <h1 className="sign-up__title">Sign Up</h1>
        <form className="sign-up__container">
          <Input
            label="Username"
            name="username"
            type="text"
            handleFormChange={handleFormChange}
            value={formDetail.username}
            error={errorArray.includes("username") ? true : false}
            message={
              errorArray.includes("username")
                ? "Please fill in your username!"
                : ""
            }
          />
          <Input
            label="First Name"
            name="first_name"
            type="text"
            handleFormChange={handleFormChange}
            value={formDetail.first_name}
            error={errorArray.includes("first_name") ? true : false}
            message={
              errorArray.includes("first_name")
                ? "Please fill in your first name!"
                : ""
            }
          />
          <Input
            label="Last Name"
            name="last_name"
            type="text"
            handleFormChange={handleFormChange}
            value={formDetail.last_name}
            error={errorArray.includes("last_name") ? true : false}
            message={
              errorArray.includes("last_name")
                ? "Please fill in your last name!"
                : ""
            }
          />
          <Input
            label="Phone Number"
            name="phone_number"
            type="text"
            handleFormChange={handleFormChange}
            value={formDetail.phone_number}
            error={
              errorPhone
                ? true
                : errorArray.includes("phone_number")
                ? true
                : false
            }
            message={
              !errorPhone
                ? errorArray.includes("phone_number")
                  ? "Please fill in your phone number!"
                  : ""
                : "Not a valid phone number!"
            }
          />
          <Input
            label="Email"
            name="email"
            type="text"
            handleFormChange={handleFormChange}
            value={formDetail.email}
            error={
              errorEmail ? true : errorArray.includes("email") ? true : false
            }
            message={
              !errorEmail
                ? errorArray.includes("email")
                  ? "Please fill in your email!"
                  : ""
                : "Not a valid email format!"
            }
          />
          <Input
            label="Password"
            name="password"
            type="password"
            handleFormChange={handleFormChange}
            value={formDetail.password}
            error={errorArray.includes("password") ? true : false}
            message={
              errorArray.includes("password")
                ? "Please enter your password!"
                : ""
            }
          />
          <Input
            label="Confirm Password"
            name="password_confirm"
            type="password"
            handleFormChange={handleFormChange}
            value={formDetail.password_confirm}
            error={errorArray.includes("password_confirm") ? true : false}
            message={
              !errorPassword
                ? errorArray.includes("password_confirm")
                  ? "Please confirm your password!"
                  : ""
                : "Password needs to be the same"
            }
          />
          <div className="sign-up__button">
            <Button variant="outlined" color="error" onClick={handleClearForm}>
              Clear
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};
export default SignUpPage;
