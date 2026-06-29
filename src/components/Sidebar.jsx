import { NavLink } from "react-router-dom";
import {
  FaCoffee,
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaCashRegister,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useSettings } from "../context/SettingsContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const { settings } = useSettings();
  const adminMenus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaTachometerAlt />,
    },
    {
      name: "POS",
      path: "/pos",
      icon: <FaCashRegister />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <FaShoppingCart />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FaTags />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <FaBoxOpen />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  const cashierMenus = [
    {
      name: "POS",
      path: "/pos",
      icon: <FaCashRegister />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <FaShoppingCart />,
    },
  ];

  const menuItems = user?.role === "Admin" ? adminMenus : cashierMenus;

  // need to update menuItem

  return (
    <>
      {/* Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <div
        className={`
        fixed lg:relative
        top-0 left-0
        h-screen
        w-64
        bg-gray-900
        text-white
        z-50
        transform
        transition-transform
        duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <div className="flex items-center gap-2">
            {settings?.logo ? (
              <img
                src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${settings?.logo}`}
                alt="Logo"
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <FaCoffee size={28} />
            )}

            <h1 className="text-xl font-bold">
              {settings?.cafeName || "Coffee POS"}
            </h1>
          </div>

          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <ul className="mt-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-3 hover:bg-gray-800 ${
                    isActive ? "bg-gray-800" : ""
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
