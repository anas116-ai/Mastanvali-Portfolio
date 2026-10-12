"use client";

import React, { useEffect, useRef } from "react";

// Microscopic Analog Film Grain SVG (Tactile organic texture, no plastic feel)
const GRAIN_SVG = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.07'/%3E%3C/svg%3E";

export function AmbientBackgroundLayers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight * 0.35;
    let targetX = currentX;
    let targetY = currentY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePhysics = () => {
      // 0.065 damping creates heavy, luxury-car inertia
      currentX += (targetX - currentX) * 0.065;
      currentY += (targetY - currentY) * 0.065;

      const normX = Math.round((currentX / window.innerWidth) * 100);
      const normY = Math.round((currentY / window.innerHeight) * 100);

      // Dual-Spectrum Fluid Key Light: Electric Lemon (#E8FF45) + Emerald Teal (#10B981)
      if (mouseLightRef.current) {
        mouseLightRef.current.style.background = `
          radial-gradient(circle 560px at ${normX}% ${normY}%, rgba(232, 255, 69, 0.055) 0%, rgba(16, 185, 129, 0.025) 45%, transparent 75%)
        `;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none bg-[#070807]"
    >
      {/* 1. Tactile Analog Film Grain (Eliminates flat digital plastic feel) */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-35"
        style={{
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: "180px 180px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* 2. Inertia-Damped Dynamic Light Field (Follows pointer with momentum) */}
      <div
        ref={mouseLightRef}
        className="absolute inset-0 z-[2] will-change-[background]"
        style={{
          background:
            "radial-gradient(circle 560px at 50% 35%, rgba(232, 255, 69, 0.05) 0%, rgba(16, 185, 129, 0.02) 45%, transparent 75%)",
        }}
      />

      {/* 3. Luxury Color Spectrum Architecture - Pure Seamless Organic Washes (NO GRIDS) */}
      {/* Key Accent: Electric Lemon (#E8FF45) locked over the character focal quadrant */}
      <div className="absolute top-[6%] -right-28 w-[720px] h-[720px] blur-[150px] opacity-75 bg-[radial-gradient(circle,rgba(232,255,69,0.09)_0%,transparent_72%)]" />

      {/* Complement Accent: Deep Emerald Teal (#10B981) balancing the left editorial field */}
      <div className="absolute -top-24 -left-28 w-[680px] h-[680px] blur-[160px] opacity-65 bg-[radial-gradient(circle,rgba(16,185,129,0.07)_0%,rgba(6,78,59,0.03)_50%,transparent_75%)]" />

      {/* Harmonic Fill: Warm Champagne Bone (#F4F5EF) grounding the central reading space */}
      <div className="absolute top-[42%] left-[18%] w-[640px] h-[640px] blur-[170px] opacity-50 bg-[radial-gradient(circle,rgba(244,245,239,0.045)_0%,transparent_70%)]" />

      {/* Lower Spectrum: Deep Cyan-Teal pool under experience and interactive pond */}
      <div className="absolute top-[68%] -left-36 w-[800px] h-[800px] blur-[180px] opacity-65 bg-[radial-gradient(circle,rgba(20,184,166,0.065)_0%,rgba(232,255,69,0.03)_55%,transparent_76%)]" />

      {/* Floor Foundation: Subtle warm bone wash framing the lower site boundary */}
      <div className="absolute bottom-10 right-1/4 w-[760px] h-[550px] blur-[160px] opacity-45 bg-[radial-gradient(circle,rgba(244,245,239,0.04)_0%,transparent_75%)]" />
    </div>
  );
}
