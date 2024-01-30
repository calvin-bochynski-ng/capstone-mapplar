import "./FlyToCity.scss";
import { useMap } from "react-map-gl";
const FlyToCity = ({ selectedCity }) => {
  const { current: map } = useMap();

  if (!selectedCity) {
    return;
  }

  map.flyTo({
    center: [selectedCity.longitude, selectedCity.latitude],
    zoom: 12,
    speed: 2,
    curve: 1,
  });

  return;
};
export default FlyToCity;
