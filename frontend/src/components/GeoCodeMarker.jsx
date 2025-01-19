import React, { useState } from "react";
import { DefaultContext } from "react-icons";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCodeMarker = () => {
  const map = useMap();
  const [positon, setPosition] = useState([60, 19]);
  return (
    <Marker positon={positon} icon={DefaultIcon}>
      <Popup />
    </Marker>
  );
};

export default GeoCodeMarker;
