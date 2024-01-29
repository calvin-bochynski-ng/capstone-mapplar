import { useState } from "react";
import "./NavBar.scss";
import { HiBars3 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const NavBar = () => {
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
      </ul>
    </nav>
  );
};
export default NavBar;
