const BestSellingTable = ({ products = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-bold text-lg mb-4">Best Selling Products</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Product</th>

              <th className="text-center py-2">Sold</th>

              <th className="text-right py-2">Revenue</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="py-3">{product.name}</td>

                  <td className="text-center">{product.totalSold}</td>

                  <td className="text-right">
                    ${Number(product.revenue).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-5 text-gray-500">
                  No sales yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestSellingTable;
