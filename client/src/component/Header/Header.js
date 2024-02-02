import "./Header.scss";
import mainLogo from "../../assets/images/logo-text-main.svg";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";

const Header = ({ isToken, setIsToken }) => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to={!isToken ? "/" : "/social"} className="header__logo">
          <img src={mainLogo} alt="" className="header__logo" />
        </Link>
        <NavBar isToken={isToken} setIsToken={setIsToken} />
      </div>
    </header>
  );
};
export default Header;
