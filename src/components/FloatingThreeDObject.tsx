import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FloatingThreeDObject: React.FC = () => {
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
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff007f, 2, 50);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00f0ff, 2, 50);
    pointLight2.position.set(-3, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x39ff14, 1.5, 50);
    pointLight3.position.set(0, 3, -2);
    scene.add(pointLight3);

    // Geometry - Icosahedron (crystal structure)
    const geometry = new THREE.IcosahedronGeometry(1.2, 1);

    // Cyberpunk holographic glass-like material
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
      flatShading: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe overlay for the cybertech blueprint style
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
    mesh.add(wireframeMesh);

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse positions
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

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Spin the core
      mesh.rotation.y += 0.005;
      mesh.rotation.x += 0.003;

      // Bobbing
      mesh.position.y = Math.sin(elapsedTime) * 0.15;

      // Interactive tilting based on mouse position
      mesh.rotation.z += (mouse.current.x * 0.5 - mesh.rotation.z) * 0.05;
      mesh.rotation.x += (-mouse.current.y * 0.5 - mesh.rotation.x) * 0.05;

      // Pulse scaling
      const scaleVal = 1 + Math.sin(elapsedTime * 2) * 0.05;
      mesh.scale.set(scaleVal, scaleVal, scaleVal);

      // Color shifts
      const r = Math.sin(elapsedTime * 0.5) * 0.5 + 0.5;
      const g = Math.cos(elapsedTime * 0.3) * 0.5 + 0.5;
      const b = Math.sin(elapsedTime * 0.8) * 0.5 + 0.5;
      pointLight1.color.setRGB(r, g, b);
      wireframeMat.color.setRGB(b, r, g);

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
      material.dispose();
      wireframeMat.dispose();
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

export default FloatingThreeDObject;
