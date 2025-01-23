import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AddPropertyModel from "./AddPropertyModel";
import useAuthCheck from "../hooks/useAuthCheck";

const Navbar = ({ containerStyles }) => {
  const [modelOpened, setModelOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModelOpened(true);
      console.log("Button clicked");
    }
  };
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
      <div onClick={handleAddPropertyClick} className={"py-1 cursor-pointer"}>
        Add Property
      </div>
      <AddPropertyModel opened={modelOpened} setOpened={setModelOpened} />
    </nav>
  );
};

export default Navbar;
