import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useEmployee } from '../hooks/useEmployee';
import './Dashboard.css';

const Dashboard = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { stats } = useEmployee();

  const containerStyle = {
    padding: '2rem'
  };

  const welcomeCardStyle = {
    backgroundColor: theme.surfaceColor,
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    border: `1px solid ${theme.borderColor}`,
    boxShadow: theme.isDark ? '0 2px 4px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem'
  };

  const statCardStyle = {
    backgroundColor: theme.surfaceColor,
    padding: '1.5rem',
    borderRadius: '8px',
    border: `1px solid ${theme.borderColor}`,
    textAlign: 'center'
  };

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: theme.primaryColor,
    margin: '0.5rem 0'
  };

  const statLabelStyle = {
    color: theme.secondaryColor,
    fontSize: '0.9rem',
    textTransform: 'uppercase'
  };

  return (
    <div style={containerStyle}>
      <div style={welcomeCardStyle}>
        <h1 style={{ color: theme.textColor, margin: 0 }}>Welcome back, {user?.fullName}! 👋</h1>
        <p style={{ color: theme.secondaryColor, margin: '0.5rem 0 0 0' }}>
          Role: <strong>{user?.role}</strong>
        </p>
      </div>

      <h2 style={{ color: theme.textColor }}>Quick Stats</h2>
      <div style={gridStyle}>
        <div style={statCardStyle}>
          <div style={statLabelStyle}>Total Employees</div>
          <div style={statNumberStyle}>{stats.total}</div>
        </div>

        <div style={statCardStyle}>
          <div style={statLabelStyle}>Average Salary</div>
          <div style={statNumberStyle}>${(stats.averageSalary / 1000).toFixed(1)}K</div>
        </div>

        <div style={statCardStyle}>
          <div style={statLabelStyle}>Departments</div>
          <div style={statNumberStyle}>{stats.departments.length}</div>
        </div>
      </div>

      <div style={{
        marginTop: '2rem',
        backgroundColor: theme.surfaceColor,
        padding: '1.5rem',
        borderRadius: '8px',
        border: `1px solid ${theme.borderColor}`
      }}>
        <h3 style={{ color: theme.textColor, marginTop: 0 }}>Features</h3>
        <ul style={{ color: theme.textColor, lineHeight: '1.8' }}>
          <li>🔐 Secure authentication with role-based access</li>
          <li>🌓 Light/Dark theme switching with persistence</li>
          <li>👥 Manage employee records with CRUD operations</li>
          <li>📊 View analytics and statistics</li>
          <li>⚙️ Customize application settings</li>
          <li>💾 All data persisted using Context API</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
