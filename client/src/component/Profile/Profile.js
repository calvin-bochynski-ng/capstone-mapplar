import { useEffect, useState } from "react";
import "./Profile.scss";
import axios from "axios";

const Profile = ({ userid, isSearch }) => {
  const [profileDetail, setProfileDetail] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          !userid
            ? `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/profile/`
            : `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/profile/${userid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [isSearch]);

  if (!profileDetail) {
    return <p>loading...</p>;
  }
  return (
    <section className="profile">
      <img
        src={profileDetail.avatar}
        alt={profileDetail.username}
        className="profile__img"
      />
      <h2 className="profile__username">{profileDetail.username}</h2>
    </section>
  );
};
export default Profile;
