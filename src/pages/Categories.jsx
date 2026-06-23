import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CategoryTable from "../components/categories/CategoryTable";
import CategoryModal from "../components/categories/CategoryModal";
import toast from "react-hot-toast";

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Coffee" },
    { id: 2, name: "Tea" },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  // search state
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsOpen(true);
  };

  const handleSave = (categoryData) => {
    if (selectedCategory) {
      setCategories(
        categories.map((category) =>
          category.id === selectedCategory.id
            ? {
                ...category,
                ...categoryData,
              }
            : category,
        ),
      );

      toast.success("Category updated successfully!");
    } else {
      setCategories([
        ...categories,
        {
          id: Date.now(),
          ...categoryData,
        },
      ]);

      toast.success("Category added successfully!");
    }
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p>Delete this category?</p>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setCategories(
                  categories.filter((category) => category.id !== id),
                );

                toast.dismiss(t.id);

                toast.success("Category deleted successfully!");
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

  // filter search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 border px-4 py-2 rounded-lg"
        />
      </div>

      <CategoryTable
        categories={filteredCategories}
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
