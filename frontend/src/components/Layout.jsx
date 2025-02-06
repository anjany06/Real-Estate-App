import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../utils/api";
import useFavourites from "../hooks/useFavourites";
import useBookings from "../hooks/useBookings";

const Layout = () => {
  useFavourites();
  useBookings();

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      try {
        const res = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://zenhomes-backend-lyart.vercel.app",
            scope: "openid profile email",
          },
        });
        localStorage.setItem("access_token", res);
        setUserDetails((prev) => ({
          ...prev,
          token: res,
        }));
        mutate(res);
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      getTokenAndRegister();
    }
  }, [isAuthenticated]);
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
