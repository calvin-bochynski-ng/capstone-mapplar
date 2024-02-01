import "./ProfilePage.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ItineraryPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsToken(false);
      navigate("/");
    }
  }, []);

  return <h1>Profile Page</h1>;
};
export default ItineraryPage;
