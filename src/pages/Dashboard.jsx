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
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <div className="relative">
            {/* Outer Spinner */}
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>

            {/* Animated Spinner */}
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>

          <h2 className="mt-5 text-lg font-semibold text-gray-700">
            Loading products...
          </h2>

          <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
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
