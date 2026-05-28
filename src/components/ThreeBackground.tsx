import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Particles data
    const particleCount = window.innerWidth < 768 ? 60 : 120;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const maxRange = 500;
    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * maxRange * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * maxRange * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * maxRange * 1.5;

      // Velocity
      velocities.push({
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.2,
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom canvas-drawn dot texture for clean, glowing circular points
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(0, 240, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 127, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    // Particles Material
    const particleMaterial = new THREE.PointsMaterial({
      size: 10,
      map: createCircleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Line segments geometry & material for connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff007f,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });

    // We will dynamically construct the lines geometry in the animation loop
    const maxConnections = particleCount * 4;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Mouse Interaction
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        targetMouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const posAttr = particles.getAttribute('position') as THREE.BufferAttribute;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Interpolate mouse
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      const positionsArray = posAttr.array as Float32Array;

      // Move particles
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;

        // Apply velocity
        positionsArray[idx] += velocities[i].x;
        positionsArray[idx + 1] += velocities[i].y;
        positionsArray[idx + 2] += velocities[i].z;

        // Bounce on boundary
        if (Math.abs(positionsArray[idx]) > maxRange) velocities[i].x *= -1;
        if (Math.abs(positionsArray[idx + 1]) > maxRange) velocities[i].y *= -1;
        if (Math.abs(positionsArray[idx + 2]) > maxRange) velocities[i].z *= -1;

        // React to mouse (attract particles slightly)
        // Map normalized mouse to 3D space
        const mouseX3D = mouse.x * maxRange * 0.8;
        const mouseY3D = mouse.y * maxRange * 0.8;

        const dx = mouseX3D - positionsArray[idx];
        const dy = mouseY3D - positionsArray[idx + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) * 0.0003;
          positionsArray[idx] += dx * force;
          positionsArray[idx + 1] += dy * force;
        }
      }
      posAttr.needsUpdate = true;

      // Draw Connections
      let lineIndex = 0;
      const linePosArray = lineGeometry.getAttribute('position').array as Float32Array;
      const maxDistance = 120;

      for (let i = 0; i < particleCount; i++) {
        const iIdx = i * 3;
        const ix = positionsArray[iIdx];
        const iy = positionsArray[iIdx + 1];
        const iz = positionsArray[iIdx + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const jIdx = j * 3;
          const jx = positionsArray[jIdx];
          const jy = positionsArray[jIdx + 1];
          const jz = positionsArray[jIdx + 2];

          const dx = ix - jx;
          const dy = iy - jy;
          const dz = iz - jz;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance && lineIndex < maxConnections) {
            const startIdx = lineIndex * 6;

            linePosArray[startIdx] = ix;
            linePosArray[startIdx + 1] = iy;
            linePosArray[startIdx + 2] = iz;

            linePosArray[startIdx + 3] = jx;
            linePosArray[startIdx + 4] = jy;
            linePosArray[startIdx + 5] = jz;

            lineIndex++;
          }
        }
      }

      // Draw count setting
      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.getAttribute('position').needsUpdate = true;

      // Gentle rotation of the entire system
      particleSystem.rotation.y += 0.0005;
      lineSegments.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleMaterial.dispose();
      lineMaterial.dispose();
      particleSystem.geometry.dispose();
      lineGeometry.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
};

export default ThreeBackground;
