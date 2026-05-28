import styles from './SisAndBro.module.css';
import siblingsImg from '../assets/sis&bro.png';

const SisAndBro = () => {
  return (
    <section id="siblings" className={styles['siblings-fullscreen-section']}>
      {/* Full Background Image */}
      <div className={styles['siblings-bg']}>
        <img
          src={siblingsImg}
          alt="Siblings"
          className={styles['siblings-bg-img']}
          loading="lazy"
        />
        <div className={styles['siblings-overlay']}></div>
      </div>

      <div className={`${styles['siblings-content']} container`}>
        <div className={`${styles['siblings-header']} animate-fade-up`}>
          <h2 className={styles['siblings-title']}>
            Sis <span className="text-accent">&</span> Bro
          </h2>
          <p className={styles['siblings-subtitle']}>A bond like no other</p>
        </div>

        <div
          className={`${styles['siblings-message']} animate-fade-up`}
          style={{ animationDelay: '0.2s' }}
        >
          <span className={styles['quote-mark-small']}>“</span>
          <p>
            Side by side or miles apart, siblings are always connected by the heart. The bond
            between a brother and sister is a unique thread in the family fabric—woven with
            childhood secrets, endless teasing, fierce protection, and an unbreakable love that only
            grows stronger with time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SisAndBro;
