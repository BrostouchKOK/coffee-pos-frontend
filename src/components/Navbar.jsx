import { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaBars,
  FaUser,
  FaKey,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationDropdown from "../components/common/NotificationDropdown";
import { getLowStockProducts } from "../api/dashboardApi";

const Navbar = ({ setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileRef = useRef();
  const notificationRef = useRef();

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ============================
  // Page Titles
  // ============================

  const titles = {
    "/": "Dashboard",
    "/pos": "Point of Sale",
    "/orders": "Orders",
    "/categories": "Categories",
    "/products": "Products",
    "/users": "Users",
    "/reports": "Reports",
    "/settings": "Settings",
    "/profile": "Profile",
    "/change-password": "Change Password",
  };

  const pageTitle = titles[location.pathname] || "Coffee POS";

  // ============================
  // Load Notifications
  // ============================

  const loadNotifications = async () => {
    try {
      const res = await getLowStockProducts();
      setNotifications(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // ============================
  // Close dropdowns on outside click
  // ============================

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ============================
  // Logout
  // ============================

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-30 bg-white shadow px-4 md:px-6 py-4 flex justify-between items-center">
      {/* Left */}

      <div className="flex items-center gap-4">
        <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
          <FaBars size={22} />
        </button>

        <h1 className="text-xl md:text-2xl font-bold">{pageTitle}</h1>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">
        {/* Notification */}

        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <FaBell size={20} />

            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <NotificationDropdown
              products={notifications}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        {/* Profile */}

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2"
          >
            <FaUserCircle size={32} />

            <span className="hidden sm:block">{user?.username}</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border overflow-hidden">
              <div className="px-4 py-3 border-b">
                <p className="font-semibold">{user?.username}</p>

                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left"
              >
                <FaUser />
                Profile
              </button>

              <button
                onClick={() => {
                  navigate("/change-password");
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left"
              >
                <FaKey />
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-left"
              >
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
