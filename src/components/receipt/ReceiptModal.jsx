import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Receipt from "./Receipt";

const ReceiptModal = ({ isOpen, onClose, order, settings }) => {
  const receiptRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
  });

  if (!isOpen) return null;

  return (
    <div
      className="
fixed inset-0 
bg-black bg-opacity-40
flex items-center justify-center
"
    >
      <div
        className="
bg-white 
p-5
rounded
"
      >
        <Receipt ref={receiptRef} order={order} settings={settings} />

        <div className="flex gap-3 mt-5">
          <button
            onClick={handlePrint}
            className="
bg-blue-600
text-white
px-4
py-2
rounded
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
rounded
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
