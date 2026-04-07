import React, { createContext, useState, useCallback, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('userSettings');
    return saved ? JSON.parse(saved) : {
      notifications: true,
      autoSave: true,
      language: 'en',
      itemsPerPage: 10
    };
  });

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetSettings = useCallback(() => {
    const defaults = {
      notifications: true,
      autoSave: true,
      language: 'en',
      itemsPerPage: 10
    };
    setSettings(defaults);
  }, []);

  const value = {
    settings,
    updateSetting,
    resetSettings
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};
