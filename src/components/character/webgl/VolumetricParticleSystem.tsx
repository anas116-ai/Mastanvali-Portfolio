"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface VolumetricParticlesProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

export function VolumetricParticleSystem({
  count = 160,
  mousePosition,
}: VolumetricParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

// Generate 3D Particle Cloud
  const [positions, colors, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#EDEC6B"), // brass dust
      new THREE.Color("#B4B23A"), // bronze mote
      new THREE.Color("#D2D041"), // burnished copper
      new THREE.Color("#E4E24A"), // burnished gold
      new THREE.Color("#C9C8C3"), // bone
    ];

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      // True 3D depth: half in front of character (z: +0.22 to +0.95), half behind (z: -0.22 to -1.3)
      const isForeground = i % 2 === 0;
      const z = isForeground 
        ? 0.22 + Math.random() * 0.75 
        : -(0.22 + Math.random() * 1.2);

      // Start particles concentrated around sneaker soles/legs up to hip area
      // y: -1.7 (shoes) to -0.2 (hips/waist)
      const isLegStream = Math.random() < 0.60;
      let y = isLegStream ? -1.7 + Math.random() * 1.4 : (Math.random() - 0.45) * 4.2;
      
      // Near legs/hips, keep x narrower (around legs: -0.7 to +0.7). As y rises, particles fan out sideways!
      const spreadFactor = 0.55 + (y + 1.7) * 0.65; // widens as it ascends
      let x = (Math.random() - 0.5) * 2.0 * spreadFactor;

      // Safe clearance around the face in the foreground
      if (isForeground && Math.abs(x) < 0.75 && y > 0.5 && y < 1.7) {
        x = x >= 0 ? 0.85 + Math.random() * 1.2 : -(0.85 + Math.random() * 1.2);
      }

      pos[idx] = x;
      pos[idx + 1] = y;
      pos[idx + 2] = z;

      // Authentic ambient dust colors
      const color = palette[Math.floor(Math.random() * palette.length)];
      col[idx] = color.r;
      col[idx + 1] = color.g;
      col[idx + 2] = color.b;

      // Upward continuous velocity rising up from legs towards hip and beyond
      spd[idx] = (Math.random() - 0.5) * 0.005;
      spd[idx + 1] = Math.random() * 0.006 + 0.003; // steady gentle upward drift
      spd[idx + 2] = (Math.random() - 0.5) * 0.003;
    }

    return [pos, col, spd];
  }, [count]);

  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.25, "rgba(255,255,255,0.85)");
    grad.addColorStop(0.65, "rgba(255,255,255,0.25)");
    grad.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    // Continuous rising physics from sneaker soles/legs up to hip and fanning out
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      posArray[idx + 1] += speeds[idx + 1]; // float upwards

      // As particle rises past hip level, fan outwards sideways
      if (posArray[idx + 1] > -0.3) {
        posArray[idx] += (posArray[idx] >= 0 ? 0.0025 : -0.0025);
      }

      // Reset when particle floats off top
      if (posArray[idx + 1] > 2.8) {
        posArray[idx + 1] = -1.75;
        posArray[idx] = (Math.random() - 0.5) * 1.3; // back near legs
      }
    }
    posAttr.needsUpdate = true;

    // Smooth subtle orbital sway
    pointsRef.current.rotation.y = time * 0.018 + mousePosition.current.x * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.062}
        vertexColors
        transparent
        opacity={0.85}
        map={particleTexture || undefined}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}
