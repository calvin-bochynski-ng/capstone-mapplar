import "./SocialPage.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SocialPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsToken(false);
      navigate("/");
    }
  }, []);

  return <div>SocialPage</div>;
};
export default SocialPage;
