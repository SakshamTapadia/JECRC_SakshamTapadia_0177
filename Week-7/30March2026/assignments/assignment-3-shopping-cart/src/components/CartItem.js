function CartItem({ item, onUpdateQty, onRemove }) {
  return (
    <div style={styles.row}>
      <div style={styles.info}>
        <span style={styles.name}>{item.name}</span>
        <span style={styles.subtotal}>${item.price * item.qty}</span>
      </div>
      <div style={styles.controls}>
        <button style={styles.qtyBtn} onClick={() => onUpdateQty(item.id, -1)}>−</button>
        <span style={styles.qty}>{item.qty}</span>
        <button style={styles.qtyBtn} onClick={() => onUpdateQty(item.id, +1)}>+</button>
        <button style={styles.removeBtn} onClick={() => onRemove(item.id)}>✕</button>
      </div>
    </div>
  );
}

const styles = {
  row: {
    background: '#fff',
    borderRadius: 8,
    padding: '10px 12px',
    marginBottom: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  name: { fontWeight: 600, fontSize: 14 },
  subtotal: { color: '#e67e22', fontWeight: 700 },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    background: '#ecf0f1',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 1,
  },
  qty: {
    minWidth: 24,
    textAlign: 'center',
    fontWeight: 700,
  },
  removeBtn: {
    marginLeft: 'auto',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    width: 28,
    height: 28,
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 13,
  },
};

export default CartItem;
