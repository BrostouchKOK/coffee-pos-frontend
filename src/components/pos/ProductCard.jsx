const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded-lg"
      />

      <h3 className="font-semibold mt-3">
        {product.name}
      </h3>

      <p className="text-gray-500 text-sm">
        {product.category}
      </p>

      <p className="font-bold mt-2">
        ${product.price}
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