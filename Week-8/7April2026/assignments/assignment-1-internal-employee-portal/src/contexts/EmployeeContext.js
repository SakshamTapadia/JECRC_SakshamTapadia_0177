import React, { createContext, useState, useCallback, useMemo } from 'react';

export const EmployeeContext = createContext();

// Mock initial employee data
const MOCK_EMPLOYEES = [
  { id: 1, name: 'John Doe', email: 'john@company.com', department: 'Engineering', salary: 85000 },
  { id: 2, name: 'Jane Smith', email: 'jane@company.com', department: 'Design', salary: 75000 },
  { id: 3, name: 'Mike Johnson', email: 'mike@company.com', department: 'Sales', salary: 70000 },
  { id: 4, name: 'Sarah Williams', email: 'sarah@company.com', department: 'HR', salary: 72000 }
];

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addEmployee = useCallback((employee) => {
    setLoading(true);
    try {
      const newEmployee = {
        ...employee,
        id: Math.max(...employees.map(e => e.id), 0) + 1
      };
      setEmployees(prev => [...prev, newEmployee]);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [employees]);

  const updateEmployee = useCallback((id, updatedData) => {
    setLoading(true);
    try {
      setEmployees(prev =>
        prev.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp)
      );
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const deleteEmployee = useCallback((id) => {
    setLoading(true);
    try {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const getEmployeeById = useCallback((id) => {
    return employees.find(emp => emp.id === id);
  }, [employees]);

  const stats = useMemo(() => ({
    total: employees.length,
    averageSalary: employees.length > 0
      ? Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length)
      : 0,
    departments: [...new Set(employees.map(emp => emp.department))]
  }), [employees]);

  const value = {
    employees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    stats
  };

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
};
