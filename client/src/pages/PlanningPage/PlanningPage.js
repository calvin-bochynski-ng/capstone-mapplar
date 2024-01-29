import "./PlanningPage.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mapbox from "../../component/Mapbox/Mapbox";

const PlanningPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsToken(false);
      navigate("/");
    }
  }, []);

  return (
    <main>
      <Mapbox />
    </main>
  );
};
export default PlanningPage;
