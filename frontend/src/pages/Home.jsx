import React from "react";
import Hero from "../components/Hero.jsx";
import Feature from "../components/Feature.jsx";
import Achievements from "../components/Achievements.jsx";
import Properties from "../components/Properties.jsx";
import About from "../components/About.jsx";
import Testimonials from "../components/Testimonials.jsx";

const Home = () => {
  return (
    <main className="mx-auto max-w-[1440px] bg-gradient-to-r from-primary via-white to-white">
      <Hero />
      <Feature />
      <Achievements />
      <Properties />
      <About />
      <Testimonials />
    </main>
  );
};

export default Home;
