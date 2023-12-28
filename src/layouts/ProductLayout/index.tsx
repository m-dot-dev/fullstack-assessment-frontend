import React from "react";
import { Outlet } from "react-router-dom";
import ProductLayoutHeader from "./ProductLayoutHeader";

const ProductLayout: React.FC = () => {
  return (
    <>
      <ProductLayoutHeader/>
      <Outlet />
      <div>Footer</div>
    </>
  );
};

export default ProductLayout;
