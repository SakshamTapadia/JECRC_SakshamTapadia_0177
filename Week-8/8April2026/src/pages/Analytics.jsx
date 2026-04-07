import React from 'react';
import { useEmployee } from '../context/EmployeeContext';

export const Analytics = () => {
  const { employees, getDepartments } = useEmployee();

  // Calculate department statistics
  const departmentStats = getDepartments().map(dept => {
    const deptEmployees = employees.filter(emp => emp.department === dept);
    const avgSalary = deptEmployees.length > 0
      ? deptEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / deptEmployees.length
      : 0;

    return {
      department: dept,
      headcount: deptEmployees.length,
      avgSalary: Math.round(avgSalary),
      totalSalary: deptEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0),
    };
  });

  // Calculate salary ranges
  const salaryRanges = {
    '0-50k': employees.filter(emp => emp.salary < 50000).length,
    '50k-100k': employees.filter(emp => emp.salary >= 50000 && emp.salary < 100000).length,
    '100k-150k': employees.filter(emp => emp.salary >= 100000 && emp.salary < 150000).length,
    '150k+': employees.filter(emp => emp.salary >= 150000).length,
  };

  // Role distribution
  const roleCounts = {};
  employees.forEach(emp => {
    roleCounts[emp.role] = (roleCounts[emp.role] || 0) + 1;
  });

  return (
    <div>
      <h2>Analytics & Reports</h2>

      <div className="card">
        <h3 className="card-title">📊 Department Statistics</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Headcount</th>
              <th>Average Salary</th>
              <th>Total Salary</th>
            </tr>
          </thead>
          <tbody>
            {departmentStats.map(stat => (
              <tr key={stat.department}>
                <td>{stat.department}</td>
                <td>{stat.headcount}</td>
                <td>${stat.avgSalary.toLocaleString()}</td>
                <td>${stat.totalSalary.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 className="card-title">💰 Salary Range Distribution</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {Object.entries(salaryRanges).map(([range, count]) => (
            <div key={range} style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                {count}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                {range}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">👔 Role Distribution</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {Object.entries(roleCounts).map(([role, count]) => (
            <div key={role} style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                {count}
              </div>
              <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                {role}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">📈 Key Metrics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>Total Salary Expense</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
              ${employees.reduce((sum, emp) => sum + (emp.salary || 0), 0).toLocaleString()}
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>Average Salary Per Employee</h4>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
              ${Math.round(employees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / (employees.length || 1)).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
