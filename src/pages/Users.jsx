import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import UserTable from "../components/users/UserTable";
import UserModal from "../components/users/UserModal";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "admin",
      email: "admin@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      username: "cashier1",
      email: "cashier@gmail.com",
      role: "Cashier",
    },
  ]);

  const roles = ["Admin", "Cashier"];

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedRole, setSelectedRole] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleAdd = () => {
    setSelectedUser(null);

    setIsOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);

    setIsOpen(true);
  };

  const handleSave = (userData) => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                ...userData,
              }
            : user,
        ),
      );

      toast.success("User updated successfully!");
    } else {
      setUsers([
        ...users,

        {
          id: Date.now(),
          ...userData,
        },
      ]);

      toast.success("User added successfully!");
    }
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p>Delete this user?</p>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setUsers(users.filter((user) => user.id !== id));

                toast.dismiss(t.id);

                toast.success("User deleted successfully!");
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-400 text-white px-3 py-1 rounded"
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

  // Search + Role Filter

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.username

        .toLowerCase()

        .includes(searchTerm.toLowerCase()) ||
      user.email

        .toLowerCase()

        .includes(searchTerm.toLowerCase());

    const matchRole = selectedRole === "" || user.role === selectedRole;

    return matchSearch && matchRole;
  });

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Users</h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-3 mb-5">
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
        roles={roles}
      />
    </MainLayout>
  );
};

export default Users;
