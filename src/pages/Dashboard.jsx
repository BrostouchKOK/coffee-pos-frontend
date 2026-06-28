import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentOrders from "../components/dashboard/RecentOrders";
import TopProducts from "../components/dashboard/TopProducts";
import SalesChart from "../components/dashboard/SalesChart";

import { getDashboardStats } from "../api/dashboardApi";

import toast from "react-hot-toast";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardStats();

      setDashboard(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <h2 className="text-xl font-semibold">Loading Dashboard...</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <StatCard
          title="Total Sales"
          value={`$${dashboard.totalSales.toFixed(2)}`}
          icon="💰"
        />

        <StatCard title="Orders" value={dashboard.totalOrders} icon="🧾" />

        <StatCard title="Products" value={dashboard.totalProducts} icon="☕" />

        <StatCard title="Users" value={dashboard.totalUsers} icon="👥" />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <SalesChart data={dashboard.monthlySales} />
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-5">
        <RecentOrders orders={dashboard.recentOrders} />

        <TopProducts products={dashboard.topProducts} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
