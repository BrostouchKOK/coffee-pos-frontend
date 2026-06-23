const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">{title}</h2>

          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
