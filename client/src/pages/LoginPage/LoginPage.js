import "./LoginPage.scss";
import Input from "../../component/Input/Input";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const [formDetail, setFormDetail] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (event) => {
    setFormDetail({ ...formDetail, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submittedForm = {
      username: formDetail.username,
      password: formDetail.password,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/login`,
        submittedForm
      );

      sessionStorage.setItem("token", response.data.token);
      setIsToken(true);
      navigate("/social");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <h1>Log In</h1>
      <form className="sign-up" onSubmit={handleSubmit}>
        <Input
          label="Username"
          name="username"
          type="text"
          handleFormChange={handleFormChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          handleFormChange={handleFormChange}
        />
        <button>Submit</button>
      </form>
    </main>
  );
};
export default LoginPage;
