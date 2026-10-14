"use client";

import React, { useEffect, useRef } from "react";

// ── Film grain filter ─────────────────────────────────────────────────────────
const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E";

// ── Multi-Color Luxury Spectrum Palette (Lemon, Champagne Gold, Amethyst, Bone White, Emerald, Coral) ──
interface RGBColor {
  r: number;
  g: number;
  b: number;
}

const MULTI_LUXURY_PALETTE: RGBColor[] = [
  { r: 217, g: 255, b: 0   }, // Radiant Lemon (#D9FF00) — signature
  { r: 168, g: 85,  b: 247 }, // Amethyst Violet (#A855F7)
  { r: 16,  g: 185, b: 129 }, // Emerald Jade (#10B981)
  { r: 245, g: 158, b: 11  }, // Warm Champagne Amber (#F59E0B)
  { r: 251, g: 146, b: 60  }, // Sunset Coral (#FB923C)
  { r: 244, g: 63,  b: 94  }, // Electric Rose (#F43F5E)
  { r: 255, g: 255, b: 255 }, // Crisp Starlight White (#FFFFFF)
  { r: 192, g: 132, b: 252 }, // Soft Lilac (#C084FC)
  { r: 52,  g: 211, b: 153 }, // Spring Mint (#34D399)
  { r: 251, g: 191, b: 36  }, // Golden Topaz (#FBBF24)
];

function useDeterministicFlowFieldCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const targetCanvas = canvas;
    const targetCtx = ctx;

    let rafId: number;
    let W = 0;
    let H = 0;

    // Fast 3D Simplex noise for organic deterministic flow field
    const F3 = 1 / 3;
    const G3 = 1 / 6;
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256);
    const perm = new Uint8Array(512);
    const permMod12 = new Uint8Array(512);
    for (let i = 0; i < 512; i++) {
      perm[i] = p[i & 255];
      permMod12[i] = perm[i] % 12;
    }
    const grad3 = [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ];

    function noise3D(x: number, y: number, z: number): number {
      const s = (x + y + z) * F3;
      const i = Math.floor(x + s), j = Math.floor(y + s), k = Math.floor(z + s);
      const t = (i + j + k) * G3;
      const x0 = x - (i - t), y0 = y - (j - t), z0 = z - (k - t);
      let i1, j1, k1, i2, j2, k2;
      if (x0 >= y0) {
        if (y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
        else if (x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
        else               { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
      } else {
        if (y0 < z0)       { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
        else if (x0 < z0)  { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
        else               { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
      }
      const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
      const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
      const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;
      const ii = i & 255, jj = j & 255, kk = k & 255;
      let n0 = 0, n1 = 0, n2 = 0, n3 = 0;
      let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
      if (t0 > 0) {
        t0 *= t0;
        const g0 = grad3[permMod12[ii + perm[jj + perm[kk]]]];
        n0 = t0 * t0 * (g0[0] * x0 + g0[1] * y0 + g0[2] * z0);
      }
      let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
      if (t1 > 0) {
        t1 *= t1;
        const g1 = grad3[permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]]];
        n1 = t1 * t1 * (g1[0] * x1 + g1[1] * y1 + g1[2] * z1);
      }
      let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
      if (t2 > 0) {
        t2 *= t2;
        const g2 = grad3[permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]]];
        n2 = t2 * t2 * (g2[0] * x2 + g2[1] * y2 + g2[2] * z2);
      }
      let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
      if (t3 > 0) {
        t3 *= t3;
        const g3 = grad3[permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]]];
        n3 = t3 * t3 * (g3[0] * x3 + g3[1] * y3 + g3[2] * z3);
      }
      return 32 * (n0 + n1 + n2 + n3);
    }

    // ── Photorealistic Botanical Dandelion Architecture (Ref: User Images 1, 2, 3 & 4) ──
    interface RealisticDandelion {
      xPct: number;
      baseX: number;
      baseY: number;
      height: number;
      headRadius: number;
      curveCtrl: number;
      angle: number;
      velocity: number;
      targetAngle: number;
      stiffness: number;
      damping: number;
      windFreq: number;
      windPhase: number;
      floretCount: number;
      lastReleaseTime: number;
      isPrimary: boolean;
    }

    const dandelions: RealisticDandelion[] = [
      // Primary Macro Hero Dandelion Clock (Lower-Left, matching Image 1)
      {
        xPct: 0.13,
        baseX: 0,
        baseY: 0,
        height: 340,
        headRadius: 62,
        curveCtrl: -28,
        angle: -0.07,
        velocity: 0,
        targetAngle: -0.07,
        stiffness: 0.020,
        damping: 0.92,
        windFreq: 1.10,
        windPhase: 0.8,
        floretCount: 260, // Dense 3D spherical fluff
        lastReleaseTime: 0,
        isPrimary: true,
      },
      // Subtle Atmospheric Companion Dandelion (Lower-Right depth)
      {
        xPct: 0.87,
        baseX: 0,
        baseY: 0,
        height: 260,
        headRadius: 46,
        curveCtrl: 20,
        angle: 0.06,
        velocity: 0,
        targetAngle: 0.06,
        stiffness: 0.026,
        damping: 0.90,
        windFreq: 1.25,
        windPhase: 2.7,
        floretCount: 160,
        lastReleaseTime: 0,
        isPrimary: false,
      },
    ];

    function updateDandelionPositions() {
      for (const d of dandelions) {
        d.baseX = W * d.xPct;
        d.baseY = H + 30;
        d.height = d.isPrimary ? Math.min(360, Math.max(260, H * 0.38)) : Math.min(280, Math.max(190, H * 0.30));
      }
    }

    function resize() {
      W = targetCanvas.width = window.innerWidth;
      H = targetCanvas.height = window.innerHeight;
      updateDandelionPositions();
      targetCtx.clearRect(0, 0, W, H);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Fluid Mouse Vortex Tracking ──────────────────────────────────────────
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
    };

    let mouseTimer: ReturnType<typeof setTimeout>;
    const handleMouseMove = (e: MouseEvent) => {
      mouse.active = true;
      mouse.prevX = mouse.x === -1000 ? e.clientX : mouse.x;
      mouse.prevY = mouse.y === -1000 ? e.clientY : mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      mouse.vx = dx * 0.5 + mouse.vx * 0.5;
      mouse.vy = dy * 0.5 + mouse.vy * 0.5;
      mouse.speed = Math.min(28, Math.hypot(mouse.vx, mouse.vy));

      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        mouse.vx *= 0.5;
        mouse.vy *= 0.5;
        mouse.speed *= 0.5;
      }, 50);
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.speed = 0;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    // Scroll tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity = Math.max(-20, Math.min(20, delta * 0.22));
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── 20% Reduced Count (150 Particles), UNIFORM SIZE & SHAPE FOR ALL PARTICLES ──
    const PARTICLE_COUNT = 150;
    const NOISE_SCALE = 0.0016;
    const UNIFORM_TAIL_LENGTH = 14; // Exactly 14px tail for every single particle
    const UNIFORM_HEAD_RADIUS = 1.35; // Exactly 1.35px head ball for every single particle

    interface UniformCometParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      alpha: number;
      baseAlpha: number;
      color: RGBColor;
      speed: number;
      seed: number;
      depth: number;
    }

    const particles: UniformCometParticle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = MULTI_LUXURY_PALETTE[Math.floor(Math.random() * MULTI_LUXURY_PALETTE.length)];
      const depth = Math.random();
      const baseAlpha = 0.24 + depth * 0.18;

      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0,
        vy: 0,
        angle: 0,
        alpha: baseAlpha,
        baseAlpha,
        color: col,
        speed: 0.38 + Math.random() * 0.48,
        seed: Math.random() * 1000,
        depth,
      });
    }

    // ── High-Fidelity Airborne Dandelion Parachute Seeds (Ref: Images 1, 2, 3 & 4) ──
    interface RealisticAirborneSeed {
      x: number;
      y: number;
      vx: number;
      vy: number;
      stemLength: number;
      umbrellaRadius: number;
      bristleCount: number;
      angle: number;
      swayPhase: number;
      swaySpeed: number;
      alpha: number;
      baseAlpha: number;
      color: RGBColor;
      isPinkTinted: boolean;
      depth: number;
      seedId: number;
      justDetached: boolean;
    }

    const DANDELION_SEED_COUNT = 60;
    const dandelionSeeds: RealisticAirborneSeed[] = [];

    // Color palette: Pure Gossamer Silk White, Luminous Rose Pink (Ref 4), Soft Champagne Gold
    const SEED_COLOR_DEFS: { color: RGBColor; isPink: boolean }[] = [
      { color: { r: 255, g: 255, b: 255 }, isPink: false }, // Pure Gossamer Silk White
      { color: { r: 255, g: 255, b: 255 }, isPink: false },
      { color: { r: 255, g: 248, b: 240 }, isPink: false }, // Soft Cream White
      { color: { r: 250, g: 180, b: 215 }, isPink: true  }, // Ethereal Rose Quartz (Image 4)
      { color: { r: 255, g: 195, b: 228 }, isPink: true  }, // Translucent Skeleton Leaf Pink (Image 4)
      { color: { r: 245, g: 215, b: 135 }, isPink: false }, // Warm Champagne Amber
    ];

    for (let i = 0; i < DANDELION_SEED_COUNT; i++) {
      const entry = SEED_COLOR_DEFS[i % SEED_COLOR_DEFS.length];
      const depth = 0.35 + Math.random() * 0.65;
      const baseAlpha = 0.38 + depth * 0.50;

      dandelionSeeds.push({
        x: Math.random() * (window.innerWidth + 200) - 100,
        y: Math.random() * (window.innerHeight + 200) - 100,
        vx: 0.25 + Math.random() * 0.35,
        vy: -(0.25 + Math.random() * 0.40),
        stemLength: 18 + Math.random() * 10, // Slender botanical beak
        umbrellaRadius: 15 + Math.random() * 8, // Realistic radiating dome
        bristleCount: 22 + Math.floor(Math.random() * 8), // 22-30 delicate silky fibers
        angle: 0.12,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.016 + Math.random() * 0.022,
        alpha: baseAlpha,
        baseAlpha,
        color: entry.color,
        isPinkTinted: entry.isPink,
        depth,
        seedId: i,
        justDetached: false,
      });
    }

    // ── Bioluminescent Fireflies ("Minuguru Purugulu" with organic breathing pulse) ──
    interface Firefly {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulseFreq: number;
      pulsePhase: number;
      baseAlpha: number;
      color: RGBColor;
    }

    const FIREFLY_COUNT = 32;
    const fireflies: Firefly[] = [];
    const FIREFLY_COLORS: RGBColor[] = [
      { r: 245, g: 215, b: 80  }, // Warm Golden Firefly
      { r: 217, g: 255, b: 0   }, // Radiant Lemon Spark
      { r: 250, g: 165, b: 210 }, // Delicate Luminous Pink Glow (Image 4)
      { r: 255, g: 238, b: 160 }, // Sunlight Starlight
    ];

    for (let i = 0; i < FIREFLY_COUNT; i++) {
      fireflies.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        radius: 1.3 + Math.random() * 1.6,
        pulseFreq: 0.020 + Math.random() * 0.035,
        pulsePhase: Math.random() * Math.PI * 2,
        baseAlpha: 0.40 + Math.random() * 0.55,
        color: FIREFLY_COLORS[i % FIREFLY_COLORS.length],
      });
    }

    // ── Bottom Dark Bed & Dew Glitter Sparkles (Ref: Image 4 glitter bed + "rallu rallu ga dark area") ──
    interface BedGlitter {
      x: number;
      y: number;
      radius: number;
      pulseFreq: number;
      pulsePhase: number;
      color: RGBColor;
      alpha: number;
    }
    const BED_GLITTER_COUNT = 45;
    const bedGlitters: BedGlitter[] = [];
    for (let i = 0; i < BED_GLITTER_COUNT; i++) {
      const isPink = Math.random() > 0.40;
      bedGlitters.push({
        x: Math.random() * window.innerWidth,
        y: window.innerHeight - (Math.random() * 75),
        radius: 0.8 + Math.random() * 1.8,
        pulseFreq: 0.018 + Math.random() * 0.040,
        pulsePhase: Math.random() * Math.PI * 2,
        color: isPink ? { r: 255, g: 175, b: 215 } : { r: 217, g: 255, b: 120 },
        alpha: 0.25 + Math.random() * 0.50,
      });
    }

    // ── Cascade Particles (Skill Bursts from Laptop) ─────────────────────────
    interface CascadeComet {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      color: RGBColor;
    }

    const cascadeParticles: CascadeComet[] = [];

    const onSkillBurst = (e: Event) => {
      const ce = e as CustomEvent<{ x: number; y: number }>;
      if (!ce.detail) return;
      const originX = ce.detail.x;
      const originY = ce.detail.y;

      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.42 + Math.random() * 1.4;
        const col = MULTI_LUXURY_PALETTE[Math.floor(Math.random() * MULTI_LUXURY_PALETTE.length)];
        cascadeParticles.push({
          x: originX + (Math.random() - 0.5) * 12,
          y: originY + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed * 0.55,
          vy: Math.abs(Math.sin(angle)) * speed + 0.42,
          alpha: 0.85,
          decay: 0.003 + Math.random() * 0.003,
          color: col,
        });
      }
    };

    window.addEventListener("character-skill-burst", onSkillBurst);

    let time = 0;

    function render() {
      // 100% COMPLETE CANVAS CLEAR EVERY FRAME — GUARANTEES ZERO ACCUMULATED LINES
      targetCtx.clearRect(0, 0, W, H);

      time += 0.0016;
      scrollVelocity *= 0.92;
      mouse.vx *= 0.93;
      mouse.vy *= 0.93;
      mouse.speed *= 0.93;

      const mouseRadius = 220;

      // ── 0. ETHEREAL SUB-SURFACE LIQUID CAUSTICS (User: "water effect mathram realistic ga kanipinchali") ──
      const causticGrad = targetCtx.createLinearGradient(0, H * 0.4, W, H);
      const waveOffset1 = Math.sin(time * 0.8) * 0.015;
      const waveOffset2 = Math.cos(time * 0.6) * 0.018;
      causticGrad.addColorStop(0, "rgba(7, 12, 10, 0)");
      causticGrad.addColorStop(0.65, `rgba(18, 28, 25, ${(0.04 + waveOffset1).toFixed(3)})`);
      causticGrad.addColorStop(0.85, `rgba(32, 18, 30, ${(0.05 + waveOffset2).toFixed(3)})`); // Subtle rose-tinted depth
      causticGrad.addColorStop(1, "rgba(5, 8, 6, 0.45)");
      targetCtx.fillStyle = causticGrad;
      targetCtx.fillRect(0, 0, W, H);

      // ── 1. RENDER UNIFORM MULTI-COLORED COMET PARTICLES (LINE ATTACHED TO HEAD BALL) ──
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];

        // 3D Simplex flow field vector
        const nx = p.x * NOISE_SCALE;
        const ny = p.y * NOISE_SCALE;
        const n1 = noise3D(nx, ny, time + p.seed * 0.0012);
        const n2 = noise3D(nx * 1.8 + 20, ny * 1.8 + 20, time * 0.6) * 0.35;
        const targetAngle = (n1 + n2) * Math.PI * 2.0;

        let targetVx = Math.cos(targetAngle) * p.speed * 0.45;
        let targetVy = Math.sin(targetAngle) * p.speed * 0.45;

        // Scroll reactivity
        targetVy -= scrollVelocity * p.depth * 0.30;

        // Fluid Mouse Vortex Interaction
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius && dist > 1) {
            const proximityFactor = 1 - dist / mouseRadius;

            // Tangential swirl
            const tangentX = -dy / dist;
            const tangentY = dx / dist;
            const swirlStrength = proximityFactor * 2.2 * (1 + mouse.speed * 0.12);

            targetVx += tangentX * swirlStrength;
            targetVy += tangentY * swirlStrength;

            // Kinetic wake transfer
            targetVx += mouse.vx * proximityFactor * 0.28;
            targetVy += mouse.vy * proximityFactor * 0.28;

            // Gentle repulsive push
            const pushFactor = proximityFactor * 0.65;
            targetVx += (dx / dist) * pushFactor;
            targetVy += (dy / dist) * pushFactor;

            // Gentle illumination on proximity
            p.alpha = Math.min(0.85, p.baseAlpha + proximityFactor * 0.45);
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Smooth velocity integration
        p.vx += (targetVx - p.vx) * 0.11;
        p.vy += (targetVy - p.vy) * 0.11;

        p.x += p.vx;
        p.y += p.vy;

        // Smooth orientation angle calculation
        const vMag = Math.hypot(p.vx, p.vy);
        if (vMag > 0.01) {
          p.angle = Math.atan2(p.vy, p.vx);
        }

        // Screen wrap
        const margin = 20;
        if (p.x < -margin) p.x = W + margin;
        if (p.x > W + margin) p.x = -margin;
        if (p.y < -margin) p.y = H + margin;
        if (p.y > H + margin) p.y = -margin;

        // ── UNIFORM COMET TAIL: CLEARLY VISIBLE LINE ATTACHED TO HEAD BALL FOR EVERY PARTICLE ──
        const dirX = Math.cos(p.angle);
        const dirY = Math.sin(p.angle);

        const tailStartX = p.x - dirX * UNIFORM_TAIL_LENGTH;
        const tailStartY = p.y - dirY * UNIFORM_TAIL_LENGTH;

        const tailGrad = targetCtx.createLinearGradient(tailStartX, tailStartY, p.x, p.y);
        tailGrad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        tailGrad.addColorStop(0.35, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${(p.alpha * 0.35).toFixed(3)})`);
        tailGrad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${(p.alpha * 0.85).toFixed(3)})`);

        targetCtx.beginPath();
        targetCtx.moveTo(tailStartX, tailStartY);
        targetCtx.lineTo(p.x, p.y);
        targetCtx.strokeStyle = tailGrad;
        targetCtx.lineWidth = 1.15; // Uniform stroke width for all particles
        targetCtx.lineCap = "round";
        targetCtx.stroke();

        // ── UNIFORM HEAD BALL: GLOWING ROUND BALL ATTACHED AT THE LEADING TIP ──
        targetCtx.beginPath();
        targetCtx.arc(p.x, p.y, UNIFORM_HEAD_RADIUS, 0, Math.PI * 2);
        targetCtx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha.toFixed(3)})`;
        targetCtx.fill();

        // Delicate soft glowing aura around the head ball
        targetCtx.beginPath();
        targetCtx.arc(p.x, p.y, UNIFORM_HEAD_RADIUS * 1.8, 0, Math.PI * 2);
        targetCtx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${(p.alpha * 0.16).toFixed(3)})`;
        targetCtx.fill();
      }

      // ── 2. RENDER FALLING CASCADE COMETS (From Laptop Skill Bursts) ──
      for (let i = cascadeParticles.length - 1; i >= 0; i--) {
        const cp = cascadeParticles[i];

        cp.vy += 0.020;
        cp.vx *= 0.985;
        cp.x += cp.vx;
        cp.y += cp.vy - scrollVelocity * 0.35;
        cp.alpha -= cp.decay;

        if (cp.alpha <= 0 || cp.y > H + 40) {
          cascadeParticles.splice(i, 1);
          continue;
        }

        const cvMag = Math.hypot(cp.vx, cp.vy) || 1;
        const cdirX = cp.vx / cvMag;
        const cdirY = cp.vy / cvMag;
        const ctailLen = 12;
        const ctailStartX = cp.x - cdirX * ctailLen;
        const ctailStartY = cp.y - cdirY * ctailLen;

        const ctailGrad = targetCtx.createLinearGradient(ctailStartX, ctailStartY, cp.x, cp.y);
        ctailGrad.addColorStop(0, `rgba(${cp.color.r}, ${cp.color.g}, ${cp.color.b}, 0)`);
        ctailGrad.addColorStop(1, `rgba(${cp.color.r}, ${cp.color.g}, ${cp.color.b}, ${(cp.alpha * 0.70).toFixed(3)})`);

        targetCtx.beginPath();
        targetCtx.moveTo(ctailStartX, ctailStartY);
        targetCtx.lineTo(cp.x, cp.y);
        targetCtx.strokeStyle = ctailGrad;
        targetCtx.lineWidth = 1.1;
        targetCtx.lineCap = "round";
        targetCtx.stroke();

        targetCtx.beginPath();
        targetCtx.arc(cp.x, cp.y, 1.25, 0, Math.PI * 2);
        targetCtx.fillStyle = `rgba(${cp.color.r}, ${cp.color.g}, ${cp.color.b}, ${cp.alpha.toFixed(3)})`;
        targetCtx.fill();
      }

      // ── 3. RENDER DARK ORGANIC BOTTOM BED & PINK GLITTER DEW (User: "under sea rallu rallu ga" & Image 4) ──
      // Silhouette bedrock with smooth pebble contours
      targetCtx.beginPath();
      targetCtx.moveTo(0, H);
      targetCtx.lineTo(0, H - 42);
      targetCtx.bezierCurveTo(W * 0.15, H - 58, W * 0.35, H - 32, W * 0.55, H - 48);
      targetCtx.bezierCurveTo(W * 0.75, H - 62, W * 0.88, H - 38, W, H - 46);
      targetCtx.lineTo(W, H);
      targetCtx.closePath();
      const bedGrad = targetCtx.createLinearGradient(0, H - 60, 0, H);
      bedGrad.addColorStop(0, "rgba(10, 16, 12, 0.40)");
      bedGrad.addColorStop(0.5, "rgba(8, 12, 9, 0.75)");
      bedGrad.addColorStop(1, "rgba(4, 6, 5, 0.95)");
      targetCtx.fillStyle = bedGrad;
      targetCtx.fill();

      // Glitter bokeh beads along the bed (Ref: Image 4 pink sparkling sand/dew)
      for (let g = 0; g < bedGlitters.length; g++) {
        const bg = bedGlitters[g];
        bg.pulsePhase += bg.pulseFreq;
        const gPulse = Math.pow(Math.sin(bg.pulsePhase), 4);
        const gAlpha = bg.alpha * (0.3 + 0.7 * gPulse);

        targetCtx.beginPath();
        targetCtx.arc(bg.x, bg.y, bg.radius * (0.8 + 0.4 * gPulse), 0, Math.PI * 2);
        targetCtx.fillStyle = `rgba(${bg.color.r}, ${bg.color.g}, ${bg.color.b}, ${gAlpha.toFixed(3)})`;
        targetCtx.fill();
      }

      // ── 4. RENDER MACRO PHOTOREALISTIC DANDELION PUFFBALL CLOCKS (Ref: User Image 1) ──
      const now = performance.now();

      // Dynamic wind gust cycle (Natural breathing wind)
      const windCycle = Math.sin(time * 0.60);
      const isWindActive = windCycle > -0.15;
      const windIntensity = 0.40 + (windCycle + 1) * 0.40;

      for (let dIdx = 0; dIdx < dandelions.length; dIdx++) {
        const d = dandelions[dIdx];

        // Organic biological sway
        const naturalSway = Math.sin(time * d.windFreq + d.windPhase) * 0.038 + Math.cos(time * 0.55) * 0.016;

        // Reactive cursor interaction on stem & flower head
        const estHeadX = d.baseX + Math.sin(d.angle) * d.height + d.curveCtrl * 0.35;
        const estHeadY = d.baseY - Math.cos(d.angle) * d.height;
        const dx = estHeadX - mouse.x;
        const dy = estHeadY - mouse.y;
        const dist = Math.hypot(dx, dy);

        let cursorPush = 0;
        if (mouse.active && dist < 260) {
          const prox = 1 - dist / 260;
          cursorPush = (dx >= 0 ? 1 : -1) * prox * 0.16 + (mouse.vx * 0.007 * prox);

          // Brushing near dandelion crown detaches seeds dynamically!
          if (dist < d.headRadius * 2.2 || (dist < 220 && mouse.speed > 2.0)) {
            if (now - d.lastReleaseTime > 110) {
              d.lastReleaseTime = now;
              const readySeed = dandelionSeeds.find(s => s.y < -30 || s.x > W + 40 || s.y > H + 40);
              if (readySeed) {
                // Eject from the top/windward surface of the dandelion clock
                const releaseAngle = -Math.PI * 0.55 + d.angle + (Math.random() - 0.4) * 1.2;
                readySeed.x = estHeadX + Math.cos(releaseAngle) * d.headRadius * 0.82;
                readySeed.y = estHeadY + Math.sin(releaseAngle) * d.headRadius * 0.82;
                readySeed.vx = 0.8 + Math.random() * 1.4 + mouse.vx * 0.18;
                readySeed.vy = -(1.6 + Math.random() * 1.8 + Math.abs(mouse.vy) * 0.16);
                readySeed.alpha = readySeed.baseAlpha;
                readySeed.justDetached = true;
              }
            }
          }
        }

        // Periodic natural detachment during wind gusts (User: "first image lo paiki lechinattu kanpisthunayo, ala paiki vachi split avuthayi")
        if (isWindActive && now - d.lastReleaseTime > (2400 + dIdx * 1200)) {
          d.lastReleaseTime = now;
          const readySeed = dandelionSeeds.find(s => s.y < -30 || s.x > W + 40 || s.y > H + 40);
          if (readySeed) {
            const releaseAngle = -Math.PI * 0.48 + (Math.random() - 0.5) * 0.75;
            readySeed.x = estHeadX + Math.cos(releaseAngle) * d.headRadius * 0.85;
            readySeed.y = estHeadY + Math.sin(releaseAngle) * d.headRadius * 0.85;
            readySeed.vx = 0.7 + Math.random() * 0.9;
            readySeed.vy = -(1.3 + Math.random() * 1.0);
            readySeed.alpha = readySeed.baseAlpha;
            readySeed.justDetached = true;
          }
        }

        // Spring physics
        const targetAng = d.targetAngle + naturalSway + cursorPush;
        const springForce = (targetAng - d.angle) * d.stiffness;
        d.velocity = (d.velocity + springForce) * d.damping;
        d.angle += d.velocity;

        // Accurate curved stem
        const headX = d.baseX + Math.sin(d.angle) * d.height + d.curveCtrl * 0.35;
        const headY = d.baseY - Math.cos(d.angle) * d.height;
        const ctrlX = (d.baseX + headX) * 0.5 + d.curveCtrl;
        const ctrlY = (d.baseY + headY) * 0.5;

        // 1. Botanical Stem (Rich multilayered organic gradient with natural light rim)
        const stemGrad = targetCtx.createLinearGradient(d.baseX, d.baseY, headX, headY);
        stemGrad.addColorStop(0, "rgba(42, 62, 28, 0.25)");
        stemGrad.addColorStop(0.35, "rgba(82, 120, 42, 0.55)");
        stemGrad.addColorStop(0.80, "rgba(135, 178, 54, 0.72)");
        stemGrad.addColorStop(1, "rgba(205, 245, 60, 0.85)");

        targetCtx.beginPath();
        targetCtx.moveTo(d.baseX, d.baseY);
        targetCtx.quadraticCurveTo(ctrlX, ctrlY, headX, headY);
        targetCtx.strokeStyle = stemGrad;
        targetCtx.lineWidth = d.isPrimary ? 3.8 : 2.6;
        targetCtx.lineCap = "round";
        targetCtx.stroke();

        // 2. Realistic Involucre & Curled Sepal Bracts (Ref: Image 1 - curled green phyllaries below floral head)
        const bractCount = 10;
        for (let b = 0; b < bractCount; b++) {
          const bAngle = d.angle + Math.PI * 0.5 + ((b - (bractCount - 1) / 2) * 0.32);
          const bLen = 16;
          const bTipX = headX + Math.cos(bAngle) * bLen;
          const bTipY = headY + Math.sin(bAngle) * bLen + 5;

          targetCtx.beginPath();
          targetCtx.moveTo(headX, headY + 3);
          targetCtx.quadraticCurveTo(
            headX + Math.cos(bAngle) * bLen * 0.55 + 2,
            headY + 8,
            bTipX,
            bTipY
          );
          targetCtx.strokeStyle = "rgba(105, 148, 48, 0.65)";
          targetCtx.lineWidth = 1.6;
          targetCtx.stroke();
        }

        // 3. Central Receptacle Core (Amber floral cushion with velvety texture)
        const coreGrad = targetCtx.createRadialGradient(headX, headY, 1, headX, headY, 8);
        coreGrad.addColorStop(0, "rgba(215, 155, 55, 0.95)");
        coreGrad.addColorStop(0.7, "rgba(145, 95, 32, 0.90)");
        coreGrad.addColorStop(1, "rgba(70, 48, 18, 0.75)");
        targetCtx.beginPath();
        targetCtx.arc(headX, headY, 7.5, 0, Math.PI * 2);
        targetCtx.fillStyle = coreGrad;
        targetCtx.fill();

        // 4. VOLUMETRIC 3D RADIATING DANDELION PUFFBALL (Ref: Image 1 & 2 - 260 dense florets)
        const floretCount = d.floretCount;
        const puffRadius = d.headRadius;

        for (let layer = 0; layer < 3; layer++) {
          const layerFrac = (layer + 1) / 3;
          const layerAlpha = layer === 0 ? 0.22 : layer === 1 ? 0.42 : 0.75;
          const layerStrokeWidth = layer === 0 ? 0.45 : layer === 1 ? 0.60 : 0.75;

          const startIdx = Math.floor((layer * floretCount) / 3);
          const endIdx = Math.floor(((layer + 1) * floretCount) / 3);

          for (let r = startIdx; r < endIdx; r++) {
            const goldenAngle = r * 2.399963;
            const rNorm = Math.sqrt(r / floretCount);
            const rayLen = puffRadius * (0.65 + 0.35 * rNorm) * (0.92 + ((r * 13) % 17) / 100);

            const rayAngle = goldenAngle + d.angle * 0.30 + Math.sin(time * 2.2 + r) * 0.015;
            const tipX = headX + Math.cos(rayAngle) * rayLen;
            const tipY = headY + Math.sin(rayAngle) * rayLen;

            // Translucent rose-pink highlight on select florets (Image 4 infusion!)
            const isPinkFloret = (r % 7 === 0);

            targetCtx.beginPath();
            targetCtx.moveTo(headX, headY);
            targetCtx.lineTo(tipX, tipY);
            if (isPinkFloret) {
              targetCtx.strokeStyle = `rgba(255, 185, 220, ${(layerAlpha * 0.85).toFixed(3)})`;
            } else {
              targetCtx.strokeStyle = `rgba(255, 255, 255, ${layerAlpha.toFixed(3)})`;
            }
            targetCtx.lineWidth = layerStrokeWidth;
            targetCtx.stroke();

            // Parachute tuft at tip (Ref: Image 1 micro-feathered umbrella with 6-8 micro-hairs)
            const tuftR = (3.5 + 2.5 * layerFrac);
            const tuftBristles = 7;
            for (let b = 0; b < tuftBristles; b++) {
              const bAng = rayAngle + ((b - (tuftBristles - 1) / 2) * 0.32);
              const bx = tipX + Math.cos(bAng) * tuftR;
              const by = tipY + Math.sin(bAng) * tuftR;

              targetCtx.beginPath();
              targetCtx.moveTo(tipX, tipY);
              targetCtx.lineTo(bx, by);
              targetCtx.strokeStyle = isPinkFloret
                ? `rgba(255, 205, 230, ${(layerAlpha * 0.90).toFixed(3)})`
                : `rgba(255, 255, 255, ${(layerAlpha * 0.80).toFixed(3)})`;
              targetCtx.lineWidth = 0.45;
              targetCtx.stroke();
            }

            // Glistening micro-dewdrop tip
            if (layer === 2 || isPinkFloret) {
              targetCtx.beginPath();
              targetCtx.arc(tipX, tipY, 0.80, 0, Math.PI * 2);
              targetCtx.fillStyle = isPinkFloret
                ? "rgba(255, 195, 225, 0.95)"
                : "rgba(255, 255, 255, 0.90)";
              targetCtx.fill();
            }
          }
        }

        // Luminous spherical glow aura around the dandelion puffball (Ref: Image 2 radiance)
        const auraGrad = targetCtx.createRadialGradient(headX, headY, puffRadius * 0.4, headX, headY, puffRadius * 1.25);
        auraGrad.addColorStop(0, "rgba(255, 255, 255, 0.045)");
        auraGrad.addColorStop(0.6, "rgba(255, 215, 235, 0.025)"); // delicate rose tint
        auraGrad.addColorStop(1, "transparent");
        targetCtx.beginPath();
        targetCtx.arc(headX, headY, puffRadius * 1.25, 0, Math.PI * 2);
        targetCtx.fillStyle = auraGrad;
        targetCtx.fill();
      }

      // ── 5. RENDER HIGH-FIDELITY AIRBORNE DANDELION PARACHUTE SEEDS (Ref: Images 1, 2, 3 & 4) ──
      for (let i = 0; i < dandelionSeeds.length; i++) {
        const ds = dandelionSeeds[i];

        ds.swayPhase += ds.swaySpeed;

        // Dynamic aerodynamics:
        // In active wind: lift carries seeds diagonally upward & right.
        // In calm air ("gaali lenappudu"): seeds gently descend downward with air resistance parachute drag!
        let targetWindVx = 0.38 * ds.depth * windIntensity + Math.cos(ds.swayPhase * 0.8) * 0.15;
        let targetWindVy = isWindActive
          ? -(0.42 * ds.depth * windIntensity) + Math.sin(ds.swayPhase) * 0.14
          : 0.22 * ds.depth + Math.sin(ds.swayPhase) * 0.12;

        targetWindVy -= scrollVelocity * ds.depth * 0.45;

        // Realistic Cursor Air Displacement Wake (User: "cursor tho move chesthe relastic ga move avvali")
        if (mouse.active) {
          const mdx = ds.x - mouse.x;
          const mdy = ds.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          const mRadius = 250;

          if (mDist < mRadius && mDist > 1) {
            const mProx = 1 - mDist / mRadius;
            const push = mProx * 2.8;

            targetWindVx += (mdx / mDist) * push + mouse.vx * mProx * 0.50;
            targetWindVy += (mdy / mDist) * push + mouse.vy * mProx * 0.50;

            ds.angle += (mouse.vx * 0.06 - ds.angle) * 0.20;
            ds.alpha = Math.min(0.98, ds.baseAlpha + mProx * 0.40);
          } else {
            ds.alpha += (ds.baseAlpha - ds.alpha) * 0.04;
          }
        } else {
          ds.alpha += (ds.baseAlpha - ds.alpha) * 0.04;
        }

        ds.vx += (targetWindVx - ds.vx) * 0.065;
        ds.vy += (targetWindVy - ds.vy) * 0.065;
        ds.x += ds.vx;
        ds.y += ds.vy;

        // Aerodynamic alignment: the parachute creates top drag, pointing the seed down along relative airflow
        const motionAngle = Math.atan2(ds.vy, ds.vx);
        const naturalTilt = motionAngle + Math.PI * 0.5 + Math.sin(ds.swayPhase) * 0.16;
        ds.angle += (naturalTilt - ds.angle) * 0.08;

        // Screen boundary wrap
        if (ds.y < -60) {
          ds.y = H + 40;
          ds.x = Math.random() * W * 0.75;
          ds.justDetached = false;
        }
        if (ds.y > H + 60) {
          ds.y = -40;
          ds.x = Math.random() * W;
          ds.justDetached = false;
        }
        if (ds.x > W + 70) {
          ds.x = -50;
          ds.y = Math.random() * H;
          ds.justDetached = false;
        }
        if (ds.x < -70) {
          ds.x = W + 50;
          ds.justDetached = false;
        }

        const col = ds.color;
        const stemL = ds.stemLength * ds.depth;
        const umbrellaR = ds.umbrellaRadius * ds.depth;

        // 1. Seed grain at base (elongated achene)
        const seedKernelX = ds.x;
        const seedKernelY = ds.y;

        // 2. Umbrella apex position (above seed grain along angle)
        const apexX = seedKernelX + Math.sin(ds.angle) * stemL;
        const apexY = seedKernelY - Math.cos(ds.angle) * stemL;

        // Slender gossamer beak stalk with slight aerodynamic bend
        const midStalkX = (seedKernelX + apexX) * 0.5 + Math.cos(ds.angle) * 1.5;
        const midStalkY = (seedKernelY + apexY) * 0.5 + Math.sin(ds.angle) * 1.5;

        targetCtx.beginPath();
        targetCtx.moveTo(seedKernelX, seedKernelY);
        targetCtx.quadraticCurveTo(midStalkX, midStalkY, apexX, apexY);
        targetCtx.strokeStyle = ds.isPinkTinted
          ? `rgba(250, 185, 218, ${(ds.alpha * 0.75).toFixed(3)})`
          : `rgba(255, 255, 255, ${(ds.alpha * 0.70).toFixed(3)})`;
        targetCtx.lineWidth = 0.80;
        targetCtx.stroke();

        // Realistic seed grain (tapered dark amber-sepia spindle with fine ridges)
        targetCtx.save();
        targetCtx.translate(seedKernelX, seedKernelY);
        targetCtx.rotate(ds.angle);
        targetCtx.beginPath();
        targetCtx.ellipse(0, 0, 1.2 * ds.depth, 2.8 * ds.depth, 0, 0, Math.PI * 2);
        targetCtx.fillStyle = `rgba(175, 120, 50, ${(ds.alpha * 0.95).toFixed(3)})`;
        targetCtx.fill();
        targetCtx.restore();

        // 3. Gossamer Pappus Canopy (Feathered 3D dome, Ref: Image 3 micro-barbs & gossamer sheen)
        const numBristles = ds.bristleCount;
        const spreadAngle = Math.PI * 0.82;
        const centerAngle = -Math.PI * 0.5 + ds.angle;

        for (let b = 0; b < numBristles; b++) {
          const bFrac = b / (numBristles - 1);
          const bristleAngle = centerAngle - spreadAngle * 0.5 + bFrac * spreadAngle;

          const bristleTipX = apexX + Math.cos(bristleAngle) * umbrellaR;
          const bristleTipY = apexY + Math.sin(bristleAngle) * umbrellaR;

          const curveFrac = Math.sin(bFrac * Math.PI) * 2.2;
          const bCtrlX = (apexX + bristleTipX) * 0.5 - Math.sin(ds.angle) * curveFrac;
          const bCtrlY = (apexY + bristleTipY) * 0.5 + Math.cos(ds.angle) * curveFrac;

          targetCtx.beginPath();
          targetCtx.moveTo(apexX, apexY);
          targetCtx.quadraticCurveTo(bCtrlX, bCtrlY, bristleTipX, bristleTipY);
          targetCtx.strokeStyle = ds.isPinkTinted
            ? `rgba(255, 195, 225, ${(ds.alpha * 0.82).toFixed(3)})`
            : `rgba(255, 255, 255, ${(ds.alpha * 0.78).toFixed(3)})`;
          targetCtx.lineWidth = 0.65;
          targetCtx.stroke();

          // Micro-plumose lateral barbs (Ref: Image 3 microscopic hairs)
          if (b % 2 === 0) {
            const barb1Angle = bristleAngle + 0.32;
            const barb1X = bCtrlX + Math.cos(barb1Angle) * 3.5;
            const barb1Y = bCtrlY + Math.sin(barb1Angle) * 3.5;

            targetCtx.beginPath();
            targetCtx.moveTo(bCtrlX, bCtrlY);
            targetCtx.lineTo(barb1X, barb1Y);
            targetCtx.strokeStyle = ds.isPinkTinted
              ? `rgba(255, 210, 230, ${(ds.alpha * 0.50).toFixed(3)})`
              : `rgba(255, 255, 255, ${(ds.alpha * 0.45).toFixed(3)})`;
            targetCtx.lineWidth = 0.45;
            targetCtx.stroke();
          }

          // Luminous tip dewdrop (Ref 4: sparkling starlight/pink dew)
          targetCtx.beginPath();
          targetCtx.arc(bristleTipX, bristleTipY, 0.85 * ds.depth, 0, Math.PI * 2);
          targetCtx.fillStyle = ds.isPinkTinted
            ? `rgba(255, 205, 230, ${(ds.alpha * 0.95).toFixed(3)})`
            : `rgba(255, 255, 255, ${(ds.alpha * 0.92).toFixed(3)})`;
          targetCtx.fill();
        }

        // Luminous apex hub
        targetCtx.beginPath();
        targetCtx.arc(apexX, apexY, 1.1 * ds.depth, 0, Math.PI * 2);
        targetCtx.fillStyle = ds.isPinkTinted
          ? "rgba(255, 215, 235, 0.95)"
          : `rgba(${col.r}, ${col.g}, ${col.b}, ${(ds.alpha * 0.90).toFixed(3)})`;
        targetCtx.fill();
      }

      // ── 6. RENDER BIOLUMINESCENT FIREFLIES ("Minuguru Purugulu" with breathing pulse) ──
      for (let f = 0; f < fireflies.length; f++) {
        const ff = fireflies[f];
        ff.pulsePhase += ff.pulseFreq;

        const pulse = Math.pow(Math.sin(ff.pulsePhase), 4);
        const currentAlpha = ff.baseAlpha * (0.22 + 0.78 * pulse);

        ff.x += ff.vx + Math.sin(time * 1.2 + f) * 0.18;
        ff.y += ff.vy + Math.cos(time * 0.9 + f) * 0.18;

        if (mouse.active) {
          const fdx = ff.x - mouse.x;
          const fdy = ff.y - mouse.y;
          const fDist = Math.hypot(fdx, fdy);
          if (fDist < 160 && fDist > 1) {
            const fProx = 1 - fDist / 160;
            ff.x += (fdx / fDist) * fProx * 2.0;
            ff.y += (fdy / fDist) * fProx * 2.0;
          }
        }

        if (ff.x < -20) ff.x = W + 20;
        if (ff.x > W + 20) ff.x = -20;
        if (ff.y < -20) ff.y = H + 20;
        if (ff.y > H + 20) ff.y = -20;

        targetCtx.beginPath();
        targetCtx.arc(ff.x, ff.y, ff.radius, 0, Math.PI * 2);
        targetCtx.fillStyle = `rgba(${ff.color.r}, ${ff.color.g}, ${ff.color.b}, ${currentAlpha.toFixed(3)})`;
        targetCtx.fill();

        const haloRadius = ff.radius * 4.8 * (0.7 + pulse * 0.5);
        const haloGrad = targetCtx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, haloRadius);
        haloGrad.addColorStop(0, `rgba(${ff.color.r}, ${ff.color.g}, ${ff.color.b}, ${(currentAlpha * 0.40).toFixed(3)})`);
        haloGrad.addColorStop(1, `rgba(${ff.color.r}, ${ff.color.g}, ${ff.color.b}, 0)`);

        targetCtx.beginPath();
        targetCtx.arc(ff.x, ff.y, haloRadius, 0, Math.PI * 2);
        targetCtx.fillStyle = haloGrad;
        targetCtx.fill();
      }

      rafId = requestAnimationFrame(render);
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) {
      rafId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("character-skill-burst", onSkillBurst);
      clearTimeout(mouseTimer);
      cancelAnimationFrame(rafId);
    };
  }, [canvasRef]);
}

