import { useEffect, useState } from "react";

const CategoryForm = ({ addCategory, editingCategory, updateCategory }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, name);
    } else {
      addCategory(name);
    }

    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow mb-6"
    >
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border rounded px-4 py-2"
        />

        <button className="bg-blue-600 text-white px-5 rounded">
          {editingCategory ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
