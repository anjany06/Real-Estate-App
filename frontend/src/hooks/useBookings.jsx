import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { getAllBookings } from "../utils/api";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allBookings",
    queryFn: () => getAllBookings(user?.email, userDetails.token),
    onSuccess: (data) => {
      setUserDetails((prev) => ({ ...prev, bookings: data }));
      //bug of data fails on reloading
    },
    enabled: user !== undefined,
    staleTime: 30000,
    keepPreviousData: true,
  });

  queryRef.current = refetch;
  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useBookings;
