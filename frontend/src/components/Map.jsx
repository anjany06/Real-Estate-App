import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GeoCodeMarker from "./GeoCodeMarker";

const Map = ({ address, city, country }) => {
  return (
    <div
      id="map"
      style={{ height: "400px", width: "100%", border: "1px solid black" }}
    >
      <MapContainer
        center={[53.35, 18.8]}
        zoom={10}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoCodeMarker address={`${address} ${city} ${country}`} />
      </MapContainer>
    </div>
  );
};

export default Map;
