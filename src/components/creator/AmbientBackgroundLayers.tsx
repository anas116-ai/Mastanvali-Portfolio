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

    // ── Living Botanical Dandelion Plants & Foliage Meadow ───────────────────
    interface BotanicalPlant {
      xPct: number;
      heightPct: number;
      headRadius: number;
      type: "puffball" | "yellow_flower" | "leaf";
      baseX: number;
      baseY: number;
      height: number;
      curveCtrl: number;
      angle: number;
      velocity: number;
      targetAngle: number;
      stiffness: number;
      damping: number;
      windFreq: number;
      windPhase: number;
      rayCount: number;
      lastRelease: number;
    }

    const botanicalPlants: BotanicalPlant[] = [
      // Left side botanical grove
      { xPct: 0.04, heightPct: 0.22, headRadius: 0,  type: "leaf",          baseX: 0, baseY: 0, height: 0, curveCtrl: -20, angle: -0.15, velocity: 0, targetAngle: -0.15, stiffness: 0.035, damping: 0.88, windFreq: 1.1, windPhase: 0.2, rayCount: 0,  lastRelease: 0 },
      { xPct: 0.09, heightPct: 0.32, headRadius: 44, type: "puffball",      baseX: 0, baseY: 0, height: 0, curveCtrl: -15, angle: -0.08, velocity: 0, targetAngle: -0.08, stiffness: 0.028, damping: 0.89, windFreq: 1.3, windPhase: 1.4, rayCount: 46, lastRelease: 0 },
      { xPct: 0.15, heightPct: 0.24, headRadius: 26, type: "yellow_flower", baseX: 0, baseY: 0, height: 0, curveCtrl: 10,  angle: 0.05,  velocity: 0, targetAngle: 0.05,  stiffness: 0.040, damping: 0.87, windFreq: 1.5, windPhase: 2.1, rayCount: 32, lastRelease: 0 },
      { xPct: 0.22, heightPct: 0.28, headRadius: 36, type: "puffball",      baseX: 0, baseY: 0, height: 0, curveCtrl: 18,  angle: 0.12,  velocity: 0, targetAngle: 0.12,  stiffness: 0.032, damping: 0.90, windFreq: 1.2, windPhase: 3.5, rayCount: 38, lastRelease: 0 },
      { xPct: 0.28, heightPct: 0.18, headRadius: 0,  type: "leaf",          baseX: 0, baseY: 0, height: 0, curveCtrl: 24,  angle: 0.22,  velocity: 0, targetAngle: 0.22,  stiffness: 0.042, damping: 0.86, windFreq: 1.4, windPhase: 4.8, rayCount: 0,  lastRelease: 0 },

      // Right side botanical grove (framing the stage behind character)
      { xPct: 0.73, heightPct: 0.29, headRadius: 38, type: "puffball",      baseX: 0, baseY: 0, height: 0, curveCtrl: -18, angle: -0.10, velocity: 0, targetAngle: -0.10, stiffness: 0.030, damping: 0.89, windFreq: 1.25, windPhase: 0.9, rayCount: 40, lastRelease: 0 },
      { xPct: 0.81, heightPct: 0.23, headRadius: 28, type: "yellow_flower", baseX: 0, baseY: 0, height: 0, curveCtrl: -8,  angle: -0.04, velocity: 0, targetAngle: -0.04, stiffness: 0.038, damping: 0.88, windFreq: 1.45, windPhase: 2.7, rayCount: 34, lastRelease: 0 },
      { xPct: 0.88, heightPct: 0.33, headRadius: 42, type: "puffball",      baseX: 0, baseY: 0, height: 0, curveCtrl: 12,  angle: 0.06,  velocity: 0, targetAngle: 0.06,  stiffness: 0.026, damping: 0.91, windFreq: 1.15, windPhase: 4.1, rayCount: 44, lastRelease: 0 },
      { xPct: 0.95, heightPct: 0.21, headRadius: 0,  type: "leaf",          baseX: 0, baseY: 0, height: 0, curveCtrl: 22,  angle: 0.18,  velocity: 0, targetAngle: 0.18,  stiffness: 0.045, damping: 0.85, windFreq: 1.35, windPhase: 5.6, rayCount: 0,  lastRelease: 0 },
    ];

    function updatePlantPositions() {
      for (const p of botanicalPlants) {
        p.baseX = W * p.xPct;
        p.baseY = H + 25;
        p.height = Math.max(160, H * p.heightPct);
      }
    }

    function resize() {
      W = targetCanvas.width = window.innerWidth;
      H = targetCanvas.height = window.innerHeight;
      updatePlantPositions();
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

    // ── Dandelion Airborne Parachute Seeds (Pappus) ─────────────────────────
    interface DandelionParachuteSeed {
      x: number;
      y: number;
      vx: number;
      vy: number;
      stemLength: number;
      umbrellaRadius: number;
      bristleCount: number;
      angle: number;
      baseAngle: number;
      swayPhase: number;
      swaySpeed: number;
      alpha: number;
      baseAlpha: number;
      color: RGBColor;
      depth: number;
      seedId: number;
    }

    const DANDELION_SEED_COUNT = 48;
    const dandelionSeeds: DandelionParachuteSeed[] = [];

    const DANDELION_PALETTE: RGBColor[] = [
      { r: 255, g: 255, b: 255 }, // Crisp Starlight White (#FFFFFF)
      { r: 245, g: 200, b: 110 }, // Warm Champagne Gold (#F5C86E)
      { r: 217, g: 255, b: 0   }, // Radiant Lemon (#D9FF00)
      { r: 254, g: 215, b: 170 }, // Pale Luminous Peach (#FED7AA)
      { r: 251, g: 191, b: 36  }, // Topaz Amber (#FBBF24)
    ];

    for (let i = 0; i < DANDELION_SEED_COUNT; i++) {
      const col = DANDELION_PALETTE[i % DANDELION_PALETTE.length];
      const depth = 0.35 + Math.random() * 0.65;
      const baseAlpha = 0.30 + depth * 0.45;

      dandelionSeeds.push({
        x: Math.random() * (window.innerWidth + 200) - 100,
        y: Math.random() * (window.innerHeight + 200) - 100,
        vx: 0.18 + Math.random() * 0.32,
        vy: -(0.25 + Math.random() * 0.45),
        stemLength: 12 + Math.random() * 6,
        umbrellaRadius: 9 + Math.random() * 6,
        bristleCount: 9 + Math.floor(Math.random() * 4),
        angle: 0.15,
        baseAngle: (Math.random() - 0.5) * 0.4,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.015 + Math.random() * 0.02,
        alpha: baseAlpha,
        baseAlpha,
        color: col,
        depth,
        seedId: i,
      });
    }

    // ── Floating Luminous Dandelion Pollen & Forest Spores ───────────────────
    interface PollenGrain {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      radius: number;
      phase: number;
    }

    const pollenGrains: PollenGrain[] = [];
    for (let i = 0; i < 35; i++) {
      pollenGrains.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0.12 + Math.random() * 0.22,
        vy: -(0.15 + Math.random() * 0.28),
        alpha: 0.25 + Math.random() * 0.45,
        radius: 0.8 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
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

      // ── 3. RENDER LIVING BOTANICAL DANDELION PLANTS & FOLIAGE MEADOW ──
      const now = performance.now();

      for (let pIdx = 0; pIdx < botanicalPlants.length; pIdx++) {
        const p = botanicalPlants[pIdx];

        // Harmonic natural wind wave passing across the plants
        const naturalWind = Math.sin(time * p.windFreq + p.windPhase) * 0.048 + Math.cos(time * 0.75) * 0.024;

        // Reactive cursor interaction: bending away smoothly with realistic spring physics
        const estHeadX = p.baseX + Math.sin(p.angle) * p.height + p.curveCtrl * 0.5;
        const estHeadY = p.baseY - Math.cos(p.angle) * p.height;
        const dx = estHeadX - mouse.x;
        const dy = estHeadY - mouse.y;
        const dist = Math.hypot(dx, dy);

        let cursorForce = 0;
        if (mouse.active && dist < 220) {
          const prox = 1 - dist / 220;
          const pushSign = dx >= 0 ? 1 : -1;
          cursorForce = pushSign * prox * 0.16 + (mouse.vx * 0.007 * prox);

          // If brushing past puffball head with cursor velocity, release seeds into the air!
          if (p.type === "puffball" && (dist < p.headRadius * 1.6 || mouse.speed > 2.5)) {
            if (now - p.lastRelease > 140) {
              p.lastRelease = now;
              const readySeed = dandelionSeeds.find(s => s.y < -30 || s.x > W + 40 || s.y > H + 40);
              if (readySeed) {
                const burstAngle = -Math.PI * 0.5 + p.angle + (Math.random() - 0.5) * 0.9;
                readySeed.x = estHeadX + Math.cos(burstAngle) * p.headRadius * 0.8;
                readySeed.y = estHeadY + Math.sin(burstAngle) * p.headRadius * 0.8;
                readySeed.vx = 0.6 + Math.random() * 1.2 + mouse.vx * 0.12;
                readySeed.vy = -(1.2 + Math.random() * 1.4 + Math.abs(mouse.vy) * 0.12);
                readySeed.alpha = readySeed.baseAlpha;
              }
            }
          }
        }

        // Automatic periodic seed release into the breeze
        if (p.type === "puffball" && now - p.lastRelease > (3200 + pIdx * 900)) {
          p.lastRelease = now;
          const readySeed = dandelionSeeds.find(s => s.y < -30 || s.x > W + 40 || s.y > H + 40);
          if (readySeed) {
            const burstAngle = -Math.PI * 0.45 + (Math.random() - 0.5) * 0.7;
            readySeed.x = estHeadX + Math.cos(burstAngle) * p.headRadius * 0.8;
            readySeed.y = estHeadY + Math.sin(burstAngle) * p.headRadius * 0.8;
            readySeed.vx = 0.5 + Math.random() * 0.8;
            readySeed.vy = -(1.0 + Math.random() * 0.9);
            readySeed.alpha = readySeed.baseAlpha;
          }
        }

        // Realistic Spring-Damper Physics Integration
        const targetAng = p.targetAngle + naturalWind + cursorForce;
        const springForce = (targetAng - p.angle) * p.stiffness;
        p.velocity = (p.velocity + springForce) * p.damping;
        p.angle += p.velocity;

        // Accurate curved stem control coordinates
        const headX = p.baseX + Math.sin(p.angle) * p.height + p.curveCtrl * 0.5;
        const headY = p.baseY - Math.cos(p.angle) * p.height;
        const ctrlX = (p.baseX + headX) * 0.5 + p.curveCtrl;
        const ctrlY = (p.baseY + headY) * 0.5;

        // 1. Botanical Stem (Rich gradient from dark moss to vibrant glowing lemon-gold)
        const stemGrad = targetCtx.createLinearGradient(p.baseX, p.baseY, headX, headY);
        stemGrad.addColorStop(0, "rgba(45, 65, 30, 0.05)");
        stemGrad.addColorStop(0.45, "rgba(140, 175, 60, 0.22)");
        stemGrad.addColorStop(1, "rgba(217, 255, 0, 0.42)");

        targetCtx.beginPath();
        targetCtx.moveTo(p.baseX, p.baseY);
        targetCtx.quadraticCurveTo(ctrlX, ctrlY, headX, headY);
        targetCtx.strokeStyle = stemGrad;
        targetCtx.lineWidth = p.type === "leaf" ? 3.0 : 2.0;
        targetCtx.lineCap = "round";
        targetCtx.stroke();

        // 2. Leaf Fronds / Serrated Botanical Foliage
        if (p.type === "leaf") {
          const leafSteps = 6;
          for (let s = 1; s <= leafSteps; s++) {
            const t = s / (leafSteps + 1);
            const lx = (1 - t) * (1 - t) * p.baseX + 2 * (1 - t) * t * ctrlX + t * t * headX;
            const ly = (1 - t) * (1 - t) * p.baseY + 2 * (1 - t) * t * ctrlY + t * t * headY;
            const lobeLen = (1 - t * 0.4) * 22;
            const lobeAngle = p.angle + (s % 2 === 0 ? 0.85 : -0.85);

            targetCtx.beginPath();
            targetCtx.moveTo(lx, ly);
            targetCtx.quadraticCurveTo(
              lx + Math.cos(lobeAngle) * lobeLen * 0.5,
              ly + Math.sin(lobeAngle) * lobeLen * 0.5 - 4,
              lx + Math.cos(lobeAngle) * lobeLen,
              ly + Math.sin(lobeAngle) * lobeLen
            );
            targetCtx.strokeStyle = `rgba(130, 170, 50, ${0.15 + t * 0.15})`;
            targetCtx.lineWidth = 1.4;
            targetCtx.stroke();
          }
        }

        // 3. Blooming Yellow Dandelion Flower (Layered golden-lemon ray florets)
        else if (p.type === "yellow_flower") {
          const fRadius = p.headRadius;
          const petalLayers = 3;

          for (let layer = 0; layer < petalLayers; layer++) {
            const petalsInLayer = 14 + layer * 6;
            const lRadius = fRadius * (0.55 + layer * 0.22);
            const lAlpha = 0.40 - layer * 0.08;

            for (let pet = 0; pet < petalsInLayer; pet++) {
              const petAngle = p.angle - Math.PI * 0.5 + (pet / petalsInLayer) * Math.PI * 1.6 - Math.PI * 0.8;
              const petTipX = headX + Math.cos(petAngle) * lRadius;
              const petTipY = headY + Math.sin(petAngle) * lRadius;

              targetCtx.beginPath();
              targetCtx.moveTo(headX, headY);
              targetCtx.lineTo(petTipX, petTipY);
              targetCtx.strokeStyle = layer === 0 ? "rgba(245, 158, 11, 0.55)" : `rgba(217, 255, 0, ${lAlpha.toFixed(2)})`;
              targetCtx.lineWidth = 1.6 - layer * 0.3;
              targetCtx.stroke();
            }
          }

          // Glowing central floral disk
          targetCtx.beginPath();
          targetCtx.arc(headX, headY, 4.2, 0, Math.PI * 2);
          targetCtx.fillStyle = "rgba(245, 158, 11, 0.75)";
          targetCtx.fill();
        }

        // 4. Botanical Dandelion Puffball Clock (Radiating feathery parachute seedhead)
        else if (p.type === "puffball") {
          const puffRadius = p.headRadius;
          const rayCount = p.rayCount;

          // Receptacle dome
          targetCtx.beginPath();
          targetCtx.arc(headX, headY, 3.4, 0, Math.PI * 2);
          targetCtx.fillStyle = "rgba(217, 255, 0, 0.60)";
          targetCtx.fill();

          for (let r = 0; r < rayCount; r++) {
            const baseAngle = (r / rayCount) * Math.PI * 2;
            const rayAngle = baseAngle + p.angle * 0.4 + Math.sin(time * 2.2 + r) * 0.025;
            const rayLen = puffRadius * (0.84 + ((r * 11) % 19) / 55);

            const tipX = headX + Math.cos(rayAngle) * rayLen;
            const tipY = headY + Math.sin(rayAngle) * rayLen;

            // Fine silky stalk
            targetCtx.beginPath();
            targetCtx.moveTo(headX, headY);
            targetCtx.lineTo(tipX, tipY);
            targetCtx.strokeStyle = `rgba(245, 230, 180, ${0.16 + ((r % 5) * 0.03)})`;
            targetCtx.lineWidth = 0.65;
            targetCtx.stroke();

            // Parachute tuft at floret tip
            const bristleCount = 5;
            const tuftRadius = 4.2;

            for (let b = 0; b < bristleCount; b++) {
              const bAngle = rayAngle + ((b - 2) * 0.32);
              const bx = tipX + Math.cos(bAngle) * tuftRadius;
              const by = tipY + Math.sin(bAngle) * tuftRadius;

              targetCtx.beginPath();
              targetCtx.moveTo(tipX, tipY);
              targetCtx.lineTo(bx, by);
              targetCtx.strokeStyle = "rgba(255, 255, 255, 0.35)";
              targetCtx.lineWidth = 0.55;
              targetCtx.stroke();
            }

            // Seed kernel tip
            targetCtx.beginPath();
            targetCtx.arc(tipX, tipY, 0.75, 0, Math.PI * 2);
            targetCtx.fillStyle = "rgba(255, 255, 255, 0.70)";
            targetCtx.fill();
          }

          // Soft ethereal aura around puffball head
          targetCtx.beginPath();
          targetCtx.arc(headX, headY, puffRadius * 1.1, 0, Math.PI * 2);
          targetCtx.fillStyle = "rgba(217, 255, 0, 0.022)";
          targetCtx.fill();
        }
      }

      // ── 4. RENDER AIRBORNE DANDELION SEEDS (DISPERSAL MOTION & REALISTIC DYNAMICS) ──
      for (let i = 0; i < dandelionSeeds.length; i++) {
        const ds = dandelionSeeds[i];

        ds.swayPhase += ds.swaySpeed;

        // Base aerodynamic forces: gentle rising buoyancy + soft horizontal wind breeze
        let windVx = 0.35 * ds.depth + Math.cos(ds.swayPhase * 0.75) * 0.16;
        let windVy = -0.38 * ds.depth + Math.sin(ds.swayPhase) * 0.14;

        // Reactive scroll velocity
        windVy -= scrollVelocity * ds.depth * 0.45;

        // Realistic Cursor Air Displacement Field (Push & Gust)
        if (mouse.active) {
          const mdx = ds.x - mouse.x;
          const mdy = ds.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          const mRadius = 240;

          if (mDist < mRadius && mDist > 1) {
            const mProx = 1 - mDist / mRadius;
            const push = mProx * 2.2;

            // Direct wind blowing from cursor movement
            windVx += (mdx / mDist) * push + mouse.vx * mProx * 0.42;
            windVy += (mdy / mDist) * push + mouse.vy * mProx * 0.42;

            // Sudden flutter tilt reaction
            ds.angle += (mouse.vx * 0.04 - ds.angle) * 0.15;
            ds.alpha = Math.min(0.95, ds.baseAlpha + mProx * 0.35);
          } else {
            ds.alpha += (ds.baseAlpha - ds.alpha) * 0.04;
          }
        } else {
          ds.alpha += (ds.baseAlpha - ds.alpha) * 0.04;
        }

        // Velocity integration
        ds.vx += (windVx - ds.vx) * 0.06;
        ds.vy += (windVy - ds.vy) * 0.06;
        ds.x += ds.vx;
        ds.y += ds.vy;

        // Realistic pendulum drag: umbrella leads into air, seed grain trails beneath
        const targetTilt = ds.vx * 0.38 + Math.sin(ds.swayPhase) * 0.14;
        ds.angle += (targetTilt - ds.angle) * 0.08;

        // Screen wrap
        if (ds.y < -50) {
          ds.y = H + 30;
          ds.x = Math.random() * W * 0.75;
        }
        if (ds.x > W + 60) {
          ds.x = -40;
          ds.y = Math.random() * H;
        }
        if (ds.x < -60) ds.x = W + 40;

        // ── Render Dandelion Parachute Geometry ──
        const col = ds.color;
        const stemL = ds.stemLength * ds.depth;
        const umbrellaR = ds.umbrellaRadius * ds.depth;

        // Seed grain at bottom (achenium)
        const seedKernelX = ds.x;
        const seedKernelY = ds.y;

        // Umbrella apex position (above seed grain along angle)
        const apexX = seedKernelX + Math.sin(ds.angle) * stemL;
        const apexY = seedKernelY - Math.cos(ds.angle) * stemL;

        // 1. Slender filament stalk connecting seed grain to umbrella
        targetCtx.beginPath();
        targetCtx.moveTo(seedKernelX, seedKernelY);
        targetCtx.lineTo(apexX, apexY);
        targetCtx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${(ds.alpha * 0.55).toFixed(3)})`;
        targetCtx.lineWidth = 0.70;
        targetCtx.stroke();

        // 2. Glowing seed grain (achenium) at base
        targetCtx.beginPath();
        targetCtx.arc(seedKernelX, seedKernelY, 1.15 * ds.depth, 0, Math.PI * 2);
        targetCtx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${(ds.alpha * 0.95).toFixed(3)})`;
        targetCtx.fill();

        // 3. Radiating pappus bristles (umbrella parachute with micro barbs)
        const numBristles = ds.bristleCount;
        const spreadAngle = Math.PI * 0.72;
        const centerAngle = -Math.PI * 0.5 + ds.angle;

        for (let b = 0; b < numBristles; b++) {
          const bFrac = b / (numBristles - 1);
          const bristleAngle = centerAngle - spreadAngle * 0.5 + bFrac * spreadAngle;

          const bristleTipX = apexX + Math.cos(bristleAngle) * umbrellaR;
          const bristleTipY = apexY + Math.sin(bristleAngle) * umbrellaR;

          targetCtx.beginPath();
          targetCtx.moveTo(apexX, apexY);
          targetCtx.lineTo(bristleTipX, bristleTipY);
          targetCtx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${(ds.alpha * 0.65).toFixed(3)})`;
          targetCtx.lineWidth = 0.65;
          targetCtx.stroke();

          // Tiny luminous feathery tip
          targetCtx.beginPath();
          targetCtx.arc(bristleTipX, bristleTipY, 0.65 * ds.depth, 0, Math.PI * 2);
          targetCtx.fillStyle = `rgba(255, 255, 255, ${(ds.alpha * 0.85).toFixed(3)})`;
          targetCtx.fill();
        }

        // Tiny central node at apex
        targetCtx.beginPath();
        targetCtx.arc(apexX, apexY, 0.85 * ds.depth, 0, Math.PI * 2);
        targetCtx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${(ds.alpha * 0.80).toFixed(3)})`;
        targetCtx.fill();
      }

      // ── 5. RENDER LUMINOUS GOLDEN DANDELION POLLEN GRAINS ──
      for (let p = 0; p < pollenGrains.length; p++) {
        const pg = pollenGrains[p];
        pg.phase += 0.02;

        let pWindX = pg.vx + Math.sin(pg.phase) * 0.12;
        let pWindY = pg.vy + Math.cos(pg.phase * 0.8) * 0.08;

        if (mouse.active) {
          const pdx = pg.x - mouse.x;
          const pdy = pg.y - mouse.y;
          const pDist = Math.hypot(pdx, pdy);
          if (pDist < 180 && pDist > 1) {
            const pProx = 1 - pDist / 180;
            pWindX += (pdx / pDist) * pProx * 1.4 + mouse.vx * pProx * 0.25;
            pWindY += (pdy / pDist) * pProx * 1.4 + mouse.vy * pProx * 0.25;
          }
        }

        pg.x += pWindX;
        pg.y += pWindY;

        if (pg.y < -10) pg.y = H + 10;
        if (pg.x > W + 10) pg.x = -10;
        if (pg.x < -10) pg.x = W + 10;

        // Pollen particle glow
        targetCtx.beginPath();
        targetCtx.arc(pg.x, pg.y, pg.radius, 0, Math.PI * 2);
        targetCtx.fillStyle = `rgba(217, 255, 0, ${pg.alpha.toFixed(3)})`;
        targetCtx.fill();

        // Soft halo
        targetCtx.beginPath();
        targetCtx.arc(pg.x, pg.y, pg.radius * 2.2, 0, Math.PI * 2);
        targetCtx.fillStyle = `rgba(245, 190, 80, ${(pg.alpha * 0.20).toFixed(3)})`;
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
