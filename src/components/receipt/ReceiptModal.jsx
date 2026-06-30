import React from "react";

const ReceiptModal = ({ isOpen, onClose, order, settings }) => {
  if (!isOpen || !order) return null;

  const printReceipt = () => {
    window.print();
  };

  const exchangeRate =
    Number(settings?.exchangeRate) > 0 ? Number(settings.exchangeRate) : 4100;

  const currency = settings?.currency || "USD";

  // Database values are stored in USD
  const usd = (value) => Number(value || 0);

  const formatUSD = (value) => `$${usd(value).toFixed(2)}`;

  const formatKHR = (value) =>
    `៛${Math.round(usd(value) * exchangeRate).toLocaleString("en-US")}`;

  // Display based on selected currency
  const displayAmount = (value) => {
    return currency === "USD" ? formatUSD(value) : formatKHR(value);
  };

  // Always display the other currency under TOTAL
  const convertedAmount = (value) => {
    return currency === "USD" ? formatKHR(value) : formatUSD(value);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        id="receipt"
        className="bg-white w-[380px] max-h-[90vh] rounded-lg shadow-lg flex flex-col"
      >
        {/* Receipt Body */}
        <div className="p-6 overflow-y-auto">
          {/* Logo */}
          {settings?.logo && (
            <img
              src={`${import.meta.env.VITE_API_URL.replace(
                "/api",
                "",
              )}${settings.logo}`}
              alt="logo"
              className="w-20 h-20 mx-auto object-contain mb-3"
            />
          )}

          {/* Cafe Information */}
          <div className="text-center">
            <h2 className="text-xl font-bold">{settings?.cafeName}</h2>

            <p className="text-sm">{settings?.address}</p>

            <p className="text-sm">{settings?.phone}</p>

            <p className="text-sm">{settings?.email}</p>
          </div>

          <hr className="my-3" />

          {/* Order Info */}
          <div className="text-sm space-y-1">
            <p>
              Order No: <b>{order.orderNumber}</b>
            </p>

            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

            <p>
              Cashier: <b>{order.cashier?.username || "Admin"}</b>
            </p>
          </div>

          <hr className="my-3" />

          {/* Items */}
          <h3 className="font-semibold mb-2">Items</h3>

          {order.items?.map((item, index) => (
            <div key={index} className="flex justify-between text-sm mb-2">
              <span>
                {item.name} x {item.quantity}
              </span>

              <span>{displayAmount(item.subtotal)}</span>
            </div>
          ))}

          <hr className="my-3" />

          {/* Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>{displayAmount(order.subtotal)}</span>
            </div>

            <div className="flex justify-between text-red-600">
              <span>Discount</span>

              <span>-{displayAmount(order.discount)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>

              <span>{displayAmount(order.taxAmount)}</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <span>TOTAL</span>

              <div className="text-right">
                <div className="text-blue-600">
                  {displayAmount(order.totalAmount)}
                </div>

                <div className="text-sm text-gray-500">
                  {convertedAmount(order.totalAmount)}
                </div>
              </div>
            </div>
          </div>

          <hr className="my-3" />

          {/* Payment */}
          <div className="text-center text-sm">
            Payment: <b>{order.paymentMethod}</b>
          </div>

          <hr className="my-3" />

          {/* Footer */}
          <p className="text-center text-sm">{settings?.receiptFooter}</p>
        </div>

        {/* Buttons */}
        <div className="p-4 border-t bg-white flex gap-3">
          <button
            onClick={printReceipt}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Print
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
