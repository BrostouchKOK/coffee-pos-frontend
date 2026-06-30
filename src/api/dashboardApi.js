import API from "./axios";

export const getDashboardStats = () => API.get("/dashboard");
export const getLowStockProducts = () => {
  return API.get("/dashboard/low-stock");
};
