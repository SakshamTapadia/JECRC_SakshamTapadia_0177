import CartItem from './CartItem';

function Cart({ items, total, onUpdateQty, onRemove }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Cart</h3>
      {items.length === 0 ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQty={onUpdateQty}
              onRemove={onRemove}
            />
          ))}
          <div style={styles.totalRow}>
            <span>Total</span>
            <span style={styles.totalAmount}>${total}</span>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    minWidth: 260,
    background: '#fff8f0',
    borderRadius: 10,
    padding: 16,
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  title: { marginTop: 0, color: '#555' },
  empty: { color: '#aaa', fontStyle: 'italic' },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '2px solid #e67e22',
    paddingTop: 10,
    marginTop: 10,
    fontWeight: 700,
    fontSize: 16,
  },
  totalAmount: { color: '#e67e22' },
};

export default Cart;
