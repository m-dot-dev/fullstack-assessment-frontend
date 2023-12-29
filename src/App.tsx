import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductLayout from "./layouts/ProductLayout";
import ProductListings from "./pages/ProductListings";
import Products from "./pages/Products";
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
