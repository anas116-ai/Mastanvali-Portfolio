"use client";

import React, { useEffect, useRef } from "react";

export function AmbientBackgroundLayers() {
  const heroGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 32) return; // 30fps throttle is plenty for subtle ambient background
      lastTime = now;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!heroGlowRef.current) return;
        const x = Math.round((e.clientX / window.innerWidth) * 100);
        const y = Math.round((e.clientY / window.innerHeight) * 100);
        heroGlowRef.current.style.background = `radial-gradient(ellipse 90% 60% at ${x}% ${Math.max(15, y * 0.4)}%, rgba(224, 109, 32, 0.06) 0%, rgba(224, 109, 32, 0.02) 45%, transparent 80%)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none bg-[#07090E]">
      {/* 1. CONTINUOUS LUXURY OBSIDIAN & BURNISHED AMBER AMBIENCE (Zero disjointed pixel breaks) */}
      
      {/* Dynamic Cursor-Responsive Ambient Halo */}
      <div
        ref={heroGlowRef}
        className="absolute top-0 inset-x-0 h-[1400px] will-change-[background]"
        style={{
          background: "radial-gradient(ellipse 90% 60% at 50% 30%, rgba(224, 109, 32, 0.05) 0%, rgba(224, 109, 32, 0.015) 40%, transparent 80%)",
        }}
      />

      {/* Smooth Continuous Ambient Depth across Entire Viewport */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 45% at 65% 30%, rgba(224, 109, 32, 0.025) 0%, transparent 65%), " +
            "radial-gradient(ellipse 80% 45% at 35% 55%, rgba(224, 109, 32, 0.02) 0%, transparent 65%), " +
            "radial-gradient(ellipse 80% 45% at 50% 80%, rgba(224, 109, 32, 0.02) 0%, transparent 70%), " +
            "radial-gradient(ellipse 80% 45% at 50% 98%, rgba(224, 109, 32, 0.015) 0%, transparent 70%)",
        }}
      />

      {/* 2. PRECISION STUDIO FRAMING GUIDES (Slender 1px Vertical Lines on Lateral Borders) */}
      <div className="absolute inset-y-0 left-6 sm:left-12 lg:left-24 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
      <div className="absolute inset-y-0 right-6 sm:right-12 lg:right-24 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
}
