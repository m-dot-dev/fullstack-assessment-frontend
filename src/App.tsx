import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Products from "./pages/Products";
import ProductListings from "./pages/ProductListings";
import ProductLayout from "./layouts/ProductLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductLayout />}>
          <Route path="/" element={<Products />} />
          <Route path="/product-listing" element={<ProductListings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
