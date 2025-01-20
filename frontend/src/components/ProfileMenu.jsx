import React from "react";
import { Avatar, Menu } from "@mantine/core";
const ProfileMenu = ({ user, logout }) => {
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="userImg" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Applications</Menu.Label>
        <Menu.Item>Favourites</Menu.Item>
        <Menu.Item>Bookings</Menu.Item>
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
