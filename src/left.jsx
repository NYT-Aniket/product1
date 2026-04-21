import React from "react";

const Left = () => {
  return (
    <div className="relative h-full w-full">

      {/* CONTENT */}
      <div className="
        absolute
        top-[12vh]
        left-1/2
        -translate-x-1/2
        flex flex-col
        gap-4
      ">

        {/* IMAGE */}
        <div className="w-40 h-40 rounded-full overflow-hidden">
          <img
            src="https://thumbs.dreamstime.com/b/square-frame-beautiful-nature-scenery-close-up-dandelion-against-cloudy-blue-sky-white-flower-blooms-amid-green-154769697.jpg"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <h1 className="text-[19px] font-bold text-black leading-tight tracking-wide">
          Aniket Patel,<br />
          Code to understand how{" "}
          <span className="bg-linear-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            things
          </span>{" "}
          work
        </h1>

        {/* LINKS */}
        <div className="flex gap-6 text-black opacity-70 text-lg">
          <a href="#">Projects</a>
          <a href="#">Experience</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>

      </div>
    </div>
  );
};

export default Left;