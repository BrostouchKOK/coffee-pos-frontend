import { useEffect, useState } from "react";
import Modal from "../common/Modal";

const UserModal = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "Cashier",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        username: "",
        email: "",
        role: "Cashier",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email) return;

    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? "Edit User" : "Add User"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({
              ...formData,
              username: e.target.value,
            })
          }
          className="w-full border rounded-lg p-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="w-full border rounded-lg p-2"
        />

        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
          className="w-full border rounded-lg p-2"
        >
          <option value="Admin">Admin</option>

          <option value="Cashier">Cashier</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Save User
        </button>
      </form>
    </Modal>
  );
};

export default UserModal;
