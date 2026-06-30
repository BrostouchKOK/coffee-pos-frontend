import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import CategoryTable from "../components/categories/CategoryTable";
import CategoryModal from "../components/categories/CategoryModal";
import toast from "react-hot-toast";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";
import Loading from "../components/common/Loading";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await getCategories();

      setCategories(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsOpen(true);
  };

  const handleSave = async (categoryData) => {
    try {
      if (selectedCategory) {
        await updateCategory(selectedCategory._id, categoryData);

        toast.success("Category updated successfully!");
      } else {
        await createCategory(categoryData);

        toast.success("Category added successfully!");
      }

      await fetchCategories();

      setIsOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p>Delete this category?</p>

          <div className="flex gap-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={async () => {
                try {
                  await deleteCategory(id);

                  toast.dismiss(t.id);

                  toast.success("Category deleted successfully!");

                  await fetchCategories();
                } catch (error) {
                  toast.error(error.response?.data?.message || "Delete failed");
                }
              }}
            >
              Delete
            </button>

            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
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

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <Loading text={"Loading category..."}/>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Categories</h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Add Category
        </button>
      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search category by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
