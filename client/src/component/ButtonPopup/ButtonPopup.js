import "./ButtonPopup.scss";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
const ButtonPopup = ({ handleSiteSelected }) => {
  return (
    <div className="button-popup" onClick={handleSiteSelected}>
      <h3 className="button-popup__title">
        Go to Selected Sites! <FaRegArrowAltCircleUp />
      </h3>
    </div>
  );
};
export default ButtonPopup;
