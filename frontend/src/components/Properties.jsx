import React from "react";
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
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { PROPERTIES } from "../constant/data";

const Properties = () => {
  return (
    <section>
      <div>
        <span>Your Future Home Awaits</span>
        <h2>Find Your Dream Here</h2>
        <div>
          <h5>
            <span>Showing 1-9</span>out of 3k properties
          </h5>
          <Link to={"/"}>
            <VscSettings />
          </Link>
        </div>
        {/* CONTAINER */}
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 3000,
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
          {PROPERTIES.slice(0, 6).map((property) => (
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
