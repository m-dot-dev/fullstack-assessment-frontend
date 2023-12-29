import React from "react";
import { Outlet } from "react-router-dom";
import ProductLayoutHeader from "./ProductLayoutHeader";

const ProductLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ProductLayoutHeader />
      <Outlet />
      <div className="bg-[#010C29] w-full h-full text-white text-center flex-1 items-center flex justify-center">
        © 2023 Imperial Locum. All rights reserved.{" "}
      </div>
    </div>
  );
};

export default ProductLayout;
