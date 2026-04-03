import { useAuth } from "../context/AuthContext";
import { Building, LogOut } from "./Icons";

export default function Navbar() {
  const { user, logout } = useAuth();
  if (!user) return null;

  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Building size={20} />
        <span className="brand-text">CorpPortal</span>
        <span className={`role-badge badge-${user.role}`}>{user.role}</span>
      </div>
      <div className="navbar-user">
        <div className="avatar">{initials}</div>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </div>
        <button className="btn-logout" onClick={logout}>
          <LogOut size={14} /> Logout
        </button>
      </div>
    </header>
  );
}
