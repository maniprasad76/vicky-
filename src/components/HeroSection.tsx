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
              Digital Family Core
            </div>

            {/* Huge Futuristic Typography */}
            <div className={styles['title-wrapper']}>
              <h1 className={styles['display-title']}>
                THE <span className={styles['outline-text']}>FAMILY</span>
              </h1>
              <h1 className={styles['display-title']}>
                LEGACY <span className="text-accent">&</span> MEMORIES
              </h1>
            </div>

            <p className={styles['hero-description']}>
              Stepping into the future while honoring our roots. An interactive, 3D-projected
              digital home celebrating our past, present, and tomorrow.
            </p>

            <div className={styles['hero-actions']}>
              <Link to="/#members" className="btn-cyber">
                Enter Projection <span style={{ marginLeft: '0.5rem' }}>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Hologram Cube Visual */}
          <div
            className={`${styles['hero-visual-wrapper']} animate-fade-up`}
            style={{ animationDelay: '0.3s' }}
          >
            <Interactive3DCard className={styles['hero-3d-card']} maxTilt={15}>
              <div className={styles['visual-badge']}>PROJ // 01</div>

              {/* Floating Core */}
              <FloatingThreeDObject />

              <div className={styles['visual-footer']}>
                <span className={styles['visual-title']}>Core Network</span>
                <span className={styles['visual-status']}>
                  <span className="pulse-dot"></span> ACTIVE
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
