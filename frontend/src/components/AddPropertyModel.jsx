import { Modal } from "@mantine/core";
import React from "react";

const AddPropertyModel = ({ opened, setOpened }) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      Add property Model
    </Modal>
  );
};

export default AddPropertyModel;
