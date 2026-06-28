const ProductCard = ({ product, onAdd }) => {
  const imageUrl = product.image
    ? `${import.meta.env.VITE_API_URL.replace(
        "/api",
        ""
      )}/uploads/products/${product.image}`
    : "https://via.placeholder.com/150";

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-full h-32 object-cover rounded-lg"
      />

      <h3 className="font-semibold mt-3">
        {product.name}
      </h3>

      <p className="text-gray-500 text-sm">
        {product.category?.name}
      </p>

      <p className="font-bold mt-2">
        ${Number(product.price).toFixed(2)}
      </p>

      <button
        onClick={() => onAdd(product)}
        className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;