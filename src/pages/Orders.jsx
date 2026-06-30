import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import OrderTable from "../components/orders/OrderTable";
import OrderDetailModal from "../components/orders/OrderDetailModal";
import toast from "react-hot-toast";

import { getOrders, updateOrderStatus } from "../api/orderApi";
import Loading from "../components/common/Loading";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const statuses = ["Pending", "Completed", "Cancelled"];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // =========================
  // Fetch Orders
  // =========================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getOrders({
        search: searchTerm,
        status: selectedStatus,
      });

      setOrders(res.data.data);
    } catch (error) {
      toast.error("Cannot load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchTerm, selectedStatus]);

  // =========================
  // Update Status
  // =========================

  const updateStatus = async (id, status) => {
    try {
      const res = await updateOrderStatus(id, status);

      setOrders(
        orders.map((order) =>
          order._id === id
            ? {
                ...order,
                status: res.data.data.status,
              }
            : order,
        ),
      );

      toast.success("Order status updated!");
    } catch (error) {
      console.log(error.response);

      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <Loading text={"Loading order..."} />;
  }

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <input
          type="text"
          placeholder="Search customer..."
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
        orders={orders}
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
