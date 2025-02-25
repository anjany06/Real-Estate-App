import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar";
import Item from "../components/Item";
import { getAllProperties } from "../utils/api";
import { PuffLoader } from "react-spinners";

const Listing = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProperties();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(
        (property) =>
          (property.title &&
            property.title.toLowerCase().includes(filter.toLowerCase())) ||
          (property.city &&
            property.city.toLowerCase().includes(filter.toLowerCase())) ||
          (property.country &&
            property.country.toLowerCase().includes(filter.toLowerCase()))
      );
      setFilteredProperties(filteredData);
    }
  }, [data, filter]);

  return (
    <main className="my-24">
      <div className="max-padd-container py-10 bg-gradient-to-r from-primary via-white to-white">
        <div>
          <Searchbar filter={filter} setFilter={setFilter} />
          {/* CONTAINER */}
          {data.length > 0 ? (
            filteredProperties.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
                {filteredProperties.map((property) => (
                  <Item key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center mt-10">
                <p className="text-lg text-gray-500">
                  No properties match your search criteria.
                </p>
              </div>
            )
          ) : (
            <div className="h-4 flexCenter">
              <PuffLoader
                height="80"
                width="80"
                radius={1}
                color="#555"
                aria-label="puff-loading"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Listing;
