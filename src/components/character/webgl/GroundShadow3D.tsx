"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GroundShadow3DProps {
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

export function GroundShadow3D({ mousePosition }: GroundShadow3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Subtly shift shadow parallax relative to light source
    const targetX = -mousePosition.current.x * 0.03;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, -1.71, -0.02]}>
      {/* 1. STUDIO FLOOR STAGE ILLUMINATION (Creates physical ground contrast) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.02, -0.015, -0.04]}>
        <planeGeometry args={[2.5, 0.90]} />
        <meshBasicMaterial
          transparent
          opacity={0.45}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          map={createWarmFloorPoolTexture(0.30)}
        />
      </mesh>

      {/* 2. HIGH-DENSITY CONTACT OCCLUSION DIRECTLY UNDER LEFT SNEAKER SOLE */}
      <mesh rotation={[-Math.PI / 2, 0, -0.14]} position={[-0.33, 0.028, 0.01]}>
        <planeGeometry args={[0.55, 0.22]} />
        <meshBasicMaterial
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.NormalBlending}
          map={createUltraSoftRadialTexture(0.98, 0.0)}
        />
      </mesh>

      {/* 3. HIGH-DENSITY CONTACT OCCLUSION DIRECTLY UNDER RIGHT SNEAKER SOLE */}
      <mesh rotation={[-Math.PI / 2, 0, 0.08]} position={[0.29, 0.002, -0.02]}>
        <planeGeometry args={[0.58, 0.24]} />
        <meshBasicMaterial
          transparent
          opacity={0.96}
          depthWrite={false}
          blending={THREE.NormalBlending}
          map={createUltraSoftRadialTexture(0.98, 0.0)}
        />
      </mesh>

      {/* 4. TIGHT INTER-SOLE CONTACT SPREAD (Connects feet to ground without floating) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.02, 0.001, -0.02]}>
        <planeGeometry args={[1.2, 0.38]} />
        <meshBasicMaterial
          transparent
          opacity={0.65}
          depthWrite={false}
          blending={THREE.NormalBlending}
          map={createUltraSoftRadialTexture(0.88, 0.0)}
        />
      </mesh>

      {/* 5. SOFT BROAD STUDIO FLOOR AMBIENT OCCLUSION (feathered into the warm obsidian field) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.02, -0.004, -0.04]}>
        <planeGeometry args={[2.2, 0.75]} />
        <meshBasicMaterial
          transparent
          opacity={0.50}
          depthWrite={false}
          blending={THREE.NormalBlending}
          map={createUltraSoftRadialTexture(0.80, 0.0)}
        />
      </mesh>
    </group>
  );
}

// Procedural ultra-soft Gaussian-style radial gradient texture that dissolves 100% seamlessly into dark backgrounds
function createUltraSoftRadialTexture(innerAlpha: number, outerAlpha: number): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    // Smooth cosine-weighted falloff for zero visible hard edges
    gradient.addColorStop(0, `rgba(10,9,8,${innerAlpha})`);
    gradient.addColorStop(0.25, `rgba(12,10,9,${innerAlpha * 0.78})`);
    gradient.addColorStop(0.55, `rgba(12,12,13,${innerAlpha * 0.32})`);
    gradient.addColorStop(0.82, `rgba(16,13,11,${innerAlpha * 0.08})`);
    gradient.addColorStop(1, `rgba(16,13,11,${outerAlpha})`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// Additive warm pool of light on the studio floor, brass fading to nothing.
function createWarmFloorPoolTexture(intensity: number): THREE.CanvasTexture {
  if (typeof document === "undefined") {
    return new THREE.CanvasTexture(null as unknown as HTMLCanvasElement);
  }
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, `rgba(120, 92, 44${intensity})`);
    gradient.addColorStop(0.38, `rgba(96, 70, 34${intensity * 0.55})`);
    gradient.addColorStop(0.72, `rgba(60, 42, 22${intensity * 0.16})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
