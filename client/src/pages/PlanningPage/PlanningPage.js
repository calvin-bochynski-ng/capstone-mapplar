import "./PlanningPage.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlanningPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsToken(false);
      navigate("/");
    }
  }, []);

  return <div>PlanningPage</div>;
};
export default PlanningPage;
