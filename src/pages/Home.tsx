import HeroSection from '../components/HeroSection';
import SisAndBro from '../components/SisAndBro';
import OurStory from '../components/OurStory';
import MembersGallery from '../components/MembersGallery';
import Timeline from '../components/Timeline';
import { Helmet } from 'react-helmet-async';

const Home: React.FC = () => {
  return (
    <main>
      <Helmet>
        <title>Vicky's Fam | Our Family Legacy</title>
        <meta
          name="description"
          content="Celebrating our past, embracing the present, and building a beautiful future together."
        />
      </Helmet>
      <HeroSection />
      <MembersGallery />
      <SisAndBro />
      <Timeline />
      <OurStory />
    </main>
  );
};

export default Home;
