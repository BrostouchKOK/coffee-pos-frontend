import API from "./axios";

// ======================
// Get Profile
// ======================

export const getProfile = () => {
  return API.get("/users/profile");
};

// ======================
// Update Profile
// ======================

export const updateProfile = (data) => {
  return API.put("/users/profile", data);
};
