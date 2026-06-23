import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";

import {
  FaDollarSign,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard title="Revenue" value="$2,450" icon={<FaDollarSign />} />

        <DashboardCard title="Orders" value="180" icon={<FaShoppingCart />} />

        <DashboardCard title="Products" value="45" icon={<FaBoxOpen />} />

        <DashboardCard title="Users" value="8" icon={<FaUsers />} />
      </div>

      <div className="bg-white mt-8 rounded-xl shadow p-5">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Order ID</th>
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="py-3">#1001</td>
              <td>John</td>
              <td>$15</td>
              <td>Completed</td>
            </tr>

            <tr>
              <td className="py-3">#1002</td>
              <td>David</td>
              <td>$20</td>
              <td>Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
