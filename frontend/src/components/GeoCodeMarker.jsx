import React, { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";

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
      try {
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
      } catch (error) {
        console.error(error);
      }
    };

    const esriGeocode = async () => {
      try {
        ELG.geocode()
          .text(address)
          .run((err, results, response) => {
            if (results?.results?.length > 0) {
              const { lat, lng } = results?.results[0].latlng;
              setPosition([lat, lng]);
              map.flyTo([lat, lng], 12);
            }
          });
      } catch (error) {
        console.error(error);
      }
    };

    geocode();
    esriGeocode();
  }, [address, map]);

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
