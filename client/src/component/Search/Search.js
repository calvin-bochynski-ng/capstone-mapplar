import "./Search.scss";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = ({ setIsSearch }) => {
  const [searchDetail, setSearchDetail] = useState("");
  const [foundProfile, setFoundProfile] = useState(null);
  const token = sessionStorage.getItem("token");

  const handleChange = (event) => {
    setSearchDetail(event.target.value);
  };

  const handleClick = () => {
    setSearchDetail("");
    setIsSearch(true);
  };

  useEffect(() => {
    if (searchDetail) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/search/${searchDetail}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setFoundProfile(response.data);
          setIsSearch(false);
        } catch (error) {
          // console.log({ message: error });
        }
      };
      fetchProfile();
    }
  }, [searchDetail]);

  return (
    <div className="search-container">
      <TextField
        id="search"
        name="search"
        label="search"
        variant="outlined"
        fullWidth
        onChange={handleChange}
        value={searchDetail}
      />
      {!foundProfile ? (
        ""
      ) : !searchDetail ? (
        ""
      ) : (
        <Link
          to={`/profile/${foundProfile.id}`}
          className="search"
          onClick={handleClick}
        >
          <img
            src={foundProfile.avatar}
            alt={`${foundProfile.avatar}'s avatar`}
            className="search__img"
          />
          <p className="search__username">{foundProfile.username}</p>
        </Link>
      )}
    </div>
  );
};
export default Search;
