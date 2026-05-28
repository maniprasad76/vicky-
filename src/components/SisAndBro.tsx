import React from 'react';
import styles from './SisAndBro.module.css';
import siblingsImg from '../assets/sis&bro.png';
import Interactive3DCard from './Interactive3DCard';
import InterlockedRings from './InterlockedRings';

const SisAndBro: React.FC = () => {
  return (
    <section id="siblings" className={`section-padding ${styles['siblings-section']}`}>
      <div className="container">
        <div className={styles['siblings-grid']}>
          {/* Left Column: Heading and Message Card */}
          <div className={`${styles['siblings-left']} animate-fade-up`}>
            <div className={styles['siblings-header']}>
              <h2 className={styles['siblings-title']}>
                Sis <span className="text-accent">&</span> Bro
              </h2>
              <span className={styles['siblings-subtitle']}>A bond like no other</span>
            </div>

            <Interactive3DCard className={styles['siblings-card']} maxTilt={8}>
              <span className={styles['quote-mark']}>“</span>
              <p>
                Side by side or miles apart, siblings are always connected by the heart. The bond
                between a brother and sister is a unique thread in the family fabric—woven with
                childhood secrets, endless teasing, fierce protection, and an unbreakable love that
                only grows stronger with time.
              </p>
            </Interactive3DCard>
          </div>

          {/* Right Column: 3D Interlocked Rings and Parallax Sibling Photo */}
          <div
            className={`${styles['siblings-right']} animate-fade-up`}
            style={{ animationDelay: '0.3s' }}
          >
            {/* Interlocked rings represent the bond */}
            <div className={styles['rings-canvas-wrapper']}>
              <InterlockedRings />
            </div>

            {/* Sibling image rendered inside a 3D tilted frame */}
            <Interactive3DCard className={styles['image-frame-3d']} maxTilt={10}>
              <img
                src={siblingsImg}
                alt="Siblings Portrait"
                className={styles['siblings-img']}
                loading="lazy"
              />
            </Interactive3DCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SisAndBro;
