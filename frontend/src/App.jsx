import React, { Suspense, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Listing from "./pages/Listing";
import Property from "./pages/Property";
import Favourites from "./pages/Favourites";
import Bookings from "./pages/Bookings";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorBoundary } from "react-error-boundary";
import UserDetailContext from "./context/UserDetailContext";
import { PuffLoader } from "react-spinners";

const App = () => {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <ErrorBoundary
        FallbackComponent={() => <div>Error occurred</div>}
        onError={(error, errorInfo) => console.log(error, errorInfo)}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense
              fallback={
                <div className="h-4 flexCenter">
                  <PuffLoader
                    height="80"
                    width="80"
                    radius={1}
                    color="#555"
                    aria-label="puff-loading"
                  />
                </div>
              }
            >
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/listing">
                    <Route index element={<Listing />} />
                    <Route path=":propertyId" element={<Property />} />
                  </Route>
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/favourites" element={<Favourites />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
          <ToastContainer />
          <ReactQueryDevtools initialsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </UserDetailContext.Provider>
  );
};

export default App;
