import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import toast from "react-hot-toast";

const ProductModal = ({ isOpen, onClose, onSave, product, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",

        category: product.category?._id || product.category || "",

        price: product.price || "",

        stock: product.stock || "",

        image: null,

        imagePreview: product.image
          ? `${import.meta.env.VITE_SERVER_URL}/uploads/products/${product.image}`
          : "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        image: null,
        imagePreview: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,

      image: file,

      imagePreview: URL.createObjectURL(file),
    }));
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

    const data = new FormData();

    data.append("name", formData.name);

    data.append("category", formData.category);

    data.append("price", formData.price);

    data.append("stock", formData.stock);

    if (formData.image) {
      data.append("image", formData.image);
    }

    onSave(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Edit Product" : "Add Product"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col items-center">
          {formData.imagePreview ? (
            <img
              src={formData.imagePreview}
              alt="preview"
              className="w-32 h-32 rounded-2xl object-cover border shadow"
            />
          ) : (
            <div className="w-32 h-32 rounded-2xl border flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <label className="mt-3 cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label>Product Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl"
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label>Stock</label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border rounded-xl"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-xl"
          >
            {product ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
