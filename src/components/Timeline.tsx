import React from 'react';
import styles from './Timeline.module.css';
import { events } from '../data/timelineData.js';

const getCardStyle = (index) => {
  const styles = ['card-pink', 'card-lime', 'card-white'];
  return styles[index % styles.length];
};

const getDotStyle = (index) => {
  const styles = ['dot-pink', 'dot-lime'];
  return styles[index % styles.length];
};

const Timeline = () => {
  return (
    <section id="timeline" className={`section-padding container ${styles['timeline-section']}`}>
      <div className="section-header text-center">
        <h2 className="section-title">
          Our <span className="text-accent">Journey</span>
        </h2>
        <p className="section-description">
          A look back at the moments that shaped our family history.
        </p>
      </div>

      <div className={styles['timeline-container']}>
        {events.map((event, index) => (
          <div
            key={index}
            className={`${styles['timeline-item']} animate-fade-up`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className={`${styles['timeline-dot']} ${styles[getDotStyle(index)]}`}></div>
            <div className={`${styles['timeline-content']} ${styles[getCardStyle(index)]}`}>
              <div className={styles['year-watermark']}>{event.year}</div>
              <span className={styles['timeline-badge']}>{event.year}</span>
              <h3 className={styles['timeline-event-title']}>{event.title}</h3>
              <p className={styles['timeline-event-desc']}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
