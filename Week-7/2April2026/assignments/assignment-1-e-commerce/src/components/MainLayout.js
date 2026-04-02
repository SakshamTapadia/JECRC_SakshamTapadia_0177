import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { categories, categoryIcons } from '../data/products';

function MainLayout() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  function handleLogout() { logout(); navigate('/login'); }

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) navigate(`/products?q=${encodeURIComponent(search.trim())}`);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Announcement */}
      <div style={s.announce}>
        🎉 Free shipping on orders over $50 &nbsp;·&nbsp; Use code <strong>SHOPCO10</strong> for 10% off your first order
      </div>

      {/* Header */}
      <header style={s.header}>
        <Link to="/" style={s.logo}>
          <span style={s.logoBox}>S</span>
          <span style={{ fontWeight: 300 }}>Shop</span><strong>Co</strong>
        </Link>

        <form onSubmit={handleSearch} style={s.searchForm}>
          <input
            className="input"
            style={s.searchInput}
            type="text"
            placeholder="Search products, brands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: '0 6px 6px 0', margin: 0 }}>
            🔍 Search
          </button>
        </form>

        <nav style={s.nav}>
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Contact</NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Products</NavLink>

          <Link to="/products" style={s.cartBtn}>
            🛒
            {itemCount > 0 && <span style={s.cartBadge}>{itemCount}</span>}
          </Link>

          {user ? (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                👤 {user.name}
              </NavLink>
              <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Login</NavLink>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </nav>
      </header>

      {/* Body */}
      <div style={s.body}>

        {/* Sidebar */}
        <aside style={s.sidebar}>

          <div style={s.sideSection}>
            <p style={s.sideLabel}>Quick Links</p>
            <NavLink to="/" end className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>🏠 Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>📖 About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>📬 Contact</NavLink>
            <NavLink to="/products" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>🛍️ All Products</NavLink>
          </div>

          <hr className="divider" />

          <div style={s.sideSection}>
            <p style={s.sideLabel}>Categories</p>
            {categories.filter(c => c !== 'All').map(cat => (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="sidebar-link"
              >
                {categoryIcons[cat]} {cat}
              </Link>
            ))}
          </div>

          <hr className="divider" />

          <div style={s.sideSection}>
            <p style={s.sideLabel}>Price Range</p>
            {['Under $50', '$50 – $100', '$100 – $150', 'Over $150'].map(r => (
              <div key={r} style={s.priceRange}>{r}</div>
            ))}
          </div>

          {user && (
            <>
              <hr className="divider" />
              <div style={s.sideSection}>
                <p style={s.sideLabel}>My Account</p>
                <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>📊 Dashboard</NavLink>
                <NavLink to="/dashboard/analytics" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>📈 Analytics</NavLink>
                <NavLink to="/dashboard/settings" className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>⚙️ Settings</NavLink>
              </div>
            </>
          )}
        </aside>

        {/* Main */}
        <main style={s.main} className="fade-in">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer style={s.footer}>
        <div style={s.footerGrid}>
          <div>
            <div style={s.footerLogo}>ShopCo</div>
            <p style={s.footerText}>Your one-stop destination for premium tech products at unbeatable prices.</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              {['𝕏', 'in', 'f', 'yt'].map(icon => (
                <span key={icon} style={s.socialIcon}>{icon}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 style={s.footerHeading}>Shop</h4>
            {['All Products', 'Audio', 'Peripherals', 'Accessories', 'Cameras', 'Storage'].map(item => (
              <Link key={item} to={item === 'All Products' ? '/products' : `/products?category=${item}`} style={s.footerLink}>{item}</Link>
            ))}
          </div>
          <div>
            <h4 style={s.footerHeading}>Company</h4>
            {[['About Us', '/about'], ['Contact', '/contact'], ['Careers', '#'], ['Blog', '#'], ['Press', '#']].map(([label, href]) => (
              <Link key={label} to={href} style={s.footerLink}>{label}</Link>
            ))}
          </div>
          <div>
            <h4 style={s.footerHeading}>Support</h4>
            {['Help Center', 'Returns', 'Shipping Info', 'Track Order', 'Privacy Policy'].map(item => (
              <a key={item} href="#" style={s.footerLink}>{item}</a>
            ))}
          </div>
        </div>

        <div style={s.footerBottom}>
          <span>&copy; 2026 ShopCo Inc. All rights reserved.</span>
          <span style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Privacy</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Terms</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Cookies</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

const s = {
  announce: {
    backgroundColor: '#4f46e5',
    color: '#fff',
    textAlign: 'center',
    padding: '9px 16px',
    fontSize: '13px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '12px 24px',
    backgroundColor: '#0f172a',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(0,0,0,.3)',
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '20px',
    whiteSpace: 'nowrap',
  },
  logoBox: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: '#6366f1',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '16px',
    flexShrink: 0,
  },
  searchForm: { flex: 1, display: 'flex', maxWidth: '480px' },
  searchInput: {
    flex: 1,
    borderRadius: '6px 0 0 6px',
    border: '1.5px solid #334155',
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: '8px 14px',
    fontSize: '14px',
    outline: 'none',
  },
  nav: { display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto' },
  cartBtn: {
    position: 'relative',
    fontSize: '20px',
    textDecoration: 'none',
    display: 'inline-block',
    lineHeight: 1,
  },
  cartBadge: {
    position: 'absolute',
    top: '-6px',
    right: '-8px',
    backgroundColor: '#ef4444',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '700',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { display: 'flex', flex: 1 },
  sidebar: {
    width: '220px',
    minWidth: '220px',
    padding: '20px 14px',
    backgroundColor: '#fff',
    borderRight: '1px solid #e2e8f0',
    overflowY: 'auto',
  },
  sideSection: { marginBottom: '8px' },
  sideLabel: {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '.08em',
    color: '#94a3b8',
    padding: '0 4px',
    marginBottom: '6px',
  },
  priceRange: {
    padding: '7px 12px',
    fontSize: '14px',
    color: '#64748b',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '2px',
    transition: 'background .15s',
  },
  main: {
    flex: 1,
    padding: '28px',
    backgroundColor: '#f8fafc',
    minWidth: 0,
  },
  footer: {
    backgroundColor: '#0f172a',
    color: '#fff',
    padding: '56px 40px 24px',
    marginTop: 'auto',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '40px',
    marginBottom: '48px',
  },
  footerLogo: { fontSize: '24px', fontWeight: '800', marginBottom: '12px' },
  footerText: { color: '#94a3b8', fontSize: '14px', lineHeight: '1.7' },
  socialIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '8px',
    backgroundColor: '#1e293b',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '700',
  },
  footerHeading: {
    color: '#fff',
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '.06em',
    marginBottom: '16px',
  },
  footerLink: {
    display: 'block',
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    marginBottom: '9px',
    transition: 'color .2s',
  },
  footerBottom: {
    borderTop: '1px solid #1e293b',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    color: '#64748b',
  },
};

export default MainLayout;
