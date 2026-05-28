import styles from './OurStory.module.css';
import ourStoryImg from '../assets/our story.png';

const OurStory = () => {
  return (
    <section id="story" className={`section-padding container ${styles['our-story-section']}`}>
      <div className={`${styles['story-header']} text-center`}>
        <h2 className="section-title">
          Our <span className="text-accent">Story</span>
        </h2>
        <p className="section-description">A tale woven with love and patience</p>
      </div>

      <div className={styles['story-grid']}>
        <div className={`${styles['story-card']} ${styles['card-1']} glass-panel animate-fade-up`}>
          <span className={styles['quote-mark']}>“</span>
          <p className={styles['lead-text']}>
            Every family has a story. Ours is written with love, patience, and endless support.
          </p>
        </div>

        <div
          className={`${styles['story-card']} ${styles['card-2']} animate-fade-up`}
          style={{ animationDelay: '0.2s' }}
        >
          <p>
            Through all the seasons of life, we have stood together, building a foundation of
            memories that will last for generations. It is not just about the big milestones, but
            the quiet moments, the shared laughter, and the unwavering bond that makes us who we
            are.
          </p>
        </div>

        <div
          className={`${styles['story-card']} ${styles['card-image']} animate-fade-up`}
          style={{ animationDelay: '0.3s' }}
        >
          <img src={ourStoryImg} alt="Our Story" className={styles['story-img']} loading="lazy" />
        </div>

        <div
          className={`${styles['story-card']} ${styles['card-3']} glass-panel animate-fade-up`}
          style={{ animationDelay: '0.4s' }}
        >
          <span className={styles['heart-icon']}>❤️</span>
          <p>
            We celebrate our differences because they make us colorful, and we cherish our
            similarities because they keep us connected. Here is to honoring the past, living
            beautifully in the present, and looking forward to all the tomorrows we will share.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
