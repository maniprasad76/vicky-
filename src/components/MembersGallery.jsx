import React from 'react';
import './MembersGallery.css';

const FamilyDefinition = () => {
  return (
    <section id="members" className="section-padding container">
      <div className="family-definition-wrapper">
        <div className="family-definition-text animate-fade-up">
          <h2 className="section-title">
            What is <span className="text-accent">Family?</span>
          </h2>
          <div className="definition-content">
            <div className="definition-header">
              <h3 className="defined-word">fam·i·ly</h3>
              <div className="definition-meta">
                <span className="pronunciation">/ˈfam(ə)lē/</span>
                <span className="noun-badge">noun</span>
              </div>
            </div>
            
            <div className="definition-items">
              <div className="def-item">
                <span className="def-number">1</span>
                <p>Life's greatest blessing. A group that dreams, laughs, plays, and loves together.</p>
              </div>
              <div className="def-item">
                <span className="def-number">2</span>
                <p>Those whom you can always count on. Always present not only in the good times but also in the most challenging ones.</p>
              </div>
              <div className="def-item">
                <span className="def-number">3</span>
                <p>The compass that guides us; the inspiration to reach great heights, and our comfort when we occasionally falter.</p>
              </div>
            </div>
            
            <div className="quote-box">
              <span className="quote-icon">❝</span>
              <p className="quote-text">Family is not an important thing. It's everything.</p>
            </div>
          </div>
        </div>
        <div className="family-definition-image animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="definition-image-frame">
            <img src="/image.png" alt="Our Family" className="definition-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyDefinition;
