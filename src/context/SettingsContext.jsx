import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "../api/settingsApi";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  const loadSettings = async () => {
    try {
      const res = await getSettings();
      setSettings(res.data.data);
    } catch (error) {
      console.error("Failed to load settings", error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        refreshSettings: loadSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
