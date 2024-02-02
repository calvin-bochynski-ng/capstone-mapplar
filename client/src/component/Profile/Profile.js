import { useEffect, useState } from "react";
import "./Profile.scss";
import axios from "axios";
import { Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

const Profile = ({ userid, isSearch }) => {
  const [profileDetail, setProfileDetail] = useState(null);
  const [friend, setFriend] = useState(false);

  const token = sessionStorage.getItem("token");

  const handleClickFollow = async () => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/follow/`,
      profileDetail,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setFriend(true);
    console.log("friends");
  };

  const handleClickUnFollow = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/follow/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setFriend(false);
    console.log("No Longer friends");
  };

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

    const fetchFollow = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/follow/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.friend_id);

      if (Number(response.data.friend_id) === Number(userid)) {
        setFriend(true);
      }
    };

    fetchProfile();
    fetchFollow();
  }, [isSearch, friend]);

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
      {!userid ? (
        ""
      ) : (
        <div className="profile__follow">
          {!friend ? (
            <Button
              variant="contained"
              startIcon={<PersonAddAlt1Icon />}
              onClick={handleClickFollow}
            >
              Follow Me!
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              startIcon={<PersonRemoveAlt1Icon />}
              onClick={handleClickUnFollow}
            >
              UnFollow me!
            </Button>
          )}
        </div>
      )}
    </section>
  );
};
export default Profile;
