import { Link } from "react-router-dom";

const LowStockCard = ({ products }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">⚠️ Low Stock Products</h2>

        <Link to="/products" className="text-blue-600 hover:underline text-sm">
          View All
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8 text-green-600">
          🎉 All products have sufficient stock.
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    product?.image
                      ? `${import.meta.env.VITE_SERVER_URL}/uploads/products/${product.image}`
                      : "https://via.placeholder.com/50"
                  }
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover border"
                />

                <div>
                  <h3 className="font-medium">{product.name}</h3>

                  <p className="text-sm text-gray-500">Remaining Stock</p>
                </div>
              </div>

              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                {product.stock}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LowStockCard;
