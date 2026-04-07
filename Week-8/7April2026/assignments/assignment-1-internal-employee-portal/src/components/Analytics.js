import React from 'react';
import { useEmployee } from '../hooks/useEmployee';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import './Analytics.css';

const Analytics = () => {
  const { stats } = useEmployee();
  const { theme } = useTheme();
  const { user } = useAuth();

  const containerStyle = {
    padding: '2rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  const cardStyle = {
    backgroundColor: theme.surfaceColor,
    padding: '1.5rem',
    borderRadius: '8px',
    border: `1px solid ${theme.borderColor}`
  };

  const cardTitleStyle = {
    color: theme.secondaryColor,
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    textTransform: 'uppercase'
  };

  const cardValueStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: theme.primaryColor
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: theme.textColor, marginBottom: '2rem' }}>Analytics Dashboard</h2>

      <div style={gridStyle}>
        <div style={cardStyle}>
          <div style={cardTitleStyle}>Total Employees</div>
          <div style={cardValueStyle}>{stats.total}</div>
        </div>

        <div style={cardStyle}>
          <div style={cardTitleStyle}>Average Salary</div>
          <div style={cardValueStyle}>${stats.averageSalary.toLocaleString()}</div>
        </div>

        <div style={cardStyle}>
          <div style={cardTitleStyle}>Departments</div>
          <div style={cardValueStyle}>{stats.departments.length}</div>
        </div>

        <div style={cardStyle}>
          <div style={cardTitleStyle}>Portal Role</div>
          <div style={cardValueStyle}>{user?.role?.toUpperCase()}</div>
        </div>
      </div>

      <div style={{
        backgroundColor: theme.surfaceColor,
        padding: '1.5rem',
        borderRadius: '8px',
        border: `1px solid ${theme.borderColor}`
      }}>
        <h3 style={{ color: theme.textColor, marginTop: 0 }}>Departments</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {stats.departments.map((dept) => (
            <span
              key={dept}
              style={{
                backgroundColor: theme.primaryColor,
                color: '#ffffff',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}
            >
              {dept}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
