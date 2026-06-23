import { useState } from "react";
import { FaCoffee, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const loginAdmin = () => {
    login("Admin");
    navigate("/");
  };

  const loginCashier = () => {
    login("Cashier");
    navigate("/pos");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-amber-600 to-orange-700 text-white items-center justify-center p-10">
        <div className="text-center">
          <FaCoffee size={80} className="mx-auto mb-6" />

          <h1 className="text-5xl font-bold mb-4">Coffee POS</h1>

          <p className="text-lg opacity-90 max-w-md">
            Manage products, orders, sales, and staff efficiently with your
            modern coffee shop management system.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center p-6">
        <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">
          <div className="text-center mb-8">
            <FaCoffee size={50} className="mx-auto text-amber-600 mb-3" />

            <h2 className="text-3xl font-bold">Welcome Back</h2>

            <p className="text-gray-500 mt-2">Sign in to continue</p>
          </div>

          {/* Username */}
          <div className="relative mb-4">
            <FaUser className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Username"
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Remember */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-sm text-amber-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Demo Login Buttons */}
          <button
            onClick={loginAdmin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold mb-3 transition"
          >
            Login as Admin
          </button>

          <button
            onClick={loginCashier}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login as Cashier
          </button>

          {/* Demo Credentials */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Demo Accounts
            <br />
            Admin
            <br />
            Cashier
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
