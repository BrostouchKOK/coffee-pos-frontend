const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-4 text-left">Username</th>

            <th className="p-4 text-left">Email</th>

            <th className="p-4 text-left">Role</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-4">{user.username}</td>

              <td className="p-4">{user.email}</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.role === "Admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td className="p-4 text-center">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(user.id)}
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

export default UserTable;
