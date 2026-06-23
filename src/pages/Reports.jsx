import MainLayout from "../layouts/MainLayout";
import ReportCard from "../components/reports/ReportCard";
import SalesChart from "../components/reports/SalesChart";
import BestSellingTable from "../components/reports/BestSellingTable";

const Reports = () => {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <ReportCard title="Today's Sales" value="$350" />

        <ReportCard title="Orders Today" value="45" />

        <ReportCard title="Products Sold" value="120" />

        <ReportCard title="Monthly Revenue" value="$8,500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        <div>
          <BestSellingTable />
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
