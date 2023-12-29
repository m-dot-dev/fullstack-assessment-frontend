import React from "react";

const FocusArea: React.FC = () => {
  return (
    <div className="relative h-[400px] bg-no-repeat overflow-hidden min-h-40">
      <div className="absolute w-full z-10 flex flex-col text-center items-center h-full justify-center">
        <h1 className="font-[Montserrat] sm:text-[30px] lg:text-[58px] text-[white] pt-0 -mt-10 uppercase mb-8">
          LISTING
        </h1>
        <p className="font-[Lato] md:text-[15px] text-[white] max-w-[1000px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          tellus neque, malesuada sit amet auctor ac, euismod sed enim. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Donec sed ultricies libero. Morbi porttitor semper
          nibh, bibendum ultricies elit mollis id.
        </p>
      </div>
      <div className="w-full h-full -z-10 relative">
        <img
          alt="Home Focus Image"
          src="/home_page_focus_image.png"
          className="w-full h-full z-0 object-cover"
        />
        <div className="absolute inset-0 bg-[#010C29]/40"></div>
      </div>
    </div>
  );
};

export default FocusArea;
