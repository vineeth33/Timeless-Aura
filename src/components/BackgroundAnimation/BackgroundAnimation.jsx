import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BackgroundAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Camera positioning
    camera.position.z = 12;

    // Background gradient texture (optional luxury gradient)
    const gradientTexture = new THREE.TextureLoader().load('/path/to/gradient.jpg');
    scene.background = gradientTexture;

    // Add glowing particles for subtle, luxury ambiance
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xd4af37, // Gold-like color for luxury feel
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });

    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add rotating rings with a luxury appearance
    const createRing = (innerRadius, outerRadius, color, rotationSpeed) => {
      const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
      const material = new THREE.MeshStandardMaterial({
        color,
        side: THREE.DoubleSide,
        metalness: 0.7,
        roughness: 0.3,
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2;
      ring.userData.rotationSpeed = rotationSpeed;
      scene.add(ring);
      return ring;
    };

    const rings = [
      createRing(3, 3.5, 0xeeeeee, 0.001),
      createRing(4, 4.5, 0xd4af37, 0.0012),
      createRing(5, 5.5, 0xcccccc, 0.0015),
    ];

    // Lighting for a luxury glow
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd4af37, 0.6, 50);
    pointLight.position.set(10, 15, 10);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(-15, 10, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles for dynamic effect
      particles.rotation.y += 0.0005;
      rings.forEach(ring => {
        ring.rotation.z += ring.userData.rotationSpeed;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default BackgroundAnimation;
