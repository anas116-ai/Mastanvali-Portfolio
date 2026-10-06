"use client";

import React, { useRef, useEffect, useState } from "react";
import { type LucideIcon } from "lucide-react";
import { WaterFlow } from "./WaterFlow";

export interface CapabilityArea {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  points: string[];
  accent: string;
  borderColor: string;
  icon: LucideIcon;
  systemTag: string;
  fishCount: number;
}

interface ZenKoiPondCardProps {
  area: CapabilityArea;
  index: number;
}

interface Koi {
  x: number;
  y: number;
  baseSpeed: number;
  speed: number;
  angle: number;
  targetAngle: number;
  targetX: number;
  targetY: number;
  tailPhase: number;
  tailSpeed: number;
  scaleX: number;
  scaleY: number;
  turnSpeed: number;
  surgePhase: number;
  surgeSpeed: number;
  retarget: number;
  sway: number;
  rippleCooldown: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
  decay: number;
  aspect: number;
}

interface Mote {
  x: number;
  y: number;
  r: number;
  vy: number;
  phase: number;
  speed: number;
  alpha: number;
}

/** Darken a #rrggbb accent and return hex, so alpha digits can be appended. */
const dim = (hex: string, amount: number) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (shift: number) =>
    Math.max(0, Math.round(((n >> shift) & 255) * (1 - amount)))
      .toString(16)
      .padStart(2, "0");
  return `#${ch(16)}${ch(8)}${ch(0)}`;
};

/** 0..255 alpha as a two digit hex pair. */
const a = (v: number) =>
  Math.max(0, Math.min(255, Math.round(v * 255)))
    .toString(16)
    .padStart(2, "0");

