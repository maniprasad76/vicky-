import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section-padding">
      <div className="container footer-content">
        <div className="footer-brand">
          <h2>VICKY'S <span className="text-accent">FAM</span></h2>
          <p>Preserving memories, honoring legacy.</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#members">Members</a></li>
            <li><a href="#siblings">Siblings</a></li>
            <li><a href="#timeline">Timeline</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Our Family. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
