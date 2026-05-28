import React from 'react';
import styles from './MembersGallery.module.css';
import Interactive3DCard from './Interactive3DCard';
import ThreePhotoCube from './ThreePhotoCube';

const MembersGallery: React.FC = () => {
  return (
    <section id="members" className="section-padding container">
      <div className={styles['family-definition-wrapper']}>
        {/* Left Column: Family definition text inside 3D Card */}
        <div className={`${styles['family-definition-text']} animate-fade-up`}>
          <h2 className="section-title">
            What is <span className="text-accent">Family?</span>
          </h2>

          <Interactive3DCard className={styles['definition-card']} maxTilt={8}>
            <div className={styles['definition-header']}>
              <h3 className={styles['defined-word']}>fam·i·ly</h3>
              <div className={styles['definition-meta']}>
                <span className={styles.pronunciation}>/ˈfam(ə)lē/</span>
                <span className={styles['noun-badge']}>noun</span>
              </div>
            </div>

            <div className={styles['definition-items']}>
              <div className={styles['def-item']}>
                <span className={styles['def-number']}>1</span>
                <p>
                  Life's greatest blessing. A complex, beautifully connected network that dreams,
                  laughs, plays, and loves together.
                </p>
              </div>
              <div className={styles['def-item']}>
                <span className={styles['def-number']}>2</span>
                <p>
                  Those whom you can always count on. Always present, radiating warmth, not only in
                  the high times but also in the most challenging depths.
                </p>
              </div>
              <div className={styles['def-item']}>
                <span className={styles['def-number']}>3</span>
                <p>
                  The biological compass that guides us; the structural grid to reach great heights,
                  and our cosmic anchor when we occasionally falter.
                </p>
              </div>
            </div>

            <div className={styles['quote-box']}>
              <span className={styles['quote-icon']}>❝</span>
              <p className={styles['quote-text']}>
                Family is not an important thing. It's everything.
              </p>
            </div>
          </Interactive3DCard>
        </div>

        {/* Right Column: 3D Photo Cube */}
        <div
          className={`${styles['family-definition-image']} animate-fade-up`}
          style={{ animationDelay: '0.3s' }}
        >
          <div className={styles['cube-container-3d']}>
            <ThreePhotoCube />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersGallery;