export function ZenKoiPondCard({ area, index }: ZenKoiPondCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pointer = useRef({ x: 0, y: 0, active: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointer.current.x = e.clientX - rect.left;
    pointer.current.y = e.clientY - rect.top;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

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

    const torso = new Image();
    torso.src = "/koi_kohaku_torso_v2.png";
    let torsoReady = false;
    torso.onload = () => {
      torsoReady = true;
    };

    const tail = new Image();
    tail.src = "/koi_kohaku_tail_v2.png";
    let tailReady = false;
    tail.onload = () => {
      tailReady = true;
    };

    const dims =
      index === 0
        ? [{ sx: 0.215, sy: 0.15 }]
        : index === 1
        ? [
            { sx: 0.18, sy: 0.126 },
            { sx: 0.155, sy: 0.111 },
          ]
        : [
            { sx: 0.16, sy: 0.115 },
            { sx: 0.142, sy: 0.102 },
            { sx: 0.126, sy: 0.092 },
          ];

    const pickTarget = () => ({
      x: width * 0.09 + Math.random() * width * 0.82,
      y: height * 0.16 + Math.random() * height * 0.7,
    });

    const koi: Koi[] = Array.from({ length: area.fishCount }, (_, i) => {
      const d = dims[i % dims.length];
      const startX = width * (0.14 + (i / Math.max(1, area.fishCount)) * 0.72);
      const startY = height * (0.28 + (i % 2) * 0.4);
      const tg = pickTarget();
      const ang = Math.atan2(tg.y - startY, tg.x - startX);
      return {
        x: startX,
        y: startY,
        baseSpeed: 1.42 + Math.random() * 0.2,
        speed: 1.42,
        angle: ang,
        targetAngle: ang,
        targetX: tg.x,
        targetY: tg.y,
        tailPhase: i * 2.3,
        tailSpeed: 0.15,
        scaleX: d.sx,
        scaleY: d.sy,
        turnSpeed: 0.062,
        surgePhase: Math.random() * Math.PI * 2,
        surgeSpeed: 0.03 + Math.random() * 0.014,
        retarget: 90 + Math.random() * 80,
        sway: 0,
        rippleCooldown: i * 24,
      };
    });

    const ripples: Ripple[] = [
      {
        x: width * 0.5,
        y: height * 0.5,
        radius: 10,
        maxRadius: 180,
        speed: 0.68,
        alpha: 0.3,
        decay: 0.0022,
        aspect: 0.7,
      },
    ];

    const motes: Mote[] = Array.from({ length: 26 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.5 + Math.random() * 1.3,
      vy: 0.06 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.012 + Math.random() * 0.02,
      alpha: 0.1 + Math.random() * 0.22,
    }));

    /* Bubble field: scattered static dots plus a few thin rings, seeded
       once per mount. Fractions, so they survive resize. */
    const bubbles = Array.from({ length: 16 }, (_, i) => ({
      fx: Math.random(),
      fy: Math.random(),
      r: i % 5 === 0 ? 5 + Math.random() * 4 : 0.8 + Math.random() * 1.6,
      ring: i % 5 === 0,
      tw: Math.random() * Math.PI * 2,
      base: 0.08 + Math.random() * 0.06,
    }));

    const accentMid = dim(area.accent, 0.5);
    const accentDeep = dim(area.accent, 0.76);

    let t = 0;
    let lastPointerRipple = 0;
    let visible = true;
    let raf = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    /**
     * Light on the pond floor. Built from soft elliptical pools rather than
     * stroked paths, so the water reads as depth and light instead of as
     * wave lines drawn across the card.
     */
    const drawCaustics = (energy: number) => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const pools = 11;
      for (let p = 0; p < pools; p++) {
        /* Deterministic per pool, so the pattern drifts without reshuffling. */
        const seed = p * 2.399963;
        const drift = t * (0.055 + (p % 3) * 0.016);
        const cx =
          width * (0.5 + Math.sin(seed * 3.7 + drift) * 0.46) +
          Math.sin(t * 0.21 + seed) * width * 0.045;
        const depth = 0.28 + ((p * 0.37) % 1) * 0.6;
        const cy = height * depth;
        const rx = width * (0.13 + ((p * 0.53) % 1) * 0.17);
        const ry = rx * (0.24 + ((p * 0.29) % 1) * 0.16);
        /* Each pool breathes on its own slow cycle. */
        const pulse = 0.55 + 0.45 * Math.sin(t * 0.42 + seed * 2.1);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
        const strength = (0.1 + depth * 0.09) * pulse * energy;
        grad.addColorStop(0, `${accentMid}${a(strength)}`);
        grad.addColorStop(0.45, `${accentDeep}${a(strength * 0.42)}`);
        grad.addColorStop(1, `${accentDeep}00`);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, ry / rx);
        ctx.translate(-cx, -cy);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    };

    /** Raking shafts: the reason the water looks deep rather than painted. */
    const drawShafts = () => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let s = 0; s < 3; s++) {
        const x = width * (0.2 + s * 0.29) + Math.sin(t * 0.16 + s * 2.1) * 34;
        const w = width * (0.09 + s * 0.02);
        const grad = ctx.createLinearGradient(x, 0, x + w * 0.7, height * 0.82);
        grad.addColorStop(0, `${accentMid}${a(0.13)}`);
        grad.addColorStop(0.5, `${accentDeep}${a(0.05)}`);
        grad.addColorStop(1, `${accentDeep}00`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x, -10);
        ctx.lineTo(x + w, -10);
        ctx.lineTo(x + w * 2.1, height);
        ctx.lineTo(x + w * 0.55, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    /* Faint long wave curves drifting across mid-water, reference-style. */
    const drawWaves = () => {
      ctx.save();
      for (let wv = 0; wv < 3; wv++) {
        const yBase = height * (0.3 + wv * 0.22);
        const amp = 6 + wv * 3;
        const k = (Math.PI * 2) / (width * (0.9 - wv * 0.18));
        const drift = t * (0.12 + wv * 0.04);
        ctx.beginPath();
        for (let x = -10; x <= width + 10; x += 10) {
          const y = yBase + Math.sin(x * k + drift + wv * 2.1) * amp;
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(245,242,235,${0.05 - wv * 0.008})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    };

    /* Bubble field and thin static rings. */
    const drawBubbles = () => {
      ctx.save();
      for (const b of bubbles) {
        const x = b.fx * width;
        const y = b.fy * height;
        const tw = 0.75 + 0.25 * Math.sin(t * 0.8 + b.tw);
        if (b.ring) {
          ctx.beginPath();
          ctx.arc(x, y, b.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(245,242,235,${0.1 * tw})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,242,235,${b.base * tw})`;
          ctx.fill();
        }
      }
      ctx.restore();
    };

    /* Edge falloff so the pond closes into the dark like the reference. */
    const drawVignette = () => {
      const vig = ctx.createRadialGradient(
        width / 2, height * 0.45, Math.min(width, height) * 0.35,
        width / 2, height * 0.5, Math.max(width, height) * 0.75
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(2,3,6,0.42)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);
    };

    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible || width === 0 || height === 0) return;

      t += 0.016;
      const energy = pointer.current.active ? 1.35 : 1;

      ctx.clearRect(0, 0, width, height);

      /* 1. Volume. Translucent neutral water — the section depth shows
         through the pond like the reference. No blue cast. */
      const body = ctx.createLinearGradient(0, 0, 0, height);
      body.addColorStop(0, "rgba(20,20,22,0.28)");
      body.addColorStop(0.03, "rgba(17,17,19,0.45)");
      body.addColorStop(0.34, "rgba(13,13,15,0.55)");
      body.addColorStop(0.7, "rgba(9,9,11,0.8)");
      body.addColorStop(1, "rgba(5,5,7,0.9)");
      ctx.fillStyle = body;
      ctx.fillRect(0, 0, width, height);

      /* 2. Caustics, drifting. */
      ctx.save();
      ctx.translate(0, -Math.sin(t * 0.5) * 4);
      drawCaustics(energy);
      ctx.restore();

      /* 3. Light shafts. */
      drawShafts();

      /* 3b. Faint wave curves. */
      drawWaves();

      /* 4. Ripples: dark trough beneath a bright crest. */
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += rp.speed * energy;
        rp.alpha -= rp.decay;
        if (rp.alpha <= 0 || rp.radius >= rp.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        const rx = rp.radius;
        const ry = rp.radius * rp.aspect;

        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y + 1.6, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${rp.alpha * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245,242,235, ${rp.alpha * 0.7})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        if (rx > 26) {
          ctx.beginPath();
          ctx.ellipse(rp.x, rp.y, rx - 18, ry - 12, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(245,242,235, ${rp.alpha * 0.26})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      /* 5. The pointer touches the surface. */
      if (pointer.current.active && t - lastPointerRipple > 0.45) {
        lastPointerRipple = t;
        ripples.push({
          x: pointer.current.x,
          y: pointer.current.y,
          radius: 5,
          maxRadius: 110,
          speed: 0.62,
          alpha: 0.34,
          decay: 0.003,
          aspect: 0.72,
        });
      }

      /* 6. Silt hanging in the light. */
      for (const m of motes) {
        m.y -= m.vy;
        m.phase += m.speed;
        if (m.y < -4) {
          m.y = height + 4;
          m.x = Math.random() * width;
        }
        const x = m.x + Math.sin(m.phase) * 6;
        ctx.beginPath();
        ctx.arc(x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,242,235, ${m.alpha})`;
        ctx.fill();
      }

      /* 6b. Bubble field and static rings. */
      drawBubbles();

      /* 7. Koi. */
      koi.forEach((f, fi) => {
        f.retarget -= 1;
        if (Math.hypot(f.targetX - f.x, f.targetY - f.y) < 42 || f.retarget <= 0) {
          const tg = pickTarget();
          f.targetX = tg.x;
          f.targetY = tg.y;
          f.retarget = 170 + Math.random() * 150;
        }

        let sx = f.targetX - f.x;
        let sy = f.targetY - f.y;

        const mx = width * 0.05;
        const my = height * 0.08;
        if (f.x < mx) sx += (mx - f.x) * 3.6;
        if (f.x > width - mx) sx -= (f.x - (width - mx)) * 3.6;
        if (f.y < my) sy += (my - f.y) * 3.6;
        if (f.y > height - my) sy -= (f.y - (height - my)) * 3.6;

        koi.forEach((o, oi) => {
          if (oi === fi) return;
          const dx = f.x - o.x;
          const dy = f.y - o.y;
          const d = Math.hypot(dx, dy);
          if (d < 56 && d > 1) {
            sx += (dx / d) * 44;
            sy += (dy / d) * 44;
          }
        });

        if (pointer.current.active) {
          const dx = f.x - pointer.current.x;
          const dy = f.y - pointer.current.y;
          const d = Math.hypot(dx, dy);
          if (d < 86 && d > 1) {
            sx += (dx / d) * 88;
            sy += (dy / d) * 88;
          }
        }

        f.targetAngle = Math.atan2(sy, sx);
        let diff = f.targetAngle - f.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        f.angle += diff * f.turnSpeed;

        f.surgePhase += f.surgeSpeed;
        const surge = Math.max(0, Math.sin(f.surgePhase));
        f.speed = f.baseSpeed * (0.84 + surge * 0.44);
        f.tailSpeed = 0.14 + surge * 0.1;

        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed;

        f.tailPhase += f.tailSpeed;
        f.sway = Math.sin(f.tailPhase) * 0.065;

        f.rippleCooldown += 1;
        if (surge > 0.82 && f.rippleCooldown > 56 && ripples.length < 7) {
          f.rippleCooldown = 0;
          ripples.push({
            x: f.x - Math.cos(f.angle) * f.scaleX * 100,
            y: f.y - Math.sin(f.angle) * f.scaleX * 100,
            radius: 6,
            maxRadius: 100 + Math.random() * 30,
            speed: 0.68,
            alpha: 0.26,
            decay: 0.0028,
            aspect: 0.74,
          });
        }

        // Cast shadow, sitting on the pond floor behind the fish
        ctx.save();
        ctx.translate(f.x + 9, f.y + 13);
        ctx.rotate(f.angle + f.sway);
        ctx.scale(f.scaleX * 0.95, f.scaleY * 0.8);
        ctx.beginPath();
        ctx.ellipse(0, 0, 98, 24, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(3,4,7,0.34)";
        ctx.filter = "blur(6px)";
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.angle + f.sway);
        ctx.scale(f.scaleX, f.scaleY);

        if (torsoReady && tailReady && torso.complete && tail.complete) {
          const w = 322;
          const h = 169;
          ctx.drawImage(torso, -161, -h * 0.5, w, h);

          const flex = Math.sin(f.tailPhase - 0.4) * 0.16;
          ctx.save();
          ctx.translate(-16, 0);
          ctx.rotate(flex);
          ctx.drawImage(tail, -145, -h * 0.5, w, h);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.ellipse(0, 0, 50, 14, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#B4591F";
          ctx.fill();
        }

        ctx.beginPath();
        ctx.ellipse(18, -3, 40, 6, -0.09, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245,242,235,0.18)";
        ctx.fill();

        ctx.restore();
      });

      /* 8. Meniscus: the surface itself has to be visible. */
      const top = ctx.createLinearGradient(0, 0, 0, 26);
      top.addColorStop(0, "rgba(245,242,235,0.14)");
      top.addColorStop(1, "rgba(245,242,235,0)");
      ctx.fillStyle = top;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= width; x += 8) {
        ctx.lineTo(x, Math.sin(x * 0.035 + t * 0.9) * 2.2 + Math.sin(x * 0.011 - t * 0.5) * 3.4);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();

      /* 9. Edge falloff. */
      drawVignette();
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [area.accent, area.fishCount, index]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => {
        setIsHovered(true);
        pointer.current.active = true;
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        pointer.current.active = false;
      }}
      className="group relative rounded-[18px] overflow-hidden flex flex-col justify-between h-full min-h-[500px] sm:min-h-[540px] select-none transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:-translate-y-1.5"
      style={{
        border: `1px solid ${isHovered ? "rgba(245,242,235,0.28)" : "rgba(245,242,235,0.12)"}`,
        background: "linear-gradient(180deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.028) 34%, rgba(10,12,16,0.55) 100%)",
        backdropFilter: "blur(22px) saturate(1.25)",
        WebkitBackdropFilter: "blur(22px) saturate(1.25)",
        boxShadow: isHovered
          ? "0 24px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)"
          : "0 12px 40px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.09)",
      }}
    >
      {/* Realistic clear-cut flowing water bed */}
      <WaterFlow />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Light falls from above onto the plate */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(184deg, ${dim(area.accent, 0.72)}1F 0%, transparent 34%, transparent 72%, rgba(0,0,0,0.4) 100%)`,
        }}
      />

      {/* Cut corner, top right: a machined plate, not a soft card */}
      <div
        className="absolute top-0 right-0 w-9 h-9 pointer-events-none"
        style={{
          background: `linear-gradient(225deg, ${dim(area.accent, 0.3)}24 0%, ${dim(
            area.accent,
            0.3
          )}24 49.5%, transparent 50%)`,
        }}
      />

      <div className="relative z-20 p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <span
                className="font-mono text-[26px] sm:text-[30px] font-light leading-none tracking-[0.02em]"
                style={{ color: area.accent }}
              >
                {area.num}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8C8C86]">
                {area.systemTag}
              </span>
            </div>
            <area.icon
              size={18}
              className="shrink-0 opacity-90"
              style={{ color: area.accent }}
            />
          </div>

          <div className="space-y-2 pt-1">
            <h3 className="stylish-header text-[19px] sm:text-[22px] text-[#F5F2EB] leading-[1.12]">
              {area.title}
            </h3>
            <div
              className="font-[family-name:var(--font-geist-sans)] text-[13px] font-normal tracking-[-0.005em]"
              style={{ color: area.accent }}
            >
              {area.subtitle}
            </div>
            <p className="font-[family-name:var(--font-geist-sans)] text-[13px] text-[#8C8C86] leading-[1.68] pt-1.5">
              {area.desc}
            </p>
          </div>
        </div>

        <ul className="pt-5 border-t border-[rgba(245,242,235,0.09)] space-y-2.5 mt-auto">
          {area.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 font-[family-name:var(--font-geist-sans)] text-[12.5px] text-[#C9C8C3] leading-[1.6]"
            >
              <span
                className="mt-[7px] h-px w-3 shrink-0"
                style={{ backgroundColor: area.accent, opacity: 0.7 }}
                aria-hidden="true"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
