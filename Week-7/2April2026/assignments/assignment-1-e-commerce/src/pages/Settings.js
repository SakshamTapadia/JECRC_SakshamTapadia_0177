import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Toggle({ checked, onChange }) {
  return (
    <label className="toggle" style={{ cursor: 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div className="toggle-track" />
      <div className="toggle-thumb" />
    </label>
  );
}

function Settings() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 000-0000',
    bio: 'Store administrator at ShopCo.',
  });
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [notifs, setNotifs] = useState({
    orderUpdates: true,
    newCustomers: true,
    lowStock: true,
    weeklyReport: false,
    marketing: false,
  });

  const [activeTab, setActiveTab] = useState('profile');

  function handleProfileChange(e) {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="fade-in-up">
      <div style={s.header}>
        <h1 style={s.title}>Settings</h1>
        <p style={s.sub}>Manage your account preferences</p>
      </div>

      {saved && (
        <div style={s.successBanner}>✅ Changes saved successfully!</div>
      )}

      {/* Tabs */}
      <div className="tab-nav">
        {[['profile', '👤 Profile'], ['notifications', '🔔 Notifications'], ['security', '🔒 Security'], ['account', '⚠️ Account']].map(([key, label]) => (
          <button
            key={key}
            className={`tab-btn${activeTab === key ? ' active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div style={s.tabContent}>
          <div style={s.profileTop}>
            <div style={s.avatar}>{profile.name?.[0]?.toUpperCase() || '?'}</div>
            <div>
              <div style={s.profileName}>{profile.name}</div>
              <div style={s.profileEmail}>{profile.email}</div>
              <span className="badge badge-success" style={{ marginTop: '6px' }}>Admin</span>
            </div>
            <button
              className={`btn btn-sm ${editing ? 'btn-ghost' : 'btn-primary'}`}
              onClick={() => editing ? handleSave() : setEditing(true)}
              style={{ marginLeft: 'auto' }}
            >
              {editing ? '✅ Save Changes' : '✏️ Edit Profile'}
            </button>
          </div>

          <hr className="divider" />

          <div className="grid-2" style={{ gap: '20px' }}>
            {[
              { label: 'Full Name', name: 'name', type: 'text' },
              { label: 'Email Address', name: 'email', type: 'email' },
              { label: 'Phone Number', name: 'phone', type: 'tel' },
            ].map(f => (
              <div key={f.name} className="form-group">
                <label className="form-label">{f.label}</label>
                {editing ? (
                  <input className="input" type={f.type} name={f.name} value={profile[f.name]} onChange={handleProfileChange} />
                ) : (
                  <div style={s.fieldDisplay}>{profile[f.name]}</div>
                )}
              </div>
            ))}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Bio</label>
              {editing ? (
                <textarea className="input" name="bio" value={profile.bio} onChange={handleProfileChange} rows={3} style={{ resize: 'vertical' }} />
              ) : (
                <div style={s.fieldDisplay}>{profile.bio}</div>
              )}
            </div>
          </div>

          <div style={s.metaInfo}>
            <div style={s.metaItem}><span style={s.metaLabel}>Role</span><span className="badge badge-primary">Admin</span></div>
            <div style={s.metaItem}><span style={s.metaLabel}>Member since</span><span style={s.metaVal}>January 2026</span></div>
            <div style={s.metaItem}><span style={s.metaLabel}>Last login</span><span style={s.metaVal}>Today, 9:42 AM</span></div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div style={s.tabContent}>
          <h2 style={s.sectionTitle}>Email Notifications</h2>
          <p style={s.sectionSub}>Choose what you want to be notified about.</p>
          {[
            { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified when orders are placed, shipped, or delivered.' },
            { key: 'newCustomers', label: 'New Customers', desc: 'Receive alerts when new users register on the platform.' },
            { key: 'lowStock', label: 'Low Stock Alerts', desc: 'Be warned when product inventory falls below the threshold.' },
            { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive a weekly summary of sales and performance metrics.' },
            { key: 'marketing', label: 'Marketing Emails', desc: 'Tips, product updates, and promotional announcements.' },
          ].map(item => (
            <div key={item.key} className="toggle-row">
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b', marginBottom: '2px' }}>{item.label}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{item.desc}</div>
              </div>
              <Toggle
                checked={notifs[item.key]}
                onChange={() => setNotifs(p => ({ ...p, [item.key]: !p[item.key] }))}
              />
            </div>
          ))}
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div style={s.tabContent}>
          <h2 style={s.sectionTitle}>Security Settings</h2>
          <p style={s.sectionSub}>Manage your password and account security.</p>
          <div className="card" style={{ padding: '28px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '20px' }}>Change Password</h3>
            {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
              <div key={label} className="form-group">
                <label className="form-label">{label}</label>
                <input className="input" type="password" placeholder="••••••••" />
              </div>
            ))}
            <button className="btn btn-primary">Update Password</button>
          </div>
          <div className="card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Two-Factor Authentication</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Add an extra layer of security by enabling 2FA on your account.</p>
            <button className="btn btn-outline">Enable 2FA</button>
          </div>
        </div>
      )}

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div style={s.tabContent}>
          <h2 style={s.sectionTitle}>Account Management</h2>
          <p style={s.sectionSub}>Irreversible actions — please proceed carefully.</p>
          <div style={s.dangerCard}>
            <div>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#991b1b', marginBottom: '4px' }}>Export Account Data</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Download a full export of all your data in JSON format.</div>
            </div>
            <button className="btn btn-ghost btn-sm">Export Data</button>
          </div>
          <div style={{ ...s.dangerCard, borderColor: '#fca5a5', background: '#fff5f5' }}>
            <div>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#991b1b', marginBottom: '4px' }}>Delete Account</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>Permanently delete your account and all associated data. This cannot be undone.</div>
            </div>
            <button className="btn btn-danger btn-sm">Delete Account</button>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  header: { marginBottom: '24px' },
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '4px' },
  sub: { fontSize: '14px', color: '#64748b' },
  successBanner: {
    background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '8px',
    padding: '12px 16px', fontSize: '14px', color: '#065f46', marginBottom: '20px',
  },
  tabContent: { animation: 'fadeIn .25s ease' },
  profileTop: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' },
  avatar: {
    width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#6366f1',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '28px', fontWeight: '800', color: '#fff', flexShrink: 0,
  },
  profileName: { fontSize: '20px', fontWeight: '800', color: '#1e293b' },
  profileEmail: { fontSize: '14px', color: '#64748b', marginTop: '2px' },
  fieldDisplay: { padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', fontSize: '14px', color: '#1e293b', border: '1px solid #e2e8f0' },
  metaInfo: { display: 'flex', gap: '32px', marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '10px', flexWrap: 'wrap' },
  metaItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  metaLabel: { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.06em', color: '#94a3b8' },
  metaVal: { fontSize: '14px', fontWeight: '600', color: '#1e293b' },
  sectionTitle: { fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' },
  sectionSub: { fontSize: '14px', color: '#64748b', marginBottom: '24px' },
  dangerCard: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0',
    background: '#fff', marginBottom: '12px', gap: '20px',
  },
};

export default Settings;
