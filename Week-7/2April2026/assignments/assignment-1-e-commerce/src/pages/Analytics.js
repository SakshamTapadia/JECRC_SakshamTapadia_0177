const monthlyData = [
  { month: 'Jan', revenue: 8420, orders: 98, avg: 85.9 },
  { month: 'Feb', revenue: 11340, orders: 131, avg: 86.6 },
  { month: 'Mar', revenue: 9870, orders: 114, avg: 86.6 },
  { month: 'Apr', revenue: 14200, orders: 160, avg: 88.8 },
  { month: 'May', revenue: 12800, orders: 144, avg: 88.9 },
  { month: 'Jun', revenue: 16500, orders: 182, avg: 90.7 },
  { month: 'Jul', revenue: 15300, orders: 171, avg: 89.5 },
  { month: 'Aug', revenue: 18900, orders: 207, avg: 91.3 },
  { month: 'Sep', revenue: 17400, orders: 194, avg: 89.7 },
  { month: 'Oct', revenue: 21200, orders: 236, avg: 89.8 },
  { month: 'Nov', revenue: 24800, orders: 271, avg: 91.5 },
  { month: 'Dec', revenue: 28400, orders: 308, avg: 92.2 },
];

const catBreakdown = [
  { category: 'Peripherals', revenue: 64200, pct: 34, color: '#6366f1' },
  { category: 'Audio', revenue: 41300, pct: 22, color: '#0ea5e9' },
  { category: 'Cameras', revenue: 33800, pct: 18, color: '#10b981' },
  { category: 'Storage', revenue: 26100, pct: 14, color: '#f59e0b' },
  { category: 'Accessories', revenue: 22200, pct: 12, color: '#ec4899' },
];

const maxRev = Math.max(...monthlyData.map(d => d.revenue));

function Analytics() {
  const totalRev = monthlyData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = monthlyData.reduce((s, d) => s + d.orders, 0);
  const avgOrder = (totalRev / totalOrders).toFixed(2);

  return (
    <div className="fade-in-up">

      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>Analytics</h1>
          <p style={s.sub}>Full-year performance overview · Jan – Dec 2025</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['This Year', 'Last Year'].map((label, i) => (
            <button key={label} className={`btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}>{label}</button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={s.summaryRow}>
        {[
          { icon: '💰', label: 'Total Revenue', value: `$${totalRev.toLocaleString()}`, change: '+18.4%', color: '#e0e7ff', iColor: '#6366f1' },
          { icon: '📦', label: 'Total Orders', value: totalOrders.toLocaleString(), change: '+14.2%', color: '#dcfce7', iColor: '#10b981' },
          { icon: '🧾', label: 'Avg. Order Value', value: `$${avgOrder}`, change: '+3.6%', color: '#fef9c3', iColor: '#f59e0b' },
        ].map(c => (
          <div key={c.label} className="stat-card">
            <div style={{ ...s.statIcon, backgroundColor: c.color, color: c.iColor }}>{c.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={s.statLabel}>{c.label}</div>
              <div style={s.statVal}>{c.value}</div>
            </div>
            <span style={s.statUp}>↑ {c.change}</span>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="card" style={s.chartCard}>
        <h2 style={s.cardTitle}>Monthly Revenue</h2>
        <div style={s.chartArea}>
          {monthlyData.map(d => {
            const h = Math.round((d.revenue / maxRev) * 140);
            return (
              <div key={d.month} style={s.barCol}>
                <div style={s.barVal}>${(d.revenue / 1000).toFixed(1)}k</div>
                <div style={s.barTrack}>
                  <div style={{ ...s.barFill, height: `${h}px` }} />
                </div>
                <div style={s.barLabel}>{d.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Row */}
      <div style={s.bottomRow}>

        {/* Monthly Table */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={s.cardTitle}>Monthly Breakdown</h2>
          <table className="table" style={{ marginTop: '12px' }}>
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Orders</th>
                <th>Avg. Order</th>
                <th>vs. Prior</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((d, i) => {
                const prev = i > 0 ? monthlyData[i - 1].revenue : null;
                const diff = prev ? (((d.revenue - prev) / prev) * 100).toFixed(1) : null;
                return (
                  <tr key={d.month}>
                    <td style={{ fontWeight: '600' }}>{d.month}</td>
                    <td style={{ fontWeight: '700' }}>${d.revenue.toLocaleString()}</td>
                    <td>{d.orders}</td>
                    <td>${d.avg}</td>
                    <td>
                      {diff !== null && (
                        <span style={{ color: parseFloat(diff) >= 0 ? '#10b981' : '#ef4444', fontWeight: '700', fontSize: '13px' }}>
                          {parseFloat(diff) >= 0 ? '↑' : '↓'} {Math.abs(diff)}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Category Breakdown */}
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={s.cardTitle}>Revenue by Category</h2>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {catBreakdown.map(cat => (
              <div key={cat.category}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{cat.category}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: cat.color }}>{cat.pct}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${cat.pct}%`, backgroundColor: cat.color }} />
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                  ${cat.revenue.toLocaleString()} revenue
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '4px' },
  sub: { fontSize: '14px', color: '#64748b' },
  summaryRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' },
  statIcon: { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 },
  statLabel: { fontSize: '12px', color: '#64748b', marginBottom: '2px' },
  statVal: { fontSize: '22px', fontWeight: '800', color: '#1e293b' },
  statUp: { fontSize: '12px', fontWeight: '700', color: '#10b981', alignSelf: 'flex-start', marginTop: '2px' },
  chartCard: { padding: '24px', marginBottom: '20px' },
  cardTitle: { fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' },
  chartArea: { display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px', paddingBottom: '24px' },
  barCol: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', height: '100%' },
  barVal: { fontSize: '9px', color: '#94a3b8', fontWeight: '700', textAlign: 'center' },
  barTrack: { width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' },
  barFill: { width: '100%', backgroundColor: '#6366f1', borderRadius: '4px 4px 0 0', transition: 'height .5s ease' },
  barLabel: { fontSize: '10px', color: '#94a3b8', fontWeight: '600' },
  bottomRow: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' },
};

export default Analytics;
