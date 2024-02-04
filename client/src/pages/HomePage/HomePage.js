import "./HomePage.scss";
import heroPhone from "../../assets/images/hero-phone.svg";
import heroTablet from "../../assets/images/hero-tablet.svg";
import heroDesktop from "../../assets/images/hero-desktop.svg";
import { Button } from "@mui/material";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup");
  };
  return (
    <main className="hero">
      <img src={heroPhone} alt="hero" className="hero__img hero__img--phone" />
      <img
        src={heroTablet}
        alt="hero"
        className="hero__img hero__img--tablet"
      />
      <img
        src={heroDesktop}
        alt="hero"
        className="hero__img hero__img--desktop"
      />

      <div className="hero__container">
        <h1 className="hero__title">Mapplar</h1>
        <p className="hero__slogan">
          Where every unforgettable journey begins and memories are made, craft
          your perfect itinerary, <strong>every time</strong>!
        </p>
        <div className="hero__button">
          <Button
            variant="contained"
            endIcon={<FollowTheSignsIcon />}
            onClick={handleClick}
          >
            Sign up!
          </Button>
        </div>
      </div>
    </main>
  );
};
export default HomePage;
