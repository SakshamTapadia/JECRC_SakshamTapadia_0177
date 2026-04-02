import { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="fade-in-up">

      {/* Header */}
      <div style={s.hero}>
        <span className="badge badge-primary" style={{ marginBottom: '14px' }}>Get in Touch</span>
        <h1 style={s.heroTitle}>We would love to hear from you</h1>
        <p style={s.heroSub}>
          Our support team is available Monday through Friday, 9am–6pm EST. We typically respond within 2 hours.
        </p>
      </div>

      <div style={s.grid}>

        {/* Contact Form */}
        <div className="card" style={s.formCard}>
          {submitted ? (
            <div style={s.successBox}>
              <div style={s.successIcon}>✅</div>
              <h3 style={s.successTitle}>Message sent!</h3>
              <p style={s.successText}>
                Thanks for reaching out, {form.name}. We will get back to you at {form.email} within 24 hours.
              </p>
              <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 style={s.formTitle}>Send us a message</h2>
              <p style={s.formSub}>Fill out the form below and our team will get back to you shortly.</p>
              <form onSubmit={handleSubmit}>
                <div className="grid-2" style={{ marginBottom: '18px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name *</label>
                    <input className="input" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address *</label>
                    <input className="input" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject *</label>
                  <select className="input" name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="">Choose a topic...</option>
                    <option>Order & Shipping</option>
                    <option>Returns & Refunds</option>
                    <option>Product Question</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="input"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                  Send Message →
                </button>
              </form>
            </>
          )}
        </div>

        {/* Info Panel */}
        <div style={s.infoPanel}>
          {[
            { icon: '📧', title: 'Email Us', lines: ['support@shopco.com', 'business@shopco.com'] },
            { icon: '📞', title: 'Call Us', lines: ['+1 (800) 555-0100', 'Mon–Fri, 9am–6pm EST'] },
            { icon: '📍', title: 'Our Office', lines: ['123 Commerce Blvd', 'San Francisco, CA 94105'] },
            { icon: '⏰', title: 'Business Hours', lines: ['Mon–Fri: 9am – 6pm EST', 'Sat: 10am – 4pm EST'] },
          ].map(card => (
            <div key={card.title} className="card" style={s.infoCard}>
              <div style={s.infoIcon}>{card.icon}</div>
              <div>
                <div style={s.infoTitle}>{card.title}</div>
                {card.lines.map(line => (
                  <div key={line} style={s.infoLine}>{line}</div>
                ))}
              </div>
            </div>
          ))}

          <div style={s.responseTime}>
            <span style={s.greenDot} />
            <span style={{ fontSize: '13px', color: '#475569' }}>
              Avg. response time: <strong>under 2 hours</strong>
            </span>
          </div>
        </div>
      </div>

      {/* FAQ teaser */}
      <div style={s.faqBanner}>
        <span style={{ fontSize: '24px' }}>💬</span>
        <div>
          <div style={s.faqTitle}>Looking for quick answers?</div>
          <div style={s.faqSub}>Check our Help Center for instant answers to common questions.</div>
        </div>
        <a href="#" className="btn btn-outline" style={{ marginLeft: 'auto', flexShrink: 0 }}>Visit Help Center →</a>
      </div>

    </div>
  );
}

const s = {
  hero: {
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    borderRadius: '16px', padding: '48px', marginBottom: '32px', color: '#fff',
  },
  heroTitle: { fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '12px' },
  heroSub: { fontSize: '16px', color: '#94a3b8', maxWidth: '480px', lineHeight: '1.7' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', marginBottom: '24px', alignItems: 'start' },
  formCard: { padding: '36px' },
  formTitle: { fontSize: '22px', fontWeight: '800', marginBottom: '6px', color: '#1e293b' },
  formSub: { fontSize: '14px', color: '#64748b', marginBottom: '24px' },
  successBox: { textAlign: 'center', padding: '20px 0' },
  successIcon: { fontSize: '48px', marginBottom: '16px' },
  successTitle: { fontSize: '22px', fontWeight: '800', color: '#1e293b', marginBottom: '10px' },
  successText: { fontSize: '15px', color: '#64748b', lineHeight: '1.7', marginBottom: '24px' },
  infoPanel: { display: 'flex', flexDirection: 'column', gap: '12px' },
  infoCard: { padding: '18px', display: 'flex', alignItems: 'flex-start', gap: '14px' },
  infoIcon: { fontSize: '22px', flexShrink: 0, marginTop: '2px' },
  infoTitle: { fontWeight: '700', fontSize: '14px', color: '#1e293b', marginBottom: '4px' },
  infoLine: { fontSize: '13px', color: '#64748b', lineHeight: '1.6' },
  responseTime: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '14px 16px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0',
  },
  greenDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', flexShrink: 0 },
  faqBanner: {
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '24px 28px', background: '#fff', borderRadius: '12px',
    border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,.06)',
  },
  faqTitle: { fontWeight: '700', fontSize: '15px', color: '#1e293b', marginBottom: '4px' },
  faqSub: { fontSize: '13px', color: '#64748b' },
};

export default Contact;
