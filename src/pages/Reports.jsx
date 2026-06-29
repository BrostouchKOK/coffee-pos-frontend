import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import ReportCard from "../components/reports/ReportCard";
import SalesChart from "../components/reports/SalesChart";
import BestSellingTable from "../components/reports/BestSellingTable";
import PaymentMethodTable from "../components/reports/PaymentMethodTable";
import DateRangeTable from "../components/reports/DateRangeTable";
import exportReportPDF from "../utils/exportReportPDF";
import exportReportExcel from "../utils/exportReportExcel";

import {
  getSalesSummary,
  getTopProducts,
  getPaymentMethods,
  getDateRangeReport,
} from "../api/reportApi";

const Reports = () => {
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [dateReport, setDateReport] = useState([]);
  const [dateSummary, setDateSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [summary, setSummary] = useState({
    todaySales: 0,
    weekSales: 0,
    monthSales: 0,
    totalRevenue: 0,
  });

  const [topProducts, setTopProducts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);

      const [summaryRes, topRes, paymentRes] = await Promise.all([
        getSalesSummary(),
        getTopProducts(),
        getPaymentMethods(),
      ]);

      setSummary(summaryRes.data.data);
      setTopProducts(topRes.data.data);
      setPaymentMethods(paymentRes.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const loadDateReport = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return;
    }

    try {
      const res = await getDateRangeReport(startDate, endDate);

      setDateReport(res.data.data);

      setDateSummary({
        totalOrders: res.data.totalOrders,
        totalRevenue: res.data.totalRevenue,
      });

      toast.success("Report Loaded");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load report");
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
            Loading reports...
          </h2>

          <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <ReportCard
          title="Today's Sales"
          value={`$${summary.todaySales.toFixed(2)}`}
        />

        <ReportCard
          title="This Week"
          value={`$${summary.weekSales.toFixed(2)}`}
        />

        <ReportCard
          title="This Month"
          value={`$${summary.monthSales.toFixed(2)}`}
        />

        <ReportCard
          title="Total Revenue"
          value={`$${summary.totalRevenue.toFixed(2)}`}
        />
      </div>

      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h2 className="font-bold text-lg mb-4">Date Range Report</h2>

        <div className="flex flex-wrap gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={loadDateReport}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Generate
            </button>

            <button
              onClick={() =>
                exportReportPDF(dateReport, dateSummary, startDate, endDate)
              }
              disabled={dateReport.length === 0}
              className="bg-red-600 text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
            >
              Export PDF
            </button>

            <button
              onClick={() =>
                exportReportExcel(dateReport, dateSummary, startDate, endDate)
              }
              disabled={dateReport.length === 0}
              className="bg-green-600 text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
            >
              Export Excel
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-6">
        <ReportCard title="Orders" value={dateSummary.totalOrders} />

        <ReportCard
          title="Revenue"
          value={`$${dateSummary.totalRevenue.toFixed(2)}`}
        />
      </div>

      {/* Chart + Best Selling */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        <div>
          <BestSellingTable products={topProducts} />
        </div>
      </div>

      {/* Date Range Orders */}
      <div className="mb-6">
        <DateRangeTable orders={dateReport} />
      </div>

      {/* Payment Methods */}
      <PaymentMethodTable paymentMethods={paymentMethods} />
    </MainLayout>
  );
};

export default Reports;
