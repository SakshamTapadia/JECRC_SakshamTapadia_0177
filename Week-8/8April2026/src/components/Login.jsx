import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@company.com');
  const [password, setPassword] = useState('password123');
  const { login } = useAuth();
  const { error: showError } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        onLoginSuccess();
      } else {
        showError(result.message);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Employee Portal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="button btn-primary" style={{ width: '100%' }} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#666' }}>
        <p><strong>Demo Credentials:</strong></p>
        <p>Admin: admin@company.com</p>
        <p>Manager: manager@company.com</p>
        <p>Employee: employee@company.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  );
};
