import { createSlice } from '@reduxjs/toolkit';

const users = [
  { username: 'admin', password: 'admin123', role: 'Administrator' },
  { username: 'user', password: 'user123', role: 'User' },
];

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout, clearAuthError } = authSlice.actions;

export const authenticateUser = ({ username, password }) => {
  const matched = users.find(
    (user) => user.username === username.trim() && user.password === password
  );

  if (!matched) {
    return null;
  }

  return {
    username: matched.username,
    role: matched.role,
    loginTime: new Date().toISOString(),
  };
};

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
