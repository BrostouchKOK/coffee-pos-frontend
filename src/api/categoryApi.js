import API from "./axios";

// Get all categories
export const getCategories = () => API.get("/categories");

// Create category
export const createCategory = (data) => API.post("/categories", data);

// Update category
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);

// Delete category
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
