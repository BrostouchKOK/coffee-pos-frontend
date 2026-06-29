import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

import { getSettings, updateSettings } from "../api/settingsApi";
import { useSettings } from "../context/SettingsContext";

const Settings = () => {
  const [loading, setLoading] = useState(true);

  const [logoPreview, setLogoPreview] = useState("");
  const { refreshSettings } = useSettings();
  const fileInputRef = useRef(null);

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
          `${import.meta.env.VITE_API_URL.replace("/api", "")}${settings.logo}`,
        );
      } else {
        setLogoPreview("");
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

      await refreshSettings();

      toast.success("Settings updated successfully");

      // Clear selected file
      setFormData((prev) => ({
        ...prev,
        logo: null,
      }));

      // Clear preview
      setLogoPreview("");

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Reload latest settings
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
          <label className="block mb-3 text-sm font-semibold text-gray-700">
            Cafe Logo
          </label>

          <label
            htmlFor="logo-upload"
            className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-500 transition"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Cafe Logo"
                className="w-36 h-36 object-cover rounded-xl shadow-md"
              />
            ) : (
              <>
                <svg
                  className="w-12 h-12 text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5V18a2 2 0 002 2h14a2 2 0 002-2v-1.5M16 8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>

                <p className="text-gray-600 font-medium">
                  Click to upload logo
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  PNG, JPG, JPEG or WEBP (Max 2MB)
                </p>
              </>
            )}
          </label>

          <input
            ref={fileInputRef}
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />

          {logoPreview && (
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setLogoPreview("");
                  setFormData((prev) => ({
                    ...prev,
                    logo: null,
                  }));
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Remove Logo
              </button>
            </div>
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
