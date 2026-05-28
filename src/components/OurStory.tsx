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
        <p className="section-description">A tale woven with love, patience, and 3D space.</p>
      </div>

      <div className={styles['story-grid']}>
        {/* Card 1: Lead Quotation Card */}
        <Interactive3DCard
          className={`${styles['story-card']} ${styles['card-1']} animate-fade-up`}
          maxTilt={6}
        >
          <span className={styles['quote-mark']}>“</span>
          <p className={styles['lead-text']}>
            Every family has a story. Ours is written with love, patience, and endless support.
          </p>
        </Interactive3DCard>

        {/* Card 2: Narrative Text Card */}
        <Interactive3DCard
          className={`${styles['story-card']} ${styles['card-2']} animate-fade-up`}
          maxTilt={8}
        >
          <p>
            Through all the seasons of life, we have stood together, building a foundation of
            memories that will last for generations. It is not just about the big milestones, but
            the quiet moments, the shared laughter, and the unwavering bond that makes us who we
            are.
          </p>
        </Interactive3DCard>

        {/* Card 3: Narrative Image Card */}
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
        </Interactive3DCard>

        {/* Card 4: Concluding Quote Card */}
        <Interactive3DCard
          className={`${styles['story-card']} ${styles['card-3']} animate-fade-up`}
          maxTilt={6}
        >
          <span className={styles['heart-icon']}>❤️</span>
          <p>
            We celebrate our differences because they make us colorful, and we cherish our
            similarities because they keep us connected. Here is to honoring the past, living
            beautifully in the present, and looking forward to all the tomorrows we will share.
          </p>
        </Interactive3DCard>
      </div>
    </section>
  );
};

export default OurStory;
