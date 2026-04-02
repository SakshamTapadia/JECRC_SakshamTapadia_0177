import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (!agreed) { setError('Please accept the terms and conditions.'); return; }
    setLoading(true);
    setTimeout(() => {
      login(form.email, form.name);
      navigate('/dashboard');
    }, 700);
  }

  const strength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2
    : 3;

  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#10b981'];

  return (
    <div>
      <h2 style={s.title}>Create your account</h2>
      <p style={s.sub}>Join 50,000+ ShopCo customers today — it is free!</p>

      {error && <div style={s.errorBox}>⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input className="input" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required autoFocus />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              className="input"
              name="password"
              type={showPw ? 'text' : 'password'}
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              required
              style={{ paddingRight: '44px' }}
            />
            <button type="button" onClick={() => setShowPw(v => !v)} style={s.eyeBtn}>
              {showPw ? '🙈' : '👁️'}
            </button>
          </div>
          {form.password && (
            <div style={s.strengthWrap}>
              <div style={s.strengthTrack}>
                <div style={{ ...s.strengthFill, width: `${(strength / 3) * 100}%`, backgroundColor: strengthColor[strength] }} />
              </div>
              <span style={{ ...s.strengthLabel, color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            className="input"
            name="confirm"
            type={showPw ? 'text' : 'password'}
            placeholder="Repeat your password"
            value={form.confirm}
            onChange={handleChange}
            required
            style={{ borderColor: form.confirm && form.confirm !== form.password ? '#ef4444' : '' }}
          />
          {form.confirm && form.confirm !== form.password && (
            <span className="form-error">Passwords do not match</span>
          )}
        </div>

        <label style={s.termsRow}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: '#6366f1', flexShrink: 0 }}
          />
          <span style={{ fontSize: '13px', color: '#475569' }}>
            I agree to the{' '}
            <a href="#" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: '600' }}>Privacy Policy</a>
          </span>
        </label>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '15px', marginTop: '16px' }}
        >
          {loading ? 'Creating account...' : 'Create Account →'}
        </button>
      </form>

      <p style={s.footer}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#6366f1', fontWeight: '700', textDecoration: 'none' }}>Sign in</Link>
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
  eyeBtn: {
    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px',
  },
  strengthWrap: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' },
  strengthTrack: { flex: 1, height: '4px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' },
  strengthFill: { height: '100%', borderRadius: '999px', transition: 'width .3s, background-color .3s' },
  strengthLabel: { fontSize: '12px', fontWeight: '600', minWidth: '40px' },
  termsRow: { display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', marginBottom: '4px' },
  footer: { textAlign: 'center', fontSize: '14px', color: '#64748b', marginTop: '20px' },
};

export default Register;
