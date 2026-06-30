import { useState } from "react";
import { FaCoffee, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Loading from "../components/common/Loading";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = await login(formData.username, formData.password);

      toast.success("Login successful!");

      if (user.role === "Admin") {
        navigate("/");
      } else {
        navigate("/pos");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading text={"Loading login..."} />;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-amber-600 to-orange-700 text-white items-center justify-center p-10">
        <div className="text-center">
          <FaCoffee size={80} className="mx-auto mb-6" />

          <h1 className="text-5xl font-bold mb-4">Coffee POS</h1>

          <p className="text-lg opacity-90 max-w-md">
            Manage products, orders, sales and staff efficiently.
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}

            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            {/* Password */}

            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-11 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
