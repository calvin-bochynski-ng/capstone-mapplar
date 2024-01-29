import "./Header.scss";
import mainLogo from "../../assets/images/logo-text-main.svg";
import NavBar from "../NavBar/NavBar";
const Header = () => {
  return (
    <header className="header">
      <img src={mainLogo} alt="" className="header__logo" />
      <NavBar />
    </header>
  );
};
export default Header;
