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
        <h2 className="popup__title">{popupInfo.site_name}</h2>
        <p className="popup__description">{popupInfo.site_description}</p>
      </Popup>
    )
  );
};
export default PopupComponent;
