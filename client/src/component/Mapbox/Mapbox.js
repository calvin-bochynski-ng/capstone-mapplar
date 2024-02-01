import "./Mapbox.scss";
import {
  Map,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import Pin from "../Pin/Pin";
import PopupComponent from "../PopupComponent/PopupComponent";
import axios from "axios";
import FlyToCity from "../FlyToCity/FlyToCity";
import FlyToSite from "../FlyToSite/FlyToSite";

const Mapbox = ({
  handleClick,
  setSelectedSites,
  setIsButton,
  selectedCity,
  setSelectedCity,
}) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [destinationList, setDestinationList] = useState(null);
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
        setSelectedCity(response.data[0]);
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
    <>
      <section className="mapbox">
        <div className="mapbox__flyto">
          <h3 className="mapbox__destination-title">
            Choose your destination:
          </h3>
          <section className="mapbox__destination">
            {destinationList.map((destination) => {
              return (
                <article
                  key={destination.id}
                  className="mapbox__radio-container"
                >
                  <input
                    type="radio"
                    name="city"
                    id={destination.id}
                    defaultChecked={destination.city === "London"}
                    onClick={() => {
                      setSelectedCity(destination);
                      setSelectedSites("");
                      setIsButton(false);
                    }}
                  />
                  <label htmlFor={destination.id} className="mapbox__radio">
                    {destination.city}
                  </label>
                </article>
              );
            })}
          </section>
        </div>
        <Map
          mapboxAccessToken={process.env.REACT_APP_ACCESS_TOKEN}
          initialViewState={{
            longitude: -0.137706,
            latitude: 51.513561,
            zoom: 12,
          }}
          mapStyle="mapbox://styles/calvin-bochynski-ng/clrew3z3g00e301pd8lzm0hpx"
        >
          <FlyToCity selectedCity={selectedCity} />
          <NavigationControl position="top-left" />

          <Pin
            setPopupInfo={setPopupInfo}
            cityID={!selectedCity ? "1" : selectedCity.id}
          />
          <FlyToSite popupInfo={popupInfo} />
          <PopupComponent
            popupInfo={popupInfo}
            setPopupInfo={setPopupInfo}
            handleClick={handleClick}
          />
        </Map>
      </section>
    </>
  );
};
export default Mapbox;
