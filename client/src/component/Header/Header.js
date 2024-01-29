import "./Header.scss";
import mainLogo from "../../assets/images/logo-text-main.svg";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";

const Header = ({ isToken }) => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={mainLogo} alt="" className="header__logo" />
      </Link>
      <NavBar isToken={isToken} />
    </header>
  );
};
export default Header;
