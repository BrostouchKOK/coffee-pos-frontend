import { useState, useEffect } from "react";

import MainLayout from "../layouts/MainLayout";

import ProductCard from "../components/pos/ProductCard";
import Cart from "../components/pos/Cart";
import ReceiptModal from "../components/receipt/ReceiptModal";

import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import { createOrder } from "../api/orderApi";
import { getSettings } from "../api/settingsApi";

import toast from "react-hot-toast";
import Loading from "../components/common/Loading";

const POS = () => {
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [showReceipt, setShowReceipt] = useState(false);

  const [receiptData, setReceiptData] = useState(null);

  const [settings, setSettings] = useState(null);

  // discount percentage
  const [discount, setDiscount] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // ======================
  // FETCH DATA
  // ======================

  const fetchProducts = async () => {
    try {
      const res = await getProducts();

      setProducts(res.data.data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();

      setCategories(res.data.data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await getSettings();

      setSettings(res.data.data);
    } catch (error) {
      toast.error("Failed to load settings");
    }
  };

  // ======================
  // CALCULATE
  // ======================

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,

    0,
  );

  const taxRate = settings?.tax || 0;

  
  const discountAmount = subtotal * (discount / 100);

  const afterDiscount = subtotal - discountAmount;

  const taxAmount = afterDiscount * (taxRate / 100);

  const grandTotal = afterDiscount + taxAmount;

  // ======================
  // CHECKOUT
  // ======================

  const checkout = async () => {
    try {
      if (cart.length === 0) {
        toast.error("Cart is empty");

        return;
      }

      const orderData = {
        customerName: "Walk-in Customer",

        paymentMethod,

        discountPercent: discount,

        tax: taxRate,

        items: cart.map((item) => ({
          product: item._id,
          quantity: item.qty,
        })),
      };

      const res = await createOrder(orderData);

      toast.success("Order created successfully");

      setReceiptData(res.data.data);

      setShowReceipt(true);

      setCart([]);

      setDiscount(0);
    } catch (error) {
      console.log(error.response?.data);

      toast.error("Checkout failed");
    }
  };

  useEffect(() => {
    fetchProducts();

    fetchCategories();

    fetchSettings();
  }, []);

  // ======================
  // CART
  // ======================

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,

                qty: item.qty + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,

        {
          ...product,

          qty: 1,
        },
      ]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,

              qty: item.qty + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart

        .map((item) =>
          item._id === id
            ? {
                ...item,

                qty: item.qty - 1,
              }
            : item,
        )

        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name

      .toLowerCase()

      .includes(search.toLowerCase());

    const matchCategory = category === "" || product.category?._id === category;

    return matchSearch && matchCategory;
  });

  if (loading) {
    return <Loading text="Loading POS..." />;
  }

  return (
    <MainLayout>
      <div className="grid lg:grid-cols-4 gap-6">
        {/* PRODUCTS */}

        <div className="lg:col-span-3">
          <div
            className="
          bg-white
          p-4
          rounded-2xl
          shadow
          flex
          gap-3
          mb-5
          "
          >
            <input
              type="text"
              placeholder="Search coffee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              flex-1
              border
              rounded-xl
              p-3
              "
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
              border
              rounded-xl
              px-4
              "
            >
              <option value="">All</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div
            className="
          grid
          grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          gap-5
          "
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAdd={addToCart}
              />
            ))}
          </div>
        </div>

        {/* CART */}

        <div
          className="
        sticky
        top-5
        h-fit
        space-y-4
        "
        >
          <div
            className="
          bg-white
          rounded-2xl
          shadow
          p-5
          "
          >
            <h2
              className="
            text-xl
            font-bold
            mb-4
            "
            >
              Order
            </h2>

            <Cart
              cart={cart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeItem}
              onCheckout={checkout}
            />
          </div>

          <div
            className="
          bg-white
          rounded-2xl
          shadow
          p-5
          "
          >
            <label>Discount (%)</label>

            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="
              w-full
              border
              rounded-xl
              p-3
              mt-2
              "
            />

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="
              w-full
              border
              rounded-xl
              p-3
              mt-4
              "
            >
              <option>Cash</option>

              <option>Card</option>

              <option>QR</option>
            </select>

            <div
              className="
            border-t
            mt-5
            pt-4
            space-y-3
            "
            >
              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div
                className="
              flex
              justify-between
              text-red-500
              "
              >
                <span>Discount</span>

                <span>-${discountAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax ({taxRate}%)</span>

                <span>${taxAmount.toFixed(2)}</span>
              </div>

              <div
                className="
              flex
              justify-between
              text-xl
              font-bold
              border-t
              pt-3
              "
              >
                <span>Total</span>

                <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
              </div>

              {settings?.currency === "KHR" && (
                <div className="text-right">
                  ៛{(grandTotal * settings.exchangeRate).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        order={receiptData}
        settings={settings}
      />
    </MainLayout>
  );
};

export default POS;
