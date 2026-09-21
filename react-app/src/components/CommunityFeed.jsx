import React from 'react';

export default function CommunityFeed() {
  const images = [
    { src: "/assets/cups.jpg", alt: "BRWD cups" },
    { src: "/assets/cold-brew.jpg", alt: "Cold brew" },
    { src: "/assets/croissant.jpg", alt: "Croissant and espresso" },
    { src: "/assets/latte.jpg", alt: "Latte" },
    { src: "/assets/pistachio.jpg", alt: "Pistachio cold brew" },
    { src: "/assets/matcha-caramel.jpg", alt: "Matcha and caramel" }
  ];

  return (
    <section className="feed section-cream-alt" style={{ padding: 'clamp(56px, 8vw, 100px) 0', background: 'var(--cream-alt)' }}>
      <div className="container">
        <div className="section-head reveal visible" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <p className="eyebrow" style={{ color: 'var(--espresso)', letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '12px', fontWeight: '600' }}>Community</p>
            <h2 className="display" style={{ fontSize: 'clamp(44px, 7vw, 88px)', color: 'var(--navy)' }}>Fresh from the feed.</h2>
          </div>
          <a href="#" className="link-btn" style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', textDecoration: 'none' }}>@brwdcoffee →</a>
        </div>
        
        <div className="feed-grid reveal visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          {images.map((img, idx) => (
            <img 
              key={idx} 
              src={img.src} 
              alt={img.alt} 
              style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 'var(--radius-sm)', transition: 'transform 0.3s' }} 
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

