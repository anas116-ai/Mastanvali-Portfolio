"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// 3D Vibe Coder Character with Smooth Head-Tracking, Typing Kinetics & Orbiting AI Core
function HumanVibeCoderMesh({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const headGroup = useRef<THREE.Group>(null);
  const leftHand = useRef<THREE.Group>(null);
  const rightHand = useRef<THREE.Group>(null);
  const aiOrb = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 01. Smooth natural head and glasses orientation towards mouse cursor
    if (headGroup.current) {
      headGroup.current.rotation.y = THREE.MathUtils.lerp(
        headGroup.current.rotation.y,
        mouseX * 0.4,
        0.06
      );
      headGroup.current.rotation.x = THREE.MathUtils.lerp(
        headGroup.current.rotation.x,
        -mouseY * 0.25 + 0.08,
        0.06
      );
    }

    // 02. Tactile typing hand animations on mechanical keyboard
    if (leftHand.current && rightHand.current) {
      leftHand.current.position.y = 0.32 + Math.sin(t * 14) * 0.012;
      rightHand.current.position.y = 0.32 + Math.cos(t * 16) * 0.012;
      leftHand.current.rotation.z = -0.3 + Math.sin(t * 12) * 0.02;
      rightHand.current.rotation.z = 0.3 + Math.cos(t * 15) * 0.02;
    }

    // 03. Orbiting AI Companion Drone circling the developer
    if (aiOrb.current) {
      const radius = 1.65;
      aiOrb.current.position.x = Math.cos(t * 1.4) * radius + 1.1;
      aiOrb.current.position.y = Math.sin(t * 2.0) * 0.25 + 1.75;
      aiOrb.current.position.z = Math.sin(t * 1.4) * radius;
      aiOrb.current.rotation.y = t * 1.8;
    }
  });

  return (
    <group position={[0, -0.42, 1.15]}>
      {/* --- DEVELOPER HOODIE & TORSO --- */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.85, 24]} />
        <meshStandardMaterial color="#16161a" roughness={0.65} metalness={0.2} />
      </mesh>

      {/* Modern Hoodie Collar */}
      <mesh position={[0, 0.86, 0]}>
        <torusGeometry args={[0.22, 0.075, 16, 32]} />
        <meshStandardMaterial color="#22222a" roughness={0.6} />
      </mesh>

      {/* --- TYPING ARMS & HANDS --- */}
      {/* Left Arm */}
      <group ref={leftHand} position={[-0.45, 0.34, 0.1]}>
        <mesh rotation={[0.6, 0.18, -0.38]}>
          <capsuleGeometry args={[0.095, 0.48, 8, 16]} />
          <meshStandardMaterial color="#16161a" roughness={0.65} />
        </mesh>
        <mesh position={[0.2, -0.28, -0.42]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#d4a373" roughness={0.45} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightHand} position={[0.45, 0.34, 0.1]}>
        <mesh rotation={[0.6, -0.18, 0.38]}>
          <capsuleGeometry args={[0.095, 0.48, 8, 16]} />
          <meshStandardMaterial color="#16161a" roughness={0.65} />
        </mesh>
        <mesh position={[-0.2, -0.28, -0.42]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial color="#d4a373" roughness={0.45} />
        </mesh>
      </group>

      {/* --- HEAD, HAIR, HEADPHONES & AR GLASSES --- */}
      <group ref={headGroup} position={[0, 1.16, 0]}>
        {/* Head Base */}
        <mesh>
          <sphereGeometry args={[0.27, 24, 24]} />
          <meshStandardMaterial color="#d4a373" roughness={0.35} />
        </mesh>

        {/* Textured Dark Hair */}
        <mesh position={[0, 0.11, -0.03]}>
          <sphereGeometry args={[0.29, 24, 24]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.85} />
        </mesh>

        {/* Studio Over-Ear Headphones */}
        <group>
          {/* Headband */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.18, 0]}>
            <torusGeometry args={[0.29, 0.035, 16, 32, Math.PI]} />
            <meshStandardMaterial color="#14B8A6" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Ear Cups */}
          <mesh position={[-0.29, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.11, 0.11, 0.07, 16]} />
            <meshStandardMaterial color="#18181b" metalness={0.9} />
          </mesh>
          <mesh position={[0.29, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.11, 0.11, 0.07, 16]} />
            <meshStandardMaterial color="#18181b" metalness={0.9} />
          </mesh>
        </group>

        {/* Glowing Cyber/AR Glasses */}
        <mesh position={[0, 0.03, 0.25]}>
          <boxGeometry args={[0.36, 0.09, 0.04]} />
          <meshStandardMaterial
            color="#FACC15"
            emissive="#EAB308"
            emissiveIntensity={1.2}
            transparent
            opacity={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* --- ORBITING AI COMPANION BOT --- */}
      <group ref={aiOrb}>
        <mesh>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial
            color="#E2C799"
            emissive="#E2C799"
            emissiveIntensity={1.6}
            roughness={0.15}
          />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.2, 0.012, 16, 32]} />
          <meshBasicMaterial color="#FACC15" />
        </mesh>
        <pointLight color="#FACC15" intensity={2.2} distance={3.5} />
      </group>
    </group>
  );
}

