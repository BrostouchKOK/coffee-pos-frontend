import { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaBars,
  FaUser,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-30 bg-white shadow px-4 md:px-6 py-4 flex justify-between items-center">
      {/* Left */}

      <div className="flex items-center gap-4">
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <FaBars size={22} />
        </button>

        <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        <button className="relative">
          <FaBell size={20} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        {/* Profile Dropdown */}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2"
          >
            <FaUserCircle size={32} />

            <span className="hidden sm:block">Admin</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border overflow-hidden">
              <div className="px-4 py-3 border-b">
                <p className="font-semibold">Admin</p>

                <p className="text-sm text-gray-500">admin@gmail.com</p>
              </div>

              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left">
                <FaUser />
                Profile
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left">
                <FaKey />
                Change Password
              </button>

              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-left">
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
