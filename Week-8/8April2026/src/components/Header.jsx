import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div>
        <h1>Employee Portal</h1>
      </div>
      <div className="header-actions">
        <button className="button btn-secondary" onClick={toggleTheme} title="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <span style={{ color: 'var(--text-secondary)' }}>
          Welcome, <strong>{user?.name}</strong> ({user?.role})
        </span>
        <button className="button btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};
