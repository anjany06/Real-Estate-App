import React, { useState, useEffect } from "react";
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

const GeoCodeMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const geocode = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        setPosition([lat, lon]);
      } else {
        console.log("No geocoding results found");
      }
    };
    geocode();
  }, [address]);

  if (!position) {
    return null;
  }

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup />
    </Marker>
  );
};

export default GeoCodeMarker;
