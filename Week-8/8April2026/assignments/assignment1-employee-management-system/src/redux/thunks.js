import {
  addEmployee,
  clearSelectedEmployee,
  deleteEmployee,
  updateEmployee,
} from './employeeSlice';
import { authenticateUser, loginFailure, loginSuccess, logout } from './authSlice';
import { setLoading, showNotification } from './uiSlice';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  await wait(400);

  const user = authenticateUser(credentials);
  if (user) {
    dispatch(loginSuccess(user));
    dispatch(showNotification({ type: 'success', message: `Welcome back, ${user.username}!` }));
  } else {
    dispatch(loginFailure('Invalid username or password'));
    dispatch(showNotification({ type: 'error', message: 'Login failed. Check credentials.' }));
  }

  dispatch(setLoading(false));
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  await wait(250);
  dispatch(logout());
  dispatch(showNotification({ type: 'info', message: 'You have been logged out.' }));
  dispatch(setLoading(false));
};

export const createEmployee = (employeeData) => async (dispatch) => {
  dispatch(setLoading(true));
  await wait(300);
  dispatch(addEmployee(employeeData));
  dispatch(showNotification({ type: 'success', message: 'Employee added successfully.' }));
  dispatch(setLoading(false));
};

export const editEmployee = ({ id, updates }) => async (dispatch) => {
  dispatch(setLoading(true));
  await wait(300);
  dispatch(updateEmployee({ id, updates }));
  dispatch(clearSelectedEmployee());
  dispatch(showNotification({ type: 'success', message: 'Employee updated successfully.' }));
  dispatch(setLoading(false));
};

export const removeEmployee = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  await wait(300);
  dispatch(deleteEmployee(id));
  dispatch(showNotification({ type: 'success', message: 'Employee deleted successfully.' }));
  dispatch(setLoading(false));
};