// ── Soft Atmospheric Ambient Depth Pools ─────────────────────────────────────
function AtmosphericDepthPools() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* 1. Neutral smoked starlight wash — top left */}
      <div
        className="absolute -top-32 -left-36 w-[680px] h-[680px] rounded-full blur-[220px]"
        style={{
          background: "radial-gradient(circle, rgba(244, 245, 239, 0.016) 0%, transparent 70%)",
        }}
      />
      {/* 2. Soft Warm Champagne wash — mid right */}
      <div
        className="absolute top-[35%] -right-32 w-[720px] h-[720px] rounded-full blur-[230px]"
        style={{
          background: "radial-gradient(circle, rgba(229, 169, 60, 0.016) 0%, transparent 68%)",
        }}
      />
      {/* 3. Refined Lemon glow — hero stage grounding */}
      <div
        className="absolute top-[8%] right-[10%] w-[560px] h-[560px] rounded-full blur-[200px]"
        style={{
          background: "radial-gradient(circle, rgba(217, 255, 0, 0.030) 0%, transparent 72%)",
        }}
      />
    </div>
  );
}

// ── Inertial Mouse Glow Pool (Subtle Lemon & Neutral Starlight) ───────────────
function useInertialMouseGlow(divRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let rafId: number;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight * 0.35;
    let tx = cx;
    let ty = cy;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    function tick() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const nx = Math.round((cx / window.innerWidth) * 100);
      const ny = Math.round((cy / window.innerHeight) * 100);

      if (divRef.current) {
        divRef.current.style.background = `
          radial-gradient(circle 520px at ${nx}% ${ny}%,
            rgba(244, 245, 239, 0.015) 0%,
            rgba(217, 255, 0, 0.018) 38%,
            transparent 75%
          )
        `;
      }
      rafId = requestAnimationFrame(tick);
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [divRef]);
}

// ── Main Export: AmbientBackgroundLayers ─────────────────────────────────────
export function AmbientBackgroundLayers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  useDeterministicFlowFieldCanvas(canvasRef);
  useInertialMouseGlow(mouseGlowRef);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none bg-[#070807]">
      {/* LAYER 1 — Calm Atmospheric Depth Pools */}
      <AtmosphericDepthPools />

      {/* LAYER 2 — REFINED UNIFORM COMET PARTICLES (MULTI-COLOR, 190 COUNT, UNIFORM LINE+BALL) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2, mixBlendMode: "screen" }}
      />

      {/* LAYER 3 — Inertial Micro Mouse Glow */}
      <div
        ref={mouseGlowRef}
        aria-hidden="true"
        className="absolute inset-0 will-change-[background] pointer-events-none"
        style={{
          zIndex: 3,
          background:
            "radial-gradient(circle 520px at 50% 35%, rgba(244, 245, 239, 0.015) 0%, rgba(217, 255, 0, 0.018) 40%, transparent 75%)",
        }}
      />

      {/* LAYER 4 — Analog Film Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.24] pointer-events-none"
        style={{
          zIndex: 4,
          backgroundImage: `url("${GRAIN_SVG}")`,
          backgroundSize: "180px 180px",
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
