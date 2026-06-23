import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import OrderTable from "../components/orders/OrderTable";
import OrderDetailModal from "../components/orders/OrderDetailModal";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([
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
      status: "Pending",
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

  const statuses = ["Pending", "Completed", "Cancelled"];

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateStatus = (id, status) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order,
      ),
    );

    toast.success("Order status updated!");
  };

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.id

        .toLowerCase()

        .includes(searchTerm.toLowerCase()) ||
      order.customer

        .toLowerCase()

        .includes(searchTerm.toLowerCase());

    const matchStatus =
      selectedStatus === "" || order.status === selectedStatus;

    return matchSearch && matchStatus;
  });

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search order or customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-lg"
        />

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Status</option>

          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <OrderTable
        orders={filteredOrders}
        onView={setSelectedOrder}
        onUpdateStatus={updateStatus}
      />

      <OrderDetailModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </MainLayout>
  );
};

export default Orders;
