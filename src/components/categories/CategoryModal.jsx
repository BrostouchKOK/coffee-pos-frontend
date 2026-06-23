import { useEffect, useState } from "react";
import Modal from "../common/Modal";

const CategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName("");
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    onSave(name);

    setName("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={category ? "Edit Category" : "Add Category"}
    >
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Category Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-5"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryModal;
