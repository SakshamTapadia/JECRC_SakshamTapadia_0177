import React from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { employees, getTotalEmployees, getAverageSalary, getDepartments } = useEmployee();
  const { user } = useAuth();

  const statCards = [
    {
      label: 'Total Employees',
      value: getTotalEmployees(),
      icon: '👥',
    },
    {
      label: 'Departments',
      value: getDepartments().length,
      icon: '🏢',
    },
    {
      label: 'Average Salary',
      value: `$${Math.round(getAverageSalary()).toLocaleString()}`,
      icon: '💰',
    },
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Welcome back, <strong>{user?.name}</strong>! Here's an overview of your company.
      </p>

      <div className="stats-grid">
        {statCards.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="card-title">Recent Employees</h3>
        {employees.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(0, 5).map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </div>
  );
};
