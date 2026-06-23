import Modal from "../common/Modal";

const ReceiptModal = ({ isOpen, onClose, cart }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const tax = subtotal * 0.1;

  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Receipt Preview">
      <div className="bg-white p-4">
        <div className="text-center mb-4">
          <h2 className="font-bold text-xl">Coffee POS</h2>

          <p className="text-sm">Phnom Penh, Cambodia</p>
        </div>

        <div className="border-t border-b py-3">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-1">
              <span>
                {item.name} x {item.qty}
              </span>

              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-center mt-6 text-sm">Thank you for your purchase!</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg"
          >
            Print
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReceiptModal;
