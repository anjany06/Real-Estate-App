import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Listing from "./pages/Listing";
import Property from "./pages/Property";
import Favourites from "./pages/Favourites";
import Bookings from "./pages/Bookings";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
  );
};

export default App;
