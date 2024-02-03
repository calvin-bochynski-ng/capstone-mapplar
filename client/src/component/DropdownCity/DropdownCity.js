import "./DropdownCity.scss";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DropdownCity = ({
  destinationList,
  setSelectedCity,
  setSelectedSites,
  setIsButton,
}) => {
  const [location, setLocation] = useState("London");

  const handleChange = async (event) => {
    setLocation(event.target.value);
    setSelectedCity(
      destinationList.find(
        (destination) => destination.city === event.target.value
      )
    );
    setSelectedSites("");
    setIsButton(false);
  };
  return (
    <>
      <h3 className="dropdown__destination-title">Choose your destination:</h3>
      <div className="dropdown__destination_select">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="London"
          value={location}
          onChange={handleChange}
        >
          {destinationList.map((destination) => {
            return (
              <MenuItem value={destination.city} key={destination.id}>
                {destination.city}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </>
  );
};
export default DropdownCity;
