import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Latte",
      category: "Coffee",
      price: 3.5,
      stock: 50,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Green Tea",
      category: "Tea",
      price: 2.5,
      stock: 30,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Cheesecake",
      category: "Dessert",
      price: 4,
      stock: 15,
      image: "https://via.placeholder.com/80",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Coffee", "Tea", "Dessert"];

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
  const handleSave = (productData) => {
    if (selectedProduct) {
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                ...productData,
              }
            : product,
        ),
      );

      toast.success("Product updated successfully!");
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...productData,
        },
      ]);

      toast.success("Product added successfully!");
    }

    setIsOpen(false);
  };

  // Delete Product
  const handleDelete = (id) => {
    toast.custom(
      (t) => (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <p className="font-semibold mb-3">Delete this product?</p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setProducts(products.filter((product) => product.id !== id));

                toast.dismiss(t.id);

                toast.success("Product deleted successfully!");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Yes
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 px-4 py-2 rounded"
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
      selectedCategory === "" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

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
            <option key={category} value={category}>
              {category}
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
