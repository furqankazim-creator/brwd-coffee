import React, { useState } from 'react';

const listData = {
  iced: [
    { name: "Brown Sugar Cloud", desc: "Double espresso, oat milk, brown sugar cream", price: 6.50 },
    { name: "Strawberry Cold Brew", desc: "Slow-steeped coffee, strawberry cream", price: 6.75 },
    { name: "Espresso Tonic", desc: "Bright espresso, citrus tonic, orange", price: 5.75 }
  ],
  hot: [
    { name: "House Latte", desc: "Double espresso, perfectly textured milk", price: 5.00 },
    { name: "Flat White", desc: "Rich espresso, microfoam", price: 4.75 },
    { name: "Pour Over", desc: "Rotating single origin", price: 6.00 }
  ],
  seasonal: [
    { name: "Pistachio Cloud", desc: "Nutty, creamy, made for slow afternoons", price: 7.00 },
    { name: "Matcha Caramel", desc: "Earthy matcha, sweet caramel", price: 6.50 },
    { name: "Gingerbread Latte", desc: "Holiday spices, oat milk", price: 6.50 }
  ]
};

export default function PickYourPour({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState('iced');

  return (
    <section className="pick-pour section-cream">
      <div className="container">
        <div className="section-head reveal visible">
          <div>
            <p className="eyebrow">Made to order</p>
            <h2 className="display">Pick your pour.</h2>
          </div>
          <a href="#menu" className="link-btn" style={{ textDecoration: 'none' }}>Full menu →</a>
        </div>

        <div className="pour-top-grid">
          <div className="pour-featured">
            {/* We use one of the existing images that looks like a group of drinks */}
            <img src="/assets/matcha-caramel.jpg" alt="Featured Drinks" />
          </div>
          <div className="pour-list-wrapper">
            <div className="pour-tabs">
              {['iced', 'hot', 'seasonal'].map(tab => (
                <button 
                  key={tab}
                  className={`pour-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="pour-list">
              {listData[activeTab].map(item => (
                <div className="pour-list-item" key={item.name} onClick={() => onAddToCart && onAddToCart(item)} style={{ cursor: 'pointer' }}>
                  <div>
                    <h3 className="display">{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <span className="price">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pour-bottom-grid">
          <article className="pour-card" onClick={() => onAddToCart && onAddToCart({name: "Pistachio Cloud", price: 7.00, img: "/assets/pistachio.jpg"})}>
            <img src="/assets/pistachio.jpg" alt="Pistachio Cloud" />
            <div className="pour-card-body">
              <h3 className="display">Pistachio Cloud</h3>
              <p>Nutty, creamy, made for slow afternoons</p>
            </div>
          </article>
          <article className="pour-card" onClick={() => onAddToCart && onAddToCart({name: "House Latte", price: 5.00, img: "/assets/latte.jpg"})}>
            <img src="/assets/latte.jpg" alt="House Latte" />
            <div className="pour-card-body">
              <h3 className="display">House Latte</h3>
              <p>Our espresso with perfectly textured milk</p>
            </div>
          </article>
          <article className="pour-card" onClick={() => onAddToCart && onAddToCart({name: "Coffee + Croissant", price: 8.00, img: "/assets/croissant.jpg"})}>
            <img src="/assets/croissant.jpg" alt="Coffee + Croissant" />
            <div className="pour-card-body">
              <h3 className="display">Coffee + Croissant</h3>
              <p>A flaky, buttery kind of morning</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

