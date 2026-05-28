import styles from './MembersGallery.module.css';

const FamilyDefinition = () => {
  return (
    <section id="members" className="section-padding container">
      <div className={styles['family-definition-wrapper']}>
        <div className={`${styles['family-definition-text']} animate-fade-up`}>
          <h2 className="section-title">
            What is <span className="text-accent">Family?</span>
          </h2>
          <div className={styles['definition-content']}>
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
                  Life's greatest blessing. A group that dreams, laughs, plays, and loves together.
                </p>
              </div>
              <div className={styles['def-item']}>
                <span className={styles['def-number']}>2</span>
                <p>
                  Those whom you can always count on. Always present not only in the good times but
                  also in the most challenging ones.
                </p>
              </div>
              <div className={styles['def-item']}>
                <span className={styles['def-number']}>3</span>
                <p>
                  The compass that guides us; the inspiration to reach great heights, and our
                  comfort when we occasionally falter.
                </p>
              </div>
            </div>

            <div className={styles['quote-box']}>
              <span className={styles['quote-icon']}>❝</span>
              <p className={styles['quote-text']}>
                Family is not an important thing. It's everything.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${styles['family-definition-image']} animate-fade-up`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className={styles['definition-image-frame']}>
            <img
              src="/image.png"
              alt="Our Family"
              className={styles['definition-image']}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyDefinition;
