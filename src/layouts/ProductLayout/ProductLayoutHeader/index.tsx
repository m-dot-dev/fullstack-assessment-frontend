import React from "react";
import { useNavigate } from "react-router-dom";

const ProductLayoutHeader: React.FC = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  return (
    <div className="h-16 bg-[#942D3B] flex justify-center ">
      <div className="h-full max-w-[1600px] flex justify-between w-full ml-10 ">
        <div className="text-[30px] font-[Lato] font-bold text-[white] mt-2.5">
          LOGO
        </div>
        <div className="flex w-[200px] justify-between mr-10  font-[Lato] font-[14px] text-[white]">
          <button
            onClick={() => navigate("/")}
            className={currentPath === "/" ? "border-b-2 border-[white]" : ""}
          >
            Home
          </button>
          <button
            className={
              currentPath === "/product-listing"
                ? "border-b-2 border-[white]"
                : ""
            }
            onClick={() => navigate("/product-listing")}
          >
            Products Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductLayoutHeader;
