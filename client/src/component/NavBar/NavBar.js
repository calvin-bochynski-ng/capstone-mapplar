import { useState } from "react";
import "./NavBar.scss";
import { HiBars3 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = ({ isToken, setIsToken }) => {
  const navigate = useNavigate();
  const [isMenuClick, setIsMenuClick] = useState(false);

  const handleIsClick = () => {
    setIsMenuClick(!isMenuClick);
  };

  const handleSignOut = () => {
    handleIsClick();
    setIsToken(false);
    sessionStorage.removeItem("token");
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
              <NavLink to="/" onClick={handleIsClick} className="nav__link">
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/signup"
                onClick={handleIsClick}
                className="nav__link"
              >
                Sign Up
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/login"
                onClick={handleIsClick}
                className="nav__link"
              >
                Log In
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav__item">
              <NavLink
                to="/social"
                onClick={handleIsClick}
                className="nav__link"
              >
                Social
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/planning"
                onClick={handleIsClick}
                className="nav__link"
              >
                Planning
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to="/profile"
                onClick={handleIsClick}
                className="nav__link"
              >
                Profile
              </NavLink>
            </li>
            <li className="nav__link" onClick={handleSignOut}>
              Sign Out
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
