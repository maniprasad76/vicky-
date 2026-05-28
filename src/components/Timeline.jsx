import React from 'react';
import './Timeline.css';

const events = [
  { year: '1985', title: 'The Beginning', description: 'Arthur and Eleanor got married in a beautiful summer ceremony.' },
  { year: '1990', title: 'First Home', description: 'Moved into the house that would become the family hub.' },
  { year: '2010', title: 'Silver Anniversary', description: 'Celebrated 25 years of love and laughter with a big family trip.' },
  { year: '2023', title: 'New Generation', description: 'Welcomed baby Leo, expanding the family tree once more.' },
];

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
    <section id="timeline" className="section-padding container timeline-section">
      <div className="section-header text-center">
        <h2 className="section-title">Our <span className="text-accent">Journey</span></h2>
        <p className="section-description">A look back at the moments that shaped our family history.</p>
      </div>

      <div className="timeline-container">
        {events.map((event, index) => (
          <div key={index} className="timeline-item animate-fade-up" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className={`timeline-dot ${getDotStyle(index)}`}></div>
            <div className={`timeline-content ${getCardStyle(index)}`}>
              <div className="year-watermark">{event.year}</div>
              <span className="timeline-badge">{event.year}</span>
              <h3 className="timeline-event-title">{event.title}</h3>
              <p className="timeline-event-desc">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
