import React from "react";
import { Avatar, Menu } from "@mantine/core";
const ProfileMenu = ({ user, logout }) => {
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="userImg" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Bookings</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
