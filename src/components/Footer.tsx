import styles from './Footer.module.css';
import { HashLink as Link } from 'react-router-hash-link';

const Footer = () => {
  return (
    <footer className={`${styles.footer} section-padding`}>
      <div className={`container ${styles['footer-content']}`}>
        <div className={styles['footer-brand']}>
          <h2>
            VICKY'S <span className="text-accent">FAM</span>
          </h2>
          <p>Preserving memories, honoring legacy.</p>
        </div>
        <div className={styles['footer-links']}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/#hero">Home</Link>
            </li>
            <li>
              <Link to="/#members">Members</Link>
            </li>
            <li>
              <Link to="/#siblings">Siblings</Link>
            </li>
            <li>
              <Link to="/#timeline">Timeline</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles['footer-bottom']}>
        <p>&copy; {new Date().getFullYear()} Our Family. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
