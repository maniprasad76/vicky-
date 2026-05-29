import React from 'react';
import styles from './OurStory.module.css';
import ourStoryImg from '../assets/our story.png';
import Interactive3DCard from './Interactive3DCard';

const OurStory: React.FC = () => {
  return (
    <section id="story" className={`section-padding container ${styles['our-story-section']}`}>
      <div
        className={`${styles['story-header']} text-center`}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h2 className="section-title">
          Our <span className="text-accent">Story</span>
        </h2>
        <p className="section-description">A tale woven with love, patience, and shared moments.</p>
      </div>

      <div className={styles['story-grid']}>
        <div className={`${styles['story-card']} ${styles['card-1']} animate-fade-up`}>
          <span className={styles['quote-mark']}>“</span>
          <p className={styles['lead-text']}>
            Every family has a story. Ours is written with love, patience, and endless support.
          </p>
        </div>

        <div className={`${styles['story-card']} ${styles['card-2']} animate-fade-up`}>
          <p>
            Through all the seasons of life, we have stood together, building a foundation of
            memories that will last for generations. It is not just about the big milestones, but
            the quiet moments, the shared laughter, and the unwavering bond that makes us who we
            are.
          </p>
        </div>

        {/* Card 3: Narrative Polaroid Image Card */}
        <Interactive3DCard
          className={`${styles['story-card']} ${styles['card-image']} animate-fade-up`}
          maxTilt={10}
        >
          <img
            src={ourStoryImg}
            alt="Family Memories"
            className={styles['story-img']}
            loading="lazy"
          />
          <div className={`${styles['polaroid-caption']} cursive-font`}>Arthur & Eleanor, 1985</div>
        </Interactive3DCard>

        <div className={`${styles['story-card']} ${styles['card-3']} animate-fade-up`}>
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
