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
                <button className="btn btn-navy" style={{ width: "100%" }} onClick={() => onAddToCart(item)}>Add to cart <span className="plus">+</span></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
