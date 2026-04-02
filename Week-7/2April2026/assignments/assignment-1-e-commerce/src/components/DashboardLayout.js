import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() { logout(); navigate('/login'); }

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Top Bar */}
      <header style={s.header}>
        <div style={s.headerLeft}>
          <Link to="/" style={s.logo}>
            <span style={s.logoBox}>S</span>
            <span style={s.logoText}>ShopCo <span style={s.logoBadge}>Admin</span></span>
          </Link>
        </div>
        <div style={s.headerRight}>
          <Link to="/products" style={s.headerLink}>🛍️ View Store</Link>
          <div style={s.notifBtn}>🔔 <span style={s.notifDot} /></div>
          <div style={s.avatar}>{initials}</div>
          <div>
            <div style={s.userName}>{user?.name}</div>
            <div style={s.userEmail}>{user?.email}</div>
          </div>
          <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
        </div>
      </header>

      <div style={s.body}>

        {/* Sidebar */}
        <aside style={s.sidebar}>
          <div style={s.sideLabel}>Main Menu</div>
          <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            📊 Dashboard
          </NavLink>
          <NavLink to="/dashboard/analytics" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            📈 Analytics
          </NavLink>
          <NavLink to="/dashboard/settings" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            ⚙️ Settings
          </NavLink>

          <hr className="divider" style={{ margin: '16px 0' }} />

          <div style={s.sideLabel}>Store</div>
          <Link to="/products" className="sidebar-link">🛍️ Products</Link>
          <Link to="/" className="sidebar-link">🏠 Home Page</Link>
          <Link to="/contact" className="sidebar-link">📬 Contact</Link>

          <hr className="divider" style={{ margin: '16px 0' }} />

          <div style={s.statsBox}>
            <div style={s.statMini}>
              <span style={s.statMiniNum}>124</span>
              <span style={s.statMiniLabel}>Orders</span>
            </div>
            <div style={s.statMini}>
              <span style={s.statMiniNum}>57</span>
              <span style={s.statMiniLabel}>Customers</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={s.main} className="fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const s = {
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 24px', backgroundColor: '#0f172a', color: '#fff',
    position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 2px 12px rgba(0,0,0,.3)',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  logo: { display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#fff' },
  logoBox: {
    width: '30px', height: '30px', borderRadius: '7px', backgroundColor: '#6366f1',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '800', fontSize: '14px',
  },
  logoText: { fontSize: '16px', fontWeight: '700' },
  logoBadge: {
    fontSize: '10px', backgroundColor: '#f59e0b', color: '#000',
    padding: '1px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: '700',
  },
  headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  headerLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '14px' },
  notifBtn: { position: 'relative', fontSize: '18px', cursor: 'pointer' },
  notifDot: {
    position: 'absolute', top: '-2px', right: '-2px',
    width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444',
  },
  avatar: {
    width: '34px', height: '34px', borderRadius: '50%',
    backgroundColor: '#6366f1', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center',
    fontWeight: '700', fontSize: '13px', color: '#fff',
  },
  userName: { fontSize: '13px', fontWeight: '600', color: '#f1f5f9' },
  userEmail: { fontSize: '11px', color: '#64748b' },
  body: { display: 'flex', flex: 1 },
  sidebar: {
    width: '220px', minWidth: '220px', padding: '20px 14px',
    backgroundColor: '#fff', borderRight: '1px solid #e2e8f0',
  },
  sideLabel: {
    fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
    letterSpacing: '.08em', color: '#94a3b8', padding: '0 4px', marginBottom: '6px', marginTop: '4px',
  },
  main: { flex: 1, padding: '28px', backgroundColor: '#f8fafc', minWidth: 0 },
  statsBox: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px',
  },
  statMini: {
    background: '#f8fafc', borderRadius: '8px', padding: '10px 8px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #e2e8f0',
  },
  statMiniNum: { fontSize: '18px', fontWeight: '800', color: '#1e293b' },
  statMiniLabel: { fontSize: '11px', color: '#64748b', marginTop: '2px' },
};

export default DashboardLayout;
