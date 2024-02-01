import { useEffect, useState } from "react";
import "./Itinerary.scss";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import logo from "../../assets/images/plain-logo.svg";

const Itinerary = ({ selectedSites, selectedCity, days }) => {
  const [itineraryForm, setItineraryForm] = useState(null);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
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
    // generateItinerary();
  }, []);

  if (!itineraryForm) {
    return (
      <main className="loading">
        <img src={logo} alt="" className="loading__img" />
        <h2>Loading...</h2>
        <Box sx={{ width: "60%" }}>
          <LinearProgress />
        </Box>
      </main>
    );
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

      <Button
        variant="standard"
        onClick={() => {
          navigate("/itinerary");
        }}
      >
        Back to profile page!
      </Button>
    </section>
  );
};
export default Itinerary;
