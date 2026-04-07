import React, { createContext, useState, useCallback, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const theme = {
    isDark,
    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    textColor: isDark ? '#ffffff' : '#000000',
    surfaceColor: isDark ? '#2a2a2a' : '#f5f5f5',
    borderColor: isDark ? '#444444' : '#cccccc',
    primaryColor: '#4a90e2',
    secondaryColor: isDark ? '#666666' : '#999999'
  };

  const value = {
    isDark,
    theme,
    toggleTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
