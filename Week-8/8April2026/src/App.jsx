import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Login } from './components/Login';
import { Notifications } from './components/Notifications';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import './styles/global.css';

function App() {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="app-container">
        <Login onLoginSuccess={() => setCurrentPage('dashboard')} />
        <Notifications />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <Employees />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Header />
      <div className="layout">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="main-content" style={{ flex: 1 }}>
          {renderPage()}
        </main>
      </div>
      <Notifications />
    </div>
  );
}

export default App;
