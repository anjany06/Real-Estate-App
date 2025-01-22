import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import useAuthCheck from "../hooks/useAuthCheck";

const HeartBtn = () => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const handleLike = () => {
    if (validateLogin()) {
      setHeartColor((prev) => (prev === "#8ac243" ? "white" : "#8ac243"));
    }
  };

  return (
    <FaHeart
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
      color={heartColor}
      size={23}
      className="cursor-pointer drop-shadow-sm"
    />
  );
};

export default HeartBtn;
