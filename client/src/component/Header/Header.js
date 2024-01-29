import "./Header.scss";
import mainLogo from "../../assets/images/logo-text-main.svg";
import NavBar from "../NavBar/NavBar";
const Header = () => {
  return (
    <header>
      <img src={mainLogo} alt="" />
      <NavBar />
    </header>
  );
};
export default Header;
