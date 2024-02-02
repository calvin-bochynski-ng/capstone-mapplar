import "./SocialPage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Upload from "../../component/Upload/Upload";
import Post from "../../component/Post/Post";

const SocialPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsToken(false);
      navigate("/");
    }
  }, []);

  return (
    <main>
      <Upload setIsUpdate={setIsUpdate} />
      <Post isUpdate={isUpdate} />
    </main>
  );
};
export default SocialPage;
