import { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

const PRODUCTS = [
  { id: 1, name: 'React T-Shirt', price: 25 },
  { id: 2, name: 'JavaScript Hoodie', price: 45 },
  { id: 3, name: 'Node.js Cap', price: 15 },
  { id: 4, name: 'CSS Mug', price: 10 },
];

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>🛒 Mini Shopping Cart</h2>
      <div style={styles.layout}>
        <ProductList products={PRODUCTS} onAddToCart={addToCart} />
        <Cart
          items={cartItems}
          total={total}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    fontFamily: 'sans-serif',
    maxWidth: 800,
    margin: '30px auto',
    padding: '0 16px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  layout: {
    display: 'flex',
    gap: 24,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
};

export default ShoppingCart;
