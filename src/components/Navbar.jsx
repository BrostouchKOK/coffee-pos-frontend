import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-5">
        <FaBell size={20} />

        <div className="flex items-center gap-2">
          <FaUserCircle size={30} />
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
