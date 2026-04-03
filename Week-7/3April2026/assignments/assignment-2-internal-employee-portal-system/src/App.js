import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";
import { Ban } from "./components/Icons";

// Renders the correct page based on auth state and the user's role
function Router() {
  const { user, page } = useAuth();

  if (!user) return <Login />;

  if (page === "dashboard" && user.role !== "admin") {
    return (
      <div className="page center-page">
        <div className="not-found-card">
          <Ban size={40} />
          <h2>Access Denied</h2>
          <p>You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (page === "dashboard") return <AdminDashboard />;
  if (page === "profile")   return <EmployeeProfile />;

  return null;
}

// Root component that wires together all context providers and the router
export default function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <div className="app-shell">
          <Alert />
          <Navbar />
          <Router />
        </div>
      </EmployeeProvider>
    </AuthProvider>
  );
}
