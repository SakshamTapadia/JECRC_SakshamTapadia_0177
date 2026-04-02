import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const stats = [
  { icon: '📦', label: 'Total Orders', value: '1,248', change: '+12%', up: true, color: '#e0e7ff', iconColor: '#6366f1' },
  { icon: '💰', label: 'Revenue (MTD)', value: '$24,830', change: '+8.3%', up: true, color: '#dcfce7', iconColor: '#10b981' },
  { icon: '👥', label: 'Customers', value: '3,571', change: '+5.1%', up: true, color: '#fef9c3', iconColor: '#f59e0b' },
  { icon: '🛍️', label: 'Products Listed', value: '142', change: '+3', up: true, color: '#fce7f3', iconColor: '#ec4899' },
  { icon: '↩️', label: 'Return Rate', value: '2.4%', change: '-0.3%', up: true, color: '#d1fae5', iconColor: '#10b981' },
  { icon: '⭐', label: 'Avg. Rating', value: '4.7 / 5', change: '+0.1', up: true, color: '#fff7ed', iconColor: '#f97316' },
];

const recentOrders = [
  { id: '#ORD-7821', customer: 'Sarah K.', product: 'Wireless Headphones Pro', amount: '$79.99', status: 'Delivered', date: 'Apr 1' },
  { id: '#ORD-7820', customer: 'Marcus T.', product: 'Mechanical Keyboard RGB', amount: '$119.99', status: 'Shipped', date: 'Apr 1' },
  { id: '#ORD-7819', customer: 'Priya N.', product: 'Webcam 4K Ultra HD', amount: '$89.99', status: 'Processing', date: 'Mar 31' },
  { id: '#ORD-7818', customer: 'James V.', product: 'USB-C Hub 11-in-1', amount: '$54.99', status: 'Delivered', date: 'Mar 31' },
  { id: '#ORD-7817', customer: 'Lily R.', product: 'Ergonomic Vertical Mouse', amount: '$44.99', status: 'Pending', date: 'Mar 30' },
];

const statusBadge = { Delivered: 'badge-success', Shipped: 'badge-primary', Processing: 'badge-warning', Pending: 'badge-gray' };

const topProducts = [
  { name: 'Mechanical Keyboard RGB', sales: 312, rev: '$37,437', pct: 92 },
  { name: 'Wireless Headphones Pro', sales: 248, rev: '$19,847', pct: 73 },
  { name: 'Webcam 4K Ultra HD', sales: 174, rev: '$15,653', pct: 51 },
  { name: 'Portable SSD 1TB', sales: 148, rev: '$14,799', pct: 44 },
];

function DashboardHome() {
  const { user } = useAuth();
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="fade-in-up">

      {/* Welcome */}
      <div style={s.welcome}>
        <div>
          <h1 style={s.welcomeTitle}>Good {getGreeting()}, {user?.name} 👋</h1>
          <p style={s.welcomeSub}>{dateStr} — Here's your store overview</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/products" className="btn btn-ghost btn-sm">View Store</Link>
          <Link to="/dashboard/analytics" className="btn btn-primary btn-sm">View Analytics →</Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={s.statsGrid}>
        {stats.map(stat => (
          <div key={stat.label} className="stat-card">
            <div style={{ ...s.statIconBox, backgroundColor: stat.color, color: stat.iconColor }}>
              {stat.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={s.statLabel}>{stat.label}</div>
              <div style={s.statValue}>{stat.value}</div>
            </div>
            <span style={{ ...s.statChange, color: stat.up ? '#10b981' : '#ef4444' }}>
              {stat.up ? '↑' : '↓'} {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div style={s.bottomGrid}>

        {/* Recent Orders */}
        <div className="card" style={s.tableCard}>
          <div style={s.cardHeader}>
            <h2 style={s.cardTitle}>Recent Orders</h2>
            <Link to="#" style={s.viewAll}>View all →</Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id}>
                    <td><span style={s.orderId}>{o.id}</span></td>
                    <td style={{ fontWeight: '500' }}>{o.customer}</td>
                    <td style={{ color: '#64748b', fontSize: '13px' }}>{o.product}</td>
                    <td style={{ fontWeight: '700' }}>{o.amount}</td>
                    <td><span className={`badge ${statusBadge[o.status]}`}>{o.status}</span></td>
                    <td style={{ color: '#94a3b8', fontSize: '13px' }}>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={s.cardHeader}>
            <h2 style={s.cardTitle}>Top Products</h2>
            <Link to="/products" style={s.viewAll}>View all →</Link>
          </div>
          {topProducts.map((p, i) => (
            <div key={p.name} style={s.topProduct}>
              <div style={s.topRank}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={s.topName}>{p.name}</div>
                <div style={s.topBar}>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${p.pct}%` }} />
                  </div>
                  <span style={s.topSales}>{p.sales} sold</span>
                </div>
              </div>
              <div style={s.topRev}>{p.rev}</div>
            </div>
          ))}

          <hr className="divider" style={{ marginTop: '20px' }} />

          <div style={s.quickActions}>
            <p style={s.qaLabel}>Quick Actions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                ['📦', 'Add New Product'],
                ['📊', 'Export Report'],
                ['⚙️', 'Store Settings'],
              ].map(([icon, label]) => (
                <button key={label} className="btn btn-ghost" style={{ justifyContent: 'flex-start', gap: '10px', padding: '8px 10px' }}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
}

const s = {
  welcome: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '28px', flexWrap: 'wrap', gap: '12px',
  },
  welcomeTitle: { fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '4px' },
  welcomeSub: { fontSize: '14px', color: '#64748b' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' },
  statIconBox: {
    width: '44px', height: '44px', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '20px', flexShrink: 0,
  },
  statLabel: { fontSize: '12px', color: '#64748b', fontWeight: '500', marginBottom: '2px' },
  statValue: { fontSize: '20px', fontWeight: '800', color: '#1e293b' },
  statChange: { fontSize: '12px', fontWeight: '700', alignSelf: 'flex-start', marginTop: '2px' },
  bottomGrid: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' },
  tableCard: { padding: '24px', overflow: 'hidden' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  cardTitle: { fontSize: '16px', fontWeight: '700', color: '#1e293b' },
  viewAll: { fontSize: '13px', color: '#6366f1', textDecoration: 'none', fontWeight: '600' },
  orderId: { fontFamily: 'monospace', fontSize: '12px', color: '#6366f1', fontWeight: '700' },
  topProduct: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  topRank: {
    width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#f1f5f9',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '12px', fontWeight: '800', color: '#64748b', flexShrink: 0,
  },
  topName: { fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  topBar: { display: 'flex', alignItems: 'center', gap: '8px' },
  topSales: { fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap' },
  topRev: { fontSize: '13px', fontWeight: '700', color: '#10b981', flexShrink: 0 },
  quickActions: { marginTop: '16px' },
  qaLabel: { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.06em', color: '#94a3b8', marginBottom: '10px' },
};

export default DashboardHome;
