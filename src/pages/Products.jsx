import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import toast from "react-hot-toast";
import { getCategories } from "../api/categoryApi";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";
import Loading from "../components/common/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts();

      setProducts(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();

      setCategories(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load categories");
    }
  };

  // Add Product
  const handleAdd = () => {
    setSelectedProduct(null);
    setIsOpen(true);
  };

  // Edit Product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  // Save Product
  const handleSave = async (productData) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct._id, productData);

        toast.success("Product updated successfully!");
      } else {
        await createProduct(productData);

        toast.success("Product added successfully!");
      }

      await fetchProducts();

      setIsOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // Delete Product
  const handleDelete = (id) => {
    toast.custom(
      (t) => (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <p className="font-semibold mb-3">Delete this product?</p>

          <div className="flex gap-3">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={async () => {
                try {
                  await deleteProduct(id);

                  toast.dismiss(t.id);

                  toast.success("Product deleted successfully!");

                  await fetchProducts();
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || product.category._id === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };
  if (loading) {
    return <Loading text={"Loading products..."} />;
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-lg"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Clear
        </button>
      </div>

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        product={selectedProduct}
        categories={categories}
      />
    </MainLayout>
  );
};

export default Products;
