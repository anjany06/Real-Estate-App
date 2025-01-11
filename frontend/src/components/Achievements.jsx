import React from "react";

const Achievements = () => {
  const statistics = [
    {
      label: "Happy Client",
    },
  ];
  return (
    <section>
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
          <div>{statistics}</div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
