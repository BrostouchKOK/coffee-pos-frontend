const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">ID</th>

            <th className="text-left p-4">Category Name</th>

            <th className="text-center p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category._id} className="border-b">
              <td className="p-4">{category._id.slice(-6)}</td>

              <td className="p-4">{category.name}</td>

              <td className="p-4 text-center">
                <button
                  onClick={() => onEdit(category)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(category._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-5">
                No Categories Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
