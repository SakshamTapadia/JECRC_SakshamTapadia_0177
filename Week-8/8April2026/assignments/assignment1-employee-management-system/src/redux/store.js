import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import loggerMiddleware from './middleware/loggerMiddleware';
import persistenceMiddleware from './middleware/persistenceMiddleware';
import { loadState } from './localStorage';

const persistedState = loadState();

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  preloadedState: {
    employees: persistedState?.employees || undefined,
    auth: {
      isAuthenticated: persistedState?.auth?.isAuthenticated || false,
      user: persistedState?.auth?.user || null,
      error: null,
    },
    ui: {
      theme: persistedState?.ui?.theme || 'light',
      loading: false,
      notification: null,
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware, persistenceMiddleware),
});

export default store;
