import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

import { getSettings, updateSettings } from "../api/settingsApi";
import { useSettings } from "../context/SettingsContext";
import Loading from "../components/common/Loading";

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
    currency: "USD",
    exchangeRate: 4100,
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

        currency: settings.currency || "USD",

        exchangeRate: Number(settings.exchangeRate) || 4100,

        tax: Number(settings.tax) || 0,

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
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "number" ? Number(value) : value,
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

  const handleCurrencyChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      currency: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(
            key,

            key === "exchangeRate" || key === "tax"
              ? Number(formData[key])
              : formData[key],
          );
        }
      });

      await updateSettings(data);

      await refreshSettings();

      toast.success("Settings updated successfully");

      fetchSettings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <Loading text="Loading settings..." />;
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

            <select
              value={formData.currency}
              onChange={handleCurrencyChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="USD">USD ($)</option>

              <option value="KHR">KHR (៛)</option>
            </select>
          </div>

          {formData.currency === "KHR" && (
            <div>
              <label className="block mb-2 font-medium">Exchange Rate</label>

              <input
                type="number"
                name="exchangeRate"
                value={formData.exchangeRate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <p className="text-sm text-gray-500 mt-1">Example: 1$ = 4100៛</p>
            </div>
          )}
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
          <label className="block mb-3 font-semibold">Cafe Logo</label>

          <label
            htmlFor="logo-upload"
            className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-xl cursor-pointer"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="logo"
                className="w-36 h-36 object-cover rounded-xl"
              />
            ) : (
              <p>Click to upload logo</p>
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
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Save Settings
        </button>
      </form>
    </MainLayout>
  );
};

export default Settings;
