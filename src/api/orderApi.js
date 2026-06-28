import API from "./axios";

// create order
export const createOrder = (data) => API.post("/orders", data);

// get orders with search/filter
export const getOrders = (params = {}) =>
  API.get("/orders", {
    params,
  });

// single order

export const getOrderById = (id) => API.get(`/orders/${id}`);

// update status

export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}/status`, {
    status,
  });
