import "./PlanningPage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mapbox from "../../component/Mapbox/Mapbox";
import Planner from "../../component/Planner/Planner";
import ButtonPopup from "../../component/ButtonPopup/ButtonPopup";
import Itinerary from "../../component/Itinerary/Itinerary";

const PlanningPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [selectedSites, setSelectedSites] = useState("");
  const [isPlannerClick, setIsPlannerClick] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [isItineary, setIsItinerary] = useState(false);

  const handleClick = (site) => {
    const selectedList = [...selectedSites, site].filter(
      (item, index) => [...selectedSites, site].indexOf(item) === index
    );
    setSelectedSites(selectedList);
    setIsButton(true);
  };

  const handleSiteSelected = () => {
    setIsPlannerClick(!isPlannerClick);
    setIsButton(false);
  };

  useEffect(() => {
    if (!token) {
      setIsToken(false);
      navigate("/");
    }
  }, []);

  return (
    <main className="planning">
      <Mapbox handleClick={handleClick} setSelectedSites={setSelectedSites} />
      {!isButton ? "" : <ButtonPopup handleSiteSelected={handleSiteSelected} />}

      {!isPlannerClick ? (
        ""
      ) : !isItineary ? (
        <Planner
          selectedSites={selectedSites}
          setIsItinerary={setIsItinerary}
        />
      ) : (
        <Itinerary selectedSites={selectedSites} />
      )}
    </main>
  );
};
export default PlanningPage;
