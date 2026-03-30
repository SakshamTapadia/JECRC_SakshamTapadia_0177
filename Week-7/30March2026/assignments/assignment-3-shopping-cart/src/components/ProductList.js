function ProductList({ products, onAddToCart }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Products</h3>
      {products.map((product) => (
        <div key={product.id} style={styles.card}>
          <div>
            <span style={styles.name}>{product.name}</span>
            <span style={styles.price}>${product.price}</span>
          </div>
          <button style={styles.btn} onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    minWidth: 240,
    background: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  title: { marginTop: 0, color: '#555' },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fff',
    borderRadius: 8,
    padding: '10px 12px',
    marginBottom: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  name: { fontWeight: 600, marginRight: 8 },
  price: { color: '#e67e22', fontWeight: 700 },
  btn: {
    background: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 13,
  },
};

export default ProductList;
