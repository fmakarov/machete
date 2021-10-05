import React from "react";
import slide1 from "../../images/pexels-ivan-samkov-4491918.jpg";

const Slides = () => {
  return (
    <section className="bg-gray-100">
      <div
        className="slider"
        style={{
          backgroundImage: `url(${slide1})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        d
      </div>
    </section>
  );
}

export default Slides