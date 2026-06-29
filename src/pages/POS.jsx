import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductCard from "../components/pos/ProductCard";
import Cart from "../components/pos/Cart";
import ReceiptModal from "../components/receipt/ReceiptModal";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import { createOrder } from "../api/orderApi";
import toast from "react-hot-toast";

const POS = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  // ======================
  // GET PRODUCTS
  // ======================

  const fetchProducts = async () => {
    try {
      const res = await getProducts();

      setProducts(res.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // GET CATEGORIES
  // ======================

  const fetchCategories = async () => {
    try {
      const res = await getCategories();

      setCategories(res.data.data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const checkout = async () => {
    try {
      const orderData = {
        customerName: "Walk-in Customer",

        paymentMethod: "Cash",

        items: cart.map((item) => ({
          product: item._id,

          quantity: item.qty,
        })),
      };

      console.log(orderData);

      const res = await createOrder(orderData);

      toast.success("Order created successfully");
      setReceiptData(res.data.data);
      setShowReceipt(true);
      setCart([]);
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Checkout failed");
    }
  };

  useEffect(() => {
    fetchProducts();

    fetchCategories();
  }, []);

  // ======================
  // ADD CART
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

  // ======================
  // INCREASE
  // ======================

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

  // ======================
  // DECREASE
  // ======================

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

  // ======================
  // REMOVE
  // ======================

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
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="relative">
            {/* Outer Spinner */}
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>

            {/* Animated Spinner */}
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-700">
            Loading POS...
          </h2>

          <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="grid lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3">
          <div className="flex gap-3 mb-5">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 flex-1"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">All Categories</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAdd={addToCart}
              />
            ))}
          </div>
        </div>

        <div>
          <Cart
            cart={cart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItem={removeItem}
            onCheckout={() => {
              checkout();
            }}
          />
        </div>
      </div>

      <ReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        order={receiptData}
      />
    </MainLayout>
  );
};

export default POS;
