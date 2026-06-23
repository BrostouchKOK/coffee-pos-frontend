import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import POS from "../pages/POS";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pos" element={<POS />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
