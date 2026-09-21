import React, { useState, useEffect } from 'react';

const links = [
  { href: '#menu', label: 'Menu' },
  { href: '#story', label: 'Our Story' },
  { href: '#visit', label: 'Visit' },
  { href: '#shop', label: 'Shop' },
];

export default function Header({ cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  // Highlight the nav link for whichever section is currently in view
  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href)).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label="BRWD Coffee House home">
          <img src="/assets/logo.png" alt="BRWD logo" className="brand-logo" />
          <span className="brand-word"><strong>BRWD</strong><span>Coffee House</span></span>
        </a>

        <nav className="nav" aria-label="Primary">
          {links.map(l => (
            <a key={l.href} href={l.href} className={active === l.href ? 'active' : ''}>{l.label}</a>
          ))}
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
