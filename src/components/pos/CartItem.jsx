const CartItem = ({
  item,
  increaseQty,
  decreaseQty,
  removeItem,
}) => {
  return (
    <div className="border-b py-3">
      <h4 className="font-medium">
        {item.name}
      </h4>

      <p className="text-sm text-gray-500">
        ${item.price}
      </p>

      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() =>
            decreaseQty(item.id)
          }
          className="px-2 py-1 bg-gray-200 rounded"
        >
          -
        </button>

        <span>{item.qty}</span>

        <button
          onClick={() =>
            increaseQty(item.id)
          }
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>

        <button
          onClick={() =>
            removeItem(item.id)
          }
          className="ml-auto text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;