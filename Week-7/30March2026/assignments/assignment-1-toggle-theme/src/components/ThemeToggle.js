import { useState } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    backgroundColor: isDark ? '#121212' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: isDark ? '#ffffff' : '#121212',
    color: isDark ? '#121212' : '#ffffff',
    border: 'none',
    borderRadius: '6px',
  };

  return (
    <div style={theme}>
      <h2>Mode: {isDark ? 'Dark' : 'Light'}</h2>
      <button style={buttonStyle} onClick={() => setIsDark(!isDark)}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}

export default ThemeToggle;
