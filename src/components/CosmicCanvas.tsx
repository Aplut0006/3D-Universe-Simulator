import React, { useRef, useEffect, useState, useMemo } from 'react';
import { CelestialObject, COSMIC_SCALES } from '../types';

interface CosmicCanvasProps {
  objects: CelestialObject[];
  selectedId: string | null;
  onSelectObject: (obj: CelestialObject) => void;
  activeScaleZone: number | null; // filter by scale zone
}

export default function CosmicCanvas({
  objects,
  selectedId,
  onSelectObject,
  activeScaleZone
}: CosmicCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas size state
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Camera State (3D coordinate frame)
  // Camera rotates around a look-at target (focus point)
  const cameraRef = useRef({
    pitch: 0.4, // rotation around X axis (elevation)
    yaw: -0.6, // rotation around Y axis (azimuth)
    zoom: 1.0, // zoom level (affects scale factor)
    targetX: 0, // camera look-at target X
    targetY: 0, // camera look-at target Y
    targetZ: 0 // camera look-at target Z
  });

  // Inertia and transition states (for smooth lerping)
  const targetCameraRef = useRef({
    pitch: 0.4,
    yaw: -0.6,
    zoom: 1.0,
    targetX: 0,
    targetY: 0,
    targetZ: 0
  });
  const [hoveredObject, setHoveredObject] = useState<CelestialObject | null>(null);

  // Background Starfield
  const backgroundStars = useMemo(() => {
    const stars = [];
    const count = 300;
    for (let i = 0; i < count; i++) {
      // Scatter stars on a giant sphere at infinity
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2000; // far away
      stars.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        brightness: 0.3 + Math.random() * 0.7,
        size: 0.5 + Math.random() * 1.5,
        color: ['#fff', '#bae6fd', '#fed7aa', '#fbcfe8'][Math.floor(Math.random() * 4)]
      });
    }
    return stars;
  }, []);

  // Map celestial objects to deterministic 3D coordinates based on logarithmic distance
  const mappedObjects = useMemo(() => {
    return objects.map((obj, index) => {
      // Deterministic scattering based on index seed
      const seed = index + 1;
      const angleTheta = seed * 2.39996; // Golden angle in radians
      const anglePhi = Math.acos(((seed * 1.61803) % 2) - 1); // Spherical distribution

      // Map distance logarithmically
      // Range of distance is ~1e-17 LY to 4.65e10 LY
      const logDist = obj.distanceLy > 0 ? Math.log10(obj.distanceLy) : -23;

      // Base radius of the concentric shells
      // We map logDist from [-23, 11] to [80, 500] pixels
      const minLog = -23;
      const maxLog = 11;
      const pct = (logDist - minLog) / (maxLog - minLog);
      const r = 80 + pct * 420;

      // Map to 3D Cartesian coordinates
      const x = r * Math.sin(anglePhi) * Math.cos(angleTheta);
      const y = r * Math.sin(anglePhi) * Math.sin(angleTheta);
      const z = r * Math.cos(anglePhi);

      return {
        ...obj,
        x,
        y,
        z,
        scaleRadius: r
      };
    });
  }, [objects]);

  // Track resizing of canvas container with ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.max(width, 100),
          height: Math.max(height, 100)
        });
      }
    });

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Flying Camera Effect: smoothly fly the camera focus to the selected object
  useEffect(() => {
    if (selectedId) {
      const selectedObj = mappedObjects.find((o) => o.id === selectedId);
      if (selectedObj && selectedObj.x !== undefined) {
        // Fly to object
        targetCameraRef.current.targetX = selectedObj.x;
        targetCameraRef.current.targetY = selectedObj.y;
        targetCameraRef.current.targetZ = selectedObj.z;

        // Auto zoom in based on the scale zone to get a perfect framing
        const zoneZooms = [2.0, 1.4, 1.0, 0.7, 0.4];
        const baseZoom = zoneZooms[selectedObj.scaleZone - 1] || 1.0;
        targetCameraRef.current.zoom = baseZoom;

        // Add a slight yaw shift to make the flight dynamic
        targetCameraRef.current.yaw += 0.2;
      }
    } else {
      // Center out if nothing selected
      targetCameraRef.current.targetX = 0;
      targetCameraRef.current.targetY = 0;
      targetCameraRef.current.targetZ = 0;
      targetCameraRef.current.zoom = 1.0;
    }
  }, [selectedId, mappedObjects]);

  // Handle Drag & Orbit Controls
  const isDragging = useRef(false);
  const isPanning = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    isPanning.current = e.button === 2 || e.shiftKey; // right click or shift key for pan
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDragging.current) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      if (isPanning.current) {
        // Pan: Move the camera focus target along the screen plane
        const factor = 1.5 / cameraRef.current.zoom;
        const cosY = Math.cos(cameraRef.current.yaw);
        const sinY = Math.sin(cameraRef.current.yaw);
        const cosP = Math.cos(cameraRef.current.pitch);
        const sinP = Math.sin(cameraRef.current.pitch);

        // Screen horizontal direction in 3D
        const dx = (cosY * deltaX + sinY * sinP * deltaY) * factor;
        const dy = (cosP * deltaY) * factor;
        const dz = (sinY * deltaX - cosY * sinP * deltaY) * factor;

        targetCameraRef.current.targetX -= dx;
        targetCameraRef.current.targetY += dy;
        targetCameraRef.current.targetZ -= dz;
      } else {
        // Rotate: Pitch (Y rotation) and Yaw (X rotation)
        targetCameraRef.current.yaw += deltaX * 0.007;
        targetCameraRef.current.pitch = Math.max(
          -Math.PI / 2.1,
          Math.min(Math.PI / 2.1, targetCameraRef.current.pitch + deltaY * 0.007)
        );
      }
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    } else {
      // Hover Detection
      // Project all nodes and find the closest one to mouse
      const width = dimensions.width;
      const height = dimensions.height;
      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 400;
      const distOffset = 600 / cameraRef.current.zoom;

      // Camera rotation terms
      const cosP = Math.cos(cameraRef.current.pitch);
      const sinP = Math.sin(cameraRef.current.pitch);
      const cosY = Math.cos(cameraRef.current.yaw);
      const sinY = Math.sin(cameraRef.current.yaw);

      let closestObj: CelestialObject | null = null;
      let minDistance = 22; // click boundary

      mappedObjects.forEach((obj) => {
        // Filter out if not in the active scale zone
        if (activeScaleZone && obj.scaleZone !== activeScaleZone) return;

        const ox = (obj.x || 0) - cameraRef.current.targetX;
        const oy = (obj.y || 0) - cameraRef.current.targetY;
        const oz = (obj.z || 0) - cameraRef.current.targetZ;

        // Apply Yaw (Y-axis rotation)
        const rx1 = ox * cosY - oz * sinY;
        const rz1 = ox * sinY + oz * cosY;

        // Apply Pitch (X-axis rotation)
        const ry = oy * cosP - rz1 * sinP;
        const rz = oy * sinP + rz1 * cosP;

        // Projection
        const sz = rz + distOffset;
        if (sz > 10) {
          const depthScale = focalLength / sz;
          const sx = cx + rx1 * depthScale;
          const sy = cy + ry * depthScale;

          const dx = mouseX - sx;
          const dy = mouseY - sy;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < minDistance) {
            minDistance = distance;
            closestObj = obj;
          }
        }
      });

      setHoveredObject(closestObj);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    isDragging.current = false;
    isPanning.current = false;

    // Click handler (only trigger if it was a tiny tap, not a long drag)
    if (hoveredObject) {
      onSelectObject(hoveredObject);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    // Smooth exponential zoom
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    targetCameraRef.current.zoom = Math.max(0.1, Math.min(10.0, targetCameraRef.current.zoom * zoomFactor));
  };

  // Main Render Loop (Draw on Canvas 2D)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      // 1. Lerp camera values smoothly to targets for cinematic motion
      const lerpSpeed = 0.08;
      cameraRef.current.pitch += (targetCameraRef.current.pitch - cameraRef.current.pitch) * lerpSpeed;
      cameraRef.current.yaw += (targetCameraRef.current.yaw - cameraRef.current.yaw) * lerpSpeed;
      cameraRef.current.zoom += (targetCameraRef.current.zoom - cameraRef.current.zoom) * lerpSpeed;
      cameraRef.current.targetX += (targetCameraRef.current.targetX - cameraRef.current.targetX) * lerpSpeed;
      cameraRef.current.targetY += (targetCameraRef.current.targetY - cameraRef.current.targetY) * lerpSpeed;
      cameraRef.current.targetZ += (targetCameraRef.current.targetZ - cameraRef.current.targetZ) * lerpSpeed;

      // Clear Screen with deep cosmic slate gradient
      const width = dimensions.width;
      const height = dimensions.height;
      const cx = width / 2;
      const cy = height / 2;

      // Add a subtle central glow representing the observable horizon core
      const radialGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) / 1.5);
      radialGlow.addColorStop(0, '#1c1951'); // dark royal indigo
      radialGlow.addColorStop(0.5, '#0a0822'); // deep indigo-black
      radialGlow.addColorStop(1, '#020617'); // slate-950
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      const focalLength = 400;
      const distOffset = 600 / cameraRef.current.zoom;

      // Trigonometric terms for camera rotation
      const cosP = Math.cos(cameraRef.current.pitch);
      const sinP = Math.sin(cameraRef.current.pitch);
      const cosY = Math.cos(cameraRef.current.yaw);
      const sinY = Math.sin(cameraRef.current.yaw);

      // 2. Draw Background Starfield (with Parallax based on rotation)
      ctx.save();
      backgroundStars.forEach((star) => {
        // Stars are fixed at distance, so they rotate with camera but do not translate with targetX/Y/Z
        const rx1 = star.x * cosY - star.z * sinY;
        const rz1 = star.x * sinY + star.z * cosY;
        const ry = star.y * cosP - rz1 * sinP;
        const rz = star.y * sinP + rz1 * cosP;

        const sz = rz + 1500; // put them further back
        if (sz > 50) {
          const depthScale = focalLength / sz;
          const sx = cx + rx1 * depthScale;
          const sy = cy + ry * depthScale;

          if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.brightness;
            ctx.fillRect(sx, sy, star.size, star.size);
          }
        }
      });
      ctx.restore();

      // 3. Draw Cosmic Concentric Grid Shells (Scale Reference boundaries)
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.15)'; // slate-700
      ctx.lineWidth = 1;
      const scaleRadii = [80, 180, 290, 400, 500];
      const scaleLabels = ['Debris (<1 LY)', 'Stellar (<1k LY)', 'Galactic (<10M LY)', 'Intergalactic (<1B LY)', 'Observable Horizon (46B LY)'];

      scaleRadii.forEach((shellRadius, i) => {
        // Draw orbital grid shells on the horizontal plane (y = 0)
        ctx.beginPath();
        const segments = 64;
        let visibleCount = 0;

        for (let s = 0; s <= segments; s++) {
          const angle = (s / segments) * Math.PI * 2;
          const ox = shellRadius * Math.cos(angle) - cameraRef.current.targetX;
          const oy = 0 - cameraRef.current.targetY;
          const oz = shellRadius * Math.sin(angle) - cameraRef.current.targetZ;

          const rx1 = ox * cosY - oz * sinY;
          const rz1 = ox * sinY + oz * cosY;
          const ry = oy * cosP - rz1 * sinP;
          const rz = oy * sinP + rz1 * cosP;

          const sz = rz + distOffset;
          if (sz > 10) {
            const depthScale = focalLength / sz;
            const sx = cx + rx1 * depthScale;
            const sy = cy + ry * depthScale;

            if (s === 0) {
              ctx.moveTo(sx, sy);
            } else {
              ctx.lineTo(sx, sy);
            }
            visibleCount++;
          }
        }
        if (visibleCount > 10) {
          // Label shells
          ctx.stroke();

          // Draw ring index indicator
          const ox = shellRadius - cameraRef.current.targetX;
          const oy = 0 - cameraRef.current.targetY;
          const oz = 0 - cameraRef.current.targetZ;
          const rx1 = ox * cosY - oz * sinY;
          const rz1 = ox * sinY + oz * cosY;
          const ry = oy * cosP - rz1 * sinP;
          const rz = oy * sinP + rz1 * cosP;
          const sz = rz + distOffset;

          if (sz > 10) {
            const depthScale = focalLength / sz;
            const sx = cx + rx1 * depthScale;
            const sy = cy + ry * depthScale;

            ctx.fillStyle = 'rgba(148, 163, 184, 0.3)'; // slate-400
            ctx.font = '10px font-mono';
            ctx.fillText(scaleLabels[i], sx + 5, sy - 5);
          }
        }
      });

      // 4. Draw connection filaments (Cosmic Web grid) if we are in cosmologic scale
      ctx.save();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)'; // subtle green web filaments
      ctx.lineWidth = 1.5;
      const filaments = mappedObjects.filter((o) => o.scaleZone >= 4);
      for (let i = 0; i < filaments.length; i++) {
        for (let j = i + 1; j < filaments.length; j++) {
          const f1 = filaments[i];
          const f2 = filaments[j];
          // Connect nearby galactic clusters in the projection space
          const dx = (f1.x || 0) - (f2.x || 0);
          const dy = (f1.y || 0) - (f2.y || 0);
          const dz = (f1.z || 0) - (f2.z || 0);
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (d < 250) {
            // Draw 3D projected line
            ctx.beginPath();
            // Point 1
            const p1x = (f1.x || 0) - cameraRef.current.targetX;
            const p1y = (f1.y || 0) - cameraRef.current.targetY;
            const p1z = (f1.z || 0) - cameraRef.current.targetZ;
            const p1_rx = p1x * cosY - p1z * sinY;
            const p1_rz = p1x * sinY + p1z * cosY;
            const p1_ry = p1y * cosP - p1_rz * sinP;
            const p1_sz = p1y * sinP + p1_rz * cosP + distOffset;

            // Point 2
            const p2x = (f2.x || 0) - cameraRef.current.targetX;
            const p2y = (f2.y || 0) - cameraRef.current.targetY;
            const p2z = (f2.z || 0) - cameraRef.current.targetZ;
            const p2_rx = p2x * cosY - p2z * sinY;
            const p2_rz = p2x * sinY + p2z * cosY;
            const p2_ry = p2y * cosP - p2_rz * sinP;
            const p2_sz = p2y * sinP + p2_rz * cosP + distOffset;

            if (p1_sz > 10 && p2_sz > 10) {
              const ds1 = focalLength / p1_sz;
              const ds2 = focalLength / p2_sz;
              ctx.moveTo(cx + p1_rx * ds1, cy + p1_ry * ds1);
              ctx.lineTo(cx + p2_rx * ds2, cy + p2_ry * ds2);
              ctx.stroke();
            }
          }
        }
      }
      ctx.restore();

      // 5. Sort objects by depth (back-to-front rendering) to ensure correct layering
      const projectedObjects = mappedObjects
         .map((obj) => {
          const ox = (obj.x || 0) - cameraRef.current.targetX;
          const oy = (obj.y || 0) - cameraRef.current.targetY;
          const oz = (obj.z || 0) - cameraRef.current.targetZ;

          const rx1 = ox * cosY - oz * sinY;
          const rz1 = ox * sinY + oz * cosY;
          const ry = oy * cosP - rz1 * sinP;
          const rz = oy * sinP + rz1 * cosP;

          return {
            obj,
            rx: rx1,
            ry,
            rz,
            sz: rz + distOffset
          };
        })
        .filter((p) => p.sz > 10);

      // Sort descending (large rz means further back, so render furthest first)
      projectedObjects.sort((a, b) => b.rz - a.rz);

      // 6. Draw each Celestial Body
      projectedObjects.forEach(({ obj, rx, ry, sz }) => {
        // Filter by Scale Zone if requested
        if (activeScaleZone && obj.scaleZone !== activeScaleZone) return;

        const depthScale = focalLength / sz;
        const sx = cx + rx * depthScale;
        const sy = cy + ry * depthScale;

        // Visual properties
        const isSelected = selectedId === obj.id;
        const isHovered = hoveredObject?.id === obj.id;
        const baseSize = isSelected ? 12 : isHovered ? 10 : 6;
        const renderSize = Math.max(1.5, baseSize * depthScale);

        // Calculate opacity based on distance to center look-at-target to focus attention
        const opacity = Math.min(1, Math.max(0.2, depthScale * 1.5));

        ctx.save();
        ctx.globalAlpha = opacity;

        // Hover & Selection Orbiting Highlights
        if (isSelected || isHovered) {
          ctx.strokeStyle = isSelected ? '#ef4444' : '#38bdf8';
          ctx.lineWidth = isSelected ? 2 : 1;
          ctx.beginPath();
          ctx.arc(sx, sy, renderSize + 6, 0, Math.PI * 2);
          ctx.stroke();

          // Orbit indicator line
          if (isSelected) {
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
            ctx.setLineDash([2, 4]);
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize + 12, (Date.now() / 1000) % (Math.PI * 2), ((Date.now() / 1000) % (Math.PI * 2)) + Math.PI);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        // Render Specific Custom Particle Shapes based on category and shape-code
        const baseCol = obj.visuals?.baseColor || '#fff';
        const secCol = obj.visuals?.secondaryColor || '#888';
        const shape = obj.visuals?.visualShape || 'sphere';

        switch (shape) {
          case 'black-hole': {
            // Draw Gravitationally lensed accretion disk
            const grad = ctx.createRadialGradient(sx, sy, renderSize * 0.2, sx, sy, renderSize * 2.5);
            grad.addColorStop(0, '#000000');
            grad.addColorStop(0.15, secCol);
            grad.addColorStop(0.4, baseCol);
            grad.addColorStop(1.0, 'transparent');

            // Draw relativistic jets
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(sx, sy, renderSize * 3, renderSize * 0.8, Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();

            // Singular event horizon
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 0.7, 0, Math.PI * 2);
            ctx.fill();
            break;
          }

          case 'galaxy-spiral': {
            // Swirling disc
            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize * 3);
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.3, baseCol);
            grad.addColorStop(0.6, secCol);
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(sx, sy, renderSize * 3, renderSize * 1.2, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();

            // Core dot
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 0.4, 0, Math.PI * 2);
            ctx.fill();
            break;
          }

          case 'galaxy-elliptical': {
            // Diffuse smooth halo
            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize * 2.5);
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.4, baseCol);
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 2.5, 0, Math.PI * 2);
            ctx.fill();
            break;
          }

          case 'nebula-cloud': {
            // Diffuse glowing gas clump
            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize * 4);
            grad.addColorStop(0, baseCol);
            grad.addColorStop(0.5, secCol);
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.globalAlpha = opacity * 0.6;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 4, 0, Math.PI * 2);
            ctx.fill();
            break;
          }

          case 'pulsar': {
            // Perpendicular beaming jets
            ctx.strokeStyle = secCol;
            ctx.lineWidth = Math.max(1, renderSize * 0.25);
            ctx.beginPath();
            ctx.moveTo(sx - renderSize * 4, sy - renderSize * 4);
            ctx.lineTo(sx + renderSize * 4, sy + renderSize * 4);
            ctx.stroke();

            // Pulsating core
            const pulse = 1 + 0.15 * Math.sin(Date.now() / 100);
            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize * pulse);
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.5, baseCol);
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * pulse, 0, Math.PI * 2);
            ctx.fill();
            break;
          }

          case 'ringed-sphere': {
            if (obj.id === 'saturn') {
              // 1. Saturn Rings (Back)
              const drawSaturnRings = (isFront: boolean) => {
                ctx.save();
                const ringAngle = -Math.PI / 8;
                const startA = isFront ? 0 : Math.PI;
                const endA = isFront ? Math.PI : Math.PI * 2;

                const ringGrad = ctx.createRadialGradient(sx, sy, renderSize * 1.1, sx, sy, renderSize * 2.4);
                ringGrad.addColorStop(0, 'rgba(217, 119, 6, 0.15)'); // Crepe ring C
                ringGrad.addColorStop(0.18, 'rgba(254, 240, 138, 0.85)'); // Inner ring B
                ringGrad.addColorStop(0.5, 'rgba(254, 243, 199, 0.95)'); // Outer ring B
                ringGrad.addColorStop(0.56, 'rgba(9, 9, 11, 0.95)'); // Cassini Division gap!
                ringGrad.addColorStop(0.64, 'rgba(202, 138, 4, 0.8)'); // Inner ring A
                ringGrad.addColorStop(0.9, 'rgba(251, 191, 36, 0.7)'); // Outer ring A
                ringGrad.addColorStop(1.0, 'transparent');

                ctx.strokeStyle = ringGrad;
                ctx.lineWidth = renderSize * 0.65;

                ctx.beginPath();
                ctx.ellipse(sx, sy, renderSize * 1.75, renderSize * 0.42, ringAngle, startA, endA);
                ctx.stroke();

                // Cassini separation lines
                ctx.strokeStyle = 'rgba(251, 191, 36, 0.15)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.ellipse(sx, sy, renderSize * 1.5, renderSize * 0.36, ringAngle, startA, endA);
                ctx.stroke();
                ctx.restore();
              };

              // Back of rings
              drawSaturnRings(false);

              // Saturn sphere
              const saturnGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              saturnGrad.addColorStop(0, '#fef08a');
              saturnGrad.addColorStop(0.6, '#d97706');
              saturnGrad.addColorStop(1, '#2d1c02');
              ctx.fillStyle = saturnGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              // Clouds details
              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              ctx.fillStyle = 'rgba(180, 83, 9, 0.35)';
              ctx.beginPath();
              ctx.ellipse(sx, sy - renderSize * 0.3, renderSize * 1.1, renderSize * 0.12, 0, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = 'rgba(202, 138, 4, 0.25)';
              ctx.beginPath();
              ctx.ellipse(sx, sy + renderSize * 0.2, renderSize * 1.1, renderSize * 0.08, 0, 0, Math.PI * 2);
              ctx.fill();

              // Terminator Shadow overlay
              const saturnShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
              saturnShade.addColorStop(0, 'transparent');
              saturnShade.addColorStop(1, 'rgba(0,0,0,0.92)');
              ctx.fillStyle = saturnShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

              // Front of rings
              drawSaturnRings(true);

            } else if (obj.id === 'uranus') {
              // Uranus vertical rings (extreme 98 deg tilt)
              const drawUranusRings = (isFront: boolean) => {
                ctx.save();
                const ringAngle = Math.PI / 2.3;
                const startA = isFront ? 0 : Math.PI;
                const endA = isFront ? Math.PI : Math.PI * 2;

                const ringGrad = ctx.createRadialGradient(sx, sy, renderSize * 1.2, sx, sy, renderSize * 1.6);
                ringGrad.addColorStop(0, 'rgba(165, 243, 252, 0.05)');
                ringGrad.addColorStop(0.5, 'rgba(165, 243, 252, 0.55)');
                ringGrad.addColorStop(0.8, 'rgba(8, 145, 178, 0.35)');
                ringGrad.addColorStop(1.0, 'transparent');

                ctx.strokeStyle = ringGrad;
                ctx.lineWidth = Math.max(1, renderSize * 0.15);

                ctx.beginPath();
                ctx.ellipse(sx, sy, renderSize * 1.5, renderSize * 0.22, ringAngle, startA, endA);
                ctx.stroke();
                ctx.restore();
              };

              // Back rings
              drawUranusRings(false);

              // Body
              const uranusGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              uranusGrad.addColorStop(0, '#e0f7fa');
              uranusGrad.addColorStop(0.6, '#a5f3fc');
              uranusGrad.addColorStop(1, '#0e4a5e');
              ctx.fillStyle = uranusGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              // Terminator Shadow
              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              const uranusShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
              uranusShade.addColorStop(0, 'transparent');
              uranusShade.addColorStop(1, 'rgba(0,0,0,0.88)');
              ctx.fillStyle = uranusShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

              // Front rings
              drawUranusRings(true);

            } else {
              // Fallback generic ringed sphere
              ctx.strokeStyle = secCol;
              ctx.lineWidth = Math.max(1, renderSize * 0.3);
              ctx.beginPath();
              ctx.ellipse(sx, sy, renderSize * 2, renderSize * 0.5, -Math.PI / 10, 0, Math.PI * 2);
              ctx.stroke();

              const grad = ctx.createRadialGradient(sx - renderSize * 0.2, sy - renderSize * 0.2, 0, sx, sy, renderSize);
              grad.addColorStop(0, '#ffffff');
              grad.addColorStop(0.6, baseCol);
              grad.addColorStop(1, '#000000');

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
            }
            break;
          }

          case 'star-cluster': {
            // Swarm of tiny dots
            ctx.fillStyle = baseCol;
            for (let d = 0; d < 8; d++) {
              const ox = (Math.sin(d * 1.5) * renderSize * 0.8);
              const oy = (Math.cos(d * 2.3) * renderSize * 0.8);
              ctx.beginPath();
              ctx.arc(sx + ox, sy + oy, Math.max(1, renderSize * 0.2), 0, Math.PI * 2);
              ctx.fill();
            }
            // Glow center
            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize * 1.5);
            grad.addColorStop(0, 'rgba(255,255,255,0.8)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 1.5, 0, Math.PI * 2);
            ctx.fill();
            break;
          }

          case 'dust-grain': {
            // Irregular microscopic speck
            ctx.fillStyle = baseCol;
            ctx.beginPath();
            ctx.moveTo(sx - renderSize, sy - renderSize * 0.5);
            ctx.lineTo(sx + renderSize * 0.5, sy - renderSize);
            ctx.lineTo(sx + renderSize, sy + renderSize * 0.3);
            ctx.lineTo(sx - renderSize * 0.3, sy + renderSize * 0.8);
            ctx.closePath();
            ctx.fill();
            break;
          }

          case 'filament': {
            // Glowing web connection point
            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize * 2);
            grad.addColorStop(0, baseCol);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          }

          case 'void': {
            // Subtle dark hollow sphere
            ctx.strokeStyle = baseCol;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 1.8, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 1.8, 0, Math.PI * 2);
            ctx.fill();
            break;
          }

          case 'star-system': {
            // Central star
            ctx.fillStyle = baseCol;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 0.7, 0, Math.PI * 2);
            ctx.fill();

            // Small orbital dots
            ctx.fillStyle = secCol;
            const t = Date.now() / 1500;
            const o1x = renderSize * 1.4 * Math.cos(t);
            const o1y = renderSize * 0.6 * Math.sin(t);
            ctx.beginPath();
            ctx.arc(sx + o1x, sy + o1y, Math.max(1, renderSize * 0.25), 0, Math.PI * 2);
            ctx.fill();

            const o2x = renderSize * 1.6 * Math.cos(t + Math.PI);
            const o2y = renderSize * 0.5 * Math.sin(t + Math.PI);
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(sx + o2x, sy + o2y, Math.max(1, renderSize * 0.15), 0, Math.PI * 2);
            ctx.fill();
            break;
          }

          case 'sphere':
          default: {
            if (obj.id === 'earth') {
              // Earth with Atmosphere Glow, Landmasses, and Clouds
              const atmGrad = ctx.createRadialGradient(sx, sy, renderSize * 0.8, sx, sy, renderSize * 1.35);
              atmGrad.addColorStop(0, 'rgba(59, 130, 246, 0.45)');
              atmGrad.addColorStop(0.6, 'rgba(96, 165, 250, 0.2)');
              atmGrad.addColorStop(1, 'transparent');
              ctx.fillStyle = atmGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize * 1.35, 0, Math.PI * 2);
              ctx.fill();

              const oceanGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              oceanGrad.addColorStop(0, '#60a5fa');
              oceanGrad.addColorStop(0.6, '#1d4ed8');
              oceanGrad.addColorStop(1, '#0b1329');
              ctx.fillStyle = oceanGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              const rotation = (Date.now() / 18000) % (Math.PI * 2);
              ctx.fillStyle = '#16a34a';
              for (let l = 0; l < 4; l++) {
                const lAngle = l * 1.5 + rotation;
                const lx = sx + Math.cos(lAngle) * renderSize * 0.4;
                const ly = sy + Math.sin(lAngle * 0.7) * renderSize * 0.25;
                ctx.beginPath();
                ctx.arc(lx, ly, renderSize * 0.48, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#854d0e';
                ctx.beginPath();
                ctx.arc(lx, ly, renderSize * 0.22, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#16a34a';
              }

              ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
              const cloudRotation = rotation * 1.15;
              for (let c = 0; c < 3; c++) {
                const cAngle = c * 2.1 - cloudRotation;
                const cx_offset = sx + Math.cos(cAngle) * renderSize * 0.3;
                const cy_offset = sy + Math.sin(cAngle) * renderSize * 0.25;
                ctx.beginPath();
                ctx.ellipse(cx_offset, cy_offset, renderSize * 0.55, renderSize * 0.14, cAngle, 0, Math.PI * 2);
                ctx.fill();
              }

              const shadeGrad = ctx.createRadialGradient(sx - renderSize * 0.5, sy - renderSize * 0.5, renderSize * 0.2, sx, sy, renderSize);
              shadeGrad.addColorStop(0, 'rgba(255,255,255,0.05)');
              shadeGrad.addColorStop(0.7, 'rgba(0,0,0,0.4)');
              shadeGrad.addColorStop(1, 'rgba(0,0,0,0.94)');
              ctx.fillStyle = shadeGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'terrestrial-planet') { // Mars
              const marsAtm = ctx.createRadialGradient(sx, sy, renderSize * 0.9, sx, sy, renderSize * 1.25);
              marsAtm.addColorStop(0, 'rgba(239, 68, 68, 0.32)');
              marsAtm.addColorStop(1, 'transparent');
              ctx.fillStyle = marsAtm;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize * 1.25, 0, Math.PI * 2);
              ctx.fill();

              const marsGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              marsGrad.addColorStop(0, '#f87171');
              marsGrad.addColorStop(0.55, '#dc2626');
              marsGrad.addColorStop(1, '#240606');
              ctx.fillStyle = marsGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              ctx.fillStyle = 'rgba(88, 18, 18, 0.55)';
              ctx.beginPath();
              ctx.ellipse(sx - renderSize * 0.1, sy + renderSize * 0.2, renderSize * 0.55, renderSize * 0.28, Math.PI / 6, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
              ctx.beginPath();
              ctx.arc(sx, sy - renderSize * 0.85, renderSize * 0.32, 0, Math.PI, false); // North ice cap
              ctx.fill();
              ctx.beginPath();
              ctx.arc(sx, sy + renderSize * 0.9, renderSize * 0.18, Math.PI, 0, false); // South ice cap
              ctx.fill();

              const marsShade = ctx.createRadialGradient(sx - renderSize * 0.5, sy - renderSize * 0.5, renderSize * 0.1, sx, sy, renderSize);
              marsShade.addColorStop(0, 'transparent');
              marsShade.addColorStop(0.7, 'rgba(0,0,0,0.3)');
              marsShade.addColorStop(1, 'rgba(0,0,0,0.9)');
              ctx.fillStyle = marsShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'venus') {
              const venusAtm = ctx.createRadialGradient(sx, sy, renderSize * 0.8, sx, sy, renderSize * 1.35);
              venusAtm.addColorStop(0, 'rgba(253, 224, 71, 0.26)');
              venusAtm.addColorStop(1, 'transparent');
              ctx.fillStyle = venusAtm;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize * 1.35, 0, Math.PI * 2);
              ctx.fill();

              const venusGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              venusGrad.addColorStop(0, '#fef08a');
              venusGrad.addColorStop(0.55, '#d97706');
              venusGrad.addColorStop(1, '#2d1400');
              ctx.fillStyle = venusGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              ctx.strokeStyle = 'rgba(254, 240, 138, 0.35)';
              ctx.lineWidth = Math.max(1, renderSize * 0.14);
              for (let b = -4; b <= 4; b++) {
                ctx.beginPath();
                const bandY = sy + (b * renderSize * 0.24);
                ctx.moveTo(sx - renderSize, bandY - renderSize * 0.08);
                ctx.quadraticCurveTo(sx, bandY + renderSize * 0.12, sx + renderSize, bandY - renderSize * 0.08);
                ctx.stroke();
              }

              const venusShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
              venusShade.addColorStop(0, 'transparent');
              venusShade.addColorStop(1, 'rgba(0,0,0,0.94)');
              ctx.fillStyle = venusShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'mercury') {
              const mercGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              mercGrad.addColorStop(0, '#f4f4f5');
              mercGrad.addColorStop(0.55, '#71717a');
              mercGrad.addColorStop(1, '#18181b');
              ctx.fillStyle = mercGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              const craterSeeds = [
                { x: -0.35, y: -0.35, r: 0.23 },
                { x: 0.25, y: 0.25, r: 0.16 },
                { x: -0.45, y: 0.15, r: 0.14 },
                { x: 0.45, y: -0.25, r: 0.18 },
                { x: 0.05, y: 0.05, r: 0.28 },
              ];
              craterSeeds.forEach((c) => {
                const cx = sx + c.x * renderSize;
                const cy = sy + c.y * renderSize;
                const cr = c.r * renderSize;

                ctx.strokeStyle = 'rgba(9, 9, 11, 0.55)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(cx, cy, cr, Math.PI * 1.2, Math.PI * 2.2);
                ctx.stroke();

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
                ctx.beginPath();
                ctx.arc(cx, cy, cr, Math.PI * 0.2, Math.PI * 1.2);
                ctx.stroke();

                if (c.r > 0.2) {
                  ctx.fillStyle = 'rgba(255,255,255,0.22)';
                  ctx.beginPath();
                  ctx.arc(cx, cy, cr * 0.22, 0, Math.PI * 2);
                  ctx.fill();
                }
              });

              const mercShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
              mercShade.addColorStop(0, 'transparent');
              mercShade.addColorStop(1, 'rgba(0,0,0,0.94)');
              ctx.fillStyle = mercShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'gas-giant') { // Jupiter
              const jupAtm = ctx.createRadialGradient(sx, sy, renderSize * 0.9, sx, sy, renderSize * 1.3);
              jupAtm.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
              jupAtm.addColorStop(1, 'transparent');
              ctx.fillStyle = jupAtm;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize * 1.3, 0, Math.PI * 2);
              ctx.fill();

              const jupGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              jupGrad.addColorStop(0, '#fef3c7');
              jupGrad.addColorStop(0.5, '#f59e0b');
              jupGrad.addColorStop(0.8, '#b45309');
              jupGrad.addColorStop(1, '#201001');
              ctx.fillStyle = jupGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              const bandColors = [
                'rgba(120, 53, 4, 0.65)',
                'rgba(254, 243, 199, 0.45)',
                'rgba(146, 64, 14, 0.7)',
                'rgba(251, 191, 36, 0.3)',
                'rgba(78, 2, 2, 0.75)'
              ];
              const bandHeights = [
                { y: -0.4, h: 0.14 },
                { y: -0.15, h: 0.12 },
                { y: 0.1, h: 0.17 },
                { y: 0.35, h: 0.1 },
                { y: 0.55, h: 0.14 }
              ];
              bandHeights.forEach((band, idx) => {
                ctx.fillStyle = bandColors[idx % bandColors.length];
                ctx.beginPath();
                ctx.ellipse(sx, sy + band.y * renderSize, renderSize * 1.15, band.h * renderSize, 0, 0, Math.PI * 2);
                ctx.fill();
              });

              // The Great Red Spot!
              const grsX = sx + renderSize * 0.33;
              const grsY = sy + renderSize * 0.22;
              const grsW = renderSize * 0.32;
              const grsH = renderSize * 0.18;
              const grsGrad = ctx.createRadialGradient(grsX, grsY, 0, grsX, grsY, grsW);
              grsGrad.addColorStop(0, '#dc2626');
              grsGrad.addColorStop(0.65, '#991b1b');
              grsGrad.addColorStop(1, '#450a0a');
              ctx.fillStyle = grsGrad;
              ctx.beginPath();
              ctx.ellipse(grsX, grsY, grsW, grsH, Math.PI / 12, 0, Math.PI * 2);
              ctx.fill();

              ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.ellipse(grsX, grsY, grsW * 0.7, grsH * 0.7, Math.PI / 12, 0, Math.PI * 2);
              ctx.stroke();

              const jupShade = ctx.createRadialGradient(sx - renderSize * 0.5, sy - renderSize * 0.5, renderSize * 0.1, sx, sy, renderSize);
              jupShade.addColorStop(0, 'transparent');
              jupShade.addColorStop(0.7, 'rgba(0,0,0,0.3)');
              jupShade.addColorStop(1, 'rgba(0,0,0,0.93)');
              ctx.fillStyle = jupShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'neptune') {
              const nepAtm = ctx.createRadialGradient(sx, sy, renderSize * 0.9, sx, sy, renderSize * 1.35);
              nepAtm.addColorStop(0, 'rgba(37, 99, 235, 0.38)');
              nepAtm.addColorStop(1, 'transparent');
              ctx.fillStyle = nepAtm;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize * 1.35, 0, Math.PI * 2);
              ctx.fill();

              const nepGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              nepGrad.addColorStop(0, '#3b82f6');
              nepGrad.addColorStop(0.6, '#1d4ed8');
              nepGrad.addColorStop(1, '#061332');
              ctx.fillStyle = nepGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
              ctx.lineWidth = Math.max(1, renderSize * 0.08);
              ctx.beginPath();
              ctx.ellipse(sx, sy - renderSize * 0.18, renderSize * 0.9, renderSize * 0.06, 0, 0, Math.PI * 2);
              ctx.stroke();

              ctx.fillStyle = '#0a1a3e';
              ctx.beginPath();
              ctx.ellipse(sx - renderSize * 0.32, sy + renderSize * 0.1, renderSize * 0.3, renderSize * 0.17, -Math.PI / 8, 0, Math.PI * 2);
              ctx.fill();

              const nepShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
              nepShade.addColorStop(0, 'transparent');
              nepShade.addColorStop(1, 'rgba(0,0,0,0.95)');
              ctx.fillStyle = nepShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'main-sequence-star') { // Sol
              const time = Date.now() / 1000;
              ctx.save();
              ctx.globalAlpha = opacity * 0.45;
              const numFlares = 12;
              for (let f = 0; f < numFlares; f++) {
                const flareAngle = (f / numFlares) * Math.PI * 2 + time * 0.15;
                const flareLen = renderSize * (1.35 + 0.16 * Math.sin(time * 4.5 + f * 1.8));
                const fx = sx + Math.cos(flareAngle) * flareLen;
                const fy = sy + Math.sin(flareAngle) * flareLen;
                const flareGrad = ctx.createRadialGradient(sx, sy, renderSize * 0.4, fx, fy, renderSize * 0.45);
                flareGrad.addColorStop(0, '#ef4444');
                flareGrad.addColorStop(0.5, '#f59e0b');
                flareGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = flareGrad;
                ctx.beginPath();
                ctx.arc(fx, fy, renderSize * 0.65, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.restore();

              const sunGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize);
              sunGrad.addColorStop(0, '#ffffff');
              sunGrad.addColorStop(0.18, '#fffbeb');
              sunGrad.addColorStop(0.55, '#facc15');
              sunGrad.addColorStop(0.85, '#f97316');
              sunGrad.addColorStop(1.0, '#ea580c');
              ctx.fillStyle = sunGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

            } else {
              // Solid standard glowing 3D sphere fallback
              const grad = ctx.createRadialGradient(sx - renderSize * 0.2, sy - renderSize * 0.2, 0, sx, sy, renderSize);
              grad.addColorStop(0, '#ffffff');
              grad.addColorStop(0.7, baseCol);
              grad.addColorStop(1, '#000000');

              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
            }
            break;
          }
        }

        // Draw object name tag above it if zoomed in or selected/hovered
        if (isSelected || isHovered || cameraRef.current.zoom > 1.8) {
          ctx.fillStyle = isSelected ? '#f87171' : isHovered ? '#38bdf8' : '#e2e8f0';
          ctx.font = isSelected ? 'bold 11px Inter, sans-serif' : '10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(obj.name, sx, sy - renderSize - 8);

          // Category tag in smaller font
          if (isSelected || isHovered) {
            ctx.fillStyle = '#94a3b8'; // slate-400
            ctx.font = '8px font-mono';
            ctx.fillText(obj.category.toUpperCase(), sx, sy + renderSize + 16);
          }
        }

        ctx.restore();
      });

      // 7. Render dynamic scale stats overlay in bottom-left corner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '9px font-mono, monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`Cam Pitch: ${cameraRef.current.pitch.toFixed(2)} rad | Yaw: ${cameraRef.current.yaw.toFixed(2)} rad`, 15, height - 30);
      ctx.fillText(`Zoom multiplier: ${cameraRef.current.zoom.toFixed(2)}x | Focus: ${cameraRef.current.targetX.toFixed(0)},${cameraRef.current.targetY.toFixed(0)},${cameraRef.current.targetZ.toFixed(0)}`, 15, height - 15);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mappedObjects, dimensions, selectedId, hoveredObject, activeScaleZone, backgroundStars]);

  // Center button / Reset view helper
  const handleReset = () => {
    targetCameraRef.current = {
      pitch: 0.4,
      yaw: -0.6,
      zoom: 1.0,
      targetX: 0,
      targetY: 0,
      targetZ: 0
    };
  };

  return (
    <div ref={containerRef} className="relative w-full h-full select-none" id="cosmic-canvas-container">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onContextMenu={(e) => e.preventDefault()}
        className="block w-full h-full cursor-grab active:cursor-grabbing"
        id="universe-3d-canvas"
      />

      {/* Embedded controls overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none" id="canvas-overlay-controls">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md px-3 py-2 rounded-lg pointer-events-auto shadow-xl shadow-black/30 glow-sky">
          <p className="text-xs text-slate-300 font-medium mb-1">Navigation HUD</p>
          <div className="flex flex-col gap-1 text-[10px] text-slate-400 font-mono">
            <div>• <span className="text-slate-200 font-medium">Left-Click & Drag</span>: Orbit Camera</div>
            <div>• <span className="text-slate-200 font-medium">Shift + Drag</span>: Pan Focus Point</div>
            <div>• <span className="text-slate-200 font-medium">Scroll Wheel</span>: Zoom In/Out</div>
            <div>• <span className="text-slate-200 font-medium">Hover Node</span>: Inspect Body</div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="bg-white/5 hover:bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 pointer-events-auto text-[10px] text-slate-200 font-mono shadow-md text-left transition-all flex items-center justify-between cursor-pointer"
          id="btn-recenter-view"
        >
          Recenter Galactic View
          <span className="ml-2 font-bold font-sans">⌗</span>
        </button>
      </div>

      {hoveredObject && (
        <div
          className="absolute bottom-4 right-4 bg-white/5 backdrop-blur-xl px-4 py-2.5 rounded-xl border border-white/15 shadow-2xl pointer-events-none max-w-xs animate-fade-in glow-sky"
          id="hover-tooltip-card"
        >
          <div className="text-[10px] text-sky-400 font-bold tracking-wider uppercase font-mono">{hoveredObject.category}</div>
          <div className="text-sm font-semibold text-white mt-0.5">{hoveredObject.name}</div>
          <div className="text-xs text-slate-400 font-mono mt-1">Distance: {hoveredObject.distanceString}</div>
          <div className="text-[10px] text-slate-500 mt-2 italic">Click to fly inside and inspect</div>
        </div>
      )}
    </div>
  );
}
