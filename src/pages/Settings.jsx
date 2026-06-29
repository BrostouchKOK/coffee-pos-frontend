import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

import { getSettings, updateSettings } from "../api/settingsApi";

const Settings = () => {
  const [loading, setLoading] = useState(true);

  const [logoPreview, setLogoPreview] = useState("");

  const [formData, setFormData] = useState({
    cafeName: "",
    address: "",
    phone: "",
    email: "",
    currency: "$",
    tax: 0,
    receiptFooter: "",
    logo: null,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await getSettings();

      const settings = res.data.data;

      setFormData({
        cafeName: settings.cafeName || "",
        address: settings.address || "",
        phone: settings.phone || "",
        email: settings.email || "",
        currency: settings.currency || "$",
        tax: settings.tax || 0,
        receiptFooter: settings.receiptFooter || "",
        logo: null,
      });

      if (settings.logo) {
        setLogoPreview(
          `${import.meta.env.VITE_API_URL.replace("/api", "")}/${settings.logo}`,
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      await updateSettings(data);

      toast.success("Settings updated successfully");

      fetchSettings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          Loading Settings...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-5"
      >
        <div>
          <label className="block mb-2 font-medium">Cafe Name</label>

          <input
            type="text"
            name="cafeName"
            value={formData.cafeName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Address</label>

          <textarea
            rows="3"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 font-medium">Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
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
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-2 font-medium">Currency</label>

            <input
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Tax (%)</label>

            <input
              type="number"
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Receipt Footer</label>

          <textarea
            rows="3"
            name="receiptFooter"
            value={formData.receiptFooter}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Cafe Logo</label>

          <input type="file" accept="image/*" onChange={handleLogoChange} />

          {logoPreview && (
            <img
              src={logoPreview}
              alt="Logo"
              className="mt-4 h-28 w-28 rounded-lg object-cover border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Save Settings
        </button>
      </form>
    </MainLayout>
  );
};

export default Settings;
