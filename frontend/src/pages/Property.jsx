import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../utils/api";
import { FaHeart, FaLocationDot, FaStar } from "react-icons/fa6";
import {
  MdOutlineBathtub,
  MdOutlineBed,
  MdOutlineGarage,
} from "react-icons/md";
import { CgRuler } from "react-icons/cg";
import Map from "../components/Map";
import useAuthCheck from "../hooks/useAuthCheck";
import BookingModal from "../components/BookingModal";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/UserDetailContext";
import { Button } from "@mantine/core";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import HeartBtn from "../components/HeartBtn";

const Property = () => {
  const [data, setData] = useState();
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const [modelOpened, setModelOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: canceliling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success("Booking Cancelled", {
        position: "bottom-right",
      });
    },
  });

  const fetchData = async () => {
    try {
      const response = await getProperty(id);
      setData((prevData) => {
        return response;
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <section className="max-padd-container my-[99px]">
      {/* IMAGE */}
      <div className="p-2 relative">
        <img
          src={data?.image}
          alt={data?.title}
          className="rounded-tr-3xl rounded-tl-3xl max-h-[27rem] w-full object-cover aspect-square"
        />
        {/* LIKE BIN */}
        <div className="absolute top-8 right-8">
          <HeartBtn />
        </div>
      </div>
      {/* CONTAINER */}
      <div className="xl:flexBetween gap-8">
        {/* LEFT SIDE */}
        <div className="flex-1">
          <p className="flexStart gap-x-2">
            <FaLocationDot />
            <div>
              {data?.address} {data?.city} {data?.country}
            </div>
          </p>
          <div className="flexBetween pt-3">
            <h4 className="bold-20 line-clamp-1">{data?.title}</h4>
            <div className="bold-20">${data?.price}.00</div>
          </div>
          <div className="flexBetween py-1">
            <h5 className="bold-16 my-1 text-secondary">{data?.city}</h5>
            <div className="flex items-baseline gap-2 text-secondary">
              <h4 className="bold-18 relative bottom-0.5 text-black">5.0</h4>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBed />
              {data?.facilities.bedrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBathtub /> {data?.facilities.bedrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineGarage /> {data?.facilities.bedrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <CgRuler />
              400
            </div>
          </div>
          <h4>Property Details</h4>
          <p>{data?.description}</p>
          <div className="flexBetween pt-7">
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  onClick={() => {
                    cancelBooking();
                  }}
                  variant="outline"
                  w={"100%"}
                  color="red"
                  disabled={canceliling}
                >
                  Cancel Booking
                </Button>
                <p className="text-red-500 medium-15 ml-3">
                  You've already Booked visit for{" "}
                  {bookings?.filter((booking) => booking.id === id)[0].date}
                </p>
              </>
            ) : (
              <Button
                onClick={() => {
                  validateLogin() && setModelOpened(true);
                }}
                variant="filled"
                w={"50%"}
                color="black"
              >
                Book Visit
              </Button>
            )}
            <BookingModal
              opened={modelOpened}
              setOpened={setModelOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex-1">
          <Map
            address={data?.address}
            city={data?.city}
            country={data?.country}
          />
        </div>
      </div>
    </section>
  );
};

export default Property;
