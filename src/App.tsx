import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Products from "./pages/Products";
import ProductListings from "./pages/ProductListings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product-listing" element={<ProductListings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
