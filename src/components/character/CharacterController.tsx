"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { CharacterLighting } from "./CharacterLighting";
import { CharacterShadow } from "./CharacterShadow";
import { CharacterEffects } from "./CharacterEffects";
import { Character3DStage } from "./webgl/Character3DStage";


export interface CharacterProps {
  src?: string;
  alt?: string;
  effectMode?: string;
  className?: string;
}

export function CharacterController({
  src = "/images/avatar/style_01_4k_transparent.png",
  alt = "Mastan Vali - SAP BODS & AI Vibe Coder",
  effectMode = "webgl3d",
  className = "",
}: CharacterProps) {
  // Always render the razor-sharp 4K interactive character with 3D spatial tilt,
  // studio lighting, contact shadow, and floating laptop code emissions!
  return <Character2DFallback src={src} alt={alt} className={className} />;
}

function Character2DFallback({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSpeech, setShowSpeech] = useState(false);
  const [isNearCursor, setIsNearCursor] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  const rotateY = useTransform(springX, [-1, 1], [-12, 12]);
  const rotateX = useTransform(springY, [-1, 1], [8, -8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      mouseX.set(Math.max(-1, Math.min(1, normX)));
      mouseY.set(Math.max(-1, Math.min(1, normY)));
      setIsNearCursor(true);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      setIsNearCursor(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-end select-none cursor-pointer group ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Studio Lighting - Warm Amber & Subtle Platinum (Sky blue toned down) */}
      <CharacterLighting
        accentColor="#F47A18"
        secondaryAccent="#E2E8F0"
        isNearCursor={isNearCursor}
      />

      {/* Ground Contact Shadow */}
      <CharacterShadow
        accentColor="#F47A18"
      />

      {/* Main 4K Avatar with Interactive 3D Spatial Tilt */}
      <motion.div
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 w-full flex justify-center items-end"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        />
      </motion.div>

      {/* Clean stage — no AI spark systems */}
      {/* Clean stage — no glitter spark systems */}

      {/* Clean stage — calm, no floating badge streams */}
      {/* Floating badge streams removed for clean luxury */}
    </div>
  );
}
