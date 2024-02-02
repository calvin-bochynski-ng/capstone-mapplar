import "./AccordionCard.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import axios from "axios";

const AccordionCard = ({ City, Destination, userid, isSearch }) => {
  const [recentItinerary, setRecentItinerary] = useState(null);
  const token = sessionStorage.getItem("token");

  const fetchItinerary = async () => {
    // setRecentItinerary(null);
    try {
      const response = await axios.get(
        !userid
          ? `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/profile/destination/${City}`
          : `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_PORT}/profile/${userid}/destination/${City}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(JSON.parse(response.data.itinerary_description));
      setRecentItinerary(JSON.parse(response.data.itinerary_description));
    } catch (error) {
      setRecentItinerary(null);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, [isSearch]);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {`${City}, ${Destination}`}
      </AccordionSummary>
      <AccordionDetails>
        <section className="accordion-itinerary">
          {!recentItinerary
            ? `They have not traveled to ${City} yet.`
            : recentItinerary.itinerary.days.map((day, index) => {
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
      </AccordionDetails>
    </Accordion>
  );
};
export default AccordionCard;
