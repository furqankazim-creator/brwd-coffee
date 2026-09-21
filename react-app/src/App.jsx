import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import PickYourPour from './components/PickYourPour';
import Craft from './components/Craft';
import Visit from './components/Visit';
import CommunityFeed from './components/CommunityFeed';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import Toast from './components/Toast';

function App() {
  // Cart survives refreshes via localStorage
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('brwd-cart')) || []; } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('brwd-cart', JSON.stringify(cart)); } catch { /* storage unavailable */ }
  }, [cart]);
  const [toast, setToast] = useState({ show: false, message: '' });

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setToast({ show: true, message: `Added ${item.name} to cart` });
  };

  const removeItem = (name) => setCart(prev => prev.filter(i => i.name !== name));

  const startCheckout = () => { setCartOpen(false); setCheckoutOpen(true); };

  const completeOrder = () => {
    setCart([]);
  };

  const updateQuantity = (name, change) => {
    setCart(prev => prev.map(item => {
      if (item.name === name) return { ...item, qty: item.qty + change };
      return item;
    }).filter(item => item.qty > 0));
  };

  return (
    <>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Craft />
        <PickYourPour onAddToCart={addToCart} />
        <Menu onAddToCart={addToCart} />
        <Visit />
        <CommunityFeed />
      </main>
      <Footer />
      
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart} 
        updateQuantity={updateQuantity} 
        removeItem={removeItem}
        onCheckout={startCheckout}
      />
      {checkoutOpen && (
        <Checkout cart={cart} onClose={() => setCheckoutOpen(false)} onComplete={completeOrder} />
      )}
      <Toast 
        show={toast.show} 
        message={toast.message} 
        onHide={() => setToast({ show: false, message: '' })} 
      />
      
      {/* Order Modal simplified for App.jsx */}
      <div className="modal" id="orderModal" hidden>
        <div className="modal-card">
          <button className="modal-close" onClick={() => document.getElementById('orderModal').hidden = true}>×</button>
          <img src="/assets/logo.png" alt="" className="modal-logo" />
          <h3 className="display">Ready to order?</h3>
          <div className="order-options">
            <button className="order-opt" onClick={() => document.getElementById('orderModal').hidden = true}><span><strong>Order for Pickup</strong><small>Ready in 5 min</small></span></button>
            <button className="order-opt" onClick={() => document.getElementById('orderModal').hidden = true}><span><strong>Order for Delivery</strong><small>Delivered to your door</small></span></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
