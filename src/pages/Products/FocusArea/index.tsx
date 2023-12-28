import React from "react";

const FocusArea: React.FC = () => {
  return (
    <div className="relative h-full">
      <div className="absolute w-full z-10 flex flex-col text-center items-center h-full justify-center -mt-4">
        <h1 className="font-[Montserrat] md:text-[58px]  text-[white] pb-0 mb-0 uppercase">
          Solutions that Inspire,
        </h1>
        <h1 className="font-[Montserrat] md:text-[58px] text-[white] pt-0 -mt-4 uppercase mb-20">
          Products that Deliver
        </h1>
        <p className="font-[Lato] md:text-[15px] text-[white] max-w-[1000px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          tellus neque, malesuada sit amet auctor ac, euismod sed enim. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Donec sed ultricies libero. Morbi porttitor semper
          nibh, bibendum ultricies elit mollis id.
        </p>
      </div>
      <div
        className="w-full -z-10 relative"
        style={{ clipPath: "ellipse(100% 95% at top)" }}
      >
        <img
          alt="Home Focus Image"
          src="/home_page_focus_image.png"
          className="w-full h-full z-0 "
        />
        <div className="absolute inset-0 bg-[#010C29]/50"></div>
      </div>
    </div>
  );
};

export default FocusArea;
