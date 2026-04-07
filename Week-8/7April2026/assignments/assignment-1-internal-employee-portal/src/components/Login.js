import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import './Login.css';

const Login = () => {
  const { login, loading } = useAuth();
  const { theme, isDark } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    setError('');
    login(username, password);
  };

  const containerStyle = {
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s ease'
  };

  const formStyle = {
    backgroundColor: theme.surfaceColor,
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '4px',
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: theme.primaryColor,
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1,
    transition: 'opacity 0.3s'
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Employee Portal</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            disabled={loading}
          />
          {error && <p style={{ color: '#e74c3c', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: theme.secondaryColor }}>
            Demo: Try any username with password 'password'
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
