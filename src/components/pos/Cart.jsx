import CartItem from "./CartItem";

const Cart = ({
  cart,
  increaseQty,
  decreaseQty,
  removeItem,
}) => {
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  return (
    <div className="bg-white rounded-xl shadow p-4 h-full">
      <h2 className="text-xl font-bold mb-4">
        Cart
      </h2>

      <div className="space-y-2">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className="border-t mt-4 pt-4">
        <h3 className="text-xl font-bold">
          Total: ${total.toFixed(2)}
        </h3>

        <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;