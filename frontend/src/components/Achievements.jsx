import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { LiaCertificateSolid } from "react-icons/lia";

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statistics = [
    {
      label: "Happy Clients",
      value: 12,
    },
    {
      label: "Different Clients",
      value: 3,
    },
    {
      label: "Projects Completed",
      value: 45,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;
        const isVisible = top < window.innerHeight - 100;
        setIsVisible(isVisible);
      }
    };
    window.addEventListener("scroll", handleScroll);
    //cleanup function to remove the event Listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section id="about">
      {/* CONTAINER */}
      <div>
        {/* LEFT SIDE */}
        <div>
          <h2>Our Achievements</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
            distinctio ullam vero voluptatem et nulla. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Odio ipsam quae laborum nemo.
          </p>
          {/* STATISTICS CONTAINER */}
          <div>
            {statistics.map((statistic, index) => (
              <div key={index}>
                <div>
                  <CountUp
                    start={isVisible ? 0 : null}
                    end={statistic.value}
                    duration={10}
                    delay={1}
                  >
                    {({ countUpRef }) => (
                      <h3 ref={countUpRef} className="text-5xl font-sans"></h3>
                    )}
                  </CountUp>
                  <h4 className="regular-32">K+</h4>
                </div>
                <p>{statistic.label}</p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Achievements;
