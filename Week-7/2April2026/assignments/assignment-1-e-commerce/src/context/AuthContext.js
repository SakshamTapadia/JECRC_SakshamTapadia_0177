import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('shopco_user');
    return saved ? JSON.parse(saved) : null;
  });

  function login(email, name) {
    const u = { email, name: name || email.split('@')[0], username: email.split('@')[0] };
    localStorage.setItem('shopco_user', JSON.stringify(u));
    setUser(u);
  }

  function logout() {
    localStorage.removeItem('shopco_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
