import React from "react";
import Hero from "../components/Hero.jsx";

const Home = () => {
  return (
    <main className="mx-auto max-w-[1440px] bg-gradient-to-r from-primary via-white to-white">
      Home Page
      <Hero />
      <Feature />
    </main>
  );
};

export default Home;
