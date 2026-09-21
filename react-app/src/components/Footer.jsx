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
          <a href="#top" className="footer-brand-lockup" aria-label="BRWD Coffee House home">
            <span className="footer-logo-wrap"><img src="/assets/logo.png" alt="BRWD logo" className="footer-logo" /></span>
            <span>
              <span className="display footer-word">BRWD</span>
              <span className="footer-tag">Coffee House</span>
            </span>
          </a>
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
