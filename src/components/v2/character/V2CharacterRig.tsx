"use client";

import React, { useRef, Suspense, useState, useEffect, Component, type ReactNode } from "react";import { Canvas } from "@react-three/fiber";
import { DepthCharacterMesh } from "@/components/character/webgl/DepthCharacterMesh";
import { GroundShadow3D } from "@/components/character/webgl/GroundShadow3D";
import { VolumetricParticleSystem } from "@/components/character/webgl/VolumetricParticleSystem";
import { LaptopSkillStream } from "@/components/character/LaptopSkillStream";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function webglAvailable(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

class RigBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

interface V2CharacterRigProps {
  className?: string;
}

export function V2CharacterRig({ className = "" }: V2CharacterRigProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [showSpeech, setShowSpeech] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!webglAvailable()) setWebglSupported(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Track normalized mouse coordinates (-1 to 1)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = -(e.clientY - centerY) / (rect.height / 2);

      mousePosition.current.x = Math.max(-1, Math.min(1, normX));
      mousePosition.current.y = Math.max(-1, Math.min(1, normY));
    };

    const handleMouseLeave = () => {
      mousePosition.current.x = 0;
      mousePosition.current.y = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const timer = setTimeout(() => setShowSpeech(true), 1600);
    const hideTimer = setTimeout(() => setShowSpeech(false), 4600);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = () => {
    setShowSpeech(true);
    setTimeout(() => setShowSpeech(false), 2600);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative w-full h-[420px] sm:h-[460px] md:h-[490px] lg:h-[520px] flex items-end justify-center cursor-pointer select-none ${className}`}
    >
      {/* 1. TRUE 3D WEBGL ENGINE */}
      {webglSupported && (
        <>
          {/* Loading skeleton shown while the WebGL scene builds */}
          {!sceneReady && (
            <div className="absolute inset-0 flex items-end justify-center" aria-hidden="true">
              <div className="w-[220px] sm:w-[260px] h-[320px] sm:h-[380px] rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 overflow-hidden">
                <div className="w-full h-full animate-pulse bg-[radial-gradient(circle_at_50%_30%,rgba(244,122,24,0.08),transparent_60%)]" />
              </div>
            </div>
          )}
          <RigBoundary>
            <Canvas
              camera={{ position: [0, -0.02, 5.35], fov: 38 }}
              dpr={isMobile ? 1 : [1, 2]}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
              className="w-full h-full pointer-events-auto"
              onCreated={() => setSceneReady(true)}
            >
            {/* Clean Neutral Studio Lights (Zero artificial color tints on clothing or pants) */}
            <ambientLight intensity={1.05} />
            <directionalLight position={[0, 3.0, 4.0]} intensity={0.85} color="#FFFFFF" />

            <Suspense fallback={null}>
              {/* 3D Depth Displaced Character Mesh */}
              <DepthCharacterMesh
                diffuseSrc="/images/avatar/style_01_4k_transparent.png"
                closedEyesSrc="/images/avatar/style_01_eyes_closed.png"
                depthSrc="/images/avatar/style_01_depth.png"
                normalSrc="/images/avatar/style_01_normal.png"
                mousePosition={mousePosition}
              />

              {/* 3D Ground Contact Shadow Plane directly under the feet */}
              <GroundShadow3D mousePosition={mousePosition} />

              {/* 3D Volumetric Drifting Atmospheric Dust Particles */}
              <VolumetricParticleSystem count={isMobile ? 60 : 150} mousePosition={mousePosition} />
            </Suspense>
          </Canvas>
        </RigBoundary>
        </>
      )}

      {/* Static fallback when WebGL is unavailable or crashes */}
      {!webglSupported && (
        <Image
          src="/images/avatar/style_01_4k_transparent.png"
          alt="Mastan Vali - Haute-Tech Laptop & Code"
          fill
          priority
          className="absolute inset-0 object-contain object-bottom select-none pointer-events-none"
          draggable={false}
          sizes="520px"
        />
      )}



      {/* 2. LAPTOP SKILL STREAM (Streams from laptop to side corridors, bursting at apex without occluding face) */}
      <LaptopSkillStream />

      {/* 3. CONTEXTUAL SPEECH BUBBLE */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.92 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="absolute top-[6%] left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-mono font-semibold text-[#F3F1E8] shadow-xl backdrop-blur-xl whitespace-nowrap z-30 border border-[rgba(244,122,24,0.35)] bg-[#050811]/95 pointer-events-none"
            role="status"
            aria-live="polite"
          >
            Hello! I&apos;m Mastan Vali 👋
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
