import React from "react";
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";
import { FaScreenpal, FaUpDown } from "react-icons/fa6";
import {
  FaEnvelope,
  FaInbox,
  FaList,
  FaMap,
  FaMapMarkedAlt,
  FaUser,
} from "react-icons/fa";

const About = () => {
  return (
    <section className="max-padd-container pb-16 xl:pb-28">
      <div className="flex items-center flex-col lg:flex-row gap-8">
        {/* IMAGE - LEFT SIDE */}
        <div className="flex-1">
          <div className="relative">
            <img src={about1} alt="" className="rounded-3xl" />
            <span className="absolute top-8 left-8 bg-white px-2 rounded-full medium-14">
              San Francisco
            </span>
          </div>
        </div>
        {/* INFO RIGHT SIDE */}
        <div className="flex-1">
          <h2 className="h2">
            Empowering You to Find Your Dream Home, Effortlessly
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
            iusto laborum nisi doloremque officiis mollitia, deserunt repellat
            aliquam quia odit.
          </p>
          <div className="flex flex-col gap-6 mt-5">
            <div className="flex gap-3">
              <FaScreenpal className="text-secondary" />
              <p>Virtual property tours and viewings</p>
            </div>
            <div className="flex gap-3">
              <FaUpDown className="text-secondary" />
              <p>Real-time market price updates</p>
            </div>
            <div className="flex gap-3">
              <FaMap className="text-secondary" />
              <p>Interactive floor plans and maps</p>
            </div>
            <div className="flex gap-3">
              <FaMapMarkedAlt className="text-secondary" />
              <p>Access to off-market properties</p>
            </div>
            <div className="flex gap-3">
              <FaEnvelope className="text-secondary" />
              <p>Direct messaging with agents and owwners</p>
            </div>
          </div>
        </div>
      </div>
      {/* SECOND CONTAINER */}
      <div className="flex items-center flex-col lg:flex-row gap-8 mt-36">
        {/* INFO LEFT SIDE */}
        <div className="flex-1">
          <h2 className="h2">
            Simplifying Your Real Estate Journey Every Step of the Way
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
            iusto laborum nisi doloremque officiis mollitia, deserunt repellat
            aliquam quia odit.
          </p>
          <div className="flex flex-col gap-6 mt-5">
            <div className="flex gap-3">
              <FaList className="text-secondary" />
              <p>In-app scheduling for property viewing</p>
            </div>
            <div className="flex gap-3">
              <FaUpDown className="text-secondary" />
              <p>Real-time market price updates</p>
            </div>
            <div className="flex gap-3">
              <FaInbox className="text-secondary" />
              <p>User friendly interfaces for smooth navigation</p>
            </div>
            <div className="flex gap-3">
              <FaUser className="text-secondary" />
              <p>Detailed agent and realtor profiles</p>
            </div>
            <div className="flex gap-3">
              <FaMapMarkedAlt className="text-secondary" />
              <p>Access to off-market properties</p>
            </div>
          </div>
        </div>
        {/* IMAGE - RIGHT SIDE */}
        <div className="flex-1">
          <div className="relative flex justify-end">
            <img src={about2} alt="" className="rounded-3xl" />
            <span className="absolute top-8 right-8 bg-white px-2 rounded-full medium-14">
              GOLDEN COAST
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
