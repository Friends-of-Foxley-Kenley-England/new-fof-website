import { memo } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import MapPin from "./map-pin";
import {
  Map as MapLibre,
  Marker,
  NavigationControl,
} from "react-map-gl/maplibre";
import { centreOfFoxleyWood } from "../../helpers/parse-meeting-point";
import * as style from "./location-map.module.css";

const LocationMap = ({
  pinColour = "red",
  markerLatitude = centreOfFoxleyWood.latitude,
  markerLongitude = centreOfFoxleyWood.longitude,
  minZoom = 10,
  maxZoom = 17,
  zoom = 12,
}) => {
  const mapTilerKey = process.env.GATSBY_MAPLIBRE_API_KEY;

  if (!mapTilerKey) {
    console.error(
      "GATSBY_MAPLIBRE_API_KEY is not defined, so didn't load the map",
    );
    return null;
  }

  const mapTilerMap = `https://api.maptiler.com/maps/streets/style.json?key=${mapTilerKey}`;
  return (
    <div className={style.mapContainerPadding}>
      <div className={style.mapContainerDimensions}>
        <MapLibre
          initialViewState={{
            longitude: markerLongitude,
            latitude: markerLatitude,
            zoom,
          }}
          minZoom={minZoom}
          maxZoom={maxZoom}
          reuseMaps={true}
          mapStyle={mapTilerMap}>
          <Marker
            longitude={markerLongitude || centreOfFoxleyWood.longitude}
            latitude={markerLatitude || centreOfFoxleyWood.latitude}
            anchor="bottom">
            <MapPin color={pinColour} />
          </Marker>
          <NavigationControl />
        </MapLibre>
      </div>
    </div>
  );
};

export default memo(LocationMap);
