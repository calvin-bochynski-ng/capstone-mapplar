import "./SocialPage.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Upload from "../../component/Upload/Upload";
import Post from "../../component/Post/Post";
import Profile from "../../component/Profile/Profile";

const SocialPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const { userid } = useParams();
  const token = sessionStorage.getItem("token");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsToken(false);
      navigate("/");
    }
  }, []);

  return (
    <main className="social">
      <section className="social__profile-upload">
        <div className="social__profile">
          <Profile />
        </div>

        <Upload setIsUpdate={setIsUpdate} />
      </section>
      <section className="social__post">
        <Post isUpdate={isUpdate} />
      </section>
    </main>
  );
};
export default SocialPage;
