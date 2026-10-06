"use client";

import React, { useEffect, useRef } from "react";

export function AmbientBackgroundLayers() {
  const heroGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 32) return;
      lastTime = now;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!heroGlowRef.current) return;
        const x = Math.round((e.clientX / window.innerWidth) * 100);
        const y = Math.round((e.clientY / window.innerHeight) * 100);
        heroGlowRef.current.style.background = `radial-gradient(ellipse 90% 60% at ${x}% ${Math.max(15, y * 0.4)}%, rgba(205,253,2,0.05) 0%, rgba(205,253,2,0.018) 45%, transparent 80%)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none bg-[#0A0A0B]">
      {/* ── 1. Gallery lighting. Five soft sources, no grid, no dot pattern.
             Lemon is the key, bone is the fill, nothing exceeds 0.12 alpha,
             so no source is ever legible as a glow. ── */}

      {/* Directional key light, drifting with the pointer */}
      <div
        ref={heroGlowRef}
        className="absolute top-0 inset-x-0 h-[1500px] will-change-[background]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 24%, rgba(205,253,2,0.075) 0%, rgba(205,253,2,0.032) 42%, transparent 76%)",
        }}
      />

      {/* Fill 1: bone light, upper left. Keeps the field from going monochrome. */}
      <div className="absolute -top-32 -left-32 w-[680px] h-[680px] blur-[140px] opacity-70 bg-[radial-gradient(circle,rgba(245,242,235,0.075)_0%,transparent_70%)]" />

      {/* Fill 2: lemon rim, upper right */}
      <div className="absolute top-[8%] -right-36 w-[640px] h-[640px] blur-[130px] opacity-80 bg-[radial-gradient(circle,rgba(220,253,60,0.11)_0%,transparent_72%)]" />

      {/* Fill 3: deep lemon, over the koi water */}
      <div className="absolute top-[34%] -left-36 w-[720px] h-[720px] blur-[140px] opacity-80 bg-[radial-gradient(circle,rgba(205,253,2,0.09)_0%,rgba(96,94,24,0.05)_44%,transparent_74%)]" />

      {/* Fill 4: bone, over the resume sheet */}
      <div className="absolute top-[56%] -right-32 w-[700px] h-[700px] blur-[140px] opacity-80 bg-[radial-gradient(circle,rgba(201,200,195,0.075)_0%,transparent_72%)]" />

      {/* Fill 5: soft bone wash across the lower field */}
      <div className="absolute bottom-16 left-1/4 w-[820px] h-[650px] blur-[150px] opacity-60 bg-[radial-gradient(circle,rgba(201,200,195,0.055)_0%,transparent_74%)]" />

      {/* ── 2. Framing hairlines, cut edges rather than light beams ── */}
      <div className="absolute inset-y-0 left-6 sm:left-12 lg:left-24 w-px bg-[linear-gradient(to_bottom,transparent,rgba(205,253,2,0.16)_28%,rgba(245,242,235,0.08)_72%,transparent)]" />
      <div className="absolute inset-y-0 right-6 sm:right-12 lg:right-24 w-px bg-[linear-gradient(to_bottom,transparent,rgba(205,253,2,0.16)_28%,rgba(245,242,235,0.08)_72%,transparent)]" />
    </div>
  );
}