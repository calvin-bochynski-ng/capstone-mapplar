import "./FlyTo.scss";
import { useMap } from "react-map-gl";
const FlyTo = ({ selectedCity }) => {
  const { current: map } = useMap();

  if (!selectedCity) {
    return;
  }
  map.flyTo({ center: [selectedCity.longitude, selectedCity.latitude] });

  return;
};
export default FlyTo;
