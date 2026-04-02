import { useParams } from 'react-router-dom';
import { products } from '../data/products';

function Reviews() {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));
  const reviews = product?.reviews || [];
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0;

  const dist = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    pct: reviews.length ? Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100) : 0,
  }));

  return (
    <div className="fade-in">

      {/* Summary */}
      <div style={s.summary}>
        <div style={s.avgBlock}>
          <div style={s.avgNum}>{avg}</div>
          <div style={s.avgStars}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} style={{ color: i < Math.round(parseFloat(avg)) ? '#f59e0b' : '#e2e8f0', fontSize: '22px' }}>★</span>
            ))}
          </div>
          <div style={s.avgLabel}>Based on {reviews.length} reviews</div>
        </div>

        <div style={s.distBlock}>
          {dist.map(d => (
            <div key={d.star} style={s.distRow}>
              <span style={s.starLabel}>{d.star}★</span>
              <div className="bar-track" style={{ flex: 1 }}>
                <div className="bar-fill" style={{ width: `${d.pct}%`, backgroundColor: d.star >= 4 ? '#10b981' : d.star === 3 ? '#f59e0b' : '#ef4444' }} />
              </div>
              <span style={s.distCount}>{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" />

      {/* Review List */}
      <div style={s.reviewList}>
        {reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>💬</div>
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="card" style={s.reviewCard}>
              <div style={s.reviewHeader}>
                <div style={s.reviewAvatar}>{r.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={s.reviewerName}>{r.user}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="stars" style={{ fontSize: '14px' }}>
                      {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                    </span>
                    <span style={s.reviewDate}>{r.date}</span>
                  </div>
                </div>
                <span className={`badge ${r.rating === 5 ? 'badge-success' : r.rating >= 4 ? 'badge-primary' : 'badge-warning'}`}>
                  {r.rating === 5 ? 'Excellent' : r.rating === 4 ? 'Good' : 'Average'}
                </span>
              </div>
              <p style={s.reviewText}>{r.comment}</p>
              <div style={s.reviewFooter}>
                <span style={s.helpfulText}>Was this helpful?</span>
                <button className="btn btn-ghost btn-sm" style={{ padding: '4px 12px', gap: '4px' }}>
                  👍 Yes ({r.helpful})
                </button>
                <button className="btn btn-ghost btn-sm" style={{ padding: '4px 12px' }}>
                  👎 No
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Write a Review CTA */}
      <div style={s.writeCta}>
        <span style={{ fontSize: '20px' }}>✍️</span>
        <div>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b', marginBottom: '2px' }}>Share your experience</div>
          <div style={{ fontSize: '13px', color: '#64748b' }}>Help others make informed decisions with your honest review.</div>
        </div>
        <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto', flexShrink: 0 }}>Write a Review</button>
      </div>
    </div>
  );
}

const s = {
  summary: { display: 'flex', gap: '48px', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap' },
  avgBlock: { textAlign: 'center', minWidth: '100px' },
  avgNum: { fontSize: '56px', fontWeight: '900', color: '#1e293b', lineHeight: 1 },
  avgStars: { display: 'flex', justifyContent: 'center', gap: '2px', margin: '8px 0' },
  avgLabel: { fontSize: '13px', color: '#94a3b8' },
  distBlock: { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '200px' },
  distRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  starLabel: { fontSize: '13px', color: '#64748b', width: '24px', textAlign: 'right', flexShrink: 0 },
  distCount: { fontSize: '13px', color: '#94a3b8', width: '20px', textAlign: 'right' },
  reviewList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  reviewCard: { padding: '20px' },
  reviewHeader: { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' },
  reviewAvatar: {
    width: '40px', height: '40px', borderRadius: '50%',
    backgroundColor: '#6366f1', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: '800', fontSize: '16px', flexShrink: 0,
  },
  reviewerName: { fontWeight: '700', fontSize: '14px', color: '#1e293b', marginBottom: '2px' },
  reviewDate: { fontSize: '12px', color: '#94a3b8' },
  reviewText: { fontSize: '14px', color: '#475569', lineHeight: '1.7', marginBottom: '14px' },
  reviewFooter: { display: 'flex', alignItems: 'center', gap: '8px' },
  helpfulText: { fontSize: '13px', color: '#94a3b8', marginRight: '4px' },
  writeCta: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '20px 24px', background: '#f8fafc', borderRadius: '12px',
    border: '1px solid #e2e8f0', marginTop: '24px',
  },
};

export default Reviews;
