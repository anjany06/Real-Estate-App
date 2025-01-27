import React from "react";
import { Avatar, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="userImg" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Applications</Menu.Label>
        <Menu.Item onClick={() => navigate("./favourites", { replace: true })}>
          Favourites
        </Menu.Item>
        <Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
          Bookings
        </Menu.Item>
        <Menu.Label>Go back</Menu.Label>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
          color="red"
        >
          logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
