import * as React from "react";
import { What3wordsMap } from "@what3words/react-components";

const API_KEY = process.env.GATSBY_W3W_API_KEY;
const GOOLE_MAP_API_KEY = process.env.GATSBY_GOOGLE_MAPS_API_KEY;

const Map = () => {
  if (!API_KEY) {
    console.log("Missing W3W API key");
    return null;
  }

  if (!GOOLE_MAP_API_KEY) {
    console.log("Missing Google API key");
    return null;
  }

  return (
    <section id="map-section">
      <h2>Map yar</h2>
      {console.log("What3wordsMap component:", What3wordsMap)}
      <What3wordsMap
        id="w3w-map"
        api_key={API_KEY}
        map_api_key={GOOLE_MAP_API_KEY}
        words="loves.final.needed"
        provider="google"
        // zoom={18}
        // selected_zoom={20}
        map_type_control={true}
        zoom_control={true}
        //   fullscreen_control={true}
        //   fullscreen_control_position={3}
        //   current_location_control_position={9}
        // disable_default_ui={true}
        map_type_id="satellite">
        <div slot="map" id="map" />
      </What3wordsMap>
    </section>
  );
};

export default Map;
