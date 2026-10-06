"use client";

import React, { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedY: number;
  speedX: number;
  swayAmplitude: number;
  swayPhase: number;
  glow: number;
}

export function HeroSnowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // 125 delicate, pure white micro-snow particles across full viewport
    const particleCount = 125;
    const flakes: Snowflake[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isForeground = Math.random() > 0.70;
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Delicate micro-particles (0.6px to 1.6px)
        radius: isForeground ? Math.random() * 0.55 + 0.85 : Math.random() * 0.40 + 0.50,
        // Soft luminous presence
        opacity: isForeground ? Math.random() * 0.18 + 0.35 : Math.random() * 0.15 + 0.20,
        speedY: isForeground ? Math.random() * 0.35 + 0.25 : Math.random() * 0.22 + 0.15,
        speedX: (Math.random() - 0.5) * 0.15,
        swayAmplitude: Math.random() * 0.38 + 0.16,
        swayPhase: Math.random() * Math.PI * 2,
        glow: isForeground ? 2.5 : 1.2,
      });
    }

    let time = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = () => {
      if (isVisible) {
        time += 0.015;
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < flakes.length; i++) {
          const flake = flakes[i];

          // Smooth sinusoidal fluttering drift
          flake.y += flake.speedY;
          flake.x += Math.sin(time + flake.swayPhase) * flake.swayAmplitude + flake.speedX;

          // Wrap around seamlessly
          if (flake.y > height) {
            flake.y = -8;
            flake.x = Math.random() * width;
          }
          if (flake.x > width) flake.x = 0;
          if (flake.x < 0) flake.x = width;

          // Brass and bone air motes, lit from the same gallery as the page
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0
            ? `rgba(220,253,60, ${flake.opacity * 0.42})`
            : `rgba(201,200,195${flake.opacity * 0.30})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 w-full overflow-hidden z-10 select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
