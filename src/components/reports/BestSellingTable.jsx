const products = [
  {
    name: "Latte",
    sold: 120,
    revenue: 420,
  },
  {
    name: "Cappuccino",
    sold: 95,
    revenue: 380,
  },
  {
    name: "Mocha",
    sold: 80,
    revenue: 320,
  },
];

const BestSellingTable = () => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-bold text-lg mb-4">Best Selling Products</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Product</th>
            <th className="text-left py-2">Sold</th>
            <th className="text-left py-2">Revenue</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.name}>
              <td className="py-2">{product.name}</td>
              <td>{product.sold}</td>
              <td>${product.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BestSellingTable;
