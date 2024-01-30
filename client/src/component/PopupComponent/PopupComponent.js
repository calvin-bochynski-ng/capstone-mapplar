import { useEffect, useState } from "react";
import "./PopupComponent.scss";
import { Popup } from "react-map-gl";
import axios from "axios";
const PopupComponent = ({ popupInfo, setPopupInfo, handleClick }) => {
  const [imageList, setImageList] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (popupInfo) {
      const fetchImageList = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/site/${popupInfo.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImageList(response.data);
      };
      fetchImageList();
    }
  }, [popupInfo]);

  if (!popupInfo || !imageList) {
    return <p>loading...</p>;
  }

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
        <section className="popup__img-container">
          {imageList.map((image) => {
            return (
              <img
                src={image.image_link}
                alt=""
                className="popup__img"
                key={image.id}
              />
            );
          })}
        </section>
        <button
          className="popup__button"
          onClick={() => {
            handleClick(popupInfo);
          }}
        >
          Select Site
        </button>
      </Popup>
    )
  );
};
export default PopupComponent;
