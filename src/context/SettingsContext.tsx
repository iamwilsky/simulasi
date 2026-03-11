
import React, { createContext, useContext, useState, useEffect } from "react";

interface SettingsContextType {
  provisionRate: number;
  setProvisionRate: (rate: number) => void;
  additionalAdminFee: number;
  setAdditionalAdminFee: (fee: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const STORAGE_KEY = "kreditara_calculator_settings";

  // Initialize state from localStorage or defaults
  const [provisionRate, setProvisionRate] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.provisionRate ?? 5.0;
      } catch (e) {
        return 5.0;
      }
    }
    return 5.0;
  });

  const [additionalAdminFee, setAdditionalAdminFee] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.additionalAdminFee ?? 5000000;
      } catch (e) {
        return 5000000;
      }
    }
    return 5000000;
  });

  // Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      provisionRate,
      additionalAdminFee
    }));
  }, [provisionRate, additionalAdminFee]);

  return (
    <SettingsContext.Provider
      value={{
        provisionRate,
        setProvisionRate,
        additionalAdminFee,
        setAdditionalAdminFee
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
