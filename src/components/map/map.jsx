// import MapLibre from "react-map-gl/maplibre";
// import * as MapLibre from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import MapPin from "./map-pin";
import {
  Map as MapLibre,
  Marker,
  NavigationControl,
} from "react-map-gl/maplibre";

// const centreOfFoxleyWood = {
//   longitude: -0.1171026,
//   latitude: 51.3306235,
// };

// 51.325829, -0.111118
const centreOfFoxleyWood = {
  //   longitude: -0.1082655,
  //   latitude: 51.3273661,
  longitude: -0.111118,
  latitude: 51.325829,
};

const Map = () => {
  return (
    <MapLibre
      initialViewState={{
        ...centreOfFoxleyWood,

        zoom: 12,
      }}
      minZoom={10}
      maxZoom={16}
      reuseMaps={true}
      zoomControl={true}
      style={{ width: "100%", height: 400 }}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=fgW3kC6fuhUS7Y08vzoJ">
      <Marker
        longitude={centreOfFoxleyWood.longitude}
        latitude={centreOfFoxleyWood.latitude}
        anchor="bottom">
        <MapPin color="red" />
      </Marker>
      <NavigationControl />
    </MapLibre>
  );
};

export default Map;
