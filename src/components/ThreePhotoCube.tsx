import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import familyImg from '../assets/image.png';
import storyImg from '../assets/our story.png';
import siblingsImg from '../assets/sis&bro.png';

const ThreePhotoCube: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0.005, y: 0.008 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 350;
    const height = container.clientHeight || 350;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xd4af37, 2.2, 10);
    pointLight.position.set(-3, -3, 2);
    scene.add(pointLight);

    // Cube Geometry
    const geometry = new THREE.BoxGeometry(2, 2, 2);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Load Textures
    const materials: THREE.MeshStandardMaterial[] = [];
    const images = [
      familyImg, // Right
      storyImg, // Left
      siblingsImg, // Top
      familyImg, // Bottom
      storyImg, // Front
      siblingsImg, // Back
    ];

    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === 6) {
        setLoading(false);
      }
    };

    images.forEach((imgSrc) => {
      const texture = textureLoader.load(imgSrc, checkAllLoaded, undefined, (err) => {
        console.error('Error loading texture:', err);
        checkAllLoaded();
      });
      texture.colorSpace = THREE.SRGBColorSpace;

      // Standard material with slightly shiny cyber glow edges
      materials.push(
        new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.2,
          metalness: 0.1,
          bumpScale: 0.05,
        })
      );
    });

    const cube = new THREE.Mesh(geometry, materials);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // Glowing border around the cube
    const wireframeGeom = new THREE.BoxGeometry(2.05, 2.05, 2.05);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const wireframeCube = new THREE.Mesh(wireframeGeom, wireframeMat);
    cube.add(wireframeCube);

    // Interaction Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.current.x,
        y: e.clientY - previousMousePosition.current.y,
      };

      // Set rotation based on drag
      cube.rotation.y += deltaMove.x * 0.007;
      cube.rotation.x += deltaMove.y * 0.007;

      // Update velocities for inertia on release
      rotationVelocity.current = {
        x: deltaMove.y * 0.002,
        y: deltaMove.x * 0.002,
      };

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Mobile touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;

      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.current.x,
        y: e.touches[0].clientY - previousMousePosition.current.y,
      };

      cube.rotation.y += deltaMove.x * 0.01;
      cube.rotation.x += deltaMove.y * 0.01;

      rotationVelocity.current = {
        x: deltaMove.y * 0.003,
        y: deltaMove.x * 0.003,
      };

      previousMousePosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // Resize
    const resizeObserver = new ResizeObserver(() => {
      const newWidth = container.clientWidth || 350;
      const newHeight = container.clientHeight || 350;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let floatTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging.current) {
        // Apply inertia decay
        cube.rotation.y += rotationVelocity.current.y;
        cube.rotation.x += rotationVelocity.current.x;

        rotationVelocity.current.y *= 0.95;
        rotationVelocity.current.x *= 0.95;

        // Return to a slow default spin if inertia is very low
        if (Math.abs(rotationVelocity.current.y) < 0.001) {
          rotationVelocity.current.y = 0.002;
        }
        if (Math.abs(rotationVelocity.current.x) < 0.001) {
          rotationVelocity.current.x = 0.001;
        }
      }

      // Add a subtle float/bobbing animation
      floatTime += 0.01;
      cube.position.y = Math.sin(floatTime) * 0.1;

      // Wireframe pulse intensity
      const pulse = 0.2 + Math.abs(Math.sin(floatTime * 2)) * 0.2;
      wireframeMat.opacity = pulse;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      resizeObserver.disconnect();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      wireframeGeom.dispose();
      wireframeMat.dispose();
      materials.forEach((mat) => mat.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '350px' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: 'var(--accent-primary)',
            background: 'var(--bg-card)',
            borderRadius: '16px',
            gap: '1rem',
            zIndex: 5,
          }}
        >
          <div className="pulse-dot" style={{ width: '20px', height: '20px' }}></div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 600, letterSpacing: '0.05em' }}>
            LOADING FAMILY MEMORIES...
          </span>
        </div>
      )}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '350px',
          cursor: 'grab',
        }}
      />
    </div>
  );
};

export default ThreePhotoCube;
