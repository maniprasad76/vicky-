import React from 'react';
import styles from './HeroSection.module.css';
import { HashLink as Link } from 'react-router-hash-link';
import FloatingThreeDObject from './FloatingThreeDObject';
import Interactive3DCard from './Interactive3DCard';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className={styles['hero-section']}>
      <div className="container">
        <div className={styles['hero-grid']}>
          {/* Left Column: Text & Content */}
          <div className={`${styles['hero-content']} animate-fade-up`}>
            {/* Floating Badge */}
            <div className={styles['floating-badge']}>
              <span className="pulse-dot"></span>
              Family Legacy Archive
            </div>

            {/* Huge Serif Typography with cursive highlights */}
            <div className={styles['title-wrapper']}>
              <h1 className={styles['display-title']}>
                Our{' '}
                <span
                  className={`${styles['gold-text']} cursive-font`}
                  style={{ textTransform: 'none' }}
                >
                  Family
                </span>
              </h1>
              <h1 className={styles['display-title']}>
                Legacy <span className="text-accent">&</span> Stories
              </h1>
            </div>

            <p className={styles['hero-description']}>
              Honoring our roots, celebrating our present, and embracing our tomorrow. An
              interactive scrapbook of our shared love, laughter, and unbreakable connections.
            </p>

            <div className={styles['hero-actions']}>
              <Link to="/#members" className="btn-cyber">
                Explore Memories <span style={{ marginLeft: '0.5rem' }}>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Tilted Memory Card Visual */}
          <div
            className={`${styles['hero-visual-wrapper']} animate-fade-up`}
            style={{ animationDelay: '0.3s' }}
          >
            <Interactive3DCard className={styles['hero-3d-card']} maxTilt={15}>
              <div className={styles['visual-badge']}>EST. 1985</div>

              {/* Floating 3D Gold Heart */}
              <FloatingThreeDObject />

              <div className={styles['visual-footer']}>
                <span className={styles['visual-title']}>Family Heart</span>
                <span className={styles['visual-status']}>
                  <span className="pulse-dot"></span> UNITED
                </span>
              </div>
            </Interactive3DCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
