import { useState } from "react";
import "./NavBar.scss";
import { HiBars3 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";

const NavBar = () => {
  const [isMenuClick, setIsMenuClick] = useState(false);

  const handleIsClick = () => {
    setIsMenuClick(!isMenuClick);
    // console.log(isMenuClick, true);
  };

  return (
    <nav>
      {!isMenuClick ? (
        <HiBars3 onClick={handleIsClick} />
      ) : (
        <LiaTimesSolid onClick={handleIsClick} />
      )}
      <ul>
        <li>Home</li>
        <li>Sign Up</li>
        <li>Log In</li>
      </ul>
    </nav>
  );
};
export default NavBar;
