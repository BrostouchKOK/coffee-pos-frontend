import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import UserTable from "../components/users/UserTable";
import UserModal from "../components/users/UserModal";
import toast from "react-hot-toast";

import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const roles = ["Admin", "Cashier"];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // ===============================
  // Fetch Users
  // ===============================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getUsers();

      setUsers(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Add User
  // ===============================

  const handleAdd = () => {
    setSelectedUser(null);
    setIsOpen(true);
  };

  // ===============================
  // Edit User
  // ===============================

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  // ===============================
  // Save User
  // ===============================

  const handleSave = async (userData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser._id, userData);

        toast.success("User updated successfully!");
      } else {
        await createUser(userData);

        toast.success("User created successfully!");
      }

      await fetchUsers();

      setIsOpen(false);

      setSelectedUser(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // ===============================
  // Delete User
  // ===============================

  const handleDelete = (id) => {
    toast.custom(
      (t) => (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <p className="font-semibold mb-3">Delete this user?</p>

          <div className="flex gap-3">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={async () => {
                try {
                  await deleteUser(id);

                  toast.dismiss(t.id);

                  toast.success("User deleted successfully!");

                  await fetchUsers();
                } catch (error) {
                  toast.error(error.response?.data?.message || "Delete failed");
                }
              }}
            >
              Delete
            </button>

            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      },
    );
  };

  // ===============================
  // Search + Filter
  // ===============================

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRole = selectedRole === "" || user.role === selectedRole;

    return matchSearch && matchRole;
  });

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="relative">
            {/* Outer Spinner */}
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>

            {/* Animated Spinner */}
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-700">
            Loading users...
          </h2>

          <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Users</h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-lg"
        />

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Roles</option>

          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearchTerm("");
            setSelectedRole("");
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Clear
        </button>
      </div>

      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        user={selectedUser}
      />
    </MainLayout>
  );
};

export default Users;
