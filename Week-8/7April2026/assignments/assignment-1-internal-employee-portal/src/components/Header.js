import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import './Header.css';

const Header = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const headerStyle = {
    backgroundColor: theme.surfaceColor,
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.textColor
  };

  const navStyle = {
    display: 'flex',
    gap: '1rem',
    flex: 1,
    justifyContent: 'center'
  };

  const navButtonStyle = (isActive) => ({
    padding: '0.5rem 1rem',
    backgroundColor: isActive ? theme.primaryColor : 'transparent',
    color: isActive ? '#ffffff' : theme.textColor,
    border: `1px solid ${isActive ? theme.primaryColor : theme.borderColor}`,
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s'
  });

  const rightSectionStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    color: theme.textColor,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  };

  return (
    <header style={headerStyle}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Employee Portal</h1>
      </div>

      <nav style={navStyle}>
        <button
          style={navButtonStyle(currentPage === 'dashboard')}
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </button>
        <button
          style={navButtonStyle(currentPage === 'employees')}
          onClick={() => onNavigate('employees')}
        >
          Employees
        </button>
        <button
          style={navButtonStyle(currentPage === 'analytics')}
          onClick={() => onNavigate('analytics')}
        >
          Analytics
        </button>
        <button
          style={navButtonStyle(currentPage === 'settings')}
          onClick={() => onNavigate('settings')}
        >
          Settings
        </button>
      </nav>

      <div style={rightSectionStyle}>
        <span style={{ fontSize: '0.9rem' }}>Hello, {user?.fullName || user?.username}</span>
        <button
          style={buttonStyle}
          onClick={toggleTheme}
          title={isDark ? 'Light Mode' : 'Dark Mode'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <button
          style={{ ...buttonStyle, color: '#e74c3c' }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
