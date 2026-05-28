import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { HashLink as Link } from 'react-router-hash-link';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? `${styles.scrolled} glass-panel` : ''}`}>
      <div className={`container ${styles['header-content']}`}>
        <Link to="/#" className={styles.logo} aria-label="Vicky's Fam Homepage" onClick={closeMenu}>
          VICKY'S <span className="text-accent">FAM</span>
        </Link>

        <button
          className={`${styles['mobile-menu-btn']} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles['nav-links']} ${isMenuOpen ? styles['nav-open'] : ''}`}>
          <Link to="/#hero" className={styles['nav-link']} onClick={closeMenu}>
            Home
          </Link>
          <Link to="/#members" className={styles['nav-link']} onClick={closeMenu}>
            Members
          </Link>
          <Link to="/#siblings" className={styles['nav-link']} onClick={closeMenu}>
            Siblings
          </Link>
          <Link to="/#timeline" className={styles['nav-link']} onClick={closeMenu}>
            Timeline
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
