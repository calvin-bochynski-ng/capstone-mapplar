import "./SignUpPage.scss";
import { useState } from "react";
import axios from "axios";
import Input from "../../component/Input/Input";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formDetail, setFormDetail] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleFormChange = (event) => {
    setFormDetail({ ...formDetail, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submittedForm = {
      username: formDetail.username,
      first_name: formDetail.first_name,
      last_name: formDetail.last_name,
      phone_number: formDetail.phone_number,
      email: formDetail.email,
      password: formDetail.password,
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/signup`,
        submittedForm
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <h1>Sign Up</h1>
      <form className="sign-up" onSubmit={handleSubmit}>
        <Input
          label="Username: "
          name="username"
          type="text"
          handleFormChange={handleFormChange}
        />
        <Input
          label="First Name: "
          name="first_name"
          type="text"
          handleFormChange={handleFormChange}
        />
        <Input
          label="Last Name: "
          name="last_name"
          type="text"
          handleFormChange={handleFormChange}
        />
        <Input
          label="Phone Number: "
          name="phone_number"
          type="text"
          handleFormChange={handleFormChange}
        />
        <Input
          label="Email: "
          name="email"
          type="text"
          handleFormChange={handleFormChange}
        />
        <Input
          label="Password: "
          name="password"
          type="password"
          handleFormChange={handleFormChange}
        />
        <Input
          label="Confirm Password: "
          name="password_confirm"
          type="password"
          handleFormChange={handleFormChange}
        />
        <button>Submit</button>
      </form>
    </main>
  );
};
export default SignUpPage;
