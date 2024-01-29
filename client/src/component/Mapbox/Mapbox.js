import "./Mapbox.scss";
import {
  Map,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  useMap,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState, useRef } from "react";
import Pin from "../Pin/Pin";
import PopupComponent from "../PopupComponent/PopupComponent";
import axios from "axios";
import FlyTo from "../FlyTo/FlyTo";

const Mapbox = () => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [destinationList, setDestinationList] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  console.log(selectedCity);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/destination/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDestinationList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDestination();
  }, []);

  if (!destinationList) {
    return <p>loading...</p>;
  }

  return (
    <section className="mapbox">
      <Map
        mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
        initialViewState={{
          longitude: -0.137706,
          latitude: 51.513561,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/calvin-bochynski-ng/clrew3z3g00e301pd8lzm0hpx"
      >
        <FlyTo selectedCity={selectedCity} />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        <Pin
          setPopupInfo={setPopupInfo}
          cityID={!selectedCity ? "1" : selectedCity.id}
        />
        <PopupComponent popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
      </Map>
      <div className="mapbox__flyto">
        {destinationList.map((destination) => {
          return (
            <article key={destination.id}>
              <input
                type="radio"
                name="city"
                id={destination.id}
                defaultChecked={destination.city === "London"}
                onClick={() => {
                  setSelectedCity(destination);
                  console.log(destination);
                }}
              />
              <label htmlFor={destination.id}>{destination.city}</label>
            </article>
          );
        })}
      </div>
    </section>
  );
};
export default Mapbox;
