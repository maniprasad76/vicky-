import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SisAndBro from './components/SisAndBro';
import OurStory from './components/OurStory';
import MembersGallery from './components/MembersGallery';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <HeroSection />
        <MembersGallery />
        <SisAndBro />
        <Timeline />
        <OurStory />
      </main>
      <Footer />
    </div>
  );
}

export default App;
