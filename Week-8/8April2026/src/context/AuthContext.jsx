import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication
    const mockUsers = {
      'admin@company.com': { id: 1, email: 'admin@company.com', name: 'John Admin', role: 'admin' },
      'manager@company.com': { id: 2, email: 'manager@company.com', name: 'Jane Manager', role: 'manager' },
      'employee@company.com': { id: 3, email: 'employee@company.com', name: 'Bob Employee', role: 'employee' },
    };

    if (mockUsers[email] && password === 'password123') {
      const userData = mockUsers[email];
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true, message: 'Login successful' };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
