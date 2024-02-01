import "./SocialPage.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Upload from "../../component/Upload/Upload";

const SocialPage = ({ setIsToken }) => {
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
      <Upload />
    </main>
  );
};
export default SocialPage;
