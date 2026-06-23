const OrderTable = ({ orders, onView }) => {
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

            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="p-4">{order.id}</td>

              <td className="p-4">{order.customer}</td>

              <td className="p-4">{order.date}</td>

              <td className="p-4">${order.total}</td>

              <td className="p-4">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                  {order.status}
                </span>
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
    </div>
  );
};

export default OrderTable;
