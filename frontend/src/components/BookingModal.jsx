import React, { useContext, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../context/UserDetailContext";
import { bookVisit } from "../utils/api";
import { toast } from "react-toastify";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked the visit", {
      position: "bottom-right",
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError:
      () =>
      ({ response }) =>
        toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });
  return (
    <Modal
      opened={opened}
      title="Select Your date of visit"
      onClose={() => setOpened(false)}
      centered
      zIndex={1000}
    >
      <div className="flexCenter flex-col gap-4">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
