"use client";

import React, { useEffect, useRef } from "react";

interface Mote {
  x: number;
  y: number;
  r: number;
  vy: number;
  phase: number;
  speed: number;
  alpha: number;
  depth: number;
}

interface CausticPool {
  seed: number;
  depth: number;
  size: number;
  speed: number;
  phase: number;
}

interface Shaft {
  x: number;
  width: number;
  drift: number;
  alpha: number;
}

export function WaterFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let time = 0;

    const pointer = { x: 0.5, y: 0.5, active: false };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = motionQuery.matches;
    motionQuery.addEventListener("change", () => {
      reducedMotion.current = motionQuery.matches;
    });

    const resize = () => {
      const host = canvas.parentElement;
      if (!host) return;
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const particleCount = Math.min(55, Math.floor((width * height) / 18000));
    const motes: Mote[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.4 + Math.random() * 1.1,
      vy: 0.015 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
      speed: 0.006 + Math.random() * 0.012,
      alpha: 0.06 + Math.random() * 0.14,
      depth: 0.2 + Math.random() * 0.8,
    }));

    const causticPools: CausticPool[] = Array.from({ length: 13 }, (_, i) => ({
      seed: i * 2.399963,
      depth: 0.25 + ((i * 0.37) % 1) * 0.65,
      size: 0.07 + ((i * 0.53) % 1) * 0.12,
      speed: 0.035 + (i % 3) * 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    const shafts: Shaft[] = Array.from({ length: 4 }, (_, i) => ({
      x: 0.12 + i * 0.24,
      width: 0.05 + Math.random() * 0.035,
      drift: i * 1.7,
      alpha: 0.06 + Math.random() * 0.05,
    }));

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect) return;
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const handleMouseLeave = () => {
      pointer.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible || width === 0 || height === 0) return;

      time += reducedMotion.current ? 0.003 : 0.011;

      const px = pointer.active ? (pointer.x - 0.5) * 10 : 0;
      const py = pointer.active ? (pointer.y - 0.5) * 6 : 0;

      ctx.clearRect(0, 0, width, height);

      /* 1. Deep water volume */
      const body = ctx.createLinearGradient(0, 0, 0, height);
      body.addColorStop(0, "rgba(24,26,30,0.55)");
      body.addColorStop(0.15, "rgba(20,22,26,0.62)");
      body.addColorStop(0.4, "rgba(14,15,18,0.74)");
      body.addColorStop(0.7, "rgba(10,11,13,0.82)");
      body.addColorStop(1, "rgba(8,9,11,0.9)");
      ctx.fillStyle = body;
      ctx.fillRect(0, 0, width, height);

      /* 2. Caustic light pools on the bottom */
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      causticPools.forEach((pool) => {
        const drift = time * pool.speed;
        const cx =
          width * 0.5 +
          Math.sin(pool.seed * 3.7 + drift) * width * 0.44 +
          px * 0.25;
        const cy =
          height * pool.depth +
          Math.cos(pool.seed * 2.3 + drift) * height * 0.07 +
          py * 0.25;
        const rx = width * pool.size * 1.3;
        const ry = rx * (0.35 + Math.sin(pool.seed + time * 0.28) * 0.15);
        const pulse = 0.55 + 0.45 * Math.sin(time * 0.38 + pool.phase);
        const strength = (0.05 + pool.depth * 0.035) * pulse;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
        grad.addColorStop(0, `rgba(214, 226, 235, ${strength})`);
        grad.addColorStop(0.45, `rgba(214, 226, 235, ${strength * 0.45})`);
        grad.addColorStop(1, "rgba(214, 226, 235, 0)");
        grad.addColorStop(1, "rgba(214, 226, 235, 0)");

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, ry / rx);
        ctx.translate(-cx, -cy);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      ctx.restore();

      /* 3. Volumetric light shafts */
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      shafts.forEach((shaft, i) => {
        const xBase = width * shaft.x;
        const drift = Math.sin(time * 0.13 + shaft.drift) * 28 + px * 0.35;
        const x = xBase + drift;
        const w = width * shaft.width;
        const grad = ctx.createLinearGradient(x, 0, x + w * 0.4, height * 0.82);
        grad.addColorStop(0, `rgba(214, 226, 235, ${shaft.alpha})`);
        grad.addColorStop(0.35, `rgba(214, 226, 235, ${shaft.alpha * 0.45})`);
        grad.addColorStop(1, "rgba(214, 226, 235, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x, -10);
        ctx.lineTo(x + w * 0.4, -10);
        ctx.lineTo(x + w * 2.8, height);
        ctx.lineTo(x - w * 0.4, height);
        ctx.closePath();
        ctx.fill();
      });
      ctx.restore();

      /* 4. Soft ambient top glow */
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const ambGrad = ctx.createRadialGradient(
        width * 0.5 + px * 0.3,
        -height * 0.05,
        0,
        width * 0.5 + px * 0.3,
        height * 0.2,
        width * 0.7
      );
      ambGrad.addColorStop(0, "rgba(214, 226, 235, 0.05)");
      ambGrad.addColorStop(1, "rgba(214, 226, 235, 0)");
      ctx.fillStyle = ambGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      /* 5. Meniscus surface line with ripples */
      ctx.save();
      const surfaceGrad = ctx.createLinearGradient(0, 0, 0, 30);
      surfaceGrad.addColorStop(0, "rgba(245, 242, 235, 0.10)");
      surfaceGrad.addColorStop(0.4, "rgba(245, 242, 235, 0.03)");
      surfaceGrad.addColorStop(1, "rgba(245, 242, 235, 0)");
      ctx.fillStyle = surfaceGrad;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      for (let x = -10; x <= width + 10; x += 5) {
        const wave =
          Math.sin(x * 0.022 + time * 0.75) * 2.8 +
          Math.sin(x * 0.008 - time * 0.45) * 4.2 +
          Math.sin(x * 0.045 + time * 1.1) * 1.0;
        ctx.lineTo(x, wave + 1.5);
      }
      ctx.lineTo(width + 10, 0);
      ctx.closePath();
      ctx.fill();

      for (let i = 0; i < 5; i++) {
        const y = 3 + i * 4;
        const alpha = 0.025 - i * 0.004;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const wave =
            Math.sin(x * 0.018 + time * 0.55 + i * 0.7) * 2.0 +
            Math.cos(x * 0.03 - time * 0.35 + i) * 1.6;
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        ctx.strokeStyle = `rgba(245, 242, 235, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();

      /* 6. Floating motes */
      ctx.save();
      motes.forEach((m) => {
        m.y -= m.vy;
        m.x += Math.sin(time + m.phase) * m.speed + (m.depth - 0.5) * 0.25;
        if (m.y < -6) {
          m.y = height + 6;
          m.x = Math.random() * width;
        }
        if (m.x > width) m.x = 0;
        if (m.x < 0) m.x = width;

        const glow = m.r * 2.2;
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, glow);
        grad.addColorStop(0, `rgba(214, 226, 235, ${m.alpha})`);
        grad.addColorStop(1, "rgba(214, 226, 235, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, glow, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 225, 255, ${m.alpha * 1.6})`;
        ctx.fill();
      });
      ctx.restore();

      /* 7. Subtle depth wave overlays */
      ctx.save();
      for (let w = 0; w < 3; w++) {
        const yBase = height * (0.28 + w * 0.2);
        const amp = 3 + w * 1.8;
        const k = (Math.PI * 2) / (width * 0.75);
        const drift = time * (0.05 + w * 0.015);
        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          const y = yBase + Math.sin(x * k + drift + w * 2.1) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(214, 226, 235, ${0.035 - w * 0.007})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();

      /* 8. Soft vignette for depth */
      const vig = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        Math.min(width, height) * 0.35,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.78
      );
      vig.addColorStop(0, "rgba(0, 0, 0, 0)");
      vig.addColorStop(1, "rgba(2, 4, 12, 0.35)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
