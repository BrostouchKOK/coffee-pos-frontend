import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import OrderTable from "../components/orders/OrderTable";
import OrderDetailModal from "../components/orders/OrderDetailModal";

const Orders = () => {
  const [orders] = useState([
    {
      id: "#1001",
      customer: "Walk-in Customer",
      total: 15.5,
      status: "Completed",
      date: "2026-07-23",
      items: [
        {
          name: "Latte",
          qty: 2,
          price: 3.5,
        },
        {
          name: "Cheesecake",
          qty: 1,
          price: 8.5,
        },
      ],
    },
    {
      id: "#1002",
      customer: "John Doe",
      total: 12,
      status: "Completed",
      date: "2026-07-23",
      items: [
        {
          name: "Mocha",
          qty: 2,
          price: 6,
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.id
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      order.customer
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Orders
        </h1>
      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search order..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full md:w-80 px-4 py-2 border rounded-lg"
        />
      </div>

      <OrderTable
        orders={filteredOrders}
        onView={setSelectedOrder}
      />

      <OrderDetailModal
        isOpen={!!selectedOrder}
        onClose={() =>
          setSelectedOrder(null)
        }
        order={selectedOrder}
      />
    </MainLayout>
  );
};

export default Orders;