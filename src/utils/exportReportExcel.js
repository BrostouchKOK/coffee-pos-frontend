import * as XLSX from "xlsx";

const exportReportExcel = (orders, summary, startDate, endDate) => {
  const reportInfo = [
    {
      Report: "Cafe POS Sales Report",
      Value: "",
    },
    {
      Report: "Start Date",
      Value: startDate,
    },
    {
      Report: "End Date",
      Value: endDate,
    },
    {
      Report: "Total Orders",
      Value: summary.totalOrders,
    },
    {
      Report: "Total Revenue",
      Value: `$${summary.totalRevenue.toFixed(2)}`,
    },
    {},
  ];

  const orderData = orders.map((order) => ({
    OrderID: order._id.slice(-6),
    Cashier: order.cashier?.username || "-",
    Payment: order.paymentMethod,
    Total: order.totalAmount,
    Date: new Date(order.createdAt).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet([]);

  XLSX.utils.sheet_add_json(worksheet, reportInfo, {
    skipHeader: true,
    origin: "A1",
  });

  XLSX.utils.sheet_add_json(worksheet, orderData, {
    origin: "A8",
  });

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

  XLSX.writeFile(workbook, `SalesReport_${startDate}_${endDate}.xlsx`);
};

export default exportReportExcel;
