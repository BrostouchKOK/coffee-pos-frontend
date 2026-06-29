import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import POS from "../pages/POS";
import Orders from "../pages/Orders";
import Users from "../pages/Users";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";

import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

const LoginRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (user) {
    return <Navigate to={user.role === "Admin" ? "/" : "/pos"} replace />;
  }

  return <Login />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginRoute />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* Categories */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Categories />
            </ProtectedRoute>
          }
        />

        {/* Users */}
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* POS */}
        <Route
          path="/pos"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
              <POS />
            </ProtectedRoute>
          }
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Cashier"]}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
