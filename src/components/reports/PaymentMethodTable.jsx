const PaymentMethodTable = ({ paymentMethods }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 mt-6">
      <h2 className="text-lg font-bold mb-4">Payment Method Report</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Method</th>
            <th className="text-center py-3">Orders</th>
            <th className="text-right py-3">Sales</th>
          </tr>
        </thead>

        <tbody>
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <tr key={method._id} className="border-b hover:bg-gray-50">
                <td className="py-3">{method._id}</td>

                <td className="text-center">{method.totalOrders}</td>

                <td className="text-right font-semibold">
                  ${method.totalSales.toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-500">
                No payment data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentMethodTable;
