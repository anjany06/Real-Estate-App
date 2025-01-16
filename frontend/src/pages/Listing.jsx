import React, { useState } from "react";
import Searchbar from "../components/Searchbar";
import useProperties from "../hooks/useProperties";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const Listing = () => {
  const [filter, setFilter] = useState();
  // const { data, isError, isLoading } = useProperties();
  // console.log(data);
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
    getAllProperties,
    { refetchOnWindowFocus: false }
  );
  console.log(data);
  return (
    <main className="my-24">
      <div className="max-padd-container py-10 xl:py-24 bg-gradient-to-r via-white to-white">
        <div>
          <Searchbar filter={filter} setFilter={setFilter} />
          {/* CONTAINER */}
          <div></div>
        </div>
      </div>
    </main>
  );
};

export default Listing;
