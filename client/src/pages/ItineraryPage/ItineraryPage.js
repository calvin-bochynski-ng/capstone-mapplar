import "./ItineraryPage.scss";
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

  return <div>ItineraryPage</div>;
};
export default ItineraryPage;
