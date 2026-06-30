import { Link } from "react-router-dom";

const NotificationDropdown = ({ products, onClose }) => {
  return (
    <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border overflow-hidden z-50">
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">🔔 Notifications</h3>

        <span className="text-sm text-red-600 font-medium">
          {products.length} Alerts
        </span>
      </div>

      {products.length === 0 ? (
        <div className="p-6 text-center text-green-600">
          🎉 No notifications
        </div>
      ) : (
        <>
          <div className="max-h-80 overflow-y-auto">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b"
              >
                <img
                  src={
                    product.image
                      ? `${import.meta.env.VITE_SERVER_URL}/uploads/products/${product.image}`
                      : "https://via.placeholder.com/45"
                  }
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover border"
                />

                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>

                  <p className="text-sm text-red-600">
                    Only {product.stock} left
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/products"
            onClick={onClose}
            className="block text-center py-3 bg-gray-100 hover:bg-gray-200 font-medium"
          >
            View Products
          </Link>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
