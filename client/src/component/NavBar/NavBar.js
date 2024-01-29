import { useState } from "react";
import "./NavBar.scss";
import { HiBars3 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ isToken, setIsToken }) => {
  const navigate = useNavigate();
  const [isMenuClick, setIsMenuClick] = useState(false);

  const handleIsClick = () => {
    setIsMenuClick(!isMenuClick);
  };

  const handleSignOut = () => {
    handleIsClick();
    sessionStorage.removeItem("token");
    setIsToken(false);
    navigate("/");
  };

  return (
    <nav className="nav">
      {!isMenuClick ? (
        <HiBars3 onClick={handleIsClick} className="nav__icons" />
      ) : (
        <LiaTimesSolid onClick={handleIsClick} className="nav__icons" />
      )}
      <ul className={`nav__list ${isMenuClick ? "nav__list--active" : ""}`}>
        {!isToken ? (
          <>
            <li className="nav__item">
              <Link to="/" onClick={handleIsClick}>
                Home
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/signup" onClick={handleIsClick}>
                Sign Up
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/login" onClick={handleIsClick}>
                Log In
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav__item">
              <Link to="/social" onClick={handleIsClick}>
                Social
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/planning" onClick={handleIsClick}>
                Planning
              </Link>
            </li>
            <li className="nav__item">
              <Link to="/itinerary" onClick={handleIsClick}>
                Profile
              </Link>
            </li>
            <li className="nav__item" onClick={handleSignOut}>
              Sign Out
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
