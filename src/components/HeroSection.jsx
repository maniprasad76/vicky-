import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section id="hero" className="hero-section">
      {/* Image Background Elements */}
      <div className="hero-image-bg">
        <div className="image-overlay"></div>
      </div>
      
      <div className="container hero-container">
        
        {/* Floating Badge */}
        <div className="floating-badge animate-fade-up glass-panel">
          <span className="pulse-dot"></span>
          Our Digital Home
        </div>

        {/* Huge Modern Typography */}
        <div className="title-wrapper">
          <h1 className="display-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
            THE <span className="outline-text">FAMILY</span>
          </h1>
          <h1 className="display-title right-align animate-fade-up" style={{ animationDelay: '0.2s' }}>
            LEGACY <span className="text-accent">&</span> MEMORIES
          </h1>
        </div>

        {/* Bottom Content */}
        <div className="hero-bottom animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <p className="hero-description">
            Celebrating our past, embracing the present, and building a beautiful future together.
          </p>
          <div className="hero-actions">
            <a href="#members" className="btn-modern">
              Explore Our Story <span className="arrow">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
