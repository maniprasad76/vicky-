import React from 'react';

const ThreeBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #7bb9e8 0%, #a6d5f7 50%, #d8f0fa 100%)',
      }}
    />
  );
};

export default ThreeBackground;
