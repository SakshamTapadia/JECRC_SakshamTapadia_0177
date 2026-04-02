import { useParams } from 'react-router-dom';
import { products } from '../data/products';

function Specs() {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) return null;

  const specEntries = Object.entries(product.specs);

  return (
    <div className="fade-in">

      {/* Header */}
      <div style={s.header}>
        <h3 style={s.title}>Technical Specifications</h3>
        <span className="badge badge-primary">{product.category}</span>
      </div>

      {/* Specs Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="table" style={{ margin: 0 }}>
          <tbody>
            {specEntries.map(([label, value], i) => (
              <tr key={label} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fafbfc' }}>
                <td style={s.specLabel}>{label}</td>
                <td style={s.specValue}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* What's in the box */}
      <div style={s.inboxSection}>
        <h3 style={s.title}>What's in the Box</h3>
        <div style={s.inboxGrid}>
          {[
            '1× ' + product.name,
            '1× USB-C Cable',
            '1× Quick Start Guide',
            '1× Warranty Card',
          ].map(item => (
            <div key={item} style={s.inboxItem}>
              <span style={s.checkIcon}>✓</span>
              <span style={s.inboxText}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compatibility */}
      <div style={s.compatSection}>
        <h3 style={s.title}>Compatibility</h3>
        <div style={s.compatRow}>
          {['🪟 Windows 10/11', '🍎 macOS 12+', '🐧 Linux', '📱 Android 10+', '📱 iOS 14+'].map(os => (
            <span key={os} style={s.compatChip}>{os}</span>
          ))}
        </div>
      </div>

    </div>
  );
}

const s = {
  header: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  title: { fontSize: '17px', fontWeight: '700', color: '#1e293b' },
  specLabel: {
    padding: '13px 20px', fontWeight: '600', color: '#64748b', fontSize: '14px',
    width: '200px', minWidth: '160px',
  },
  specValue: { padding: '13px 20px', fontSize: '14px', color: '#1e293b', fontWeight: '500' },
  inboxSection: { marginTop: '28px', marginBottom: '24px' },
  inboxGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' },
  inboxItem: {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '12px 16px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0',
  },
  checkIcon: {
    width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#d1fae5',
    color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '800', fontSize: '12px', flexShrink: 0,
  },
  inboxText: { fontSize: '14px', color: '#1e293b', fontWeight: '500' },
  compatSection: { marginBottom: '8px' },
  compatRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' },
  compatChip: {
    padding: '7px 14px', borderRadius: '8px', border: '1px solid #e2e8f0',
    backgroundColor: '#fff', fontSize: '13px', fontWeight: '600', color: '#475569',
  },
};

export default Specs;
