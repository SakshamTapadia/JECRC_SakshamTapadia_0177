import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { NotificationProvider } from './context/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <ThemeProvider>
        <AuthProvider>
          <EmployeeProvider>
            <App />
          </EmployeeProvider>
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  </React.StrictMode>,
);
