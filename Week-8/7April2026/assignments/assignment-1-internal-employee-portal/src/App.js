import React, { useState } from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { EmployeeProvider } from './contexts/EmployeeContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EmployeeManagement from './components/EmployeeManagement';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const appStyle = {
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    minHeight: '100vh',
    transition: 'background-color 0.3s ease'
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={appStyle}>
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EmployeeProvider>
          <SettingsProvider>
            <AppContent />
          </SettingsProvider>
        </EmployeeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
