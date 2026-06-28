const RecentOrders = ({ orders = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="text-left py-3">Order ID</th>

              <th className="text-left py-3">Customer</th>

              <th className="text-left py-3">Cashier</th>

              <th className="text-left py-3">Payment</th>

              <th className="text-right py-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">#{order._id.slice(-6)}</td>

                  <td className="py-3">{order.customerName}</td>

                  <td className="py-3">{order.cashier?.username}</td>

                  <td className="py-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                      {order.paymentMethod}
                    </span>
                  </td>

                  <td className="py-3 text-right font-semibold text-green-600">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
