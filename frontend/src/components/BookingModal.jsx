import React from "react";
import { Modal } from "@mantine/core";
const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  return (
    <Modal
      opened={opened}
      setOpened={setOpened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
      zIndex={1000}
    >
      <div>
        <span>Booking modal is here</span>
      </div>
    </Modal>
  );
};

export default BookingModal;
