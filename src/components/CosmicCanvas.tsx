import React, { useRef, useEffect, useState, useMemo } from 'react';
import { CelestialObject, COSMIC_SCALES } from '../types';
import { formatKm } from '../utils/distance';
import { 
  Orbit, 
  Move, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw 
} from 'lucide-react';

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
  const [interactionMode, setInteractionModeState] = useState<'orbit' | 'pan'>('orbit');
  const interactionModeRef = useRef<'orbit' | 'pan'>('orbit');
  const setInteractionMode = (val: 'orbit' | 'pan') => {
    setInteractionModeState(val);
    interactionModeRef.current = val;
  };

  const [isAutoOrbit, setIsAutoOrbitState] = useState(true);
  const isAutoOrbitRef = useRef(true);
  const setIsAutoOrbit = (val: boolean) => {
    setIsAutoOrbitState(val);
    isAutoOrbitRef.current = val;
  };

  const isDragging = useRef(false);
  const isPanning = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const mouseDownPos = useRef({ x: 0, y: 0 });
  const mouseDownTime = useRef<number>(0);

  // Touch references for mobile device touch support and pinch zoom
  const lastTouchPos = useRef({ x: 0, y: 0 });
  const initialTouchDist = useRef<number | null>(null);
  const initialTouchZoom = useRef<number>(1.0);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const touchStartTime = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAutoOrbit(false); // Stop auto orbiting upon manual interaction
    isDragging.current = true;
    isPanning.current = e.button === 2 || e.shiftKey; // right click or shift key for pan
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
    mouseDownTime.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDragging.current) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      if (isPanning.current || interactionModeRef.current === 'pan') {
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

    const duration = Date.now() - mouseDownTime.current;
    const endX = e.clientX;
    const endY = e.clientY;
    const startX = mouseDownPos.current.x;
    const startY = mouseDownPos.current.y;
    const dragDistance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

    // If it was a quick click with minimal drag, calculate selection coordinate precisely
    if (duration < 350 && dragDistance < 25) {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const clickX = startX - rect.left;
      const clickY = startY - rect.top;

      const width = dimensions.width;
      const height = dimensions.height;
      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 400;
      const distOffset = 600 / cameraRef.current.zoom;

      const cosP = Math.cos(cameraRef.current.pitch);
      const sinP = Math.sin(cameraRef.current.pitch);
      const cosY = Math.cos(cameraRef.current.yaw);
      const sinY = Math.sin(cameraRef.current.yaw);

      let closestObj: CelestialObject | null = null;
      let minDistance = 40; // selection click boundary (increased for easier selection)

      mappedObjects.forEach((obj) => {
        if (activeScaleZone && obj.scaleZone !== activeScaleZone) return;

        const ox = (obj.x || 0) - cameraRef.current.targetX;
        const oy = (obj.y || 0) - cameraRef.current.targetY;
        const oz = (obj.z || 0) - cameraRef.current.targetZ;

        const rx1 = ox * cosY - oz * sinY;
        const rz1 = ox * sinY + oz * cosY;
        const ry = oy * cosP - rz1 * sinP;
        const rz = oy * sinP + rz1 * cosP;

        const sz = rz + distOffset;
        if (sz > 10) {
          const depthScale = focalLength / sz;
          const sx = cx + rx1 * depthScale;
          const sy = cy + ry * depthScale;

          const dx = clickX - sx;
          const dy = clickY - sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < minDistance) {
            minDistance = dist;
            closestObj = obj;
          }
        }
      });

      if (closestObj) {
        onSelectObject(closestObj);
      }
    } else {
      // Fallback fallback click logic
      if (hoveredObject && dragDistance < 20) {
        onSelectObject(hoveredObject);
      }
    }
  };

  // Touch handlers for mobile devices (single touch orbit/pan, two-finger pinch to zoom)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoOrbit(false); // Stop auto orbiting upon manual touch interaction
    if (e.touches.length === 1) {
      isDragging.current = true;
      const touch = e.touches[0];
      lastTouchPos.current = { x: touch.clientX, y: touch.clientY };
      touchStartPos.current = { x: touch.clientX, y: touch.clientY };
      touchStartTime.current = Date.now();
    } else if (e.touches.length === 2) {
      isDragging.current = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      initialTouchDist.current = Math.sqrt(dx * dx + dy * dy);
      initialTouchZoom.current = targetCameraRef.current.zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.cancelable) {
      e.preventDefault();
    }

    if (e.touches.length === 1 && isDragging.current) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouchPos.current.x;
      const deltaY = touch.clientY - lastTouchPos.current.y;

      if (interactionModeRef.current === 'pan' || isPanning.current) {
        // Pan Mode touch movement
        const factor = 1.8 / cameraRef.current.zoom;
        const cosY = Math.cos(cameraRef.current.yaw);
        const sinY = Math.sin(cameraRef.current.yaw);
        const cosP = Math.cos(cameraRef.current.pitch);
        const sinP = Math.sin(cameraRef.current.pitch);

        const dx = (cosY * deltaX + sinY * sinP * deltaY) * factor;
        const dy = (cosP * deltaY) * factor;
        const dz = (sinY * deltaX - cosY * sinP * deltaY) * factor;

        targetCameraRef.current.targetX -= dx;
        targetCameraRef.current.targetY += dy;
        targetCameraRef.current.targetZ -= dz;
      } else {
        // Orbit Mode touch rotation
        targetCameraRef.current.yaw += deltaX * 0.009;
        targetCameraRef.current.pitch = Math.max(
          -Math.PI / 2.1,
          Math.min(Math.PI / 2.1, targetCameraRef.current.pitch + deltaY * 0.009)
        );
      }
      lastTouchPos.current = { x: touch.clientX, y: touch.clientY };
    } else if (e.touches.length === 2 && initialTouchDist.current !== null) {
      // Pinch to Zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      const currentDist = Math.sqrt(dx * dx + dy * dy);

      if (initialTouchDist.current > 5) {
        const ratio = currentDist / initialTouchDist.current;
        targetCameraRef.current.zoom = Math.max(
          0.1,
          Math.min(10.0, initialTouchZoom.current * ratio)
        );
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      initialTouchDist.current = null;

      const duration = Date.now() - touchStartTime.current;
      const endX = lastTouchPos.current.x;
      const endY = lastTouchPos.current.y;
      const startX = touchStartPos.current.x;
      const startY = touchStartPos.current.y;
      const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

      if (duration < 300 && distance < 25) {
        // Tap selection on mobile devices
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const touchX = startX - rect.left;
        const touchY = startY - rect.top;

        const width = dimensions.width;
        const height = dimensions.height;
        const cx = width / 2;
        const cy = height / 2;
        const focalLength = 400;
        const distOffset = 600 / cameraRef.current.zoom;

        const cosP = Math.cos(cameraRef.current.pitch);
        const sinP = Math.sin(cameraRef.current.pitch);
        const cosY = Math.cos(cameraRef.current.yaw);
        const sinY = Math.sin(cameraRef.current.yaw);

        let closestObj: CelestialObject | null = null;
        let minDistance = 50; // slightly wider tap radius for mobile touch accuracy (increased for ease of use)

        mappedObjects.forEach((obj) => {
          if (activeScaleZone && obj.scaleZone !== activeScaleZone) return;

          const ox = (obj.x || 0) - cameraRef.current.targetX;
          const oy = (obj.y || 0) - cameraRef.current.targetY;
          const oz = (obj.z || 0) - cameraRef.current.targetZ;

          const rx1 = ox * cosY - oz * sinY;
          const rz1 = ox * sinY + oz * cosY;
          const ry = oy * cosP - rz1 * sinP;
          const rz = oy * sinP + rz1 * cosP;

          const sz = rz + distOffset;
          if (sz > 10) {
            const depthScale = focalLength / sz;
            const sx = cx + rx1 * depthScale;
            const sy = cy + ry * depthScale;

            const dx = touchX - sx;
            const dy = touchY - sy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < minDistance) {
              minDistance = dist;
              closestObj = obj;
            }
          }
        });

        if (closestObj) {
          onSelectObject(closestObj);
        }
      }
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
      // If auto-orbiting is active, slowly spin the target camera yaw
      if (isAutoOrbitRef.current) {
        targetCameraRef.current.yaw += 0.0015;
      }

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
        if (i === 4) {
          // Render the Observable Horizon as a high-fidelity 3D wireframe sphere!
          ctx.save();
          
          // Draw latitude bands (parallel circles)
          const latitudes = [-Math.PI / 3, -Math.PI / 6, 0, Math.PI / 6, Math.PI / 3];
          latitudes.forEach((phi) => {
            ctx.beginPath();
            // Highlight the equator slightly more
            if (phi === 0) {
              ctx.strokeStyle = 'rgba(244, 63, 94, 0.22)'; // glowing rose/pink for CMB equator
              ctx.lineWidth = 1.5;
            } else {
              ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)'; // indigo for other latitudes
              ctx.lineWidth = 1;
            }
            
            const segments = 64;
            const cosPhi = Math.cos(phi);
            const sinPhi = Math.sin(phi);
            let firstPoint = true;

            for (let s = 0; s <= segments; s++) {
              const theta = (s / segments) * Math.PI * 2;
              const ox = shellRadius * cosPhi * Math.cos(theta) - cameraRef.current.targetX;
              const oy = shellRadius * sinPhi - cameraRef.current.targetY;
              const oz = shellRadius * cosPhi * Math.sin(theta) - cameraRef.current.targetZ;

              const rx1 = ox * cosY - oz * sinY;
              const rz1 = ox * sinY + oz * cosY;
              const ry = oy * cosP - rz1 * sinP;
              const rz = oy * sinP + rz1 * cosP;

              const sz = rz + distOffset;
              if (sz > 10) {
                const depthScale = focalLength / sz;
                const sx = cx + rx1 * depthScale;
                const sy = cy + ry * depthScale;

                if (firstPoint) {
                  ctx.moveTo(sx, sy);
                  firstPoint = false;
                } else {
                  ctx.lineTo(sx, sy);
                }
              }
            }
            ctx.stroke();
          });

          // Draw longitude bands (great circles at different yaw offsets)
          const longitudes = [0, Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4];
          longitudes.forEach((thetaOffset) => {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
            ctx.lineWidth = 1;
            
            const segments = 64;
            let firstPoint = true;

            for (let s = 0; s <= segments; s++) {
              const phi = (s / segments) * Math.PI * 2;
              // Coordinates of a point on a vertical circle tilted by thetaOffset
              const ox = shellRadius * Math.cos(phi) * Math.cos(thetaOffset) - cameraRef.current.targetX;
              const oy = shellRadius * Math.sin(phi) - cameraRef.current.targetY;
              const oz = shellRadius * Math.cos(phi) * Math.sin(thetaOffset) - cameraRef.current.targetZ;

              const rx1 = ox * cosY - oz * sinY;
              const rz1 = ox * sinY + oz * cosY;
              const ry = oy * cosP - rz1 * sinP;
              const rz = oy * sinP + rz1 * cosP;

              const sz = rz + distOffset;
              if (sz > 10) {
                const depthScale = focalLength / sz;
                const sx = cx + rx1 * depthScale;
                const sy = cy + ry * depthScale;

                if (firstPoint) {
                  ctx.moveTo(sx, sy);
                  firstPoint = false;
                } else {
                  ctx.lineTo(sx, sy);
                }
              }
            }
            ctx.stroke();
          });

          ctx.restore();

          // Label the Observable Universe Edge
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

            ctx.fillStyle = 'rgba(244, 63, 94, 0.5)'; // vibrant rose pink label
            ctx.font = 'bold 10px font-mono';
            ctx.fillText(scaleLabels[i], sx + 5, sy - 5);
          }

        } else {
          // Draw orbital grid shells on the horizontal plane (y = 0) for inner bands
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
            ctx.stroke();

            // Label shells
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
        }
      });

      // 3.5. Draw Highlight for the Solar System Belt (where planets are clustered, r ~ 312)
      ctx.save();
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.45)'; // Amber gold glowing line
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      
      const solarSystemRadius = 312; // Middle of planet cluster
      ctx.beginPath();
      let solarPointsCount = 0;
      for (let s = 0; s <= 64; s++) {
        const angle = (s / 64) * Math.PI * 2;
        const ox = solarSystemRadius * Math.cos(angle) - cameraRef.current.targetX;
        const oy = 0 - cameraRef.current.targetY;
        const oz = solarSystemRadius * Math.sin(angle) - cameraRef.current.targetZ;

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
          solarPointsCount++;
        }
      }
      if (solarPointsCount > 10) {
        ctx.stroke();
        
        // Draw a text label on the belt
        const ox = solarSystemRadius - cameraRef.current.targetX;
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

          ctx.fillStyle = '#f59e0b'; // Amber yellow text
          ctx.font = 'bold 9px "JetBrains Mono", monospace';
          ctx.fillText('☀️ SOLAR SYSTEM ORBITAL ZONE', sx + 6, sy - 4);
        }
      }
      ctx.restore();

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

      // 5.5. Draw connection path from Earth to Selected Object and show distance in Kilometers
      if (selectedId && selectedId !== 'earth') {
        const earthProj = projectedObjects.find((p) => p.obj.id === 'earth');
        const selectedProj = projectedObjects.find((p) => p.obj.id === selectedId);

        if (earthProj && selectedProj) {
          const ex = cx + earthProj.rx * (focalLength / earthProj.sz);
          const ey = cy + earthProj.ry * (focalLength / earthProj.sz);
          const sx = cx + selectedProj.rx * (focalLength / selectedProj.sz);
          const sy = cy + selectedProj.ry * (focalLength / selectedProj.sz);

          ctx.save();
          // Draw a glowing shadow line
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)'; // sky-400 at low opacity
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(sx, sy);
          ctx.stroke();

          // Draw the animated dashed line
          ctx.strokeStyle = '#38bdf8'; // sky-400 neon blue
          ctx.lineWidth = 1.5;
          ctx.setLineDash([5, 4]);
          ctx.lineDashOffset = -Math.floor(Date.now() / 40) % 9;
          ctx.beginPath();
          ctx.moveTo(ex, ey);
          ctx.lineTo(sx, sy);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();

          // Calculate midpoint for floating distance label
          const mx = (ex + sx) / 2;
          const my = (ey + sy) / 2;
          const lineLength = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2);

          // Render label only if line has sufficient length to avoid crowding
          if (lineLength > 40) {
            const distanceLabel = formatKm(selectedProj.obj.distanceLy);

            ctx.save();
            ctx.font = 'bold 9px "JetBrains Mono", font-mono, monospace';
            const textWidth = ctx.measureText(distanceLabel).width;
            const padX = 8;
            const padY = 4;

            // Draw shadow/glow behind badge
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 6;

            // Rounded rectangle/pill background
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'; // slate-900
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)'; // sky-400 border
            ctx.lineWidth = 1;
            ctx.beginPath();
            if (ctx.roundRect) {
              ctx.roundRect(mx - textWidth / 2 - padX, my - 8 - padY, textWidth + padX * 2, 16 + padY * 2, 6);
            } else {
              ctx.rect(mx - textWidth / 2 - padX, my - 8 - padY, textWidth + padX * 2, 16 + padY * 2);
            }
            ctx.fill();
            ctx.stroke();

            // Render text
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#e0f2fe'; // sky-100
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(distanceLabel, mx, my);
            ctx.restore();
          }
        }
      }

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

        // Subtle gold glow/halo for all Solar System objects to highlight them clearly
        if (obj.scaleZone === 1 && !isSelected && !isHovered) {
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.22)'; // Amber/gold subtle ring
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(sx, sy, renderSize + 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

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
            const time = Date.now() / 1000;
            
            // 1. Relativistic Jets (perpendicular to the accretion disk at angle -Math.PI / 4)
            ctx.save();
            const jetAngle = -Math.PI / 4;
            const jetLen = renderSize * 4.5;
            const jetGrad1 = ctx.createLinearGradient(sx, sy, sx + Math.cos(jetAngle) * jetLen, sy + Math.sin(jetAngle) * jetLen);
            jetGrad1.addColorStop(0, 'rgba(168, 85, 247, 0.85)'); // Purple-500
            jetGrad1.addColorStop(0.2, 'rgba(56, 189, 248, 0.5)'); // Sky-400
            jetGrad1.addColorStop(1, 'transparent');
            
            ctx.strokeStyle = jetGrad1;
            ctx.lineWidth = Math.max(1, renderSize * 0.22);
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 12;
            
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + Math.cos(jetAngle) * jetLen, sy + Math.sin(jetAngle) * jetLen);
            ctx.stroke();
            
            const jetGrad2 = ctx.createLinearGradient(sx, sy, sx - Math.cos(jetAngle) * jetLen, sy - Math.sin(jetAngle) * jetLen);
            jetGrad2.addColorStop(0, 'rgba(168, 85, 247, 0.85)');
            jetGrad2.addColorStop(0.2, 'rgba(56, 189, 248, 0.5)');
            jetGrad2.addColorStop(1, 'transparent');
            ctx.strokeStyle = jetGrad2;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx - Math.cos(jetAngle) * jetLen, sy - Math.sin(jetAngle) * jetLen);
            ctx.stroke();
            ctx.restore();

            // 2. Background Einstein Ring (Gravitational lensing light bent over the horizon)
            ctx.save();
            const lensedGrad = ctx.createRadialGradient(sx, sy, renderSize * 0.7, sx, sy, renderSize * 1.6);
            lensedGrad.addColorStop(0, '#000000');
            lensedGrad.addColorStop(0.12, '#ef4444'); // fiery red border
            lensedGrad.addColorStop(0.4, baseCol);    // hot pink/magenta
            lensedGrad.addColorStop(0.75, secCol);    // sky-400 glow
            lensedGrad.addColorStop(1, 'transparent');
            
            ctx.fillStyle = lensedGrad;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 1.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // 3. Event Horizon (the pitch black core)
            ctx.save();
            ctx.fillStyle = '#000000';
            ctx.shadowColor = '#000000';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // 4. Foreground Accretion Disk (wrapping in front of the black hole)
            ctx.save();
            const diskAngle = Math.PI / 12; // slightly tilted
            const diskGrad = ctx.createRadialGradient(sx, sy, renderSize * 0.8, sx, sy, renderSize * 3);
            diskGrad.addColorStop(0, 'rgba(239, 68, 68, 0.85)'); // bright red near horizon
            diskGrad.addColorStop(0.2, baseCol);
            diskGrad.addColorStop(0.65, secCol);
            diskGrad.addColorStop(1, 'transparent');
            
            ctx.fillStyle = diskGrad;
            ctx.beginPath();
            ctx.ellipse(sx, sy, renderSize * 2.9, renderSize * 0.55, diskAngle, -Math.PI * 0.1, Math.PI * 1.1); // Front arc
            ctx.fill();
            
            // Shimmering plasma threads wrapping the hole
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 12]);
            ctx.lineDashOffset = -Math.floor(Date.now() / 30) % 16;
            ctx.beginPath();
            ctx.ellipse(sx, sy, renderSize * 2.3, renderSize * 0.42, diskAngle, -Math.PI * 0.1, Math.PI * 1.1);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
            break;
          }

          case 'galaxy-spiral': {
            const time = Date.now() / 2400;
            const rotationAngle = Math.PI / 4 + time * 0.05; // slowly rotate

            // Central core bulgy glow
            const coreGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize * 0.85);
            coreGrad.addColorStop(0, '#ffffff');
            coreGrad.addColorStop(0.35, '#fef08a'); // Warm yellow nucleus
            coreGrad.addColorStop(0.7, 'rgba(249, 115, 22, 0.2)'); // orange envelope
            coreGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * 0.85, 0, Math.PI * 2);
            ctx.fill();

            // Draw spiral arms with star particles and dusty nebulae
            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(rotationAngle);

            const armsCount = 2;
            const particlesPerArm = 28;
            
            for (let arm = 0; arm < armsCount; arm++) {
              const armOffset = (arm * Math.PI * 2) / armsCount;
              
              // Draw diffuse gas arm background
              ctx.beginPath();
              for (let i = 0; i < particlesPerArm; i++) {
                const t = i / particlesPerArm; // 0 to 1
                const angle = t * Math.PI * 2.3 + armOffset; // winding angle
                const r = renderSize * 3.6 * Math.pow(t, 1.15); // arm length radius
                
                const px = r * Math.cos(angle);
                const py = r * Math.sin(angle) * 0.48; // flat 3D perspective
                
                const gasSize = renderSize * (0.95 - t * 0.45);
                const gasGrad = ctx.createRadialGradient(px, py, 0, px, py, gasSize);
                gasGrad.addColorStop(0, i % 2 === 0 ? baseCol : secCol);
                gasGrad.addColorStop(0.5, 'rgba(79, 70, 229, 0.1)'); // deep space blue blend
                gasGrad.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gasGrad;
                ctx.globalAlpha = opacity * 0.42 * (1 - t * 0.5);
                ctx.beginPath();
                ctx.arc(px, py, gasSize, 0, Math.PI * 2);
                ctx.fill();
              }

              // Draw individual star clusters along the arm
              ctx.fillStyle = '#ffffff';
              for (let i = 0; i < particlesPerArm * 2.5; i++) {
                const t = i / (particlesPerArm * 2.5);
                const angle = t * Math.PI * 2.3 + armOffset + (Math.sin(i * 1.5) * 0.16); // scattered
                const r = renderSize * 3.5 * Math.pow(t, 1.15) + (Math.cos(i) * renderSize * 0.12);
                
                const px = r * Math.cos(angle);
                const py = r * Math.sin(angle) * 0.48;
                
                ctx.globalAlpha = opacity * (0.85 - t * 0.4);
                ctx.beginPath();
                ctx.arc(px, py, Math.max(0.6, renderSize * 0.12 * (1 - t * 0.55)), 0, Math.PI * 2);
                ctx.fill();
              }
            }
            ctx.restore();
            break;
          }

          case 'galaxy-elliptical': {
            // Diffuse smooth galactic halo
            const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize * 2.8);
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.3, baseCol);
            grad.addColorStop(0.7, secCol);
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(sx, sy, renderSize * 2.8, renderSize * 1.8, Math.PI / 8, 0, Math.PI * 2);
            ctx.fill();

            // Spheroidal swarm of elderly red/yellow stars orbiting around
            ctx.fillStyle = '#fff9db'; // Warm cream yellow
            const starsCount = 42;
            const time = Date.now() / 4200;
            for (let i = 0; i < starsCount; i++) {
              const radius = renderSize * 2.5 * Math.sqrt((i + 1) / starsCount);
              const angle = i * 2.1 + time * (1.3 - radius / (renderSize * 3.2));
              const px = sx + Math.cos(angle) * radius;
              const py = sy + Math.sin(angle) * radius * 0.65;
              ctx.globalAlpha = opacity * 0.8 * (1 - radius / (renderSize * 2.7));
              ctx.beginPath();
              ctx.arc(px, py, Math.max(0.6, renderSize * 0.08), 0, Math.PI * 2);
              ctx.fill();
            }
            break;
          }

          case 'nebula-cloud': {
            const time = Date.now() / 4500;
            ctx.save();
            ctx.globalAlpha = opacity * 0.55;

            // Wispy organic overlapping gas clouds
            const clouds = [
              { dx: Math.sin(time) * 5, dy: Math.cos(time) * 3, r: renderSize * 4.2, col: baseCol },
              { dx: Math.cos(time * 0.7) * -6, dy: Math.sin(time * 1.1) * 4, r: renderSize * 3.4, col: secCol },
              { dx: Math.sin(time * 0.6) * 4, dy: Math.sin(time * 0.8) * -5, r: renderSize * 2.8, col: '#4f46e5' }, // violet-600
              { dx: 0, dy: 0, r: renderSize * 2.4, col: '#f43f5e' } // rose core
            ];

            clouds.forEach((c) => {
              const cx_cloud = sx + c.dx;
              const cy_cloud = sy + c.dy;
              const grad = ctx.createRadialGradient(cx_cloud, cy_cloud, 0, cx_cloud, cy_cloud, c.r);
              grad.addColorStop(0, c.col);
              grad.addColorStop(0.48, 'rgba(79, 70, 229, 0.12)');
              grad.addColorStop(1, 'transparent');
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.ellipse(cx_cloud, cy_cloud, c.r, c.r * 0.72, Math.PI / 10, 0, Math.PI * 2);
              ctx.fill();
            });

            // Embedded glowing baby star cluster (e.g. Orion's Trapezium)
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 5;
            const stars = [
              { x: -5, y: -2, size: 1.5 },
              { x: 4, y: 5, size: 1.1 },
              { x: -1, y: 3, size: 0.8 },
              { x: 6, y: -4, size: 1.3 }
            ];
            stars.forEach((s) => {
              const px = sx + s.x * (renderSize * 0.22);
              const py = sy + s.y * (renderSize * 0.22);
              ctx.beginPath();
              ctx.arc(px, py, Math.max(0.7, s.size * renderSize * 0.12), 0, Math.PI * 2);
              ctx.fill();
              
              if (s.size > 1.3) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(px - renderSize, py); ctx.lineTo(px + renderSize, py);
                ctx.moveTo(px, py - renderSize); ctx.lineTo(px, py + renderSize);
                ctx.stroke();
              }
            });
            ctx.restore();
            break;
          }

          case 'pulsar': {
            const time = Date.now() / 100;
            const pulse = 1 + 0.18 * Math.sin(time * 0.85);
            const rotation = time * 0.04;

            ctx.save();
            // 1. Swirling Magnetic Field Lines (curving double-loops)
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.22)'; // Magnetosphere loops
            ctx.lineWidth = 0.8;
            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(rotation);
            for (let l = 0; l < 4; l++) {
              ctx.beginPath();
              ctx.ellipse(0, 0, renderSize * 3.2, renderSize * (1.1 + l * 0.65), 0, 0, Math.PI * 2);
              ctx.stroke();
            }
            ctx.restore();

            // 2. High-energy polar beams/jets
            const beamAngle = -Math.PI / 4; // Tilted magnetic axis
            const beamLen = renderSize * 5.5;
            
            ctx.shadowColor = secCol;
            ctx.shadowBlur = 10;
            
            const drawBeam = (angle: number) => {
              ctx.save();
              const bx = sx + Math.cos(angle) * beamLen;
              const by = sy + Math.sin(angle) * beamLen;
              const beamGrad = ctx.createLinearGradient(sx, sy, bx, by);
              beamGrad.addColorStop(0, '#ffffff');
              beamGrad.addColorStop(0.25, secCol);
              beamGrad.addColorStop(0.65, 'rgba(56, 189, 248, 0.25)'); // sky-400
              beamGrad.addColorStop(1, 'transparent');
              
              ctx.fillStyle = beamGrad;
              ctx.beginPath();
              ctx.moveTo(sx, sy);
              const perpAngle = angle + Math.PI / 2;
              const spread = renderSize * 0.65;
              ctx.lineTo(bx + Math.cos(perpAngle) * spread, by + Math.sin(perpAngle) * spread);
              ctx.lineTo(bx - Math.cos(perpAngle) * spread, by - Math.sin(perpAngle) * spread);
              ctx.closePath();
              ctx.fill();
              
              // Animated plasma nodules travelling out the beam
              ctx.fillStyle = '#ffffff';
              const pOffset = ((Date.now() / 18) % 100) / 100;
              const px = sx + Math.cos(angle) * beamLen * pOffset;
              const py = sy + Math.sin(angle) * beamLen * pOffset;
              ctx.beginPath();
              ctx.arc(px, py, Math.max(1, renderSize * 0.14), 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            };

            drawBeam(beamAngle);
            drawBeam(beamAngle + Math.PI); // Opposite pole

            // 3. Central pulsing core
            const coreGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize * pulse);
            coreGrad.addColorStop(0, '#ffffff');
            coreGrad.addColorStop(0.45, baseCol);
            coreGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(sx, sy, renderSize * pulse, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
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

            } else if (obj.id === 'comet') {
              // Hyper-realistic Comet rendering (Halley's Comet)
              const time = Date.now() / 1000;
              // Points away from center (cx, cy) to indicate solar wind pressure
              const dx = sx - cx;
              const dy = sy - cy;
              const tailAngle = Math.atan2(dy, dx); 

              ctx.save();
              // 1. Ion Tail (highly collimated, energetic blue/purple gas stream)
              const ionLen = renderSize * 6.5;
              const ionGrad = ctx.createLinearGradient(sx, sy, sx + Math.cos(tailAngle) * ionLen, sy + Math.sin(tailAngle) * ionLen);
              ionGrad.addColorStop(0, 'rgba(56, 189, 248, 0.95)'); // sky-400
              ionGrad.addColorStop(0.3, 'rgba(147, 51, 234, 0.45)'); // purple-600
              ionGrad.addColorStop(1, 'transparent');
              ctx.strokeStyle = ionGrad;
              ctx.lineWidth = Math.max(1.5, renderSize * 0.14);
              ctx.beginPath();
              ctx.moveTo(sx, sy);
              ctx.lineTo(sx + Math.cos(tailAngle) * ionLen, sy + Math.sin(tailAngle) * ionLen);
              ctx.stroke();

              // 2. Dust Tail (curved, wider, glowing pale yellow reflecting sunlight)
              const dustLen = renderSize * 5.5;
              const dustAngle = tailAngle + 0.12 * Math.sin(time * 0.4); // slightly sways
              const dustGrad = ctx.createLinearGradient(sx, sy, sx + Math.cos(dustAngle) * dustLen, sy + Math.sin(dustAngle) * dustLen);
              dustGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
              dustGrad.addColorStop(0.32, 'rgba(254, 243, 199, 0.32)'); // warm cream-yellow
              dustGrad.addColorStop(1, 'transparent');
              
              ctx.fillStyle = dustGrad;
              ctx.beginPath();
              ctx.moveTo(sx, sy);
              const perpAngle = dustAngle + Math.PI / 2;
              const spread = renderSize * 1.6;
              ctx.lineTo(sx + Math.cos(dustAngle) * dustLen + Math.cos(perpAngle) * spread, sy + Math.sin(dustAngle) * dustLen + Math.sin(perpAngle) * spread);
              ctx.quadraticCurveTo(sx + Math.cos(dustAngle) * dustLen * 0.5, sy + Math.sin(dustAngle) * dustLen * 0.5, sx, sy);
              ctx.closePath();
              ctx.fill();

              // 3. Glowing Gas Coma
              const comaGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize * 1.8);
              comaGrad.addColorStop(0, '#ffffff');
              comaGrad.addColorStop(0.28, 'rgba(165, 243, 252, 0.85)'); // cyan-200
              comaGrad.addColorStop(0.68, 'rgba(56, 189, 248, 0.3)');
              comaGrad.addColorStop(1, 'transparent');
              ctx.fillStyle = comaGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize * 1.8, 0, Math.PI * 2);
              ctx.fill();

              // 4. Irregular Nucleus (dark icy potato-rock)
              ctx.fillStyle = '#cbd5e1';
              ctx.beginPath();
              const numVertices = 8;
              for (let i = 0; i < numVertices; i++) {
                const angle = (i / numVertices) * Math.PI * 2;
                const r = renderSize * (0.65 + 0.16 * Math.sin(angle * 3.2 + 2));
                const vx = sx + Math.cos(angle) * r;
                const vy = sy + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(vx, vy);
                else ctx.lineTo(vx, vy);
              }
              ctx.closePath();
              ctx.fill();
              ctx.restore();

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

              ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
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

              // Dark Volcanic highlands (Syrtis Major)
              ctx.fillStyle = 'rgba(88, 18, 18, 0.6)';
              ctx.beginPath();
              ctx.ellipse(sx - renderSize * 0.1, sy + renderSize * 0.2, renderSize * 0.55, renderSize * 0.28, Math.PI / 6, 0, Math.PI * 2);
              ctx.fill();

              // Active dust storm overlay (light sandy streaks)
              ctx.fillStyle = 'rgba(251, 191, 36, 0.15)';
              ctx.beginPath();
              ctx.ellipse(sx + renderSize * 0.2, sy - renderSize * 0.1, renderSize * 0.6, renderSize * 0.1, -Math.PI / 8, 0, Math.PI * 2);
              ctx.fill();

              // Polar Ice caps
              ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
              ctx.beginPath();
              ctx.arc(sx, sy - renderSize * 0.85, renderSize * 0.32, 0, Math.PI, false); // North ice cap
              ctx.fill();
              ctx.beginPath();
              ctx.arc(sx, sy + renderSize * 0.9, renderSize * 0.18, Math.PI, 0, false); // South ice cap
              ctx.fill();

              const marsShade = ctx.createRadialGradient(sx - renderSize * 0.5, sy - renderSize * 0.5, renderSize * 0.1, sx, sy, renderSize);
              marsShade.addColorStop(0, 'transparent');
              marsShade.addColorStop(0.7, 'rgba(0,0,0,0.3)');
              marsShade.addColorStop(1, 'rgba(0,0,0,0.92)');
              ctx.fillStyle = marsShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'venus') {
              const venusAtm = ctx.createRadialGradient(sx, sy, renderSize * 0.8, sx, sy, renderSize * 1.35);
              venusAtm.addColorStop(0, 'rgba(253, 224, 71, 0.32)');
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

              // Convective atmospheric acid clouds (horizontal dynamic bands)
              ctx.strokeStyle = 'rgba(254, 240, 138, 0.45)';
              ctx.lineWidth = Math.max(1, renderSize * 0.12);
              for (let b = -4; b <= 4; b++) {
                ctx.beginPath();
                const bandY = sy + (b * renderSize * 0.24);
                ctx.moveTo(sx - renderSize, bandY - renderSize * 0.08);
                ctx.quadraticCurveTo(sx, bandY + renderSize * 0.12, sx + renderSize, bandY - renderSize * 0.08);
                ctx.stroke();
              }

              // Subtle orange clouds
              ctx.fillStyle = 'rgba(180, 83, 9, 0.2)';
              ctx.beginPath();
              ctx.ellipse(sx, sy + renderSize * 0.1, renderSize * 0.95, renderSize * 0.22, 0, 0, Math.PI * 2);
              ctx.fill();

              const venusShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
              venusShade.addColorStop(0, 'transparent');
              venusShade.addColorStop(1, 'rgba(0,0,0,0.95)');
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

              // Detailed realistic craters
              const craterSeeds = [
                { x: -0.35, y: -0.35, r: 0.23, rays: true },
                { x: 0.25, y: 0.25, r: 0.16, rays: false },
                { x: -0.45, y: 0.15, r: 0.14, rays: false },
                { x: 0.45, y: -0.25, r: 0.18, rays: true },
                { x: 0.05, y: 0.05, r: 0.28, rays: false },
                { x: -0.1, y: 0.6, r: 0.2, rays: false }
              ];
              craterSeeds.forEach((c) => {
                const cx = sx + c.x * renderSize;
                const cy = sy + c.y * renderSize;
                const cr = c.r * renderSize;

                // Shadow rim
                ctx.strokeStyle = 'rgba(9, 9, 11, 0.65)';
                ctx.lineWidth = Math.max(1, renderSize * 0.04);
                ctx.beginPath();
                ctx.arc(cx, cy, cr, Math.PI * 1.2, Math.PI * 2.2);
                ctx.stroke();

                // Highlight rim
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.beginPath();
                ctx.arc(cx, cy, cr, Math.PI * 0.2, Math.PI * 1.2);
                ctx.stroke();

                // Bright Ray Ejectas (from meteorite collisions)
                if (c.rays) {
                  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
                  ctx.lineWidth = 0.5;
                  for (let rAngle = 0; rAngle < Math.PI * 2; rAngle += Math.PI / 4) {
                    ctx.beginPath();
                    ctx.moveTo(cx + Math.cos(rAngle) * cr, cy + Math.sin(rAngle) * cr);
                    ctx.lineTo(cx + Math.cos(rAngle) * cr * 3, cy + Math.sin(rAngle) * cr * 3);
                    ctx.stroke();
                  }
                }
              });

              // Sharp airless terminator shading
              const mercShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.15, sx, sy, renderSize);
              mercShade.addColorStop(0, 'transparent');
              mercShade.addColorStop(0.75, 'rgba(0,0,0,0.5)');
              mercShade.addColorStop(1, 'rgba(0,0,0,0.96)');
              ctx.fillStyle = mercShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'gas-giant') { // Jupiter
              const jupAtm = ctx.createRadialGradient(sx, sy, renderSize * 0.9, sx, sy, renderSize * 1.3);
              jupAtm.addColorStop(0, 'rgba(245, 158, 11, 0.25)');
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

              // Multi-colored striated cloud bands
              const bandColors = [
                'rgba(120, 53, 4, 0.7)',     // dark red-brown belt
                'rgba(254, 243, 199, 0.5)',   // cream-white zone
                'rgba(146, 64, 14, 0.75)',    // equatorial belt
                'rgba(251, 191, 36, 0.45)',   // yellow-orange band
                'rgba(78, 2, 2, 0.8)',        // south polar belt
                'rgba(217, 119, 6, 0.55)'     // temperate zone
              ];
              const bandHeights = [
                { y: -0.6, h: 0.12 },
                { y: -0.38, h: 0.15 },
                { y: -0.1, h: 0.18 },
                { y: 0.14, h: 0.12 },
                { y: 0.38, h: 0.16 },
                { y: 0.62, h: 0.14 }
              ];
              bandHeights.forEach((band, idx) => {
                ctx.fillStyle = bandColors[idx % bandColors.length];
                ctx.beginPath();
                ctx.ellipse(sx, sy + band.y * renderSize, renderSize * 1.15, band.h * renderSize, 0, 0, Math.PI * 2);
                ctx.fill();
              });

              // The Great Red Spot (Detailed vortex)
              const grsX = sx + renderSize * 0.33;
              const grsY = sy + renderSize * 0.22;
              const grsW = renderSize * 0.34;
              const grsH = renderSize * 0.2;
              const grsGrad = ctx.createRadialGradient(grsX, grsY, 0, grsX, grsY, grsW);
              grsGrad.addColorStop(0, '#ef4444');  // bright hot red eye
              grsGrad.addColorStop(0.65, '#991b1b'); // deep maroon body
              grsGrad.addColorStop(1, '#450a0a');    // blackish rim
              ctx.fillStyle = grsGrad;
              ctx.beginPath();
              ctx.ellipse(grsX, grsY, grsW, grsH, Math.PI / 12, 0, Math.PI * 2);
              ctx.fill();

              // Storm curl highlight
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.ellipse(grsX, grsY, grsW * 0.7, grsH * 0.7, Math.PI / 12, 0, Math.PI * 1.5);
              ctx.stroke();

              const jupShade = ctx.createRadialGradient(sx - renderSize * 0.5, sy - renderSize * 0.5, renderSize * 0.1, sx, sy, renderSize);
              jupShade.addColorStop(0, 'transparent');
              jupShade.addColorStop(0.7, 'rgba(0,0,0,0.3)');
              jupShade.addColorStop(1, 'rgba(0,0,0,0.94)');
              ctx.fillStyle = jupShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'neptune') {
              const nepAtm = ctx.createRadialGradient(sx, sy, renderSize * 0.9, sx, sy, renderSize * 1.35);
              nepAtm.addColorStop(0, 'rgba(37, 99, 235, 0.4)');
              nepAtm.addColorStop(1, 'transparent');
              ctx.fillStyle = nepAtm;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize * 1.35, 0, Math.PI * 2);
              ctx.fill();

              const nepGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              nepGrad.addColorStop(0, '#60a5fa');
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

              // Faint atmospheric bands
              ctx.strokeStyle = 'rgba(30, 64, 175, 0.45)';
              ctx.lineWidth = Math.max(1, renderSize * 0.08);
              ctx.beginPath();
              ctx.ellipse(sx, sy - renderSize * 0.18, renderSize * 0.95, renderSize * 0.06, 0, 0, Math.PI * 2);
              ctx.stroke();

              // The Great Dark Spot (High-pressure anticyclonic storm)
              ctx.fillStyle = '#0f172a'; // extremely dark blue-black
              ctx.beginPath();
              ctx.ellipse(sx - renderSize * 0.32, sy + renderSize * 0.1, renderSize * 0.32, renderSize * 0.18, -Math.PI / 8, 0, Math.PI * 2);
              ctx.fill();

              // High-altitude bright white methane ice cirrus clouds (The Scooter)
              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.ellipse(sx + renderSize * 0.15, sy - renderSize * 0.35, renderSize * 0.16, renderSize * 0.03, Math.PI / 10, 0, Math.PI * 2);
              ctx.ellipse(sx - renderSize * 0.25, sy - renderSize * 0.42, renderSize * 0.1, renderSize * 0.02, Math.PI / 12, 0, Math.PI * 2);
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
              
              // Animated solar flare corona loops (superheated plasma prominence)
              ctx.globalAlpha = opacity * 0.48;
              const numFlares = 12;
              for (let f = 0; f < numFlares; f++) {
                const flareAngle = (f / numFlares) * Math.PI * 2 + time * 0.12;
                const flareLen = renderSize * (1.38 + 0.18 * Math.sin(time * 4.2 + f * 1.9));
                const fx = sx + Math.cos(flareAngle) * flareLen;
                const fy = sy + Math.sin(flareAngle) * flareLen;
                const flareGrad = ctx.createRadialGradient(sx, sy, renderSize * 0.4, fx, fy, renderSize * 0.45);
                flareGrad.addColorStop(0, '#ef4444');
                flareGrad.addColorStop(0.5, '#f59e0b');
                flareGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = flareGrad;
                ctx.beginPath();
                ctx.arc(fx, fy, renderSize * 0.7, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.restore();

              // Core sun disk
              const sunGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize);
              sunGrad.addColorStop(0, '#ffffff');      // nuclear fusion white core
              sunGrad.addColorStop(0.18, '#fffbeb');   // solar photosphere
              sunGrad.addColorStop(0.55, '#facc15');   // yellow convective shell
              sunGrad.addColorStop(0.85, '#f97316');   // orange chromosphere
              sunGrad.addColorStop(1.0, '#ea580c');    // red transition zone
              ctx.fillStyle = sunGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

             } else if (obj.id === 'dwarf-planet' || obj.id === 'dwarf-pluto') { // Pluto
              // Pale reddish-brown body with the iconic Tombaugh Regio "heart"
              const plutoGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              plutoGrad.addColorStop(0, '#fbcfe8'); // pale peach highlight
              plutoGrad.addColorStop(0.6, '#b45309'); // coppery-red tholins
              plutoGrad.addColorStop(1, '#270c00'); // dark dark brown
              ctx.fillStyle = plutoGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              // Cthulhu Macula (dark, cratered equatorial belt of carbonaceous tholins)
              ctx.fillStyle = '#1e0a00';
              ctx.beginPath();
              ctx.ellipse(sx, sy + renderSize * 0.3, renderSize * 1.1, renderSize * 0.32, Math.PI / 12, 0, Math.PI * 2);
              ctx.fill();

              // Tombaugh Regio - The beautiful bright nitrogen-ice "Heart" shape
              ctx.fillStyle = '#f8fafc'; // glowing white-cream
              const hx = sx + renderSize * 0.15;
              const hy = sy + renderSize * 0.12;
              const hr = renderSize * 0.38;
              ctx.beginPath();
              // Smooth heart-like approximation
              ctx.ellipse(hx - hr * 0.3, hy, hr * 0.4, hr * 0.5, -Math.PI / 6, 0, Math.PI * 2);
              ctx.ellipse(hx + hr * 0.3, hy, hr * 0.4, hr * 0.5, Math.PI / 6, 0, Math.PI * 2);
              ctx.ellipse(hx, hy + hr * 0.2, hr * 0.45, hr * 0.45, 0, 0, Math.PI * 2);
              ctx.fill();

              const plutoShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
              plutoShade.addColorStop(0, 'transparent');
              plutoShade.addColorStop(1, 'rgba(0,0,0,0.92)');
              ctx.fillStyle = plutoShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'dwarf-ceres') {
              // Ceres — dark stony grey with bright white salt spots (Occator crater)
              const ceresGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              ceresGrad.addColorStop(0, '#94a3b8'); // slate grey highlight
              ceresGrad.addColorStop(0.55, '#475569'); // dark slate
              ceresGrad.addColorStop(1, '#0f172a');    // shadow
              ctx.fillStyle = ceresGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              // Dark carbonaceous patches
              ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
              ctx.beginPath();
              ctx.ellipse(sx - renderSize * 0.25, sy - renderSize * 0.15, renderSize * 0.38, renderSize * 0.25, Math.PI / 4, 0, Math.PI * 2);
              ctx.ellipse(sx + renderSize * 0.3, sy + renderSize * 0.2, renderSize * 0.28, renderSize * 0.18, -Math.PI / 6, 0, Math.PI * 2);
              ctx.fill();

              // Craters
              const craters = [
                { x: -0.15, y: -0.1, r: 0.14, spots: true }, // Occator crater with spots!
                { x: 0.3, y: -0.3, r: 0.1, spots: false },
                { x: -0.35, y: 0.35, r: 0.12, spots: false },
                { x: 0.25, y: 0.28, r: 0.08, spots: false }
              ];
              craters.forEach((c) => {
                const cx = sx + c.x * renderSize;
                const cy = sy + c.y * renderSize;
                const cr = c.r * renderSize;

                ctx.strokeStyle = 'rgba(9, 9, 11, 0.55)';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.arc(cx, cy, cr, Math.PI * 1.2, Math.PI * 2.2);
                ctx.stroke();

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.beginPath();
                ctx.arc(cx, cy, cr, Math.PI * 0.2, Math.PI * 1.2);
                ctx.stroke();

                // If Occator, render the ultra-famous highly reflective sodium carbonate salt spots!
                if (c.spots) {
                  ctx.fillStyle = '#ffffff';
                  ctx.shadowColor = '#38bdf8';
                  ctx.shadowBlur = 4;
                  ctx.beginPath();
                  ctx.arc(cx, cy, cr * 0.2, 0, Math.PI * 2); // central main spot (facula)
                  ctx.fill();

                  // Surrounding smaller secondary spots (parasol faculae)
                  for (let s = 0; s < 4; s++) {
                    const sa = s * Math.PI / 2;
                    const sx_spot = cx + Math.cos(sa) * cr * 0.45;
                    const sy_spot = cy + Math.sin(sa) * cr * 0.45;
                    ctx.beginPath();
                    ctx.arc(sx_spot, sy_spot, cr * 0.08, 0, Math.PI * 2);
                    ctx.fill();
                  }
                  ctx.shadowBlur = 0;
                }
              });

              const ceresShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.15, sx, sy, renderSize);
              ceresShade.addColorStop(0, 'transparent');
              ceresShade.addColorStop(1, 'rgba(0,0,0,0.92)');
              ctx.fillStyle = ceresShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'dwarf-haumea') {
              // Haumea — football-shaped rapid rotating ellipsoid with a dark thin ring!
              const time = Date.now() / 2000;
              ctx.save();
              
              // Draw Haumea's dark planetary ring around its equator
              ctx.strokeStyle = 'rgba(148, 163, 184, 0.22)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.ellipse(sx, sy, renderSize * 2.1, renderSize * 0.35, -Math.PI / 12, 0, Math.PI * 2);
              ctx.stroke();

              // Draw football-like elongated ellipsoid shape
              const rotationAngle = -Math.PI / 12; // tilt
              const scaleX = 1.35; // elongated along major axis
              const scaleY = 0.82; // squashed along minor axis
              
              ctx.translate(sx, sy);
              ctx.rotate(rotationAngle);
              ctx.scale(scaleX, scaleY);

              const haumeaGrad = ctx.createRadialGradient(-renderSize * 0.2, -renderSize * 0.2, 0, 0, 0, renderSize);
              haumeaGrad.addColorStop(0, '#f1f5f9');
              haumeaGrad.addColorStop(0.55, '#94a3b8');
              haumeaGrad.addColorStop(1, '#1e293b');
              ctx.fillStyle = haumeaGrad;
              ctx.beginPath();
              ctx.arc(0, 0, renderSize, 0, Math.PI * 2);
              ctx.fill();

              // Icy white surface texture lines (crystalline water ice streaks)
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.ellipse(0, 0, renderSize * 0.85, renderSize * 0.4, 0, 0, Math.PI * 2);
              ctx.stroke();

              const haumeaShade = ctx.createRadialGradient(-renderSize * 0.4, -renderSize * 0.4, renderSize * 0.2, 0, 0, renderSize);
              haumeaShade.addColorStop(0, 'transparent');
              haumeaShade.addColorStop(1, 'rgba(0,0,0,0.85)');
              ctx.fillStyle = haumeaShade;
              ctx.beginPath();
              ctx.arc(0, 0, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.restore();

            } else if (obj.id === 'moon' || obj.category.toLowerCase().includes('moon')) { // Moon Renderers
              const moonId = obj.id.toLowerCase();
              if (moonId === 'moon-luna') {
                // 1. Luna (The Moon) — cratered grey basalt
                const bodyGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
                bodyGrad.addColorStop(0, '#f1f5f9'); // light reflective grey highlight
                bodyGrad.addColorStop(0.55, '#94a3b8'); // mid slate grey
                bodyGrad.addColorStop(1, '#1e293b');    // shadow
                ctx.fillStyle = bodyGrad;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.save();
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.clip();

                // Dark basaltic maria plains (Oceanus Procellarum, Mare Imbrium)
                ctx.fillStyle = 'rgba(71, 85, 105, 0.45)'; // dark basaltic grey
                ctx.beginPath();
                ctx.ellipse(sx - renderSize * 0.3, sy - renderSize * 0.2, renderSize * 0.45, renderSize * 0.3, Math.PI / 4, 0, Math.PI * 2);
                ctx.ellipse(sx + renderSize * 0.25, sy - renderSize * 0.35, renderSize * 0.3, renderSize * 0.2, -Math.PI / 6, 0, Math.PI * 2);
                ctx.ellipse(sx - renderSize * 0.2, sy + renderSize * 0.4, renderSize * 0.38, renderSize * 0.22, Math.PI / 10, 0, Math.PI * 2);
                ctx.fill();

                // Draw craters
                const craters = [
                  { x: -0.4, y: 0.1, r: 0.15, rays: false },
                  { x: 0.3, y: -0.2, r: 0.12, rays: false },
                  { x: 0.1, y: 0.5, r: 0.22, rays: true }, // Tycho crater with huge ray system
                  { x: -0.1, y: -0.5, r: 0.14, rays: false },
                  { x: 0.4, y: 0.3, r: 0.08, rays: false }
                ];
                craters.forEach((c) => {
                  const cx = sx + c.x * renderSize;
                  const cy = sy + c.y * renderSize;
                  const cr = c.r * renderSize;

                  ctx.strokeStyle = 'rgba(15, 23, 42, 0.6)';
                  ctx.lineWidth = 0.5;
                  ctx.beginPath();
                  ctx.arc(cx, cy, cr, Math.PI * 1.2, Math.PI * 2.2);
                  ctx.stroke();

                  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
                  ctx.beginPath();
                  ctx.arc(cx, cy, cr, Math.PI * 0.2, Math.PI * 1.2);
                  ctx.stroke();

                  if (c.rays) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                    ctx.lineWidth = 0.4;
                    for (let rAngle = 0; rAngle < Math.PI * 2; rAngle += Math.PI / 6) {
                      ctx.beginPath();
                      ctx.moveTo(cx + Math.cos(rAngle) * cr, cy + Math.sin(rAngle) * cr);
                      ctx.lineTo(cx + Math.cos(rAngle) * cr * 4, cy + Math.sin(rAngle) * cr * 4);
                      ctx.stroke();
                    }
                  }
                });

                // Moon terminator shade
                const moonShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.15, sx, sy, renderSize);
                moonShade.addColorStop(0, 'transparent');
                moonShade.addColorStop(1, 'rgba(0,0,0,0.92)');
                ctx.fillStyle = moonShade;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

              } else if (moonId === 'moon-titan') {
                // 2. Titan — dense orange-gold organic atmospheric haze
                const atmGrad = ctx.createRadialGradient(sx, sy, renderSize * 0.85, sx, sy, renderSize * 1.35);
                atmGrad.addColorStop(0, 'rgba(245, 158, 11, 0.5)'); // amber-500
                atmGrad.addColorStop(0.5, 'rgba(217, 119, 6, 0.25)'); // amber-600
                atmGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = atmGrad;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize * 1.35, 0, Math.PI * 2);
                ctx.fill();

                const titanGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
                titanGrad.addColorStop(0, '#fef3c7'); // cream highlight
                titanGrad.addColorStop(0.5, '#f59e0b'); // gold clouds
                titanGrad.addColorStop(0.85, '#d97706'); // amber haze
                titanGrad.addColorStop(1, '#451a03'); // deep shadowed brown
                ctx.fillStyle = titanGrad;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.save();
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.clip();

                // Dark hydrocarbon methane/ethane lakes peeking through (Kraken Mare, Ligeia Mare)
                ctx.fillStyle = 'rgba(30, 58, 138, 0.35)'; // dark liquid blue
                ctx.beginPath();
                ctx.ellipse(sx - renderSize * 0.25, sy - renderSize * 0.4, renderSize * 0.35, renderSize * 0.18, Math.PI / 12, 0, Math.PI * 2);
                ctx.ellipse(sx + renderSize * 0.3, sy - renderSize * 0.5, renderSize * 0.25, renderSize * 0.12, -Math.PI / 10, 0, Math.PI * 2);
                ctx.fill();

                // Hazy organic cloud stripes
                ctx.strokeStyle = 'rgba(217, 119, 6, 0.22)';
                ctx.lineWidth = Math.max(1, renderSize * 0.15);
                ctx.beginPath();
                ctx.ellipse(sx, sy - renderSize * 0.15, renderSize * 0.95, renderSize * 0.08, 0, 0, Math.PI * 2);
                ctx.ellipse(sx, sy + renderSize * 0.25, renderSize * 0.95, renderSize * 0.06, 0, 0, Math.PI * 2);
                ctx.stroke();

                const titanShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
                titanShade.addColorStop(0, 'transparent');
                titanShade.addColorStop(1, 'rgba(0,0,0,0.92)');
                ctx.fillStyle = titanShade;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

              } else if (moonId === 'moon-io') {
                // 3. Io — volcanic sulfur-pizza world
                const ioGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
                ioGrad.addColorStop(0, '#fef08a'); // yellow sulfur highlight
                ioGrad.addColorStop(0.5, '#facc15'); // yellow
                ioGrad.addColorStop(0.85, '#ca8a04'); // orange-brown
                ioGrad.addColorStop(1, '#2d1a00'); // dark shadowed core
                ctx.fillStyle = ioGrad;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.save();
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.clip();

                // Red and orange sulfur fields/lava flows
                ctx.fillStyle = 'rgba(239, 68, 68, 0.55)'; // volcanic red
                ctx.beginPath();
                ctx.ellipse(sx - renderSize * 0.2, sy - renderSize * 0.15, renderSize * 0.3, renderSize * 0.18, Math.PI / 4, 0, Math.PI * 2);
                ctx.ellipse(sx + renderSize * 0.45, sy + renderSize * 0.25, renderSize * 0.22, renderSize * 0.15, -Math.PI / 3, 0, Math.PI * 2);
                ctx.ellipse(sx - renderSize * 0.35, sy + renderSize * 0.38, renderSize * 0.28, renderSize * 0.12, Math.PI / 12, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = 'rgba(249, 115, 22, 0.5)'; // vibrant orange
                ctx.beginPath();
                ctx.ellipse(sx + renderSize * 0.1, sy - renderSize * 0.35, renderSize * 0.28, renderSize * 0.14, Math.PI / 6, 0, Math.PI * 2);
                ctx.ellipse(sx - renderSize * 0.1, sy + renderSize * 0.1, renderSize * 0.35, renderSize * 0.25, -Math.PI / 10, 0, Math.PI * 2);
                ctx.fill();

                // Volcanic Calderas / Active vents (Loki Patera, Pele)
                const vents = [
                  { x: -0.15, y: -0.22, r: 0.1, pulse: true },
                  { x: 0.35, y: 0.15, r: 0.08, pulse: false },
                  { x: -0.3, y: 0.3, r: 0.07, pulse: false },
                  { x: 0.05, y: 0.42, r: 0.09, pulse: true }
                ];
                vents.forEach((v) => {
                  const vx = sx + v.x * renderSize;
                  const vy = sy + v.y * renderSize;
                  const vr = v.r * renderSize;

                  // Black vent opening
                  ctx.fillStyle = '#09090b';
                  ctx.beginPath();
                  ctx.arc(vx, vy, vr, 0, Math.PI * 2);
                  ctx.fill();

                  // Glowing orange caldera rim
                  ctx.strokeStyle = v.pulse && Math.sin(Date.now() / 400) > 0 ? '#ef4444' : '#f97316';
                  ctx.lineWidth = 1;
                  ctx.beginPath();
                  ctx.arc(vx, vy, vr, 0, Math.PI * 2);
                  ctx.stroke();
                });

                const ioShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
                ioShade.addColorStop(0, 'transparent');
                ioShade.addColorStop(1, 'rgba(0,0,0,0.92)');
                ctx.fillStyle = ioShade;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

              } else if (moonId === 'moon-enceladus') {
                // 4. Enceladus — pristine ice-white body with south polar geysers
                const encGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
                encGrad.addColorStop(0, '#ffffff'); // pure white reflection
                encGrad.addColorStop(0.55, '#f1f5f9'); // slate grey shadow transition
                encGrad.addColorStop(1, '#94a3b8');    // slate shadowed core
                ctx.fillStyle = encGrad;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.save();
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.clip();

                // Subtle ice cracks in soft greyish blue
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)'; // cyan-400
                ctx.lineWidth = 0.6;
                const cracks = [0.15, -0.45, 0.9, -1.2];
                cracks.forEach((ang) => {
                  ctx.beginPath();
                  ctx.ellipse(sx, sy, renderSize * 0.9, renderSize * 0.6, ang, 0, Math.PI * 2);
                  ctx.stroke();
                });

                // Tiger Stripes (four major fractures at South Pole) in cyan-blue
                ctx.strokeStyle = 'rgba(14, 165, 233, 0.55)'; // sky-500
                ctx.lineWidth = 1;
                for (let t = -2; t <= 2; t++) {
                  if (t === 0) continue;
                  ctx.beginPath();
                  const tx = sx + (t * renderSize * 0.12);
                  const ty = sy + (renderSize * 0.68);
                  ctx.moveTo(tx - renderSize * 0.08, ty);
                  ctx.quadraticCurveTo(tx, ty + renderSize * 0.12, tx + renderSize * 0.08, ty);
                  ctx.stroke();
                }

                // Active south polar water-ice geysers
                ctx.save();
                const plumeGrad = ctx.createLinearGradient(sx, sy + renderSize * 0.8, sx, sy + renderSize * 1.8);
                plumeGrad.addColorStop(0, 'rgba(56, 189, 248, 0.55)'); // bright ice cyan
                plumeGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.3)'); // white spray
                plumeGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = plumeGrad;
                ctx.beginPath();
                ctx.moveTo(sx - renderSize * 0.15, sy + renderSize * 0.82);
                ctx.quadraticCurveTo(sx, sy + renderSize * 0.8, sx + renderSize * 0.15, sy + renderSize * 0.82);
                ctx.lineTo(sx + renderSize * 0.35, sy + renderSize * 1.75);
                ctx.lineTo(sx - renderSize * 0.35, sy + renderSize * 1.75);
                ctx.closePath();
                ctx.fill();
                ctx.restore();

                const encShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
                encShade.addColorStop(0, 'transparent');
                encShade.addColorStop(1, 'rgba(0,0,0,0.85)');
                ctx.fillStyle = encShade;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

              } else if (moonId === 'moon-triton') {
                // 5. Triton — cantaloupe terrain & retrograde captured moon
                const tritonGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
                tritonGrad.addColorStop(0, '#fed7aa'); // pinkish orange ice highlight
                tritonGrad.addColorStop(0.55, '#38bdf8'); // cyan ice
                tritonGrad.addColorStop(1, '#0c4a6e');    // shadow
                ctx.fillStyle = tritonGrad;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.save();
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.clip();

                // Cantaloupe Terrain texture (wrinkles / overlapping cells)
                ctx.strokeStyle = 'rgba(2, 132, 199, 0.22)';
                ctx.lineWidth = 0.8;
                for (let w = 0; w < 6; w++) {
                  ctx.beginPath();
                  ctx.ellipse(sx + (Math.sin(w) * renderSize * 0.25), sy + (Math.cos(w) * renderSize * 0.2), renderSize * 0.45, renderSize * 0.3, w * 1.3, 0, Math.PI * 2);
                  ctx.stroke();
                }

                // Large pinkish-white nitrogen ice cap covering the South Pole
                ctx.fillStyle = 'rgba(255, 228, 230, 0.75)'; // rose-100 ice cap
                ctx.beginPath();
                ctx.arc(sx, sy + renderSize * 0.3, renderSize * 0.88, 0, Math.PI, false);
                ctx.fill();

                // Active cryogenic nitrogen gas plumes erupting from the ice cap
                ctx.strokeStyle = 'rgba(9, 9, 11, 0.45)'; // dark nitrogen soot trail
                ctx.lineWidth = 0.5;
                const geyserSpots = [
                  { x: -0.22, y: 0.45 },
                  { x: 0.32, y: 0.55 }
                ];
                geyserSpots.forEach((spot) => {
                  const gx = sx + spot.x * renderSize;
                  const gy = sy + spot.y * renderSize;
                  ctx.beginPath();
                  ctx.moveTo(gx, gy);
                  ctx.quadraticCurveTo(gx - renderSize * 0.05, gy - renderSize * 0.2, gx - renderSize * 0.28, gy - renderSize * 0.28);
                  ctx.stroke();
                });

                const tritonShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
                tritonShade.addColorStop(0, 'transparent');
                tritonShade.addColorStop(1, 'rgba(0,0,0,0.92)');
                ctx.fillStyle = tritonShade;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

              } else if (moonId === 'moon-charon') {
                // 6. Charon — grey craters with reddish-brown northern Mordor Macula
                const charonGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
                charonGrad.addColorStop(0, '#e2e8f0'); // slate-200
                charonGrad.addColorStop(0.65, '#94a3b8'); // slate-400
                charonGrad.addColorStop(1, '#334155');    // slate-700
                ctx.fillStyle = charonGrad;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.save();
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.clip();

                // Mordor Macula (dark reddish-brown northern pole tholins)
                const poleX = sx;
                const poleY = sy - renderSize * 0.72;
                const poleR = renderSize * 0.65;
                const poleGrad = ctx.createRadialGradient(poleX, poleY, 0, poleX, poleY, poleR);
                poleGrad.addColorStop(0, '#7c2d12'); // orange-900
                poleGrad.addColorStop(0.5, '#451a03'); // brown-900
                poleGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = poleGrad;
                ctx.beginPath();
                ctx.arc(poleX, poleY, poleR, 0, Math.PI * 2);
                ctx.fill();

                // Giant equatorial chasm (Serenity Chasma) splitting the moon
                ctx.strokeStyle = 'rgba(30, 41, 59, 0.55)'; // deep slate grey rift
                ctx.lineWidth = Math.max(1, renderSize * 0.08);
                ctx.beginPath();
                ctx.ellipse(sx, sy, renderSize * 0.95, renderSize * 0.08, Math.PI / 16, 0, Math.PI * 2);
                ctx.stroke();

                // Grey crater pockmarks
                ctx.fillStyle = 'rgba(71, 85, 105, 0.32)';
                ctx.beginPath();
                ctx.arc(sx - renderSize * 0.38, sy + renderSize * 0.28, renderSize * 0.15, 0, Math.PI * 2);
                ctx.arc(sx + renderSize * 0.42, sy + renderSize * 0.35, renderSize * 0.12, 0, Math.PI * 2);
                ctx.fill();

                const charonShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
                charonShade.addColorStop(0, 'transparent');
                charonShade.addColorStop(1, 'rgba(0,0,0,0.9)');
                ctx.fillStyle = charonShade;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

              } else if (moonId === 'moon-ganymede') {
                // 7. Ganymede — massive cratered icy/rocky moon
                const ganyGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
                ganyGrad.addColorStop(0, '#cbd5e1'); // light reflective gray-blue
                ganyGrad.addColorStop(0.55, '#64748b'); // mid slate gray
                ganyGrad.addColorStop(1, '#1e293b');    // shadow
                ctx.fillStyle = ganyGrad;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.save();
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.clip();

                // Darker older terrains (Galileo Regio)
                ctx.fillStyle = 'rgba(51, 65, 85, 0.55)'; // dark rocky grey
                ctx.beginPath();
                ctx.ellipse(sx - renderSize * 0.25, sy - renderSize * 0.3, renderSize * 0.48, renderSize * 0.35, Math.PI / 8, 0, Math.PI * 2);
                ctx.ellipse(sx + renderSize * 0.35, sy + renderSize * 0.1, renderSize * 0.4, renderSize * 0.25, -Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();

                // Bright ice grooves / tectonic faults (Sulci)
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
                ctx.lineWidth = 0.5;
                for (let g = -3; g <= 3; g++) {
                  ctx.beginPath();
                  ctx.ellipse(sx + g * renderSize * 0.15, sy, renderSize * 0.95, renderSize * 0.55, Math.PI / 10, 0, Math.PI * 2);
                  ctx.stroke();
                }

                // Bright impact craters with prominent ice-spikes (Tros)
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(sx - renderSize * 0.1, sy + renderSize * 0.38, renderSize * 0.1, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
                ctx.lineWidth = 0.5;
                for (let rAngle = 0; rAngle < Math.PI * 2; rAngle += Math.PI / 4) {
                  ctx.beginPath();
                  ctx.moveTo(sx - renderSize * 0.1, sy + renderSize * 0.38);
                  ctx.lineTo(sx - renderSize * 0.1 + Math.cos(rAngle) * renderSize * 0.35, sy + renderSize * 0.38 + Math.sin(rAngle) * renderSize * 0.35);
                  ctx.stroke();
                }

                const ganyShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
                ganyShade.addColorStop(0, 'transparent');
                ganyShade.addColorStop(1, 'rgba(0,0,0,0.92)');
                ctx.fillStyle = ganyShade;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

              } else {
                // Europa & generic fallback moon: Icy cyan-white body with cracked fracture lineae
                const bodyGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
                bodyGrad.addColorStop(0, '#ffffff');
                bodyGrad.addColorStop(0.55, '#e0f2fe'); // icy cyan-blue
                bodyGrad.addColorStop(1, '#0f172a');    // shadowed dark core
                ctx.fillStyle = bodyGrad;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();

                ctx.save();
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.clip();

                // Fractures and Lineae - Reddish-brown mineral-rich ice cracks
                ctx.strokeStyle = 'rgba(153, 27, 27, 0.4)'; // copper/salt salts
                ctx.lineWidth = 0.8;
                const crackAngles = [0.2, -0.6, 1.1, -1.4, 0.8];
                crackAngles.forEach((ang) => {
                  ctx.beginPath();
                  ctx.ellipse(sx, sy, renderSize * 0.88, renderSize * 0.52, ang, 0, Math.PI * 2);
                  ctx.stroke();
                });

                // South polar geyser water-ice vapor plume
                ctx.save();
                const plumeGrad = ctx.createLinearGradient(sx, sy + renderSize * 0.8, sx, sy + renderSize * 1.5);
                plumeGrad.addColorStop(0, 'rgba(14, 165, 233, 0.4)'); // sky-500
                plumeGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = plumeGrad;
                ctx.beginPath();
                ctx.moveTo(sx, sy + renderSize * 0.85);
                ctx.lineTo(sx - renderSize * 0.15, sy + renderSize * 1.35);
                ctx.lineTo(sx + renderSize * 0.15, sy + renderSize * 1.35);
                ctx.closePath();
                ctx.fill();
                ctx.restore();

                const moonShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
                moonShade.addColorStop(0, 'transparent');
                moonShade.addColorStop(1, 'rgba(0,0,0,0.9)');
                ctx.fillStyle = moonShade;
                ctx.beginPath();
                ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
              }

            } else if (obj.id === 'rogue-planet') { // PSO J318.5-22
              // Charcoal dark starless body with dynamic hot-glowing convective magma/iron cracks
              const time = Date.now() / 1500;
              const rogueGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              rogueGrad.addColorStop(0, '#450a0a'); // hot deep red core
              rogueGrad.addColorStop(0.75, '#18181b'); // coal gray base
              rogueGrad.addColorStop(1, '#09090b'); // black night
              ctx.fillStyle = rogueGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              // Pulsing iron-rain cloud cracks
              ctx.strokeStyle = `rgba(239, 68, 68, ${0.45 + 0.15 * Math.sin(time)})`; // flashing bright red
              ctx.lineWidth = Math.max(1, renderSize * 0.05);
              for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                const cy_crack = sy + (i - 1) * renderSize * 0.45;
                ctx.ellipse(sx, cy_crack, renderSize * 0.8, renderSize * 0.15, Math.PI / 10 * i, 0, Math.PI * 2);
                ctx.stroke();
              }

              // Subtle thermal infrared atmosphere glow
              const thermAtm = ctx.createRadialGradient(sx, sy, renderSize * 0.9, sx, sy, renderSize * 1.25);
              thermAtm.addColorStop(0, 'rgba(168, 85, 247, 0.18)'); // purple-500
              thermAtm.addColorStop(1, 'transparent');
              ctx.fillStyle = thermAtm;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize * 1.25, 0, Math.PI * 2);
              ctx.fill();

              const rogueShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
              rogueShade.addColorStop(0, 'transparent');
              rogueShade.addColorStop(1, 'rgba(0,0,0,0.96)');
              ctx.fillStyle = rogueShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'brown-dwarf') { // Luhman 16A
              // Incandescent orange-magenta failed star with turbulent storms
              const bdGrad = ctx.createRadialGradient(sx - renderSize * 0.3, sy - renderSize * 0.3, 0, sx, sy, renderSize);
              bdGrad.addColorStop(0, '#fca5a5'); // hot pinkish-red
              bdGrad.addColorStop(0.5, '#ea580c'); // fiery orange
              bdGrad.addColorStop(1, '#2e1005'); // cold soot brown
              ctx.fillStyle = bdGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              ctx.save();
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.clip();

              // Molten silicate iron cloud stripes
              ctx.fillStyle = 'rgba(120, 53, 4, 0.45)';
              ctx.beginPath();
              ctx.ellipse(sx, sy - renderSize * 0.2, renderSize * 1.1, renderSize * 0.14, 0, 0, Math.PI * 2);
              ctx.ellipse(sx, sy + renderSize * 0.3, renderSize * 1.1, renderSize * 0.16, 0, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
              ctx.beginPath();
              ctx.ellipse(sx, sy + renderSize * 0.05, renderSize * 1.1, renderSize * 0.12, 0, 0, Math.PI * 2);
              ctx.fill();

              const bdShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.2, sx, sy, renderSize);
              bdShade.addColorStop(0, 'transparent');
              bdShade.addColorStop(1, 'rgba(0,0,0,0.9)');
              ctx.fillStyle = bdShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();

            } else if (obj.id === 'stellar-remnant') { // Sirius B White Dwarf
              // Intensely bright, tiny, ultra-hot blue-white star
              const wdGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, renderSize);
              wdGrad.addColorStop(0, '#ffffff');      // hyper-dense core
              wdGrad.addColorStop(0.35, '#e0f2fe');   // hot helium skin
              wdGrad.addColorStop(0.75, '#38bdf8');   // blue magnetosphere
              wdGrad.addColorStop(1, 'transparent');
              ctx.fillStyle = wdGrad;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize, 0, Math.PI * 2);
              ctx.fill();

              // Super-intense light diffraction spikes (Sirius B is incredibly energetic)
              ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(sx - renderSize * 2.5, sy); ctx.lineTo(sx + renderSize * 2.5, sy);
              ctx.moveTo(sx, sy - renderSize * 2.5); ctx.lineTo(sx, sy + renderSize * 2.5);
              ctx.stroke();

            } else if (obj.id === 'giant-star') { // Betelgeuse Red Supergiant
              const time = Date.now() / 800;
              // Irregular, convective, non-spherical boiling red supergiant
              ctx.save();
              ctx.fillStyle = '#b91c1c'; // deep red photosphere
              ctx.beginPath();
              const numConvectionPoints = 12;
              for (let i = 0; i < numConvectionPoints; i++) {
                const angle = (i / numConvectionPoints) * Math.PI * 2;
                // dynamic irregular pulsations represent boiling convective granules
                const r = renderSize * (1.0 + 0.12 * Math.sin(angle * 4 + time + i * 1.5));
                const px = sx + Math.cos(angle) * r;
                const py = sy + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
              }
              ctx.closePath();
              ctx.fill();

              // Glowing golden convection cells (hotspots)
              const cellGrad = ctx.createRadialGradient(sx - renderSize * 0.2, sy - renderSize * 0.2, 0, sx - renderSize * 0.2, sy - renderSize * 0.2, renderSize * 0.7);
              cellGrad.addColorStop(0, '#fef08a'); // golden yellow hotspot
              cellGrad.addColorStop(0.55, '#f97316'); // orange
              cellGrad.addColorStop(1, 'transparent');
              ctx.fillStyle = cellGrad;
              ctx.beginPath();
              ctx.arc(sx - renderSize * 0.2, sy - renderSize * 0.2, renderSize * 0.7, 0, Math.PI * 2);
              ctx.fill();

              const cellGrad2 = ctx.createRadialGradient(sx + renderSize * 0.3, sy + renderSize * 0.3, 0, sx + renderSize * 0.3, sy + renderSize * 0.3, renderSize * 0.6);
              cellGrad2.addColorStop(0, '#f97316');
              cellGrad2.addColorStop(1, 'transparent');
              ctx.fillStyle = cellGrad2;
              ctx.beginPath();
              ctx.arc(sx + renderSize * 0.3, sy + renderSize * 0.3, renderSize * 0.6, 0, Math.PI * 2);
              ctx.fill();

              ctx.restore();

            } else if (obj.id === 'asteroid' || obj.id === 'meteoroid' || obj.category.toLowerCase().includes('asteroid') || obj.category.toLowerCase().includes('meteor')) {
              // Hyper-realistic non-spherical craggy 3D-shaded Asteroid / Space Rock (Psyche, Ceres, Vesta)
              const numNodes = 10;
              ctx.save();
              ctx.fillStyle = baseCol; // stony gray basalt
              ctx.beginPath();
              
              // Seeded stable craggy outline
              const seedId = obj.name.length;
              for (let i = 0; i < numNodes; i++) {
                const angle = (i / numNodes) * Math.PI * 2;
                // Deterministic pseudo-randomness based on seedId and angle
                const cragFactor = 0.75 + 0.22 * Math.abs(Math.sin(angle * 3 + seedId * 1.8));
                const r = renderSize * cragFactor;
                const px = sx + Math.cos(angle) * r;
                const py = sy + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
              }
              ctx.closePath();
              ctx.fill();

              // Clip craters and 3D shadows to the craggy outline
              ctx.beginPath();
              for (let i = 0; i < numNodes; i++) {
                const angle = (i / numNodes) * Math.PI * 2;
                const cragFactor = 0.75 + 0.22 * Math.abs(Math.sin(angle * 3 + seedId * 1.8));
                const r = renderSize * cragFactor;
                const px = sx + Math.cos(angle) * r;
                const py = sy + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
              }
              ctx.closePath();
              ctx.clip();

              // Render dark crater pockmarks
              ctx.fillStyle = 'rgba(9, 9, 11, 0.52)';
              const craters = [
                { dx: -0.3, dy: -0.2, r: 0.25 },
                { dx: 0.25, dy: 0.3, r: 0.16 },
                { dx: -0.15, dy: 0.45, r: 0.22 },
                { dx: 0.35, dy: -0.35, r: 0.18 }
              ];
              craters.forEach((c) => {
                const cx = sx + c.dx * renderSize;
                const cy = sy + c.dy * renderSize;
                const cr = c.r * renderSize;
                ctx.beginPath();
                ctx.arc(cx, cy, cr, 0, Math.PI * 2);
                ctx.fill();

                // Bright rim highlight
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.arc(cx, cy, cr, Math.PI * 0.25, Math.PI * 1.25);
                ctx.stroke();
              });

              // Harsh stark 3D rock shadow terminator
              const rockShade = ctx.createRadialGradient(sx - renderSize * 0.4, sy - renderSize * 0.4, renderSize * 0.1, sx, sy, renderSize * 1.15);
              rockShade.addColorStop(0, 'transparent');
              rockShade.addColorStop(0.7, 'rgba(0,0,0,0.3)');
              rockShade.addColorStop(1, 'rgba(0,0,0,0.95)');
              ctx.fillStyle = rockShade;
              ctx.beginPath();
              ctx.arc(sx, sy, renderSize * 1.15, 0, Math.PI * 2);
              ctx.fill();

              ctx.restore();

            } else {
              // Solid standard glowing 3D sphere fallback (uses dynamic gradient with object's colors)
              const grad = ctx.createRadialGradient(sx - renderSize * 0.25, sy - renderSize * 0.25, 0, sx, sy, renderSize);
              grad.addColorStop(0, '#ffffff');
              grad.addColorStop(0.2, baseCol);
              grad.addColorStop(0.75, secCol);
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

  // Zoom In / Out click triggers
  const handleZoomIn = () => {
    setIsAutoOrbit(false);
    targetCameraRef.current.zoom = Math.min(10.0, targetCameraRef.current.zoom * 1.3);
  };

  const handleZoomOut = () => {
    setIsAutoOrbit(false);
    targetCameraRef.current.zoom = Math.max(0.1, targetCameraRef.current.zoom / 1.3);
  };

  // Compact navigation buttons (D-pad / Compass simulation)
  const handleNav = (dir: 'up' | 'down' | 'left' | 'right') => {
    setIsAutoOrbit(false);
    const step = 0.2;
    if (interactionModeRef.current === 'pan') {
      const factor = 40 / cameraRef.current.zoom;
      const cosY = Math.cos(cameraRef.current.yaw);
      const sinY = Math.sin(cameraRef.current.yaw);
      if (dir === 'left') {
        targetCameraRef.current.targetX -= cosY * factor;
        targetCameraRef.current.targetZ -= sinY * factor;
      } else if (dir === 'right') {
        targetCameraRef.current.targetX += cosY * factor;
        targetCameraRef.current.targetZ += sinY * factor;
      } else if (dir === 'up') {
        targetCameraRef.current.targetY -= factor;
      } else if (dir === 'down') {
        targetCameraRef.current.targetY += factor;
      }
    } else {
      if (dir === 'left') targetCameraRef.current.yaw -= step;
      if (dir === 'right') targetCameraRef.current.yaw += step;
      if (dir === 'up') {
        targetCameraRef.current.pitch = Math.max(-Math.PI / 2.2, targetCameraRef.current.pitch - step * 0.5);
      }
      if (dir === 'down') {
        targetCameraRef.current.pitch = Math.min(Math.PI / 2.2, targetCameraRef.current.pitch + step * 0.5);
      }
    }
  };

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
    setIsAutoOrbit(true);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full select-none text-slate-100" id="cosmic-canvas-container">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onContextMenu={(e) => e.preventDefault()}
        className="block w-full h-full cursor-grab active:cursor-grabbing touch-none"
        id="universe-3d-canvas"
      />

      {/* Embedded Navigation Telemetry HUD */}
      <div className="hidden sm:flex absolute top-4 left-4 flex-col gap-2 pointer-events-none max-w-[200px] xs:max-w-xs" id="canvas-overlay-controls">
        <div className="bg-slate-900/85 border border-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl pointer-events-auto shadow-2xl shadow-black/50">
          <p className="text-xs text-slate-200 font-semibold mb-1.5 flex items-center gap-1.5">
            <Orbit className="w-3.5 h-3.5 text-indigo-400" />
            Galactic Telemetry
          </p>
          <div className="flex flex-col gap-1 text-[9px] text-slate-400 font-mono">
            <div>• <span className="text-slate-200 font-medium">Touch/Drag Screen</span>: Orbit View</div>
            <div className="hidden xs:block">• <span className="text-slate-200 font-medium">Pinch screen</span>: Pinch to Zoom</div>
            <div className="hidden xs:block">• <span className="text-slate-200 font-medium">Change Mode</span>: Pan Space Map</div>
            <div>• <span className="text-slate-200 font-medium">Tap Node</span>: fly to specimen</div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="bg-slate-900/85 hover:bg-slate-800 border border-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl pointer-events-auto text-[10px] text-slate-200 font-mono shadow-xl shadow-black/30 text-left transition-all flex items-center justify-between cursor-pointer group active:scale-95"
          id="btn-recenter-view"
        >
          <span className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-180 transition-all duration-300" />
            Recenter Coordinates
          </span>
          <span className="ml-2 font-bold font-sans text-slate-500 group-hover:text-sky-400">⌗</span>
        </button>
      </div>

      {/* Interactive Controls Overlay Bar */}
      <div 
        className="absolute top-4 right-4 flex flex-col sm:flex-row md:flex-col gap-2.5 pointer-events-none items-end" 
        id="instrument-control-panel"
      >
        {/* Active Tool Mode Selector */}
        <div className="bg-slate-900/85 border border-white/10 backdrop-blur-md p-1.5 rounded-xl pointer-events-auto shadow-2xl flex gap-1" id="tool-mode-selector">
          <button
            onClick={() => setInteractionMode('orbit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
              interactionMode === 'orbit'
                ? 'bg-indigo-500/35 text-white border border-indigo-400/30 font-semibold shadow-inner'
                : 'text-slate-400 border border-transparent hover:text-white'
            }`}
            title="Orbit Mode (Drag to rotate camera)"
            id="btn-mode-orbit"
          >
            <Orbit className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden xs:inline">Orbit</span>
          </button>
          <button
            onClick={() => setInteractionMode('pan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer ${
              interactionMode === 'pan'
                ? 'bg-indigo-500/35 text-white border border-indigo-400/30 font-semibold shadow-inner'
                : 'text-slate-400 border border-transparent hover:text-white'
            }`}
            title="Pan Mode (Drag to slide focus)"
            id="btn-mode-pan"
          >
            <Move className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden xs:inline">Pan</span>
          </button>
        </div>

        {/* Action Controls Cluster */}
        <div className="flex gap-2 items-center pointer-events-auto bg-slate-900/85 border border-white/10 backdrop-blur-md p-1.5 rounded-xl shadow-2xl" id="canvas-action-controls">
          {/* Zoom Actions */}
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all cursor-pointer border border-white/5"
            title="Zoom In"
            id="btn-zoom-in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all cursor-pointer border border-white/5"
            title="Zoom Out"
            id="btn-zoom-out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-6 bg-white/10" />

          {/* Cinematic Auto Orbit Action */}
          <button
            onClick={() => setIsAutoOrbit(!isAutoOrbit)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer border ${
              isAutoOrbit
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-md shadow-emerald-500/5'
                : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
            }`}
            title={isAutoOrbit ? "Pause Cinematic Rotation" : "Start Cinematic Rotation"}
            id="btn-auto-orbit"
          >
            {isAutoOrbit ? <Pause className="w-3.5 h-3.5 animate-pulse" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <div className="w-[1px] h-6 bg-white/10" />

          {/* Compact Recenter Coordinates Action for mobile and quick use */}
          <button
            onClick={handleReset}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-all cursor-pointer border border-white/5"
            title="Recenter Coordinates"
            id="btn-recenter-compact"
          >
            <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>

        {/* Directional D-Pad Navigation Console */}
        <div className="hidden md:flex flex-col items-center bg-slate-900/85 border border-white/10 backdrop-blur-md p-2.5 rounded-2xl pointer-events-auto shadow-2xl w-28 animate-fade-in" id="nav-dpad-console">
          <p className="text-[9px] font-mono font-semibold tracking-wider text-slate-500 mb-1.5 uppercase select-none">Tactical D-Pad</p>
          <div className="grid grid-cols-3 grid-rows-3 gap-1.5 items-center justify-center w-20 h-20" id="dpad-grid">
            <div />
            <button
              onClick={() => handleNav('up')}
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-indigo-500/30 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/5 cursor-pointer active:scale-90"
              title="Move Up"
              id="dpad-up"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <div />

            <button
              onClick={() => handleNav('left')}
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-indigo-500/30 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/5 cursor-pointer active:scale-90"
              title="Move Left"
              id="dpad-left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="w-6 h-6 rounded-full border border-dashed border-white/15 flex items-center justify-center text-[8px] text-slate-500 font-mono select-none">
              {interactionMode === 'orbit' ? '🔄' : '🖐️'}
            </div>
            <button
              onClick={() => handleNav('right')}
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-indigo-500/30 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/5 cursor-pointer active:scale-90"
              title="Move Right"
              id="dpad-right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div />
            <button
              onClick={() => handleNav('down')}
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-indigo-500/30 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/5 cursor-pointer active:scale-90"
              title="Move Down"
              id="dpad-down"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div />
          </div>
        </div>
      </div>

      {hoveredObject && (
        <div
          className="absolute bottom-4 right-4 bg-slate-950/85 backdrop-blur-xl px-4 py-2.5 rounded-xl border border-white/15 shadow-2xl pointer-events-none max-w-xs animate-fade-in glow-sky"
          id="hover-tooltip-card"
        >
          <div className="text-[10px] text-sky-400 font-bold tracking-wider uppercase font-mono">{hoveredObject.category}</div>
          <div className="text-sm font-semibold text-white mt-0.5">{hoveredObject.name}</div>
          <div className="text-xs text-slate-400 font-mono mt-1">Distance: {formatKm(hoveredObject.distanceLy)}</div>
          <div className="text-[10px] text-slate-500 mt-2 italic">Click / Tap to fly inside and inspect</div>
        </div>
      )}
    </div>
  );
}
