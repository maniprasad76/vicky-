import React from 'react';
import styles from './Timeline.module.css';
import { events } from '../data/timelineData';
import Interactive3DCard from './Interactive3DCard';

const getCardStyle = (index: number) => {
  const cardStyles = ['card-pink', 'card-lime', 'card-cyan'];
  return cardStyles[index % cardStyles.length];
};

const getDotStyle = (index: number) => {
  const dotStyles = ['dot-pink', 'dot-lime', 'dot-cyan'];
  return dotStyles[index % dotStyles.length];
};

const getBadgeStyle = (index: number) => {
  const badgeStyles = ['timeline-badge-pink', 'timeline-badge-lime', 'timeline-badge-cyan'];
  return badgeStyles[index % badgeStyles.length];
};

const Timeline: React.FC = () => {
  return (
    <section id="timeline" className={`section-padding container ${styles['timeline-section']}`}>
      <div
        className="section-header text-center"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h2 className="section-title">
          Our <span className="text-accent">Journey</span>
        </h2>
        <p className="section-description">
          A look back at the moments that shaped our family history, projected on an interactive
          timeline.
        </p>
      </div>

      <div className={styles['timeline-container']}>
        {events.map((event, index) => (
          <div
            key={index}
            className={`${styles['timeline-item']} animate-fade-up`}
            style={{ animationDelay: `${index * 0.25}s` }}
          >
            {/* Glowing timeline node */}
            <div className={`${styles['timeline-dot']} ${styles[getDotStyle(index)]}`}></div>

            {/* 3D Card wrapped content */}
            <Interactive3DCard
              className={`${styles['timeline-content']} ${styles[getCardStyle(index)]}`}
              maxTilt={8}
            >
              <div className={styles['year-watermark']}>{event.year}</div>
              <span className={`${styles['timeline-badge']} ${styles[getBadgeStyle(index)]}`}>
                {event.year}
              </span>
              <h3 className={styles['timeline-event-title']}>{event.title}</h3>
              <p className={styles['timeline-event-desc']}>{event.description}</p>
            </Interactive3DCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
