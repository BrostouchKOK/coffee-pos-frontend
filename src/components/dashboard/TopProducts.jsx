const TopProducts = ({ products = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>

      <div className="space-y-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={product._id}
              className="flex items-center justify-between border-b pb-3 last:border-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div>
                  <p className="font-medium">{product.name}</p>

                  <p className="text-sm text-gray-500">Best Seller</p>
                </div>
              </div>

              <span className="font-semibold text-green-600">
                {product.sold} sold
              </span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6">
            No sales data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TopProducts;
