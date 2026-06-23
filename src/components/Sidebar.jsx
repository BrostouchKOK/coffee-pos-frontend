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
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Products",
      path: "/products",
      icon: <FaBoxOpen />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FaTags />,
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
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="flex items-center gap-2 p-5 border-b border-gray-700">
        <FaCoffee size={30} />
        <h1 className="text-xl font-bold">Coffee POS</h1>
      </div>

      <ul className="mt-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
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
  );
};

export default Sidebar;
