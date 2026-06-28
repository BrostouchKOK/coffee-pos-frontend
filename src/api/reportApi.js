import API from "./axios";

export const getSalesSummary = () => API.get("/reports/summary");

export const getTopProducts = () => API.get("/reports/top-products");

export const getPaymentMethods = () => API.get("/reports/payment-methods");

export const getSalesChart = () => API.get("/reports/sales-chart");

export const getDateRangeReport = (start, end) =>
  API.get(`/reports/date-range?start=${start}&end=${end}`);
