import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentOrders from "../components/dashboard/RecentOrders";
import TopProducts from "../components/dashboard/TopProducts";
import SalesChart from "../components/dashboard/SalesChart";

const Dashboard = () => {
  const recentOrders = [
    {
      id: "#1001",
      customer: "Walk-in Customer",
      total: 15.5,
    },
    {
      id: "#1002",
      customer: "John Doe",
      total: 12,
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Latte",
      sold: 120,
    },
    {
      id: 2,
      name: "Cappuccino",
      sold: 98,
    },
    {
      id: 3,
      name: "Cheesecake",
      sold: 75,
    },
  ];

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <StatCard title="Total Sales" value="$2,450" icon="💰" />

        <StatCard title="Orders" value="124" icon="🧾" />

        <StatCard title="Products" value="48" icon="☕" />

        <StatCard title="Users" value="6" icon="👥" />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <SalesChart />
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-5">
        <RecentOrders orders={recentOrders} />

        <TopProducts products={topProducts} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
