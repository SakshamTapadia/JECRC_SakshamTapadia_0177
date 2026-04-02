import { useState } from 'react';
import { useParams, NavLink, Outlet, Link } from 'react-router-dom';
import { products, categoryIcons } from '../data/products';
import { useCart } from '../context/CartContext';

function StarRating({ rating }) {
  return (
    <span className="stars" style={{ fontSize: '18px' }}>
      {Array.from({ length: 5 }, (_, i) => i < Math.round(rating) ? '★' : '☆').join('')}
    </span>
  );
}

function ProductDetail() {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));
  const { addToCart, cartItems } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>Product not found</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: '8px' }}>← Back to Products</Link>
      </div>
    );
  }

  const inCart = cartItems.some(i => i.id === product.id);
  const savings = (product.originalPrice - product.price).toFixed(2);
  const savingsPct = Math.round((1 - product.price / product.originalPrice) * 100);

  function handleAddToCart() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="fade-in-up">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to="/products">Products</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to={`/products?category=${product.category}`}>{product.category}</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: '#1e293b', fontWeight: '600' }}>{product.name}</span>
      </div>

      {/* Main Layout */}
      <div style={s.layout}>

        {/* Left — Product Image */}
        <div style={s.imageSection}>
          <div style={{ ...s.mainImage, background: `linear-gradient(135deg, ${product.color}18, ${product.color}40)` }}>
            <div style={{ fontSize: '80px' }}>{categoryIcons[product.category]}</div>
          </div>
          <div style={s.thumbnailRow}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ ...s.thumbnail, background: `linear-gradient(135deg, ${product.color}12, ${product.color}28)` }}>
                {categoryIcons[product.category]}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Product Info */}
        <div style={s.infoSection}>
          {product.badge && (
            <span className={`badge ${product.badgeType}`} style={{ marginBottom: '10px' }}>{product.badge}</span>
          )}

          <h1 style={s.productTitle}>{product.name}</h1>

          <div style={s.ratingRow}>
            <StarRating rating={product.rating} />
            <span style={s.ratingNum}>{product.rating}</span>
            <span style={s.reviewCount}>({product.reviewCount} reviews)</span>
            <span style={s.categoryPill}>{product.category}</span>
          </div>

          <div style={s.priceSection}>
            <span style={s.price}>${product.price}</span>
            <span style={s.originalPrice}>${product.originalPrice}</span>
            <span style={s.savingBadge}>Save ${savings} ({savingsPct}% off)</span>
          </div>

          <p style={s.description}>{product.description}</p>

          <div style={s.stockRow}>
            <div style={{ ...s.stockDot, backgroundColor: product.inStock ? '#22c55e' : '#ef4444' }} />
            <span style={{ fontSize: '14px', fontWeight: '600', color: product.inStock ? '#15803d' : '#b91c1c' }}>
              {product.inStock ? 'In Stock — Ready to ship' : 'Out of Stock'}
            </span>
          </div>

          <hr className="divider" />

          {/* Quantity + Cart */}
          <div style={s.addToCart}>
            <div style={s.qtySelector}>
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span style={s.qtyDisplay}>{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button
              className={`btn btn-lg ${added ? 'btn-success' : 'btn-primary'}`}
              style={{ flex: 1, justifyContent: 'center' }}
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              {added ? '✅ Added to Cart!' : inCart ? '+ Add More' : '🛒 Add to Cart'}
            </button>
          </div>

          <div style={s.wishlistRow}>
            <button className="btn btn-ghost btn-sm">♡ Save to Wishlist</button>
            <button className="btn btn-ghost btn-sm">↗ Share</button>
          </div>

          {/* Trust Badges */}
          <div style={s.trustRow}>
            {[
              ['🚚', 'Free shipping over $50'],
              ['↩️', '30-day returns'],
              ['🔒', 'Secure checkout'],
            ].map(([icon, text]) => (
              <div key={text} style={s.trustItem}>
                <span style={s.trustIcon}>{icon}</span>
                <span style={s.trustText}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav" style={{ marginTop: '32px' }}>
        <NavLink
          to="reviews"
          className={({ isActive }) => `tab-btn${isActive ? ' active' : ''}`}
        >
          ⭐ Reviews ({product.reviews.length})
        </NavLink>
        <NavLink
          to="specs"
          className={({ isActive }) => `tab-btn${isActive ? ' active' : ''}`}
        >
          📋 Specifications
        </NavLink>
      </div>

      <div className="fade-in">
        <Outlet />
      </div>
    </div>
  );
}

const s = {
  layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' },
  imageSection: {},
  mainImage: {
    borderRadius: '16px', height: '320px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px',
  },
  thumbnailRow: { display: 'flex', gap: '10px' },
  thumbnail: {
    width: '72px', height: '72px', borderRadius: '10px', border: '2px solid #e2e8f0',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '22px', cursor: 'pointer',
  },
  infoSection: {},
  productTitle: { fontSize: '28px', fontWeight: '900', color: '#1e293b', lineHeight: '1.25', marginBottom: '12px' },
  ratingRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' },
  ratingNum: { fontSize: '15px', fontWeight: '700', color: '#1e293b' },
  reviewCount: { fontSize: '14px', color: '#94a3b8' },
  categoryPill: {
    padding: '3px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '700',
    backgroundColor: '#e0e7ff', color: '#4f46e5',
  },
  priceSection: { display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' },
  price: { fontSize: '32px', fontWeight: '900', color: '#1e293b' },
  originalPrice: { fontSize: '18px', color: '#94a3b8', textDecoration: 'line-through' },
  savingBadge: { fontSize: '13px', fontWeight: '700', color: '#10b981', backgroundColor: '#d1fae5', padding: '3px 10px', borderRadius: '999px' },
  description: { fontSize: '15px', color: '#475569', lineHeight: '1.75', marginBottom: '16px' },
  stockRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' },
  stockDot: { width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0 },
  addToCart: { display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' },
  qtySelector: { display: 'flex', alignItems: 'center', gap: '8px' },
  qtyDisplay: { width: '36px', textAlign: 'center', fontWeight: '800', fontSize: '16px' },
  wishlistRow: { display: 'flex', gap: '8px', marginBottom: '20px' },
  trustRow: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  trustItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  trustIcon: { fontSize: '16px' },
  trustText: { fontSize: '12px', color: '#64748b', fontWeight: '500' },
};

export default ProductDetail;
