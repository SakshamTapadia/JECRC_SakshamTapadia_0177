import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  employees: [
    { id: 'e1', name: 'Aarav Mehta', department: 'Engineering', role: 'Frontend Developer', email: 'aarav@company.com' },
    { id: 'e2', name: 'Diya Sharma', department: 'Human Resources', role: 'HR Manager', email: 'diya@company.com' },
    { id: 'e3', name: 'Kabir Singh', department: 'Finance', role: 'Financial Analyst', email: 'kabir@company.com' },
  ],
  selectedEmployee: null,
  searchTerm: '',
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: {
      reducer: (state, action) => {
        state.employees.push(action.payload);
      },
      prepare: (employeeData) => ({
        payload: {
          id: nanoid(),
          ...employeeData,
        },
      }),
    },
    updateEmployee: (state, action) => {
      const { id, updates } = action.payload;
      const existing = state.employees.find((emp) => emp.id === id);
      if (existing) {
        Object.assign(existing, updates);
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter((emp) => emp.id !== action.payload);
      if (state.selectedEmployee && state.selectedEmployee.id === action.payload) {
        state.selectedEmployee = null;
      }
    },
    selectEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  selectEmployee,
  clearSelectedEmployee,
  setSearchTerm,
} = employeeSlice.actions;

export const selectEmployeesState = (state) => state.employees;
export const selectAllEmployees = (state) => state.employees.employees;
export const selectSelectedEmployee = (state) => state.employees.selectedEmployee;
export const selectSearchTerm = (state) => state.employees.searchTerm;

export default employeeSlice.reducer;
