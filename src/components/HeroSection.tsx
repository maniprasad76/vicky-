import styles from './HeroSection.module.css';
import { HashLink as Link } from 'react-router-hash-link';

const HeroSection = () => {
  return (
    <section id="hero" className={styles['hero-section']}>
      {/* Image Background Elements */}
      <div className={styles['hero-image-bg']}>
        <div className={styles['image-overlay']}></div>
      </div>

      <div className={`container ${styles['hero-container']}`}>
        {/* Floating Badge */}
        <div className={`${styles['floating-badge']} animate-fade-up glass-panel`}>
          <span className={styles['pulse-dot']}></span>
          Our Digital Home
        </div>

        {/* Huge Modern Typography */}
        <div className={styles['title-wrapper']}>
          <h1
            className={`${styles['display-title']} animate-fade-up`}
            style={{ animationDelay: '0.1s' }}
          >
            THE <span className={styles['outline-text']}>FAMILY</span>
          </h1>
          <h1
            className={`${styles['display-title']} ${styles['right-align']} animate-fade-up`}
            style={{ animationDelay: '0.2s' }}
          >
            LEGACY <span className="text-accent">&</span> MEMORIES
          </h1>
        </div>

        {/* Bottom Content */}
        <div
          className={`${styles['hero-bottom']} animate-fade-up`}
          style={{ animationDelay: '0.4s' }}
        >
          <p className={styles['hero-description']}>
            Celebrating our past, embracing the present, and building a beautiful future together.
          </p>
          <div className={styles['hero-actions']}>
            <Link to="/#members" className={styles['btn-modern']}>
              Explore Our Story <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
