import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const InterlockedRings: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 4;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xfffaf0, 2.5, 50); // Warm highlight
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xd4af37, 2, 50); // Yellow Gold highlight
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xdfa290, 1.5, 50); // Rose Gold highlight
    pointLight3.position.set(0, 2, -2);
    scene.add(pointLight3);

    // Ring Geometry (thick, smooth torus)
    const geometry = new THREE.TorusGeometry(0.55, 0.08, 24, 100);

    // Material 1: Polished Yellow Gold
    const material1 = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.12,
      metalness: 0.9,
      emissive: 0xd4af37,
      emissiveIntensity: 0.08,
    });

    // Material 2: Polished Rose Gold
    const material2 = new THREE.MeshStandardMaterial({
      color: 0xdfa290,
      roughness: 0.12,
      metalness: 0.9,
      emissive: 0xdfa290,
      emissiveIntensity: 0.08,
    });

    // Parent group to handle global mouse rotation
    const group = new THREE.Group();
    scene.add(group);

    // Sibling Ring 1 (Left tilt)
    const ring1 = new THREE.Mesh(geometry, material1);
    ring1.position.x = -0.32;
    ring1.rotation.y = 0.65;
    group.add(ring1);

    // Sibling Ring 2 (Right tilt)
    const ring2 = new THREE.Mesh(geometry, material2);
    ring2.position.x = 0.32;
    ring2.rotation.y = -0.65;
    group.add(ring2);

    // Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const resizeObserver = new ResizeObserver(() => {
      const newWidth = container.clientWidth || 300;
      const newHeight = container.clientHeight || 300;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Independent rotations of the interlocked bands
      ring1.rotation.x = elapsedTime * 0.45;
      ring1.rotation.y = elapsedTime * 0.7;

      ring2.rotation.x = -elapsedTime * 0.55;
      ring2.rotation.y = -elapsedTime * 0.65;

      // Group responds to mouse hover smoothly
      group.rotation.x += (mouse.current.y * 0.35 - group.rotation.x) * 0.05;
      group.rotation.y += (mouse.current.x * 0.35 - group.rotation.y) * 0.05;

      // Gentle floating bobbing
      group.position.y = Math.sin(elapsedTime * 1.3) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material1.dispose();
      material2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
};

export default InterlockedRings;
