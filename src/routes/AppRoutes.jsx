import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import POS from "../pages/POS";
import Orders from "../pages/Orders";
import Users from "../pages/Users";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/pos" element={<POS />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />

        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
