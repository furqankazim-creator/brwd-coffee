import React from 'react';

export const TAX_RATE = 0.08;
export const DELIVERY_FEE = 3.5;
export const FREE_DELIVERY_OVER = 30;

export const money = (n) => `$${n.toFixed(2)}`;

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeItem, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const toFree = Math.max(0, FREE_DELIVERY_OVER - subtotal);

  return (
    <>
      <div className="drawer-backdrop" hidden={!isOpen} onClick={onClose}></div>
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-label="Your cart" aria-hidden={!isOpen}>
        <div className="cart-head">
          <div>
            <h3 className="display">Your cart</h3>
            <span className="cart-head-count">{count} {count === 1 ? 'item' : 'items'}</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {cart.length > 0 && (
          <div className="free-ship">
            {toFree > 0
              ? <>Add <strong>{money(toFree)}</strong> more for free delivery</>
              : <>🎉 You've unlocked <strong>free delivery</strong></>}
            <div className="free-ship-bar"><span style={{ width: `${Math.min(100, (subtotal / FREE_DELIVERY_OVER) * 100)}%` }} /></div>
          </div>
        )}

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-ico">☕</span>
              <p>Your cart is empty.<br />Go pick a personality.</p>
              <button className="btn btn-navy btn-sm" onClick={() => { onClose(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}>Browse the menu</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.name} className="cart-item">
                <div className="ci-img">
                  {item.img ? <img src={item.img} alt="" /> : <span>☕</span>}
                </div>
                <div className="ci-info">
                  <strong>{item.name}</strong>
                  <span className="ci-price">{money(item.price)} each</span>
                  <div className="ci-row">
                    <div className="qty">
                      <button onClick={() => updateQuantity(item.name, -1)} aria-label={`Decrease ${item.name}`}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQuantity(item.name, 1)} aria-label={`Increase ${item.name}`}>+</button>
                    </div>
                    <button className="ci-remove" onClick={() => removeItem(item.name)}>Remove</button>
                  </div>
                </div>
                <div className="ci-line">{money(item.price * item.qty)}</div>
              </div>
            ))
          )}
        </div>

        <div className="cart-foot">
          <div className="cart-lines">
            <div><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div><span>Tax (8%)</span><span>{money(tax)}</span></div>
            <div className="cart-lines-note"><span>Delivery</span><span>{subtotal >= FREE_DELIVERY_OVER ? 'Free' : 'Calculated at checkout'}</span></div>
          </div>
          <div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div>
          <button className="btn btn-gold btn-block btn-lg" disabled={cart.length === 0} onClick={onCheckout}>
            Checkout <span className="arrow">→</span>
          </button>
          <p className="cart-secure">🔒 Secure checkout · Pickup or delivery</p>
        </div>
      </aside>
    </>
  );
}
