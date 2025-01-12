import React from "react";
import { FaHeart } from "react-icons/fa6";

const Item = ({ property }) => {
  return (
    <div>
      <div>
        <img
          src={property.image}
          alt={property.title}
          className="h-[13rem] w-full aspect-square object-cover"
        />
        <div>
          <FaHeart />
        </div>
      </div>
    </div>
  );
};

export default Item;
