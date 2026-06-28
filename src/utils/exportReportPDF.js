import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportReportPDF = (orders, summary, startDate, endDate) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Cafe POS Sales Report", 14, 20);

  doc.setFontSize(11);

  doc.text(`From : ${startDate}`, 14, 35);
  doc.text(`To : ${endDate}`, 14, 42);

  doc.text(`Total Orders : ${summary.totalOrders}`, 14, 55);

  doc.text(`Total Revenue : $${summary.totalRevenue.toFixed(2)}`, 14, 62);

  autoTable(doc, {
    startY: 75,

    head: [["Order", "Cashier", "Payment", "Total", "Date"]],

    body: orders.map((order) => [
      order.orderNumber || order._id.toString().slice(-6).toUpperCase(),
      order.cashier?.username || "-",
      order.paymentMethod,
      `$${Number(order.totalAmount).toFixed(2)}`,
      new Date(order.createdAt).toLocaleDateString(),
    ]),
  });

  doc.save(`SalesReport_${startDate}_${endDate}.pdf`);
};

export default exportReportPDF;
