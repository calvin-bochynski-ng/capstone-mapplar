import { useEffect } from "react";
import "./Pin.scss";
import axios from "axios";
import { Marker } from "react-map-gl";
import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Pin = ({ setPopupInfo, cityID }) => {
  const [siteList, setSiteList] = useState("");

  useEffect(() => {
    const fetchMarkers = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/destination/${cityID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSiteList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMarkers();
  }, [cityID]);

  if (!siteList) {
    return;
  }

  return siteList.map((site) => {
    return (
      <Marker
        key={site.id}
        longitude={site.longitude}
        latitude={site.latitude}
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setPopupInfo(site);
        }}
      >
        <LocationOnIcon color="primary" fontSize="large" />
      </Marker>
    );
  });
};
export default Pin;
