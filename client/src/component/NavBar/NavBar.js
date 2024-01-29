import { useState } from "react";
import "./NavBar.scss";
import { HiBars3 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const NavBar = ({ isToken }) => {
  const [isMenuClick, setIsMenuClick] = useState(false);

  const handleIsClick = () => {
    setIsMenuClick(!isMenuClick);
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
          </>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
