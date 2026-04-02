import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 3) { setError('Password must be at least 3 characters.'); return; }
    setLoading(true);
    setTimeout(() => {
      login(email);
      navigate('/dashboard');
    }, 600);
  }

  return (
    <div>
      <h2 style={s.title}>Welcome back</h2>
      <p style={s.sub}>Sign in to your ShopCo account</p>

      {error && (
        <div style={s.errorBox}>⚠️ {error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label className="form-label" style={{ margin: 0 }}>Password</label>
            <a href="#" style={s.forgotLink}>Forgot password?</a>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              className="input"
              type={showPw ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ paddingRight: '44px' }}
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              style={s.eyeBtn}
              title={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div style={s.rememberRow}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#475569' }}>
            <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#6366f1' }} />
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '15px', marginTop: '4px' }}
        >
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>
      </form>

      <div style={s.dividerRow}>
        <span style={s.dividerLine} /><span style={s.dividerText}>or continue with</span><span style={s.dividerLine} />
      </div>

      <div style={s.socialRow}>
        {[['G', 'Google', '#4285F4'], ['f', 'Facebook', '#1877F2']].map(([icon, label, color]) => (
          <button key={label} type="button" style={{ ...s.socialBtn, borderColor: color + '44' }}>
            <span style={{ fontWeight: '900', color }}>{icon}</span> {label}
          </button>
        ))}
      </div>

      <p style={s.footer}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#6366f1', fontWeight: '700', textDecoration: 'none' }}>
          Sign up free
        </Link>
      </p>
    </div>
  );
}

const s = {
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '6px' },
  sub: { fontSize: '14px', color: '#64748b', marginBottom: '24px' },
  errorBox: {
    background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px',
    padding: '10px 14px', fontSize: '14px', color: '#991b1b', marginBottom: '18px',
  },
  forgotLink: { fontSize: '13px', color: '#6366f1', textDecoration: 'none', fontWeight: '600' },
  eyeBtn: {
    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '0',
  },
  rememberRow: { marginBottom: '20px' },
  dividerRow: { display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0 16px' },
  dividerLine: { flex: 1, height: '1px', backgroundColor: '#e2e8f0' },
  dividerText: { fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' },
  socialRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' },
  socialBtn: {
    padding: '9px', border: '1.5px solid #e2e8f0', borderRadius: '8px',
    background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#1e293b',
  },
  footer: { textAlign: 'center', fontSize: '14px', color: '#64748b' },
};

export default Login;
