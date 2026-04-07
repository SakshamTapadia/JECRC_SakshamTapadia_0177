import React, { useMemo } from 'react';
import { useEmployee } from '../hooks/useEmployee';
import { useTheme } from '../hooks/useTheme';
import { useSettings } from '../hooks/useSettings';
import './EmployeeList.css';

const EmployeeList = ({ onEdit }) => {
  const { employees, deleteEmployee, loading } = useEmployee();
  const { theme } = useTheme();
  const { settings } = useSettings();

  const paginatedEmployees = useMemo(() => {
    const itemsPerPage = settings.itemsPerPage || 10;
    return employees.slice(0, itemsPerPage);
  }, [employees, settings.itemsPerPage]);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    backgroundColor: theme.surfaceColor
  };

  const thStyle = {
    padding: '1rem',
    textAlign: 'left',
    borderBottom: `2px solid ${theme.borderColor}`,
    fontWeight: 'bold',
    color: theme.textColor
  };

  const tdStyle = {
    padding: '1rem',
    borderBottom: `1px solid ${theme.borderColor}`,
    color: theme.textColor
  };

  const trHoverStyle = {
    backgroundColor: theme.isDark ? '#333333' : '#f9f9f9'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  };

  return (
    <div>
      {employees.length === 0 ? (
        <p style={{ color: theme.secondaryColor, textAlign: 'center', marginTop: '2rem' }}>
          No employees yet. Add one to get started.
        </p>
      ) : (
        <>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: theme.surfaceColor }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Salary</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee) => (
                <tr key={employee.id} style={trHoverStyle}>
                  <td style={tdStyle}>{employee.name}</td>
                  <td style={tdStyle}>{employee.email}</td>
                  <td style={tdStyle}>{employee.department}</td>
                  <td style={tdStyle}>${employee.salary.toLocaleString()}</td>
                  <td style={tdStyle}>
                    <button
                      style={{
                        ...buttonStyle,
                        backgroundColor: theme.primaryColor,
                        color: '#ffffff'
                      }}
                      onClick={() => onEdit(employee.id)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#e74c3c',
                        color: '#ffffff'
                      }}
                      onClick={() => deleteEmployee(employee.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {employees.length > settings.itemsPerPage && (
            <p style={{ textAlign: 'center', marginTop: '1rem', color: theme.secondaryColor }}>
              Showing {paginatedEmployees.length} of {employees.length} employees
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeList;
