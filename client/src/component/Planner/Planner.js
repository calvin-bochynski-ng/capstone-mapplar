import "./Planner.scss";
import { LiaTimesSolid } from "react-icons/lia";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";

const Planner = ({
  selectedSites,
  setIsItinerary,
  handleSiteClose,
  days,
  setDays,
  setSelectedSites,
  setIsButton,
}) => {
  const handleChange = (event) => {
    setDays(event.target.value);
  };
  const handleClear = () => {
    handleSiteClose();
    setSelectedSites("");
    setIsButton(false);
  };
  if (!selectedSites) {
    return <p>loading...</p>;
  }
  return (
    <section className="planner">
      <LiaTimesSolid className="planner__icons" onClick={handleSiteClose} />
      <div className="planner__container">
        <h1 className="planner__title">Selected Sites</h1>
        {!selectedSites
          ? ""
          : selectedSites.map((site, index) => {
              return (
                <div key={index}>
                  <p className="planner__site-name">{site.site_name}</p>
                </div>
              );
            })}

        <div className="planner__day">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="days">Day</InputLabel>
            <Select
              labelId="days"
              id="days"
              name="days"
              value={days}
              onChange={handleChange}
              label="Day"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="planner__button">
        <Button
          variant="contained"
          onClick={() => {
            setIsItinerary(true);
          }}
        >
          Checkout to Itinerary
        </Button>
        <Button variant="outlined" color="error" onClick={handleClear}>
          Clear all
        </Button>
      </div>
    </section>
  );
};
export default Planner;
