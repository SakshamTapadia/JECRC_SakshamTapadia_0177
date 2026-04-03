import { createContext, useContext, useState, useCallback } from "react";
import { INITIAL_EMPLOYEES } from "../data/seed";

// Holds the employee list state and exposes CRUD operations globally
const EmployeeContext = createContext(null);

let nextId = 7; // auto-increment after seed

// Wraps the app and provides in-memory employee CRUD to all child components
export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  // Adds a new employee to the list with an auto-generated ID
  const addEmployee = useCallback((data) => {
    const emp = { ...data, id: `E00${nextId++}` };
    setEmployees(prev => [...prev, emp]);
    return emp;
  }, []);

  // Merges new data into the matching employee record by ID
  const updateEmployee = useCallback((id, data) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  }, []);

  // Removes the employee with the given ID from the list
  const deleteEmployee = useCallback((id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  }, []);

  // Returns a single employee object by ID, or null if not found
  const getEmployee = useCallback((id) => {
    return employees.find(e => e.id === id) || null;
  }, [employees]);

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, getEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

// Custom hook to access employee context in any component
export const useEmployees = () => useContext(EmployeeContext);
