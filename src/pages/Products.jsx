import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";

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
      price: 4.0,
      stock: 15,
      image: "https://via.placeholder.com/80",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = ["Coffee", "Tea", "Dessert"];

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

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
    } else {
      setProducts([
        ...products,
        {
          id: Date.now(),
          ...productData,
        },
      ]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
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
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Products</h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {/* Search & Filter */}
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
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          Clear
        </button>
      </div>

      {/* Product Table */}
      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Product Modal */}
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
