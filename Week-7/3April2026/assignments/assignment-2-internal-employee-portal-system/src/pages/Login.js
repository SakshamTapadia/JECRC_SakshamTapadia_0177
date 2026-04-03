import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Building, Lock, ClipboardList, BarChart, Shield, Eye, EyeOff } from "../components/Icons";

// Checks that email is valid format and password meets minimum length
function validate(email, password) {
  const errs = {};
  if (!email.trim())                              errs.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email.";
  if (!password)                                  errs.password = "Password is required.";
  else if (password.length < 6)                   errs.password = "Password must be at least 6 characters.";
  return errs;
}

// Renders the login page with form validation and demo credential shortcuts
export default function Login() {
  const { login, loading } = useAuth();
  const [form, setForm]   = useState({ email: "", password: "" });
  const [errs, setErrs]   = useState({});
  const [show, setShow]   = useState(false);

  // Updates the form field and clears its error on change
  const change = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errs[name]) setErrs(p => ({ ...p, [name]: undefined }));
  };

  // Validates inputs then calls the login function from context
  const submit = async (e) => {
    e.preventDefault();
    const validation = validate(form.email, form.password);
    if (Object.keys(validation).length) { setErrs(validation); return; }
    await login(form.email, form.password);
  };

  // Pre-fills the login form with a demo account's credentials
  const fillDemo = (email, password) => setForm({ email, password });

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-branding">
          <Building size={40} />
          <h1>CorpPortal</h1>
          <p>Internal Employee Management System</p>
        </div>
        <div className="login-features">
          <div className="lf-item"><Lock size={16} /> Secure role-based access</div>
          <div className="lf-item"><ClipboardList size={16} /> Employee record management</div>
          <div className="lf-item"><BarChart size={16} /> Real-time dashboard</div>
          <div className="lf-item"><Shield size={16} /> Protected routes &amp; audit</div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Sign In</h2>
          <p className="login-sub">Enter your credentials to access the portal</p>

          <form onSubmit={submit} noValidate>
            <div className="field">
              <label>Email Address</label>
              <input
                type="email" name="email" value={form.email}
                onChange={change} placeholder="you@corp.com"
                className={errs.email ? "input-error" : ""}
              />
              {errs.email && <span className="field-error">{errs.email}</span>}
            </div>
            <div className="field">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type={show ? "text" : "password"} name="password" value={form.password}
                  onChange={change} placeholder="••••••••"
                  className={errs.password ? "input-error" : ""}
                />
                <button type="button" className="eye-btn" onClick={() => setShow(s => !s)}>
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errs.password && <span className="field-error">{errs.password}</span>}
            </div>
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? <><span className="spinner-sm" /> Signing in...</> : "Sign In"}
            </button>
          </form>

          <div className="demo-creds">
            <p className="demo-title">Demo Credentials</p>
            <div className="demo-grid">
              <button className="demo-btn" onClick={() => fillDemo("admin@corp.com", "admin123")}>
                <span className="demo-badge badge-admin">Admin</span>
                <span>admin@corp.com</span>
              </button>
              <button className="demo-btn" onClick={() => fillDemo("john@corp.com", "emp123")}>
                <span className="demo-badge badge-employee">Employee</span>
                <span>john@corp.com</span>
              </button>
              <button className="demo-btn" onClick={() => fillDemo("jane@corp.com", "emp123")}>
                <span className="demo-badge badge-employee">Employee</span>
                <span>jane@corp.com</span>
              </button>
              <button className="demo-btn" onClick={() => fillDemo("alice@corp.com", "emp123")}>
                <span className="demo-badge badge-employee">Employee</span>
                <span>alice@corp.com</span>
              </button>
            </div>
            <p className="demo-note">All employee passwords: <strong>emp123</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
