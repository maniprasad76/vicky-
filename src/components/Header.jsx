import React, { useState, useEffect } from 'react';
import './Header.css';

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
    <header className={`header ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="container header-content">
        <a href="#" className="logo">
          VICKY'S <span className="text-accent">FAM</span> 
        </a>
        <nav className="nav-links">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#members" className="nav-link">Members</a>
          <a href="#siblings" className="nav-link">Siblings</a>
          <a href="#timeline" className="nav-link">Timeline</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
