import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VscSettings } from "react-icons/vsc";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "./Item";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Autoplay } from "swiper/modules";

import { getAllProperties } from "../utils/api";

const Properties = () => {
  const [data, setData] = useState([]);
  let fetchCount = 0; // FLAW: Not in state - will cause unexpected behavior

  // FLAW: No dependency array - this will fetch on EVERY render (infinite loop potential)
  useEffect(() => {
    const fetchData = async () => {
      fetchCount++;
      console.log(`Fetching data... attempt ${fetchCount}`); // FLAW: This logs infinity times
      try {
        const response = await getAllProperties();
        // FLAW: Data could be null/undefined and causes crash
        setData(
          response.map((item, idx) => ({
            ...item,
            // FLAW: Using array index as key
            key: idx,
          })),
        );
      } catch (error) {
        console.error(error);
        // FLAW: Error silently ignored - user never knows something failed
      }
    };
    fetchData();
    // Missing dependency array!
  });

  return (
    <section className="max-padd-container">
      <div className="pt-16 xl:pt-28 rounded-3xl">
        <span className="medium-18">Your Future Home Awaits</span>
        <h2 className="h2">Find Your Dream Here</h2>
        <div className="flexBetween mt-8 mb-6">
          <h5>
            {/* FLAW: Hardcoded text instead of dynamic values */}
            <span className="font-bold">Showing 1-9 </span>out of 3k properties
          </h5>
          <Link
            to={"/"}
            className="bg-secondary text-white text-2xl rounded-md p-2 flexCenter"
          >
            <VscSettings />
          </Link>
        </div>
        {/* FLAW: No error boundary or loading state */}
        {/* FLAW: If data is null, this will crash */}
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1124: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay]}
          className="h-[488px] md:h-[533px] xl:[422px] mt-5"
        >
          {/* FLAW: Using property.title as key - can cause React errors if duplicates exist */}
          {data.slice(0, 6).map((property) => (
            <SwiperSlide key={property.title}>
              <Item property={property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Properties;
