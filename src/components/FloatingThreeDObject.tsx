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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xd4af37, 3, 50); // Gold Light
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xdfa290, 2.5, 50); // Rose Gold Light
    pointLight2.position.set(-3, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xe8c7c1, 1.5, 50); // Soft Amber
    pointLight3.position.set(0, 3, -2);
    scene.add(pointLight3);

    // Create 2D Heart Shape
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0.4);
    heartShape.bezierCurveTo(0, 0.4, -0.05, 0.75, -0.4, 0.75);
    heartShape.bezierCurveTo(-0.85, 0.75, -0.85, 0.3, -0.85, 0.3);
    heartShape.bezierCurveTo(-0.85, -0.1, -0.5, -0.42, 0, -0.8);
    heartShape.bezierCurveTo(0.5, -0.42, 0.85, -0.1, 0.85, 0.3);
    heartShape.bezierCurveTo(0.85, 0.3, 0.85, 0.75, 0.4, 0.75);
    heartShape.bezierCurveTo(0.05, 0.75, 0, 0.4, 0, 0.4);

    // Extrude 2D Shape to 3D
    const extrudeSettings = {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center(); // Center rotation origin

    // Polished metallic gold material
    const material = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // warm yellow gold
      roughness: 0.15,
      metalness: 0.9,
      flatShading: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Elegant outer wireframe shell in rose gold
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xdfa290, // rose gold wireframe
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMat);
    wireframeMesh.scale.set(1.08, 1.08, 1.08); // slightly larger
    mesh.add(wireframeMesh);

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
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

      // Spin the core heart
      mesh.rotation.y = elapsedTime * 0.45;
      mesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15; // gentle nodding

      // Bobbing
      mesh.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Tilt based on mouse
      mesh.rotation.z += (mouse.current.x * 0.3 - mesh.rotation.z) * 0.05;
      mesh.rotation.x += (-mouse.current.y * 0.3 - mesh.rotation.x) * 0.05;

      // Organic Beating heart simulation: fast expansion, double echo, soft contraction
      const beatCycle = (elapsedTime * 1.3) % Math.PI;
      const pulse =
        Math.pow(Math.sin(beatCycle), 12) * 0.12 + Math.pow(Math.sin(beatCycle * 2), 24) * 0.04;
      const currentScale = 1.05 + pulse;
      mesh.scale.set(currentScale, currentScale, currentScale);

      // Pulse wireframe opacity with the beat
      wireframeMat.opacity = 0.15 + pulse * 0.8;

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
