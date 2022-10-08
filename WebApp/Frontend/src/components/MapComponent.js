import React from "react";
import ReactMapboxGl, { ZoomControl } from "react-mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MBMAPKEY,
});

const MapComponent = ({ coordinates, macAddress, marker, height }) => {
  return (
    <Map
      style={"mapbox://styles/mapbox/streets-v9"}
      containerStyle={{
        height: height,
        width: "100%",
        borderRadius: 10,
      }}
      center={[coordinates.long, coordinates.lat]}
      zoom={[7]}>
      <div className='sidebar'>
        Deivces Location, Hover on marker to check MacAddress of device. Scroll
        in to Zoom
      </div>
      <ZoomControl />

      {marker}
    </Map>
  );
};

export default MapComponent;
