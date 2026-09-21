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
