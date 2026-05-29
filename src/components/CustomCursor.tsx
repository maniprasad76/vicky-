import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePosition = useRef({ x: -100, y: -100 });
  const ringPosition = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect mobile touch devices to disable custom cursor (better UX)
    const checkDevice = () => {
      const mobile =
        window.matchMedia('(max-width: 1024px)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    // Listen for hover on interactive elements using event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.btn-cyber') ||
        target.closest('.glass-panel') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer');

      if (isInteractive) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation frame for smooth lerp effect
    let animationFrameId: number;

    const updateRing = () => {
      const ease = 0.15;

      // Initialize starting position on first move to avoid sliding from corner
      if (ringPosition.current.x === -100) {
        ringPosition.current = { ...mousePosition.current };
      } else {
        ringPosition.current.x += (mousePosition.current.x - ringPosition.current.x) * ease;
        ringPosition.current.y += (mousePosition.current.y - ringPosition.current.y) * ease;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePosition.current.x}px, ${mousePosition.current.y}px, 0)`;
      }

      if (ringRef.current) {
        // Center the ring (since ring is 36px wide, offset by 18px)
        ringRef.current.style.transform = `translate3d(${ringPosition.current.x - 18}px, ${ringPosition.current.y - 18}px, 0) scale(${hovered ? 1.5 : 1})`;
      }

      animationFrameId = requestAnimationFrame(updateRing);
    };

    updateRing();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, hovered]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-dot ${hidden ? 'hidden' : ''} ${hovered ? 'hover' : ''}`}
      />
      <div
        ref={ringRef}
        className={`custom-ring ${hidden ? 'hidden' : ''} ${hovered ? 'hover' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
