import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import toast from "react-hot-toast";

const ProductModal = ({ isOpen, onClose, onSave, product, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      toast.error("Please fill all fields");
      return;
    }

    onSave(formData);

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Edit Product" : "Add Product"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload */}

        <div className="flex flex-col items-center">
          <div className="relative">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 rounded-2xl object-cover border-2 border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 bg-gray-50">
                No Image
              </div>
            )}
          </div>

          <label className="mt-3 cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Product Info */}

        <div className="grid md:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price ($)
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Stock Quantity
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {product ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
