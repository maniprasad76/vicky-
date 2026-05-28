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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff007f, 3, 50);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x39ff14, 3, 50);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    // Geometry for the rings
    const geometry = new THREE.TorusGeometry(0.6, 0.08, 16, 100);

    // Material 1: Pink glow
    const material1 = new THREE.MeshStandardMaterial({
      color: 0xff007f,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0xff007f,
      emissiveIntensity: 0.2,
    });

    // Material 2: Lime glow
    const material2 = new THREE.MeshStandardMaterial({
      color: 0x39ff14,
      roughness: 0.1,
      metalness: 0.8,
      emissive: 0x39ff14,
      emissiveIntensity: 0.2,
    });

    // Parent group to handle global mouse rotation
    const group = new THREE.Group();
    scene.add(group);

    // Ring 1 (left)
    const ring1 = new THREE.Mesh(geometry, material1);
    ring1.position.x = -0.35;
    ring1.rotation.y = 0.5;
    group.add(ring1);

    // Ring 2 (right)
    const ring2 = new THREE.Mesh(geometry, material2);
    ring2.position.x = 0.35;
    ring2.rotation.y = -0.5;
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

      // Rotate individual rings
      ring1.rotation.x = elapsedTime * 0.5;
      ring1.rotation.y = elapsedTime * 0.8;

      ring2.rotation.x = -elapsedTime * 0.6;
      ring2.rotation.y = -elapsedTime * 0.7;

      // Group rotation follows mouse movement
      group.rotation.x += (mouse.current.y * 0.4 - group.rotation.x) * 0.05;
      group.rotation.y += (mouse.current.x * 0.4 - group.rotation.y) * 0.05;

      // Bobbing
      group.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

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
