import API from "./axios";

export const getProducts = () => API.get("/products");

export const createProduct = (formData) =>
  API.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteProduct = (id) => API.delete(`/products/${id}`);
