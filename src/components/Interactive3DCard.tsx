import React, { useState, useRef, MouseEvent } from 'react';

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  maxTilt = 12,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [glareOpacity, setGlareOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Get mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate normalized position (from -0.5 to 0.5)
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // Calculate rotation (Y rotation is based on X position, X rotation is based on Y position)
    const rx = -normY * maxTilt;
    const ry = normX * maxTilt;

    setRotateX(rx);
    setRotateY(ry);

    // Calculate glare position in percent
    const gX = (x / rect.width) * 100;
    const gY = (y / rect.height) * 100;
    setGlareX(gX);
    setGlareY(gY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setGlareOpacity(0.15);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlareOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      className={`glass-panel ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered
          ? 'transform 0.05s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
        overflow: 'hidden',
      }}
    >
      {/* Glow Glare Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 10,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)`,
          opacity: glareOpacity,
          transition: isHovered ? 'opacity 0.2s ease-out' : 'opacity 0.6s ease-out',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Content wrapper with translateZ for depth */}
      <div
        style={{
          transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          zIndex: 2,
          height: '100%',
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Interactive3DCard;
