import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import { getProfile, updateProfile } from "../api/profileApi";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    createdAt: "",
  });
  const { setUser } = useAuth();
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      const user = res.data.data;

      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        username: formData.username,
        email: formData.email,
      });

      const updatedUser = res.data.data;

      // Update Auth Context
      setUser(updatedUser);

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update Profile Page
      setFormData((prev) => ({
        ...prev,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      }));

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          Loading Profile...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://ui-avatars.com/api/?name="
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-blue-500"
          />

          <h2 className="text-2xl font-bold mt-4">{formData.username}</h2>

          <p className="text-gray-500">{formData.role}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Role</label>

            <input
              type="text"
              value={formData.role}
              disabled
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Member Since</label>

            <input
              type="text"
              disabled
              value={
                formData.createdAt
                  ? new Date(formData.createdAt).toLocaleDateString()
                  : "-"
              }
              className="w-full border rounded-lg p-3 bg-gray-100"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
            Save Changes
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Profile;
