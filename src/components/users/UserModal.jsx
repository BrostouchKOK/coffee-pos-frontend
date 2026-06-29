import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal";

const UserModal = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Cashier",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: "",
        role: user.role,
      });
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "Cashier",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!user && !formData.password) {
      toast.error("Password is required.");
      return;
    }

    if (!user && formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? "Edit User" : "Add User"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block mb-1 font-medium">Username</label>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Password (Only Add User) */}
        {!user && (
          <div>
            <label className="block mb-1 font-medium">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        )}

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="Admin">Admin</option>
            <option value="Cashier">Cashier</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {user ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;
