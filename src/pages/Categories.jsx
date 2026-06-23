import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CategoryTable from "../components/categories/CategoryTable";
import CategoryModal from "../components/categories/CategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Coffee" },
    { id: 2, name: "Tea" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsOpen(true);
  };

  const handleSave = (name) => {
    if (selectedCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategory.id ? { ...cat, name } : cat,
        ),
      );
    } else {
      setCategories([
        ...categories,
        {
          id: Date.now(),
          name,
        },
      ]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Categories</h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CategoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        category={selectedCategory}
      />
    </MainLayout>
  );
};

export default Categories;
