import { useEffect, useState } from "react";
import "./PopupComponent.scss";
import { Popup } from "react-map-gl";
import axios from "axios";
import { Button } from "@mui/material";

const PopupComponent = ({
  popupInfo,
  setPopupInfo,
  handleClick,
  setSiteSelected,
}) => {
  const [imageList, setImageList] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (popupInfo) {
      const fetchImageList = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/siteimage/${popupInfo.id}`,
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
        <div className="popup">
          <h1 className="popup__title">{popupInfo.site_name}</h1>
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
          <Button
            variant="contained"
            onClick={() => {
              handleClick(popupInfo);
            }}
          >
            Select Site
          </Button>
        </div>
      </Popup>
    )
  );
};
export default PopupComponent;
