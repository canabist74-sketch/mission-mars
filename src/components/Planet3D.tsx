/**
 * High-performance procedural 3D Planet (Earth / Mars) renderer using Three.js.
 * Zero external texture 404s (textures generated dynamically on procedural 2D canvases).
 * Software-WebGL guard and graceful memory cleanup.
 */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Planet3DProps {
  type: 'earth' | 'mars';
  className?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  activeLocationId?: string | null;
  onSelectLocation?: (locationId: string) => void;
  locations?: Array<{
    id: string;
    name: string;
    pos: [number, number, number];
  }>;
}

export const Planet3D: React.FC<Planet3DProps> = ({
  type,
  className = '',
  autoRotate = true,
  interactive = true,
  activeLocationId,
  onSelectLocation,
  locations = []
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeLocationIdRef = useRef(activeLocationId);
  activeLocationIdRef.current = activeLocationId;

  const onSelectLocationRef = useRef(onSelectLocation);
  onSelectLocationRef.current = onSelectLocation;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // Software WebGL probe
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 3.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Planet Root Group
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    // Procedural Planet Texture Generator
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 1024;
    textureCanvas.height = 512;
    const ctx = textureCanvas.getContext('2d')!;

    if (type === 'earth') {
      // Deep blue ocean base
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
      oceanGrad.addColorStop(0, '#0d2242');
      oceanGrad.addColorStop(0.5, '#071833');
      oceanGrad.addColorStop(1, '#0d2242');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, 1024, 512);

      // Continents (procedural organic shapes)
      ctx.fillStyle = '#2d5e37';
      // Africa/Europe
      ctx.beginPath();
      ctx.ellipse(540, 240, 90, 140, 0.2, 0, Math.PI * 2);
      ctx.fill();
      // Eurasia
      ctx.beginPath();
      ctx.ellipse(660, 150, 170, 75, -0.1, 0, Math.PI * 2);
      ctx.fill();
      // Americas
      ctx.fillStyle = '#22543d';
      ctx.beginPath();
      ctx.ellipse(260, 160, 80, 70, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(310, 320, 60, 110, 0.4, 0, Math.PI * 2);
      ctx.fill();
      // Australia
      ctx.beginPath();
      ctx.ellipse(820, 350, 45, 35, 0, 0, Math.PI * 2);
      ctx.fill();
      // Polar Ice caps
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(0, 0, 1024, 25);
      ctx.fillRect(0, 487, 1024, 25);
    } else {
      // Mars: Ochre / Rust-red desert topography
      const marsGrad = ctx.createLinearGradient(0, 0, 0, 512);
      marsGrad.addColorStop(0, '#8c2d19');
      marsGrad.addColorStop(0.5, '#c85a2b');
      marsGrad.addColorStop(1, '#8c2d19');
      ctx.fillStyle = marsGrad;
      ctx.fillRect(0, 0, 1024, 512);

      // Dark volcanic basalt regions (Syrtis Major, Acidalia Planitia)
      ctx.fillStyle = '#5c1d11';
      ctx.beginPath();
      ctx.ellipse(320, 260, 120, 40, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(680, 220, 100, 60, 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Valles Marineris canyon rift
      ctx.strokeStyle = '#380f08';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.moveTo(250, 270);
      ctx.bezierCurveTo(340, 280, 420, 265, 490, 280);
      ctx.stroke();

      // Olympus Mons Caldera
      ctx.fillStyle = '#6e2718';
      ctx.beginPath();
      ctx.arc(200, 210, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#380f08';
      ctx.beginPath();
      ctx.arc(200, 210, 8, 0, Math.PI * 2);
      ctx.fill();

      // Polar Ice (Northern & Southern)
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.ellipse(512, 12, 280, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(512, 500, 220, 14, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const planetTexture = new THREE.CanvasTexture(textureCanvas);
    planetTexture.colorSpace = THREE.SRGBColorSpace;

    // Main Sphere Mesh
    const planetGeometry = new THREE.SphereGeometry(1, 48, 48);
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetTexture,
      roughness: type === 'earth' ? 0.6 : 0.85,
      metalness: 0.1
    });
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    planetGroup.add(planetMesh);

    // Earth Cloud Layer
    let cloudsMesh: THREE.Mesh | null = null;
    if (type === 'earth') {
      const cloudCanvas = document.createElement('canvas');
      cloudCanvas.width = 512;
      cloudCanvas.height = 256;
      const cCtx = cloudCanvas.getContext('2d')!;
      cCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        cCtx.beginPath();
        cCtx.arc(Math.random() * 512, Math.random() * 256, 12 + Math.random() * 20, 0, Math.PI * 2);
        cCtx.fill();
      }
      const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
      const cloudGeo = new THREE.SphereGeometry(1.025, 32, 32);
      const cloudMat = new THREE.MeshStandardMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
      });
      cloudsMesh = new THREE.Mesh(cloudGeo, cloudMat);
      planetGroup.add(cloudsMesh);
    }

    // Atmospheric Glow Halo
    const atmosphereGeo = new THREE.SphereGeometry(1.12, 32, 32);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 uColor;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(uColor, intensity * 0.75);
        }
      `,
      uniforms: {
        uColor: {
          value: type === 'earth' ? new THREE.Color(0.2, 0.55, 1.0) : new THREE.Color(0.9, 0.35, 0.15)
        }
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // Interactive Mars Surface Hotspots
    const markerMeshes: { id: string; mesh: THREE.Mesh }[] = [];
    if (type === 'mars' && locations.length > 0) {
      const markerGeo = new THREE.SphereGeometry(0.035, 12, 12);
      locations.forEach(loc => {
        const markerMat = new THREE.MeshBasicMaterial({
          color: 0xffaa33
        });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        const [x, y, z] = loc.pos;
        const v = new THREE.Vector3(x, y, z).normalize().multiplyScalar(1.02);
        marker.position.copy(v);
        planetGroup.add(marker);
        markerMeshes.push({ id: loc.id, mesh: marker });
      });
    }

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(4, 2, 3);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x1a2634, 0.6);
    scene.add(ambientLight);

    // Mouse / Touch Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = autoRotate ? 0.002 : 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !interactive) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.006;
      targetRotationX += deltaY * 0.006;

      rotationVelocityY = deltaX * 0.0005;
      rotationVelocityX = deltaY * 0.0005;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    // Raycast click for hotspot markers
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      if (type !== 'mars' || !onSelectLocationRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(markerMeshes.map(m => m.mesh));
      if (intersects.length > 0) {
        const hit = markerMeshes.find(m => m.mesh === intersects[0].object);
        if (hit && onSelectLocationRef.current) {
          onSelectLocationRef.current(hit.id);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    domElement.addEventListener('click', onClick);

    // Responsive Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging && autoRotate) {
        targetRotationY += 0.0018;
      }

      // Smooth inertia damping
      planetGroup.rotation.y += (targetRotationY - planetGroup.rotation.y) * 0.08;
      planetGroup.rotation.x += (targetRotationX - planetGroup.rotation.x) * 0.08;

      if (cloudsMesh) {
        cloudsMesh.rotation.y += 0.0006;
      }

      // Update hotspot marker scales based on active state
      if (markerMeshes.length > 0) {
        const activeId = activeLocationIdRef.current;
        markerMeshes.forEach(m => {
          const isSelected = m.id === activeId;
          const scale = isSelected ? 1.8 : 1.0;
          m.mesh.scale.set(scale, scale, scale);
          const mat = m.mesh.material as THREE.MeshBasicMaterial;
          mat.color.setHex(isSelected ? 0xff3b30 : 0xffaa33);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      domElement.removeEventListener('click', onClick);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      planetGeometry.dispose();
      planetMaterial.dispose();
      planetTexture.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      renderer.dispose();
    };
  }, [type, autoRotate, interactive, locations]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[320px] select-none ${interactive ? 'cursor-grab active:cursor-grabbing' : ''} ${className}`}
    />
  );
};
