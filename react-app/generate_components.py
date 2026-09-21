import os

components_dir = "src/components"
os.makedirs(components_dir, exist_ok=True)

files = {
    "Header.jsx": """
import React, { useState } from 'react';

export default function Header({ cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label="BRWD Coffee House home">
          <img src="/assets/logo.png" alt="BRWD logo" className="brand-logo" />
        </a>

        <nav className="nav" aria-label="Primary">
          <a href="#menu">Menu</a>
          <a href="#story">Our Story</a>
          <a href="#visit">Visit</a>
          <a href="#shop">Shop</a>
        </nav>

        <div className="header-actions">
          <button className="cart-btn" onClick={onOpenCart} aria-label="Open cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button className="btn btn-gold" onClick={() => document.getElementById('orderModal').hidden = false}>Order Now</button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} id="mobileNav" aria-label="Mobile">
        <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
        <a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a>
        <a href="#visit" onClick={() => setMenuOpen(false)}>Visit</a>
        <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
      </nav>
    </header>
  );
}
""",
    "Hero.jsx": """
import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy reveal visible">
          <p className="eyebrow">☕ Coffee House</p>
          <h1 className="display hero-title">BRWD</h1>
          <p className="hero-sub">Coffee with character.<br /><em>No boring cups allowed.</em></p>
          <p className="hero-body">Bold brews. Groovy vibes. Single-origin beans, roasted weekly, served with intention.</p>
          <div className="hero-actions">
            <button className="btn btn-gold btn-lg" onClick={() => document.getElementById('orderModal').hidden = false}>Order Now <span className="arrow">→</span></button>
            <a href="#menu" className="btn btn-outline btn-lg">View Menu</a>
          </div>
          <div className="hero-stats">
            <div><strong>12</strong><span>Origin Farms</span></div>
            <div><strong>7d</strong><span>Fresh Roast</span></div>
            <div><strong>100%</strong><span>Direct Trade</span></div>
          </div>
        </div>
        <div className="hero-visual reveal visible">
          <div className="hero-swirl" aria-hidden="true"></div>
          <img src="/assets/iced-coffee.jpg" alt="BRWD iced coffee" className="hero-img" />
          <img src="/assets/cups.jpg" alt="BRWD cups" className="hero-img-secondary" />
        </div>
      </div>
    </section>
  );
}
""",
    "Menu.jsx": """
import React, { useState } from 'react';

const menuData = {
  hot: [
    { name: "House Latte", desc: "Double espresso · silky milk", price: 5, img: "/assets/latte.jpg", tag: "Popular" },
    { name: "Espresso No. 3", desc: "Sweet citrus · cacao · caramel", price: 3.5, img: "/assets/cups.jpg" },
    { name: "Pour Over", desc: "Single origin rotating daily", price: 6, img: "/assets/cups.jpg" },
  ],
  iced: [
    { name: "Iced Coffee House", desc: "18-hour cold steep", price: 6, img: "/assets/cold-brew.jpg" },
    { name: "Pistachio Cold Brew", desc: "Cold brew · Pistachio cream", price: 8.5, img: "/assets/pistachio.jpg", tag: "New" },
    { name: "Iced Vanilla Latte", desc: "House syrup · oat milk", price: 6.5, img: "/assets/iced-coffee.jpg" },
  ],
  seasonal: [
    { name: "Matcha & Caramel", desc: "Seasonal signatures", price: 7, img: "/assets/matcha-caramel.jpg" },
    { name: "Strawberry Cold Brew", desc: "Slow-steeped coffee, strawberry cream", price: 7.5, img: "/assets/iced-coffee.jpg" },
    { name: "Brown Sugar Cloud", desc: "Double espresso, oat milk, brown sugar cream", price: 7, img: "/assets/latte.jpg" }
  ],
  food: [
    { name: "Butter Croissant", desc: "Flaky, buttery morning ritual", price: 4.5, img: "/assets/croissant.jpg" },
    { name: "Almond Croissant", desc: "Twice baked · almond frangipane", price: 5.5, img: "/assets/croissant.jpg" },
  ]
};

export default function Menu({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState('hot');

  return (
    <section className="menu section-navy" id="menu">
      <div className="container">
        <div className="section-head reveal visible">
          <div>
            <p className="eyebrow eyebrow-gold">What We Brew</p>
            <h2 className="display">Pick your<br />personality.</h2>
          </div>
          <div className="tabs" role="tablist">
            {['hot', 'iced', 'seasonal', 'food'].map(tab => (
              <button 
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="menu-grid">
          {menuData[activeTab].map((item, index) => (
            <article key={item.name} className="menu-card" style={{ animationDelay: `${index * 0.07}s` }}>
              <div className="menu-card-img">
                {item.tag && <span className="pill">{item.tag}</span>}
                <img src={item.img} alt={item.name} loading="lazy" />
              </div>
              <div className="menu-card-body">
                <div className="menu-card-top">
                  <h3 className="display">{item.name}</h3>
                  <span className="price">${item.price.toFixed(2)}</span>
                </div>
                <p className="menu-card-desc">{item.desc}</p>
                <button className="btn btn-outline" style={{width: '100%'}} onClick={() => onAddToCart(item)}>Add to Order +</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
""",
    "CartDrawer.jsx": """
import React from 'react';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <div className="drawer-backdrop" hidden={!isOpen} onClick={onClose}></div>
      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-label="Your cart">
        <div className="cart-head">
          <h3 className="display">Your cart</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close cart">×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="cart-empty">Your cart is empty. Go pick a personality.</p>
          ) : (
            cart.map(item => (
              <div key={item.name} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <span className="ci-price">${item.price.toFixed(2)}</span>
                </div>
                <div className="qty">
                  <button onClick={() => updateQuantity(item.name, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQuantity(item.name, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-foot">
          <div className="cart-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <button className="btn btn-gold btn-block" disabled={cart.length === 0}>Checkout →</button>
        </div>
      </aside>
    </>
  );
}
""",
    "Footer.jsx": """
import React, { useState } from 'react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/assets/logo.png" alt="BRWD logo" className="footer-logo" />
          <p className="display footer-word">BRWD</p>
          <p className="footer-tag">Coffee House</p>
          <p className="footer-desc">Bold brews. Groovy vibes. Roasted weekly, served with intention.</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <a href="#menu">Menu</a>
          <a href="#story">Our Story</a>
          <a href="#visit">Visit</a>
          <a href="#shop">Shop</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
          <a href="#">Wholesale</a>
        </div>
        <div className="footer-news">
          <h4>Stay in the loop</h4>
          <p>Fresh drops. New shops. Zero spam.</p>
          <form className="news-form" onSubmit={handleSubscribe}>
            <input type="email" placeholder="your@email.com" required aria-label="Email address" />
            <button type="submit" className="btn btn-gold">Join</button>
          </form>
          <p className="news-note" style={{ color: subscribed ? 'var(--gold)' : '' }}>
            {subscribed ? "Thanks for subscribing! Check your inbox soon." : "No spam. Unsubscribe anytime."}
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 BRWD Coffee House. All rights reserved.</p>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
""",
    "Toast.jsx": """
import React, { useEffect, useState } from 'react';

export default function Toast({ message, show, onHide }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    <div className={`toast ${show ? 'show' : ''}`} role="status">
      {message}
    </div>
  );
}
"""
}

for filename, content in files.items():
    with open(os.path.join(components_dir, filename), "w") as f:
        f.write(content.strip() + "\n")

print("Components generated.")
