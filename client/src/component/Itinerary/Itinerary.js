import { useEffect, useState } from "react";
import "./Itinerary.scss";
import axios from "axios";
const Itinerary = ({ selectedSites, selectedCity, days }) => {
  const [itineraryForm, setItineraryForm] = useState(null);
  const token = sessionStorage.getItem("token");
  let siteList = selectedSites.map((site) => site.site_name);

  const generateItinerary = async () => {
    const itineraryDetail = {
      days: days,
      city: selectedCity.city,
      site: siteList,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/itinerary`,
      itineraryDetail,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setItineraryForm(JSON.parse(response.data.itinerary_description));
  };

  useEffect(() => {
    generateItinerary();
  }, []);

  if (!itineraryForm) {
    return <p>Loading...</p>;
  }

  return (
    <section className="itinerary">
      <h1 className="itinerary__title">{`${itineraryForm.itinerary.description}!!`}</h1>
      {itineraryForm.itinerary.days.map((day, index) => {
        return (
          <div key={index}>
            <h2>{`${day.description}`}</h2>
            <p>{`Morning: ${day.morning}`}</p>
            <p>{`Afternoon: ${day.afternoon}`}</p>
            <p>{`Evening: ${day.evening}`}</p>
          </div>
        );
      })}
    </section>
  );
};
export default Itinerary;
