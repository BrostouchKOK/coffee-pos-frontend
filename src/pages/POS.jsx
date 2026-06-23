import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductCard from "../components/pos/ProductCard";
import Cart from "../components/pos/Cart";

const POS = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Latte",
      category: "Coffee",
      price: 3.5,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Cappuccino",
      category: "Coffee",
      price: 4,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Green Tea",
      category: "Tea",
      price: 2.5,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Cheesecake",
      category: "Dessert",
      price: 5,
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
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
        item.id === id
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
          item.id === id
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
    setCart(cart.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <MainLayout>
      <div className="grid lg:grid-cols-4 gap-5">
        {/* Products */}
        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row gap-3 mb-5">
            <input
              type="text"
              placeholder="Search..."
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
              <option value="Coffee">Coffee</option>
              <option value="Tea">Tea</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="lg:col-span-1">
          <Cart
            cart={cart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItem={removeItem}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default POS;
