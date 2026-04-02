import { Outlet, Link } from 'react-router-dom';

function AuthLayout() {
  return (
    <div style={s.wrapper}>

      {/* Left — branding panel */}
      <div style={s.left}>
        <div style={s.leftContent}>
          <div style={s.logoRow}>
            <span style={s.logoBox}>S</span>
            <span style={s.logoText}>ShopCo</span>
          </div>
          <h2 style={s.tagline}>The smartest way<br />to shop online.</h2>
          <p style={s.tagSub}>
            Thousands of premium products, lightning-fast delivery, and world-class support — all in one place.
          </p>
          <div style={s.features}>
            {[
              ['🚀', 'Free shipping on orders over $50'],
              ['🔒', 'Secure checkout & easy returns'],
              ['⭐', '50,000+ happy customers'],
              ['🎧', '24/7 customer support'],
            ].map(([icon, text]) => (
              <div key={text} style={s.featureRow}>
                <span style={s.featureIcon}>{icon}</span>
                <span style={s.featureText}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div style={s.right}>
        <div style={s.card}>
          <Link to="/" style={s.backLink}>← Back to store</Link>
          <Outlet />
        </div>
      </div>

    </div>
  );
}

const s = {
  wrapper: { minHeight: '100vh', display: 'flex' },
  left: {
    flex: '0 0 44%',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 48px',
  },
  leftContent: { maxWidth: '380px' },
  logoRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' },
  logoBox: {
    width: '40px', height: '40px', borderRadius: '10px',
    backgroundColor: '#6366f1', display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', fontWeight: '800', fontSize: '20px', color: '#fff',
  },
  logoText: { fontSize: '22px', fontWeight: '800', color: '#fff' },
  tagline: { fontSize: '30px', fontWeight: '800', color: '#fff', lineHeight: '1.25', marginBottom: '14px' },
  tagSub: { fontSize: '15px', color: '#94a3b8', lineHeight: '1.7', marginBottom: '32px' },
  features: { display: 'flex', flexDirection: 'column', gap: '14px' },
  featureRow: { display: 'flex', alignItems: 'center', gap: '12px' },
  featureIcon: {
    width: '36px', height: '36px', borderRadius: '8px',
    backgroundColor: 'rgba(99,102,241,.25)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '16px', flexShrink: 0,
  },
  featureText: { color: '#cbd5e1', fontSize: '14px' },
  right: {
    flex: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f8fafc', padding: '40px 24px',
  },
  card: {
    backgroundColor: '#fff', borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,.08)',
    padding: '40px', width: '100%', maxWidth: '420px',
  },
  backLink: { display: 'block', color: '#64748b', textDecoration: 'none', fontSize: '13px', marginBottom: '28px' },
};

export default AuthLayout;
