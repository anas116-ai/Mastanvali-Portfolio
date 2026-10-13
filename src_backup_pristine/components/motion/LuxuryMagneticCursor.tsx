"use client";

import { useEffect, useRef, useState } from "react";

export function LuxuryMagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          "button, a, input, select, textarea, [data-interactive], [role='button'], .cursor-pointer"
        );
        setIsHovering(!!interactive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Smooth inertia lerp locked right at the cursor position (no offset drift)
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Precision Micro Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#E8FF45] shadow-[0_0_10px_rgba(232,255,69,0.9)] will-change-transform"
      />

      {/* Luxury Fluid Inertia Ring - stays locked right on the pointer */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 will-change-transform rounded-full transition-all duration-200 ease-out ${
          isHovering
            ? "-ml-5 -mt-5 h-10 w-10 border border-[#E8FF45]/60 bg-[rgba(232,255,69,0.08)] backdrop-blur-[1px] shadow-[0_0_20px_rgba(232,255,69,0.25)] scale-110"
            : "-ml-3.5 -mt-3.5 h-7 w-7 border border-white/20 bg-white/[0.02] shadow-[0_0_12px_rgba(0,0,0,0.5)] scale-100"
        }`}
      />
    </div>
  );
}
