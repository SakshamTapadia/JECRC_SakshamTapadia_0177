import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize with mock data
  useEffect(() => {
    const mockEmployees = [
      { id: 1, name: 'Alice Johnson', email: 'alice@company.com', role: 'Senior Developer', department: 'Engineering', salary: 120000, joinDate: '2020-01-15' },
      { id: 2, name: 'Bob Smith', email: 'bob@company.com', role: 'Product Manager', department: 'Product', salary: 110000, joinDate: '2019-05-20' },
      { id: 3, name: 'Carol Davis', email: 'carol@company.com', role: 'Designer', department: 'Design', salary: 95000, joinDate: '2021-03-10' },
      { id: 4, name: 'David Brown', email: 'david@company.com', role: 'DevOps Engineer', department: 'Infrastructure', salary: 130000, joinDate: '2018-11-05' },
      { id: 5, name: 'Eve Wilson', email: 'eve@company.com', role: 'QA Engineer', department: 'Quality', salary: 90000, joinDate: '2022-02-01' },
    ];
    setEmployees(mockEmployees);
    setLoading(false);
  }, []);

  const addEmployee = (employeeData) => {
    const newEmployee = {
      id: Date.now(),
      ...employeeData,
    };
    setEmployees([...employees, newEmployee]);
    return newEmployee;
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(employees.map(emp => (emp.id === id ? { ...emp, ...updatedData } : emp)));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === id);
  };

  const searchEmployees = (query) => {
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(query.toLowerCase()) ||
      emp.email.toLowerCase().includes(query.toLowerCase()) ||
      emp.department.toLowerCase().includes(query.toLowerCase())
    );
  };

  const value = {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    searchEmployees,
    getTotalEmployees: () => employees.length,
    getTotalSalary: () => employees.reduce((sum, emp) => sum + (emp.salary || 0), 0),
    getAverageSalary: () => employees.length > 0 ? employees.reduce((sum, emp) => sum + (emp.salary || 0), 0) / employees.length : 0,
    getDepartments: () => [...new Set(employees.map(emp => emp.department))],
  };

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};
