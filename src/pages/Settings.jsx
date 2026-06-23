import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: "Coffee POS",
    storeAddress: "Phnom Penh, Cambodia",
    phone: "+855 12 345 678",
    email: "coffeepos@gmail.com",
    currency: "USD",
    taxRate: "10",
    receiptHeader: "Welcome to Coffee POS",
    receiptFooter: "Thank you for your purchase!",
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Settings saved successfully!");
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">
        Settings
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Store Information */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Store Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="storeName"
              placeholder="Store Name"
              value={settings.storeName}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={settings.phone}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={settings.email}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              name="storeAddress"
              placeholder="Store Address"
              value={settings.storeAddress}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            System Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              <option value="USD">
                USD ($)
              </option>
              <option value="KHR">
                KHR (៛)
              </option>
            </select>

            <input
              type="number"
              name="taxRate"
              placeholder="Tax Rate"
              value={settings.taxRate}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
          </div>
        </div>

        {/* Receipt Settings */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Receipt Settings
          </h2>

          <div className="space-y-4">
            <textarea
              name="receiptHeader"
              rows="3"
              value={settings.receiptHeader}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="Receipt Header"
            />

            <textarea
              name="receiptFooter"
              rows="3"
              value={settings.receiptFooter}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="Receipt Footer"
            />
          </div>
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