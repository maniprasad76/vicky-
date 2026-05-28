import React from 'react';
import './SisAndBro.css';
import siblingsImg from '../assets/sis&bro.png';

const SisAndBro = () => {
  return (
    <section id="siblings" className="siblings-fullscreen-section">
      {/* Full Background Image */}
      <div className="siblings-bg">
        <img src={siblingsImg} alt="Siblings" className="siblings-bg-img" />
        <div className="siblings-overlay"></div>
      </div>

      <div className="siblings-content container">
        <div className="siblings-header animate-fade-up">
          <h2 className="siblings-title">Sis <span className="text-accent">&</span> Bro</h2>
          <p className="siblings-subtitle">A bond like no other</p>
        </div>

        <div className="siblings-message animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <span className="quote-mark-small">“</span>
          <p>
            Side by side or miles apart, siblings are always connected by the heart. The bond between a brother and sister is a unique thread in the family fabric—woven with childhood secrets, endless teasing, fierce protection, and an unbreakable love that only grows stronger with time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SisAndBro;
