import "./PopupComponent.scss";
import { Popup } from "react-map-gl";
const PopupComponent = ({ popupInfo, setPopupInfo }) => {
  return (
    popupInfo && (
      <Popup
        anchor="bottom"
        longitude={Number(popupInfo.longitude)}
        latitude={Number(popupInfo.latitude)}
        onClose={() => setPopupInfo(null)}
      >
        <div className="pop-up">{popupInfo.site_name}</div>
      </Popup>
    )
  );
};
export default PopupComponent;
