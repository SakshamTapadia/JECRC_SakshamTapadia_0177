import { createContext, useContext, useState, useCallback } from "react";
import { USERS } from "../data/seed";

// Holds the authenticated user state and exposes auth actions globally
const AuthContext = createContext(null);

// Wraps the app and provides login, logout, navigation, and alert state
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [page, setPage]       = useState("login");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert]     = useState(null); // { type: 'success'|'error'|'info', msg }

  // Shows a toast alert and auto-dismisses it after 3.5 seconds
  const showAlert = useCallback((type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3500);
  }, []);

  // Changes the current active page without a full page reload
  const navigate = useCallback((p) => setPage(p), []);

  // Validates credentials against seed data and sets the authenticated user
  const login = useCallback(async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900)); // simulate network
    const found = USERS.find(u => u.email === email && u.password === password);
    setLoading(false);
    if (!found) {
      showAlert("error", "Invalid email or password.");
      return false;
    }
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    setPage(safeUser.role === "admin" ? "dashboard" : "profile");
    showAlert("success", `Welcome back, ${safeUser.name}!`);
    return true;
  }, [showAlert]);

  // Clears the user session and redirects to the login page
  const logout = useCallback(() => {
    setUser(null);
    setPage("login");
    showAlert("info", "You have been logged out.");
  }, [showAlert]);

  return (
    <AuthContext.Provider value={{ user, page, loading, alert, login, logout, navigate, showAlert }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access auth context in any component
export const useAuth = () => useContext(AuthContext);
