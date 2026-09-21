import React from 'react';

export default function Visit() {
  return (
    <section className="visit" id="visit" style={{ padding: 'clamp(56px, 8vw, 100px) 0' }}>
      <div className="container">
        <div className="section-head reveal visible" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--espresso)', letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600' }}>Find Us</p>
            <h2 className="display" style={{ fontSize: 'clamp(44px, 7vw, 88px)', color: 'var(--navy)' }}>Come visit.</h2>
          </div>
          <p className="section-note" style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontStyle: 'italic', color: 'var(--muted)', maxWidth: '320px' }}>
            Three neighborhood coffee houses. One signature vibe.
          </p>
        </div>
        
        <div className="visit-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(32px, 5vw, 64px)' }}>
          <div className="visit-visual reveal visible">
            <img src="/assets/storefront.jpg" alt="BRWD Coffee House storefront" style={{ borderRadius: 'var(--radius)', width: '100%', height: '100%', objectFit: 'cover', boxShadow: 'var(--shadow)', aspectRatio: '3 / 2' }} />
          </div>
          
          <div className="locations reveal visible" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <article className="location" style={{ padding: '24px', borderRadius: 'var(--radius-sm)', background: 'var(--cream-alt)', border: '1px solid rgba(27, 42, 74, 0.08)' }}>
              <h3 className="display" style={{ fontSize: '30px', marginBottom: '6px', color: 'var(--navy)' }}>Flagship</h3>
              <p className="addr" style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontStyle: 'italic', margin: '0 0 2px', color: 'var(--espresso)' }}>12 Groove St, Downtown</p>
              <p className="hours" style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 12px' }}>Mon–Fri 7am–7pm · Sat–Sun 8am–6pm</p>
              <a href="#" className="link-btn" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', textDecoration: 'none' }}>Get Directions →</a>
            </article>
            
            <article className="location" style={{ padding: '24px', borderRadius: 'var(--radius-sm)', background: 'var(--cream-alt)', border: '1px solid rgba(27, 42, 74, 0.08)' }}>
              <h3 className="display" style={{ fontSize: '30px', marginBottom: '6px', color: 'var(--navy)' }}>East Side</h3>
              <p className="addr" style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontStyle: 'italic', margin: '0 0 2px', color: 'var(--espresso)' }}>44 Pulse Ave, East Quarter</p>
              <p className="hours" style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 12px' }}>Daily 8am–6pm</p>
              <a href="#" className="link-btn" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', textDecoration: 'none' }}>Get Directions →</a>
            </article>
            
            <article className="location" style={{ padding: '24px', borderRadius: 'var(--radius-sm)', background: 'var(--cream-alt)', border: '1px solid rgba(27, 42, 74, 0.08)' }}>
              <h3 className="display" style={{ fontSize: '30px', marginBottom: '6px', color: 'var(--navy)' }}>The Roastery</h3>
              <p className="addr" style={{ fontFamily: 'var(--font-serif)', fontSize: '19px', fontStyle: 'italic', margin: '0 0 2px', color: 'var(--espresso)' }}>88 Brew Lane, Warehouse District</p>
              <p className="hours" style={{ fontSize: '13px', color: 'var(--muted)', margin: '0 0 12px' }}>Sat–Sun 9am–5pm</p>
              <a href="#" className="link-btn" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', textDecoration: 'none' }}>Get Directions →</a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

