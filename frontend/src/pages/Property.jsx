import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProperty } from "../utils/api";
import { FaHeart, FaLocationDot } from "react-icons/fa6";

const Property = () => {
  const [data, setData] = useState([]);
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const fetchData = async () => {
    try {
      const response = await getProperty(id);
      setData((prevData) => {
        console.log(response); // Log the data after it has been updated
        return response;
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <section>
      {/* IMAGE */}
      <div className="relative">
        <img
          src={data?.image}
          alt={data?.title}
          className="rounded-tr-3xl rounded-tl-3xl max-h-[27rem] w-full object-cover aspect-square"
        />
        {/* LIKE BIN */}
        <div className="absolute top-8 right-8">
          <FaHeart className="text-white" />
        </div>
      </div>
      {/* CONTAINER */}
      <div>
        {/* LEFT SIDE */}
        <div>
          <p>
            <FaLocationDot />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Property;
