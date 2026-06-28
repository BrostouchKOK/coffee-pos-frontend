const DateRangeTable = ({ orders }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Order ID</th>
            <th className="text-left">Cashier</th>
            <th className="text-left">Payment</th>
            <th className="text-left">Total</th>
            <th className="text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-3 font-medium">
                  #{order._id.slice(-6).toUpperCase()}
                </td>

                <td>{order.cashier?.username || "-"}</td>

                <td>{order.paymentMethod}</td>

                <td>${Number(order.totalAmount).toFixed(2)}</td>

                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No report data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DateRangeTable;
