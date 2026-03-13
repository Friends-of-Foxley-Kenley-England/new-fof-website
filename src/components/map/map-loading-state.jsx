import * as style from "./map.module.css";

const MapLoadingState = () => {
  return (
    <div className={style.mapContainerDimensions}>
      <div className={style.mapLoading}>
        <p>Loading map...</p>
      </div>
    </div>
  );
};

export default MapLoadingState;
