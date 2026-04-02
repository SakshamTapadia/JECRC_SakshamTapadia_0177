import { Link } from 'react-router-dom';
import { products, categories, categoryIcons } from '../data/products';
import { useCart } from '../context/CartContext';

function StarRating({ rating }) {
  return (
    <span className="stars">
      {Array.from({ length: 5 }, (_, i) => i < Math.round(rating) ? '★' : '☆').join('')}
    </span>
  );
}

function Home() {
  const { addToCart } = useCart();
  const featured = products.slice(0, 4);

  return (
    <div className="fade-in-up">

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroContent}>
          <span className="badge badge-primary" style={{ marginBottom: '16px', fontSize: '12px' }}>
            New arrivals every week
          </span>
          <h1 style={s.heroTitle}>
            Shop Smarter,<br />
            <span style={s.heroAccent}>Live Better.</span>
          </h1>
          <p style={s.heroSub}>
            Discover 10,000+ premium tech products. Fast shipping, easy returns, and unbeatable prices — guaranteed.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary btn-lg">Shop Now →</Link>
            <Link to="/about" className="btn btn-lg" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)' }}>
              Learn More
            </Link>
          </div>
        </div>
        <div style={s.heroStats}>
          {[['10k+', 'Products'], ['50k+', 'Customers'], ['4.8★', 'Avg. Rating'], ['24/7', 'Support']].map(([num, label]) => (
            <div key={label} style={s.heroStat}>
              <div style={s.heroStatNum}>{num}</div>
              <div style={s.heroStatLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={s.section}>
        <p className="section-label">Browse by Category</p>
        <h2 className="section-title">Shop by Category</h2>
        <div style={s.catGrid}>
          {categories.filter(c => c !== 'All').map((cat, i) => {
            const colors = ['#e0e7ff', '#dbeafe', '#dcfce7', '#fef9c3', '#fce7f3'];
            const iconColors = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
            return (
              <Link key={cat} to={`/products?category=${cat}`} style={{ textDecoration: 'none' }}>
                <div className="card card-hover" style={s.catCard}>
                  <div style={{ ...s.catIcon, backgroundColor: colors[i], color: iconColors[i] }}>
                    {categoryIcons[cat]}
                  </div>
                  <div style={s.catName}>{cat}</div>
                  <div style={s.catCount}>{products.filter(p => p.category === cat).length} items</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Featured Products */}
      <div style={s.section}>
        <p className="section-label">Handpicked for you</p>
        <h2 className="section-title">Featured Products</h2>
        <div style={s.productGrid}>
          {featured.map(p => (
            <div key={p.id} className="product-card">
              <div style={{ ...s.productImg, background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`, overflow: 'hidden' }}>
                <div className="product-img-inner" style={{ fontSize: '56px', textAlign: 'center', paddingTop: '28px' }}>
                  {categoryIcons[p.category]}
                </div>
                {p.badge && (
                  <span className={`badge ${p.badgeType}`} style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    {p.badge}
                  </span>
                )}
              </div>
              <div style={s.productBody}>
                <p style={s.productCat}>{p.category}</p>
                <h3 style={s.productName}>{p.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  <StarRating rating={p.rating} />
                  <span style={s.reviewCount}>({p.reviewCount})</span>
                </div>
                <div style={s.productFooter}>
                  <div>
                    <span style={s.price}>${p.price}</span>
                    {p.originalPrice && (
                      <span style={s.originalPrice}>${p.originalPrice}</span>
                    )}
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(p)}
                    disabled={!p.inStock}
                  >
                    {p.inStock ? '+ Cart' : 'Sold Out'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link to="/products" className="btn btn-outline btn-lg">View All Products →</Link>
        </div>
      </div>

      {/* Why Us */}
      <div style={{ ...s.section, background: '#fff', borderRadius: '16px', padding: '48px', border: '1px solid #e2e8f0' }}>
        <p className="section-label" style={{ textAlign: 'center' }}>Why ShopCo</p>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Built for your convenience</h2>
        <div style={s.whyGrid}>
          {[
            { icon: '🚀', title: 'Fast Delivery', desc: 'Free shipping on all orders over $50. Express and same-day delivery available in most areas.' },
            { icon: '🔒', title: 'Secure Shopping', desc: 'Your data is protected with 256-bit SSL encryption. We never store your payment details.' },
            { icon: '↩️', title: '30-Day Returns', desc: 'Not happy? Return anything within 30 days — no questions asked, full refund guaranteed.' },
            { icon: '🌟', title: 'Top Quality', desc: 'Every product is sourced from trusted manufacturers and passes our 50-point quality check.' },
          ].map(f => (
            <div key={f.title} className="card card-hover" style={s.whyCard}>
              <div style={s.whyIcon}>{f.icon}</div>
              <h3 style={s.whyTitle}>{f.title}</h3>
              <p style={s.whyDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={s.section}>
        <p className="section-label">Happy Customers</p>
        <h2 className="section-title">What people are saying</h2>
        <div style={s.testiGrid}>
          {[
            { name: 'Sarah K.', role: 'Designer', comment: 'ShopCo has the best curated selection of tech products I have found. Fast shipping and great packaging every time!', rating: 5 },
            { name: 'Marcus T.', role: 'Developer', comment: 'Bought my keyboard here and it arrived next day. The product quality exceeded my expectations. Highly recommend.', rating: 5 },
            { name: 'Priya N.', role: 'Photographer', comment: 'The 4K webcam I ordered transformed my streaming setup. Customer support was super helpful with setup too.', rating: 5 },
          ].map(t => (
            <div key={t.name} className="card card-hover" style={s.testiCard}>
              <div style={{ marginBottom: '12px' }}>
                <StarRating rating={t.rating} />
              </div>
              <p style={s.testiComment}>"{t.comment}"</p>
              <div style={s.testiAuthor}>
                <div style={s.testiAvatar}>{t.name[0]}</div>
                <div>
                  <div style={s.testiName}>{t.name}</div>
                  <div style={s.testiRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div style={s.newsletter}>
        <h2 style={s.newsletterTitle}>Stay in the loop</h2>
        <p style={s.newsletterSub}>Get weekly deals, new arrivals, and exclusive discounts straight to your inbox.</p>
        <form style={s.newsletterForm} onSubmit={e => e.preventDefault()}>
          <input className="input" type="email" placeholder="Enter your email address" style={s.newsletterInput} />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>

    </div>
  );
}

const s = {
  hero: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #312e81 100%)',
    borderRadius: '16px',
    padding: '56px 48px',
    marginBottom: '40px',
    color: '#fff',
  },
  heroContent: { maxWidth: '580px', marginBottom: '40px' },
  heroTitle: { fontSize: '48px', fontWeight: '900', lineHeight: '1.1', marginBottom: '16px', color: '#fff' },
  heroAccent: { color: '#818cf8' },
  heroSub: { fontSize: '17px', color: '#94a3b8', lineHeight: '1.7', marginBottom: '28px' },
  heroStats: { display: 'flex', gap: '0', borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: '24px', flexWrap: 'wrap' },
  heroStat: { flex: 1, minWidth: '120px', padding: '0 24px 0 0' },
  heroStatNum: { fontSize: '28px', fontWeight: '800', color: '#fff' },
  heroStatLabel: { fontSize: '13px', color: '#94a3b8' },
  section: { marginBottom: '48px' },
  catGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' },
  catCard: { padding: '24px 16px', textAlign: 'center', cursor: 'pointer' },
  catIcon: { width: '52px', height: '52px', borderRadius: '14px', fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' },
  catName: { fontWeight: '700', fontSize: '14px', color: '#1e293b' },
  catCount: { fontSize: '12px', color: '#94a3b8', marginTop: '4px' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
  productImg: { position: 'relative', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  productBody: { padding: '16px' },
  productCat: { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.06em', color: '#6366f1', marginBottom: '4px' },
  productName: { fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '8px', lineHeight: '1.3' },
  reviewCount: { fontSize: '12px', color: '#94a3b8' },
  productFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: '18px', fontWeight: '800', color: '#1e293b' },
  originalPrice: { fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '6px' },
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '8px' },
  whyCard: { padding: '28px 24px' },
  whyIcon: { fontSize: '28px', marginBottom: '14px' },
  whyTitle: { fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' },
  whyDesc: { fontSize: '14px', color: '#64748b', lineHeight: '1.6' },
  testiGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
  testiCard: { padding: '28px' },
  testiComment: { fontSize: '14px', color: '#475569', lineHeight: '1.7', marginBottom: '20px', fontStyle: 'italic' },
  testiAuthor: { display: 'flex', alignItems: 'center', gap: '12px' },
  testiAvatar: {
    width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#6366f1',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#fff',
  },
  testiName: { fontWeight: '700', fontSize: '14px', color: '#1e293b' },
  testiRole: { fontSize: '12px', color: '#94a3b8' },
  newsletter: {
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    borderRadius: '16px',
    padding: '56px 40px',
    textAlign: 'center',
    marginBottom: '8px',
  },
  newsletterTitle: { fontSize: '30px', fontWeight: '800', color: '#fff', marginBottom: '10px' },
  newsletterSub: { color: '#c7d2fe', fontSize: '16px', marginBottom: '28px' },
  newsletterForm: { display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '460px', margin: '0 auto' },
  newsletterInput: { flex: 1, background: 'rgba(255,255,255,.15)', border: '1.5px solid rgba(255,255,255,.3)', color: '#fff' },
};

export default Home;
