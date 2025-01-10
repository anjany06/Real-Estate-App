import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles }) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "active-link py-1" : "py-1")}
      >
        Home
      </NavLink>
      <NavLink
        to={"/listing"}
        className={({ isActive }) => (isActive ? "active-link py-1" : "py-1")}
      >
        Listing
      </NavLink>
      <NavLink
        to={"mailto:anjany.pandey06@gmail.com"}
        className={({ isActive }) => (isActive ? "active-link py-1" : "py-1")}
      >
        Contact
      </NavLink>
      <NavLink
        to={"/add-property"}
        className={({ isActive }) => (isActive ? "active-link py-1" : "py-1")}
      >
        Add Property
      </NavLink>
    </nav>
  );
};

export default Navbar;
