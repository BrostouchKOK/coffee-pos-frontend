const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="p-4">
                <img
                  src={product.image || "https://via.placeholder.com/80"}
                  alt={product.name}
                  className="w-16 h-16 rounded object-cover"
                />
              </td>

              <td className="p-4">{product.name}</td>

              <td className="p-4">{product.category}</td>

              <td className="p-4">${product.price}</td>

              <td className="p-4">{product.stock}</td>

              <td className="p-4">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(product.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
