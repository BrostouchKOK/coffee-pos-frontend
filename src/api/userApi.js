import API from "./axios";

// Get All Users
export const getUsers = () => API.get("/users");

// Create User
export const createUser = (userData) => API.post("/users", userData);

// Update User
export const updateUser = (id, userData) => API.put(`/users/${id}`, userData);

// Delete User
export const deleteUser = (id) => API.delete(`/users/${id}`);
