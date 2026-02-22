// import MapLibre from "react-map-gl/maplibre";
// import * as MapLibre from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import MapPin from "./map-pin";
import {
  Map as MapLibre,
  Marker,
  NavigationControl,
} from "react-map-gl/maplibre";
import process from "process";

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
  const mapTilerKey = process?.env?.GATSBY_MAPLIBRE_API_KEY;

  if (!mapTilerKey) {
    console.error(
      "GATSBY_MAPLIBRE_API_KEY is not defined, so didn't load the map",
    );
    return null;
  }

  const mapTilerMap = `https://api.maptiler.com/maps/streets/style.json?key=${mapTilerKey}`;
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
      mapStyle={mapTilerMap}>
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
