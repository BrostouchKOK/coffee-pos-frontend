const ReceiptModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) {
    return null;
  }

  const printReceipt = () => {
    window.print();
  };

  return (
    <div
      className="
fixed inset-0
bg-black/50
flex
items-center
justify-center
z-50
"
    >
      <div
        className="
bg-white
w-[350px]
rounded-xl
p-6
"
      >
        <h2
          className="
text-xl
font-bold
text-center
"
        >
          Coffee Shop Receipt
        </h2>

        <p className="text-center text-sm mt-2">Order ID: {order._id}</p>

        <hr className="my-4" />

        {order.items.map((item) => (
          <div key={item.product} className="flex justify-between mb-2">
            <span>
              {item.name}x {item.quantity}
            </span>

            <span>${item.subtotal.toFixed(2)}</span>
          </div>
        ))}

        <hr className="my-4" />

        <h3 className="font-bold text-lg">
          Total: ${order.totalAmount.toFixed(2)}
        </h3>

        <div className="flex gap-3 mt-5">
          <button
            onClick={printReceipt}
            className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
flex-1
"
          >
            Print
          </button>

          <button
            onClick={onClose}
            className="
bg-gray-300
px-4
py-2
rounded-lg
"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
