import React from 'react';

const AnimatedCoffeeBag = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      borderRadius: '16px',
      overflow: 'hidden',
      background: 'var(--navy)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow)'
    }}>
      {/* Spinning Sunburst */}
      <div style={{
        position: 'absolute',
        top: '-100%', left: '-100%', right: '-100%', bottom: '-100%',
        background: 'repeating-conic-gradient(var(--cream) 0 15deg, #24365d 15deg 30deg)',
        animation: 'spin 40s linear infinite',
        zIndex: 0
      }} />

      {/* Video in circle */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '8px solid var(--cream)',
        boxShadow: '0 24px 50px rgba(0,0,0,0.45)',
        animation: 'floatCup 6s ease-in-out infinite',
        background: 'var(--navy)'
      }}>
        <video
          src="/assets/craft.mp4"
          poster="/assets/cups.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-label="BRWD coffee being brewed"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <div className="craft-badge" style={{ 
        position: 'absolute', 
        bottom: '24px', 
        left: '24px', 
        background: 'var(--cream)', 
        color: 'var(--navy)', 
        borderRadius: '99px', 
        padding: '8px 16px', 
        boxShadow: 'var(--shadow)', 
        zIndex: 2,
        width: 'auto',
        height: 'auto',
        animation: 'none'
      }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: '700' }}>Roasted Weekly</span>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatCup {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default function Craft() {
  return (
    <section className="craft section-navy" id="story" style={{ paddingTop: 0 }}>
      {/* Top marquee */}
      <div className="marquee" aria-hidden="true" style={{ borderTop: 'none', borderBottom: '1px solid rgba(247,244,238,0.1)' }}>
        <div className="marquee-track">
          {[0, 1, 2].map(k => (
            <span key={k}>
              ☕ Freshly roasted • ✦ Always poured with care • Stay awhile • ✦ Single origin • Direct trade • Roasted weekly • ✦ No boring cups allowed •
            </span>
          ))}
        </div>
      </div>

      <div className="container craft-grid" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="craft-visual reveal visible">
          <AnimatedCoffeeBag />
        </div>
        <div className="craft-copy reveal visible">
          <p className="eyebrow eyebrow-gold">The Craft</p>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: '1.1', marginBottom: '24px', color: 'var(--cream)' }}>
            Good coffee starts way before the first sip.
          </h2>
          <p style={{ color: 'var(--muted-on-navy)', maxWidth: '520px', marginBottom: '40px', fontSize: '15px' }}>
            We choose expressive coffees from thoughtful producers, then roast each one to bring out what makes it special. Nothing fussy. Just careful work and a really good cup.
          </p>
          
          <div className="craft-stats" style={{ borderTop: '1px solid rgba(247, 244, 238, 0.15)', paddingTop: '32px', display: 'flex', gap: '48px', marginTop: '0' }}>
            <div>
              <strong className="display" style={{ color: 'var(--gold)', fontSize: '48px' }}>12</strong>
              <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted-on-navy)', letterSpacing: '0', textTransform: 'none', fontWeight: '400', marginTop: '0' }}>origin partners</span>
            </div>
            <div>
              <strong className="display" style={{ color: 'var(--gold)', fontSize: '48px' }}>7</strong>
              <span style={{ display: 'block', fontSize: '12px', color: 'var(--muted-on-navy)', letterSpacing: '0', textTransform: 'none', fontWeight: '400', marginTop: '0' }}>days from roast</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

