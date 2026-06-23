const OrderTable = ({ orders, onView, onUpdateStatus }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-4 text-left">Order ID</th>

            <th className="p-4 text-left">Customer</th>

            <th className="p-4 text-left">Date</th>

            <th className="p-4 text-left">Total</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-4">{order.id}</td>

              <td className="p-4">{order.customer}</td>

              <td className="p-4">{order.date}</td>

              <td className="p-4">${order.total.toFixed(2)}</td>

              <td className="p-4">
                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="Pending">Pending</option>

                  <option value="Completed">Completed</option>

                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

              <td className="p-4 text-center">
                <button
                  onClick={() => onView(order)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="text-center py-10 text-gray-500">No orders found</div>
      )}
    </div>
  );
};

export default OrderTable;
