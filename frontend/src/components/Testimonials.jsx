import React from "react";
import user1 from "../assets/testimonials/user1.png";
import user2 from "../assets/testimonials/user2.png";

import { FaStar, FaCheck } from "react-icons/fa6";

import property1 from "../assets/img1.png";
import property2 from "../assets/img2.png";
import property3 from "../assets/img3.png";
import property4 from "../assets/img4.png";

const Testimonials = () => {
  return (
    <section className="max-padd-container bg-white py-16 xl:pt-28">
      {/* CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_5fr] gap-20 mb-16 rounded-2xl">
        {/* LEFT SIDE */}
        <div className="flex items-start justify-between flex-col gap-10">
          <h2 className="h2">Customer feedback and experiences</h2>
          <div className="flex flex-col gap-1 bg-white p-2 rounded ring-1 ring-slate-900/5">
            <div className="flex text-secondary gap-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="medium-14">
              Showing 1-2 out of <b>2k reviews</b>
            </div>
          </div>
        </div>
        {/* RIGHT - SIDE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {/* TESTIMONIAL CARD */}
          <div className="rounded-lg p-4 bg-white ring-1 ring-slate-900/5">
            <div className="flexBetween">
              <div className="flexCenter gap-x-2">
                <img
                  src={user1}
                  alt="userImg"
                  height={44}
                  width={44}
                  className="rounded-full"
                />
                <h5 className="bold-14">John Doe</h5>
              </div>
              <div className="bg-secondary text-white rounded-full flexCenter gap-x-2 p-1 px-2 text-xs font-semibold">
                <FaCheck />
                Verified
              </div>
            </div>
            <hr className="h-[1px] w-full my-2" />
            <div className="flex gap-x-1 text-secondary mt-5 mb-1 text-xs">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h4 className="h4">High Quality</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
              harum consequuntur tenetur ipsam vel quam aperiam repudiandae odit
              distinctio error?Lorem ipsum dolor, sit amet consectetur
              adipisicing.
            </p>
            <div className="flex gap-x-1 mt-5">
              <img
                src={property1}
                alt=""
                height={44}
                width={44}
                className="rounded aspect-square object-cover"
              />
              <img
                src={property2}
                alt=""
                height={44}
                width={44}
                className="rounded aspect-square object-cover"
              />
            </div>
          </div>

          <div className="rounded-lg p-4 bg-white ring-1 ring-slate-900/5">
            <div className="flexBetween">
              <div className="flexCenter gap-x-2">
                <img
                  src={user2}
                  alt="userImg"
                  height={44}
                  width={44}
                  className="rounded-full"
                />
                <h5 className="bold-14">Izabella Stress</h5>
              </div>
              <div className="bg-secondary text-white rounded-full flexCenter gap-x-2 p-1 px-2 text-xs font-semibold">
                <FaCheck />
                Verified
              </div>
            </div>
            <hr className="h-[1px] w-full my-2" />
            <div className="flex gap-x-1 text-secondary mt-5 mb-1 text-xs">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h4 className="h4">Modern Design</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
              harum consequuntur tenetur ipsam vel quam aperiam repudiandae odit
              distinctio error?Lorem ipsum dolor, sit amet consectetur
              adipisicing.
            </p>
            <div className="flex gap-x-1 mt-5">
              <img
                src={property3}
                alt=""
                height={44}
                width={44}
                className="rounded aspect-square object-cover"
              />
              <img
                src={property4}
                alt=""
                height={44}
                width={44}
                className="rounded aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
