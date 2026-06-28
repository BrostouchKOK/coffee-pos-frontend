import Modal from "../common/Modal";

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order #${order._id.slice(-6)}`}
    >
      <div className="space-y-4">
        <div>
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Items</h3>

          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>
                {item.name}×{item.quantity}
              </span>

              <span>${item.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="text-right text-xl font-bold">
          Total: ${order.totalAmount.toFixed(2)}
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
