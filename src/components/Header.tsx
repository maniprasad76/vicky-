import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { HashLink as Link } from 'react-router-hash-link';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? `${styles.scrolled} glass-panel` : ''}`}>
      <div className={`container ${styles['header-content']}`}>
        <Link to="/#" className={styles.logo} aria-label="Vicky's Fam Homepage">
          VICKY'S <span className="text-accent">FAM</span>
        </Link>
        <nav className={styles['nav-links']}>
          <Link to="/#hero" className={styles['nav-link']}>
            Home
          </Link>
          <Link to="/#members" className={styles['nav-link']}>
            Members
          </Link>
          <Link to="/#siblings" className={styles['nav-link']}>
            Siblings
          </Link>
          <Link to="/#timeline" className={styles['nav-link']}>
            Timeline
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
