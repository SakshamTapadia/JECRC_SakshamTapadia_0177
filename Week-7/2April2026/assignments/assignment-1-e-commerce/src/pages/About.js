function About() {
  const stats = [
    { num: '2020', label: 'Founded' },
    { num: '10k+', label: 'Products' },
    { num: '50k+', label: 'Customers' },
    { num: '28+', label: 'Countries' },
  ];

  const values = [
    { icon: '🎯', title: 'Customer First', desc: 'Every decision we make starts with the question: is this great for our customers? Their satisfaction is our north star.' },
    { icon: '✅', title: 'Uncompromising Quality', desc: 'We partner only with trusted manufacturers and test every product before listing it. No shortcuts.' },
    { icon: '🌱', title: 'Sustainability', desc: 'We are committed to reducing our carbon footprint through eco-friendly packaging and carbon-offset shipping.' },
  ];

  const team = [
    { name: 'Alex Chen', role: 'CEO & Co-Founder', color: '#6366f1' },
    { name: 'Jordan Lee', role: 'CTO & Co-Founder', color: '#0ea5e9' },
    { name: 'Priya Sharma', role: 'Head of Operations', color: '#10b981' },
    { name: 'Marcus Webb', role: 'Head of Design', color: '#f59e0b' },
  ];

  return (
    <div className="fade-in-up">

      {/* Hero */}
      <div style={s.hero}>
        <span className="badge badge-primary" style={{ marginBottom: '16px' }}>Our Story</span>
        <h1 style={s.heroTitle}>We believe everyone deserves<br />premium tech, affordably.</h1>
        <p style={s.heroSub}>
          ShopCo started in a garage in 2020 with a simple idea: make premium tech accessible to everyone — without compromise.
        </p>
      </div>

      {/* Stats */}
      <div style={s.statsRow}>
        {stats.map(({ num, label }) => (
          <div key={label} className="card" style={s.statCard}>
            <div style={s.statNum}>{num}</div>
            <div style={s.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      {/* Story */}
      <div style={s.section}>
        <div style={s.storyGrid}>
          <div>
            <p className="section-label">How we started</p>
            <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '16px', color: '#1e293b' }}>From a garage to 50,000 customers</h2>
            <p style={s.storyText}>
              ShopCo was founded in 2020 by Alex and Jordan after they grew frustrated with the difficulty of finding quality tech products at honest prices online. Too many platforms hid fees, shipped slow, and offered no real support.
            </p>
            <p style={s.storyText}>
              We built ShopCo to be different. Every product is hand-picked, every supplier is vetted, and every customer is treated like a human being — not a transaction number.
            </p>
            <p style={s.storyText}>
              Today we serve over 50,000 customers in 28 countries, and we are just getting started.
            </p>
          </div>
          <div style={s.imageBox}>
            <div style={s.imagePlaceholder}>
              <span style={{ fontSize: '64px' }}>🏢</span>
              <p style={{ color: '#94a3b8', marginTop: '12px', fontSize: '14px' }}>ShopCo HQ — San Francisco</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={s.section}>
        <p className="section-label" style={{ textAlign: 'center' }}>What drives us</p>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Our Core Values</h2>
        <div className="grid-3">
          {values.map(v => (
            <div key={v.title} className="card card-hover" style={s.valueCard}>
              <div style={s.valueIcon}>{v.icon}</div>
              <h3 style={s.valueTitle}>{v.title}</h3>
              <p style={s.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={s.section}>
        <p className="section-label" style={{ textAlign: 'center' }}>The people</p>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Meet the Team</h2>
        <div className="grid-4">
          {team.map(m => (
            <div key={m.name} className="card card-hover" style={s.teamCard}>
              <div style={{ ...s.teamAvatar, backgroundColor: m.color }}>{m.name[0]}</div>
              <h3 style={s.teamName}>{m.name}</h3>
              <p style={s.teamRole}>{m.role}</p>
              <div style={s.teamSocials}>
                <span style={s.socialChip}>in</span>
                <span style={s.socialChip}>𝕏</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={s.cta}>
        <h2 style={s.ctaTitle}>Join the ShopCo community</h2>
        <p style={s.ctaSub}>50,000+ happy customers can not be wrong. Find your next favourite product today.</p>
        <a href="/products" className="btn btn-primary btn-lg">Browse Products →</a>
      </div>

    </div>
  );
}

const s = {
  hero: {
    background: 'linear-gradient(135deg, #0f172a, #1e293b 60%, #312e81)',
    borderRadius: '16px', padding: '56px 48px', marginBottom: '32px', color: '#fff',
  },
  heroTitle: { fontSize: '36px', fontWeight: '900', color: '#fff', lineHeight: '1.2', marginBottom: '16px' },
  heroSub: { fontSize: '17px', color: '#94a3b8', lineHeight: '1.7', maxWidth: '540px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' },
  statCard: { padding: '28px', textAlign: 'center' },
  statNum: { fontSize: '36px', fontWeight: '900', color: '#6366f1', marginBottom: '6px' },
  statLabel: { fontSize: '14px', color: '#64748b', fontWeight: '500' },
  section: { marginBottom: '48px' },
  storyGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' },
  storyText: { color: '#475569', lineHeight: '1.75', marginBottom: '14px', fontSize: '15px' },
  imageBox: {},
  imagePlaceholder: {
    background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
    borderRadius: '16px', height: '260px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  },
  valueCard: { padding: '32px 24px' },
  valueIcon: { fontSize: '32px', marginBottom: '16px' },
  valueTitle: { fontSize: '17px', fontWeight: '700', color: '#1e293b', marginBottom: '10px' },
  valueDesc: { fontSize: '14px', color: '#64748b', lineHeight: '1.7' },
  teamCard: { padding: '28px', textAlign: 'center' },
  teamAvatar: {
    width: '64px', height: '64px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', fontWeight: '800', color: '#fff', margin: '0 auto 14px',
  },
  teamName: { fontWeight: '700', fontSize: '15px', color: '#1e293b', marginBottom: '4px' },
  teamRole: { fontSize: '13px', color: '#64748b', marginBottom: '14px' },
  teamSocials: { display: 'flex', justifyContent: 'center', gap: '8px' },
  socialChip: {
    padding: '3px 10px', borderRadius: '6px', fontSize: '12px',
    backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'pointer', fontWeight: '700',
  },
  cta: {
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    borderRadius: '16px', padding: '56px', textAlign: 'center',
  },
  ctaTitle: { fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '10px' },
  ctaSub: { color: '#c7d2fe', fontSize: '16px', marginBottom: '28px' },
};

export default About;
