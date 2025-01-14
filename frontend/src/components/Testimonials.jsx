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
      <div className="">
        {/* LEFT SIDE */}
        <div>
          <h2>Customer feedback and experiences</h2>
          <div>
            <div>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div>
              Showing 1-2 out of <b>2k reviews</b>
            </div>
          </div>
        </div>
        {/* RIGHT - SIDE */}
        <div>
          {/* TESTIMONIAL CARD */}
          <div>
            <div>
              <div>
                <img
                  src={user1}
                  alt="userImg"
                  height={44}
                  width={44}
                  className="rounded-full"
                />
                <h5>John Doe</h5>
              </div>
              <div>
                <FaCheck />
                Verified
              </div>
            </div>
            <hr />
            <div>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <h4>High Quality</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio
              harum consequuntur tenetur ipsam vel quam aperiam repudiandae odit
              distinctio error?Lorem ipsum dolor, sit amet consectetur
              adipisicing.
            </p>
            <div>
              <img
                src={property1}
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
