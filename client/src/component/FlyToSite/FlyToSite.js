import "./FlyToSite.scss";
import { useMap } from "react-map-gl";
const FlyToSite = ({ popupInfo }) => {
  const { current: map } = useMap();

  if (!popupInfo) {
    return;
  }

  map.flyTo({
    center: [popupInfo.longitude, Number(popupInfo.latitude) + 0.01],
    zoom: 13,
  });

  return;
};
export default FlyToSite;
