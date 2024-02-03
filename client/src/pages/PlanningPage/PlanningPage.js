import "./PlanningPage.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mapbox from "../../component/Mapbox/Mapbox";
import Planner from "../../component/Planner/Planner";
import ButtonPopup from "../../component/ButtonPopup/ButtonPopup";
import Itinerary from "../../component/Itinerary/Itinerary";
import DropdownCity from "../../component/DropdownCity/DropdownCity";

const PlanningPage = ({ setIsToken }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSites, setSelectedSites] = useState("");
  const [isPlannerClick, setIsPlannerClick] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [isItineary, setIsItinerary] = useState(false);
  const [days, setDays] = useState("");
  const [destinationList, setDestinationList] = useState(null);

  const handleClick = (site) => {
    const selectedList = [...selectedSites, site].filter(
      (item, index) => [...selectedSites, site].indexOf(item) === index
    );
    setSelectedSites(selectedList);
    setIsButton(true);
  };

  const handleSiteSelected = () => {
    setIsPlannerClick(true);
    setIsButton(false);
  };

  const handleSiteClose = () => {
    setIsPlannerClick(false);
    setIsButton(true);
  };

  useEffect(() => {
    if (!token) {
      setIsToken(false);
      navigate("/");
    }
  }, []);

  return (
    <main className="planning">
      <Mapbox
        handleClick={handleClick}
        setSelectedSites={setSelectedSites}
        setIsButton={setIsButton}
        setSelectedCity={setSelectedCity}
        selectedCity={selectedCity}
        destinationList={destinationList}
        setDestinationList={setDestinationList}
      />
      {!isButton ? (
        ""
      ) : (
        <ButtonPopup
          handleSiteSelected={handleSiteSelected}
          selectedSites={selectedSites}
        />
      )}

      {!isPlannerClick ? (
        ""
      ) : !isItineary ? (
        <Planner
          handleSiteClose={handleSiteClose}
          selectedSites={selectedSites}
          setIsItinerary={setIsItinerary}
          setSelectedSites={setSelectedSites}
          setDays={setDays}
          days={days}
          setIsButton={setIsButton}
        />
      ) : (
        <Itinerary
          selectedSites={selectedSites}
          days={days}
          selectedCity={selectedCity}
        />
      )}

      <section className="planning__tablet">
        {!isItineary ? (
          <>
            <div className="planning__tablet-dropdown">
              {!destinationList ? (
                ""
              ) : (
                <DropdownCity
                  destinationList={destinationList}
                  setSelectedCity={setSelectedCity}
                  setSelectedSites={setSelectedSites}
                  setIsButton={setIsButton}
                />
              )}
            </div>
            {!selectedCity ? (
              ""
            ) : (
              <Planner
                handleSiteClose={handleSiteClose}
                selectedSites={selectedSites}
                setIsItinerary={setIsItinerary}
                setSelectedSites={setSelectedSites}
                setDays={setDays}
                days={days}
                setIsButton={setIsButton}
                selectedCity={selectedCity}
              />
            )}
          </>
        ) : (
          <Itinerary
            selectedSites={selectedSites}
            days={days}
            selectedCity={selectedCity}
          />
        )}
      </section>
    </main>
  );
};
export default PlanningPage;
