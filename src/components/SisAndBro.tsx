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
                Sister <span className="text-accent">&</span> Brother
              </h2>
              <span className={`${styles['siblings-subtitle']} cursive-font`}>
                A bond like no other
              </span>
            </div>

            <div className={styles['siblings-card']}>
              <span className={styles['quote-mark']}>“</span>
              <p>
                Side by side or miles apart, siblings are always connected by the heart. The bond
                between a brother and sister is a unique thread in the family fabric—woven with
                childhood secrets, endless teasing, fierce protection, and an unbreakable love that
                only grows stronger with time.
              </p>
            </div>
          </div>

          {/* Right Column: 3D Interlocked Rings and Polaroid Sibling Photo */}
          <div
            className={`${styles['siblings-right']} animate-fade-up`}
            style={{ animationDelay: '0.3s' }}
          >
            {/* Interlocked rings represent the bond */}
            <div className={styles['rings-canvas-wrapper']}>
              <InterlockedRings />
            </div>

            {/* Sibling image rendered inside a physical tilted Polaroid frame */}
            <Interactive3DCard className={styles['image-frame-3d']} maxTilt={10}>
              <img
                src={siblingsImg}
                alt="Siblings Portrait"
                className={styles['siblings-img']}
                loading="lazy"
              />
              <div className={`${styles['polaroid-caption']} cursive-font`}>Memories of Us</div>
            </Interactive3DCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SisAndBro;
