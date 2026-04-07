import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = useCallback((username, password) => {
    setLoading(true);
    try {
      // Simulate login - in real app, this would be an API call
      setTimeout(() => {
        const mockUser = {
          id: 1,
          username: username,
          email: `${username}@company.com`,
          role: username === 'admin' ? 'admin' : 'employee',
          fullName: username.charAt(0).toUpperCase() + username.slice(1)
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
