import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products, categories, categoryIcons } from '../data/products';
import { useCart } from '../context/CartContext';

function StarRating({ rating, small }) {
  return (
    <span className="stars" style={{ fontSize: small ? '12px' : '14px' }}>
      {Array.from({ length: 5 }, (_, i) => i < Math.round(rating) ? '★' : '☆').join('')}
    </span>
  );
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];

function ProductList() {
  const [searchParams] = useSearchParams();
  const { addToCart, cartItems } = useCart();

  const urlCategory = searchParams.get('category') || 'All';
  const urlQuery = searchParams.get('q') || '';

  const [category, setCategory] = useState(urlCategory);
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState(urlQuery);

  const filtered = useMemo(() => {
    let list = products;
    if (category !== 'All') list = list.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'reviews')    list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [category, sort, search]);

  function inCart(id) { return cartItems.some(i => i.id === id); }

  return (
    <div className="fade-in-up">

      {/* Header */}
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>
            {category === 'All' ? 'All Products' : `${categoryIcons[category]} ${category}`}
          </h1>
          <p style={s.pageCount}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            className="input"
            style={{ width: '220px' }}
            placeholder="🔍 Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="input" style={{ width: '180px' }} value={sort} onChange={e => setSort(e.target.value)}>
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Category Filter */}
      <div style={s.filterRow}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setCategory(cat)}
            style={{ gap: '6px' }}
          >
            {cat !== 'All' && categoryIcons[cat]} {cat}
            {cat !== 'All' && (
              <span style={{
                background: category === cat ? 'rgba(255,255,255,.25)' : '#e2e8f0',
                borderRadius: '999px', padding: '1px 7px', fontSize: '11px', fontWeight: '700',
                color: category === cat ? '#fff' : '#64748b',
              }}>
                {products.filter(p => p.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={s.empty}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>No products found</h3>
          <p style={{ color: '#64748b' }}>Try a different search term or category.</p>
          <button className="btn btn-outline" style={{ marginTop: '16px' }} onClick={() => { setSearch(''); setCategory('All'); }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={s.grid}>
          {filtered.map(p => (
            <div key={p.id} className="product-card">
              {/* Image */}
              <Link to={`/products/${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ ...s.imgBox, background: `linear-gradient(135deg, ${p.color}18, ${p.color}35)`, position: 'relative', overflow: 'hidden' }}>
                  <div className="product-img-inner" style={{ fontSize: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    {categoryIcons[p.category]}
                  </div>
                  {p.badge && (
                    <span className={`badge ${p.badgeType}`} style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      {p.badge}
                    </span>
                  )}
                  {!p.inStock && (
                    <div style={s.soldOutOverlay}>Sold Out</div>
                  )}
                </div>
              </Link>

              {/* Body */}
              <div style={s.cardBody}>
                <p style={s.catLabel}>{p.category}</p>
                <Link to={`/products/${p.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={s.productName}>{p.name}</h3>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  <StarRating rating={p.rating} small />
                  <span style={s.ratingNum}>{p.rating}</span>
                  <span style={s.reviewCount}>({p.reviewCount})</span>
                </div>
                <div style={s.cardFooter}>
                  <div>
                    <span style={s.price}>${p.price}</span>
                    <span style={s.origPrice}>${p.originalPrice}</span>
                    <span style={s.savePct}> −{Math.round((1 - p.price / p.originalPrice) * 100)}%</span>
                  </div>
                  <button
                    className={`btn btn-sm ${inCart(p.id) ? 'btn-success' : 'btn-primary'}`}
                    disabled={!p.inStock}
                    onClick={() => addToCart(p)}
                  >
                    {!p.inStock ? '–' : inCart(p.id) ? '✓' : '+'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const s = {
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '16px', flexWrap: 'wrap' },
  pageTitle: { fontSize: '26px', fontWeight: '800', color: '#1e293b', marginBottom: '4px' },
  pageCount: { fontSize: '14px', color: '#64748b' },
  filterRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' },
  imgBox: { height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  soldOutOverlay: {
    position: 'absolute', inset: 0, background: 'rgba(0,0,0,.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: '800', fontSize: '14px', letterSpacing: '.06em',
  },
  cardBody: { padding: '14px' },
  catLabel: { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '.06em', color: '#6366f1', marginBottom: '4px' },
  productName: { fontSize: '14px', fontWeight: '700', color: '#1e293b', marginBottom: '8px', lineHeight: '1.35' },
  ratingNum: { fontSize: '13px', fontWeight: '700', color: '#1e293b' },
  reviewCount: { fontSize: '12px', color: '#94a3b8' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: '16px', fontWeight: '800', color: '#1e293b' },
  origPrice: { fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '6px' },
  savePct: { fontSize: '11px', color: '#10b981', fontWeight: '700' },
  empty: { textAlign: 'center', padding: '60px 20px', color: '#1e293b' },
};

export default ProductList;
