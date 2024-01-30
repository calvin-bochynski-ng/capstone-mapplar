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
import FlyToCity from "../FlyToCity/FlyToCity";
import FlyToSite from "../FlyToSite/FlyToSite";

const Mapbox = () => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [destinationList, setDestinationList] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const token = sessionStorage.getItem("token");

  const [selectedSites, setSelectedSites] = useState("");

  const handleClick = (site) => {
    const selectedList = [...selectedSites, site].filter(
      (item, index) => [...selectedSites, site].indexOf(item) === index
    );
    setSelectedSites(selectedList);
  };

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
    <main>
      <section className="mapbox">
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
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />

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
                    setSelectedSites("");
                  }}
                />
                <label htmlFor={destination.id}>{destination.city}</label>
              </article>
            );
          })}
        </div>
      </section>
      <section>
        <h1>Selected Sites</h1>
        {!selectedSites
          ? ""
          : selectedSites.map((site, index) => {
              return (
                <div key={index}>
                  <p>{site.site_name}</p>
                </div>
              );
            })}
      </section>
    </main>
  );
};
export default Mapbox;
