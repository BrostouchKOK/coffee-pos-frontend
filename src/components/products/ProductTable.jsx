const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={
                      product.image
                        ? `${import.meta.env.VITE_SERVER_URL}/uploads/products/${product.image}`
                        : "https://via.placeholder.com/80"
                    }
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                </td>

                <td className="p-4 font-medium">{product.name}</td>

                <td className="p-4">{product.category?.name || "-"}</td>

                <td className="p-4">${Number(product.price).toFixed(2)}</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-8 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
