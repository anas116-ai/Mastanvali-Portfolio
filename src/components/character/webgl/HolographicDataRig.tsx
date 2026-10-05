"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function HolographicDataRig() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const icosahedronRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.45;
      ring1Ref.current.rotation.x = Math.PI * 0.42 + Math.sin(t * 0.8) * 0.05;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.35;
      ring2Ref.current.rotation.y = Math.cos(t * 0.7) * 0.08;
    }

    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.x = t * 0.6;
      icosahedronRef.current.rotation.y = t * 0.8;
      icosahedronRef.current.position.y = 0.05 + Math.sin(t * 1.5) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0.45]}>
      {/* 1. Revolving 3D Wireframe Icosahedron Data Core */}
      <mesh ref={icosahedronRef} scale={0.16}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#FACC15"
          wireframe
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner Glowing Core Sphere */}
      <mesh scale={0.06}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#E2C799"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 2. Primary 3D Orbital Hologram Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI * 0.42, 0, 0]}>
        <ringGeometry args={[0.55, 0.57, 64]} />
        <meshBasicMaterial
          color="#FACC15"
          side={THREE.DoubleSide}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Secondary Outer Orbital Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI * 0.38, 0, 0]}>
        <ringGeometry args={[0.72, 0.735, 64]} />
        <meshBasicMaterial
          color="#E2C799"
          side={THREE.DoubleSide}
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 4. Left-Flanking 3D DAG Data Nodes (Undulating in Left Spatial Volume) */}
      <group position={[-0.85, 0.45, -0.1]}>
        <mesh scale={0.035}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#FACC15" />
        </mesh>
      </group>
      <group position={[-1.15, 0.95, -0.2]}>
        <mesh scale={0.03}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* 5. Right-Flanking 3D DAG Data Nodes (Undulating in Right Spatial Volume) */}
      <group position={[0.85, 0.55, -0.1]}>
        <mesh scale={0.035}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#E2C799" />
        </mesh>
      </group>
      <group position={[1.15, 1.05, -0.2]}>
        <mesh scale={0.03}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#FDE047" />
        </mesh>
      </group>
    </group>
  );
}
