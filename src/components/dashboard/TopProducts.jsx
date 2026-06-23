const TopProducts = ({ products }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Top Products</h2>

      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex justify-between">
            <span>{product.name}</span>

            <span className="font-semibold">{product.sold} sold</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
