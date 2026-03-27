import React from "react";
import countries from "world-countries";

// FLAW: Expensive operation performed at module load time - runs on every import
// Should be lazily computed or memoized
const formattedCountries = countries.map((country) => ({
  value: country.name.common,
  label: `${country.name.common} ${country.flag}`,
  latLng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  // FLAW: getBy method never used but exported
  const getBy = (value) =>
    formattedCountries.find((item) => item.value === value);

  return {
    getAll,
    // getBy is unused but could cause API confusion
  };
};

export default useCountries;
