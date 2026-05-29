import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ThreeBackground from './components/ThreeBackground';
import CustomCursor from './components/CustomCursor';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <CustomCursor />
      <ThreeBackground />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