// Complete 3D Cyber-Workstation Environment
function StudioWorkstation() {
  const { mouse } = useThree();
  const mainScreenRef = useRef<THREE.Mesh>(null);
  const terminalScreenRef = useRef<THREE.Mesh>(null);
  const stardustRef = useRef<THREE.Points>(null);

  // Stardust points in room light beam
  const particlePositions = useMemo(() => {
    const p = new Float32Array(140 * 3);
    for (let i = 0; i < 140; i++) {
      p[i * 3] = (Math.random() - 0.5) * 14;
      p[i * 3 + 1] = Math.random() * 7 - 1;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Subtle screen pulse
    if (mainScreenRef.current) {
      (mainScreenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.8 + Math.sin(t * 3.5) * 0.06;
    }

    if (stardustRef.current) {
      stardustRef.current.rotation.y = t * 0.015;
    }
  });

  return (
    <group position={[0, -0.65, -0.35]}>
      {/* 01. The Developer Character */}
      <HumanVibeCoderMesh mouseX={mouse.x} mouseY={mouse.y} />

      {/* 02. Ergonomic Matte Carbon Desk */}
      <mesh position={[0, 0.14, 0.3]} receiveShadow>
        <boxGeometry args={[5.4, 0.12, 2.3]} />
        <meshStandardMaterial color="#0e0e12" roughness={0.35} metalness={0.8} />
      </mesh>

      {/* 03. Ultrawide Curved Primary Code Screen */}
      <group position={[0, 1.34, -0.28]}>
        <mesh>
          <boxGeometry args={[3.6, 1.7, 0.08]} />
          <meshStandardMaterial color="#09090b" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh ref={mainScreenRef} position={[0, 0, 0.045]}>
          <planeGeometry args={[3.5, 1.6]} />
          <meshStandardMaterial
            color="#040816"
            emissive="#E2C799"
            emissiveIntensity={0.85}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[0, -0.92, 0.2]}>
          <boxGeometry args={[0.8, 0.04, 0.5]} />
          <meshStandardMaterial color="#1a1a20" metalness={0.9} />
        </mesh>
      </group>

      {/* 04. Vertical Secondary Monitor (Multi-Agent System Logs) */}
      <group position={[2.2, 1.44, -0.1]} rotation={[0, -Math.PI / 6, 0]}>
        <mesh>
          <boxGeometry args={[1.15, 1.95, 0.06]} />
          <meshStandardMaterial color="#09090b" metalness={0.9} />
        </mesh>
        <mesh ref={terminalScreenRef} position={[0, 0, 0.035]}>
          <planeGeometry args={[1.1, 1.85]} />
          <meshStandardMaterial
            color="#030712"
            emissive="#FACC15"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 05. RGB Mechanical Keyboard & Wireless Mouse */}
      <group position={[0, 0.24, 0.6]}>
        <mesh>
          <boxGeometry args={[1.4, 0.05, 0.48]} />
          <meshStandardMaterial color="#18181b" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Underglow Strip */}
        <mesh position={[0, -0.01, 0]}>
          <boxGeometry args={[1.44, 0.02, 0.52]} />
          <meshBasicMaterial color="#FACC15" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* 06. Steaming Ceramic Coffee Mug */}
      <group position={[-1.6, 0.34, 0.5]}>
        <mesh>
          <cylinderGeometry args={[0.13, 0.11, 0.3, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
      </group>

      {/* 07. Floating Stardust Particles */}
      <points ref={stardustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#A8B8C4" transparent opacity={0.4} />
      </points>

      {/* Three-Point Studio Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 2.5, 0.8]} intensity={3.5} color="#FACC15" distance={6} />
      <pointLight position={[-2, 1.8, -0.5]} intensity={2.0} color="#E2C799" distance={5} />
      <directionalLight position={[4, 5, 3]} intensity={0.9} color="#ffffff" />
    </group>
  );
}

export function Master3DStudioScene() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#000000]">
      <Canvas
        camera={{ position: [0, 0.88, 4.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        {!prefersReduced && <StudioWorkstation />}
      </Canvas>

      {/* Senior Art-Directed Studio Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(250, 204, 21, 0.06) 0%, transparent 65%), linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.95) 92%)",
        }}
      />
    </div>
  );
}
