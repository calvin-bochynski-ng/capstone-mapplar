import "./ButtonPopup.scss";
import { FaMapPin } from "react-icons/fa";
import { Button } from "@mui/material";

const ButtonPopup = ({ handleSiteSelected, selectedSites }) => {
  return (
    <div className="button-popup">
      <Button variant="contained" onClick={handleSiteSelected}>
        <FaMapPin className="button-popup__icon" />
        {`${selectedSites.length} 
        ${selectedSites.length > 1 ? "Sites" : "Site"} 
        selected! `}
      </Button>
    </div>
  );
};
export default ButtonPopup;
