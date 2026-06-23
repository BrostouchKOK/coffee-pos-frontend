import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import UserTable from "../components/users/UserTable";
import UserModal from "../components/users/UserModal";

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

  const [searchTerm, setSearchTerm] = useState("");

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
    } else {
      setUsers([
        ...users,
        {
          id: Date.now(),
          ...userData,
        },
      ]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-lg"
        />
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
