"use client";

import React, { useRef, useEffect, useState } from "react";
import { Check, type LucideIcon } from "lucide-react";

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
  fishCount: number; // 1, 2, or 3
}

interface ZenKoiPondCardProps {
  area: CapabilityArea;
  index: number;
}

// Autonomous Wandering Cute Slender Baby Koi
interface CuteBabyKoi {
  x: number;
  y: number;
  baseSpeed: number;
  speed: number;
  currentAngle: number;
  targetAngle: number;
  targetX: number;
  targetY: number;
  tailPhase: number;
  tailSpeed: number;
  scaleX: number;
  scaleY: number;
  turnSpeed: number;
  burstPhase: number;
  burstSpeed: number;
  retargetTimer: number;
  swimSway: number;
  lastRippleTimer: number;
}

// Authentic Spreading Liquid Water Ripple (Looks like real water vibration)
interface LiquidWaterWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
  decay: number;
  aspect: number;
}

// Glistening Water Drops & Micro-Bubbles
interface WaterDrop {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  wobblePhase: number;
  wobbleSpeed: number;
  alpha: number;
  sparklePhase: number;
}

export function ZenKoiPondCard({ area, index }: ZenKoiPondCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosRef = useRef<{ x: number; y: number; isHovering: boolean }>({
    x: 0,
    y: 0,
    isHovering: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true,
    };
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    mousePosRef.current.isHovering = true;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mousePosRef.current.isHovering = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
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

    // 1. Load Feathered Seamless Koi Sprites (Head/Torso + Tail with Zero Seam)
    const torsoImg = new Image();
    torsoImg.src = "/koi_kohaku_torso.png";
    let isTorsoLoaded = false;
    torsoImg.onload = () => {
      isTorsoLoaded = true;
    };

    const tailImg = new Image();
    tailImg.src = "/koi_kohaku_tail.png";
    let isTailLoaded = false;
    tailImg.onload = () => {
      isTailLoaded = true;
    };

    // Cute Slender Baby Fish Sizing (Slender, Petite, Cute - NOT fat)
    // ScaleY is set to 70% of ScaleX so the body is slender and streamlined!
    const fishDimensions =
      index === 0
        ? [{ sx: 0.22, sy: 0.155 }] // ~70px length, ~26px width (cute petite baby koi)
        : index === 1
        ? [
            { sx: 0.185, sy: 0.13 }, // ~59px length, ~22px width
            { sx: 0.16, sy: 0.115 }, // ~51px length, ~19px width
          ]
        : [
            { sx: 0.165, sy: 0.12 }, // ~53px length
            { sx: 0.145, sy: 0.105 }, // ~46px length
            { sx: 0.13, sy: 0.095 }, // ~41px length
          ];

    const fishCount = area.fishCount; // 1, 2, or 3

    // Waypoint picker across the entire card pond area (full edge-to-edge & top-to-bottom)
    const pickNewTarget = () => {
      const minX = width * 0.06;
      const maxX = width * 0.94;
      const minY = height * 0.08;
      const maxY = height * 0.94;
      return {
        x: minX + Math.random() * (maxX - minX),
        y: minY + Math.random() * (maxY - minY),
      };
    };

    // Initialize Autonomous Cute Baby Koi Fishes across full card
    const fishes: CuteBabyKoi[] = Array.from({ length: fishCount }, (_, i) => {
      const startX = width * (0.12 + (i / Math.max(1, fishCount)) * 0.76);
      const startY = height * (0.18 + (i % 2) * 0.54);
      const target = pickNewTarget();
      const initialAngle = Math.atan2(target.y - startY, target.x - startX);
      const dims = fishDimensions[i % fishDimensions.length] || { sx: 0.18, sy: 0.13 };

      return {
        x: startX,
        y: startY,
        baseSpeed: 1.60 + Math.random() * 0.18,
        speed: 1.60,
        currentAngle: initialAngle,
        targetAngle: initialAngle,
        targetX: target.x,
        targetY: target.y,
        tailPhase: i * 2.3,
        tailSpeed: 0.155,
        scaleX: dims.sx,
        scaleY: dims.sy,
        turnSpeed: 0.068,
        burstPhase: Math.random() * Math.PI * 2,
        burstSpeed: 0.032 + Math.random() * 0.014,
        retargetTimer: 90 + Math.random() * 80,
        swimSway: 0,
        lastRippleTimer: i * 20,
      };
    });

    // 2. Liquid Water Wave Vibrations (Spreading natural water ripples)
    const waterWaves: LiquidWaterWave[] = [
      {
        x: width * 0.5,
        y: height * 0.55,
        radius: 8,
        maxRadius: 145,
        speed: 0.78,
        alpha: 0.35,
        decay: 0.0028,
        aspect: 0.76,
      },
    ];

    // 3. Glistening Water Drops & Bubbles (Crisp, sparkling, realistic)
    const waterDrops: WaterDrop[] = Array.from({ length: 18 }, () => ({
      x: width * (0.10 + Math.random() * 0.80),
      y: height * (0.25 + Math.random() * 0.70),
      radius: 1.1 + Math.random() * 1.6,
      speedY: 0.25 + Math.random() * 0.35,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.025 + Math.random() * 0.02,
      alpha: 0.35 + Math.random() * 0.40,
      sparklePhase: Math.random() * Math.PI * 2,
    }));

    let lastMouseWaveTime = 0;
    let time = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // RENDER LOOP
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // 1. CRYSTAL-CLEAR LIQUID WATER GRADIENT (Pure Obsidian-Sapphire Depth)
      const waterGrad = ctx.createLinearGradient(0, 0, 0, height);
      waterGrad.addColorStop(0, "rgba(2, 9, 18, 0.48)");
      waterGrad.addColorStop(0.40, "rgba(3, 14, 26, 0.58)");
      waterGrad.addColorStop(0.75, "rgba(2, 10, 20, 0.72)");
      waterGrad.addColorStop(1, "rgba(1, 5, 12, 0.85)");
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, 0, width, height);

      // 1B. SUBTLE UNDERWATER LIGHT CAUSTICS REFRACTION (Liquid Luxury Shimmer)
      ctx.save();
      const causticAlpha = mousePosRef.current.isHovering ? 0.040 : 0.020;
      const causticTime = time * 0.7;
      ctx.strokeStyle = `rgba(220, 245, 255, ${causticAlpha})`;
      ctx.lineWidth = 1.1;
      for (let c = 0; c < 2; c++) {
        const offsetC = c * 38;
        ctx.beginPath();
        for (let cx = 0; cx < width; cx += 22) {
          const cy = height * 0.48 + Math.sin(cx * 0.024 + causticTime + c) * 14 + Math.cos(cx * 0.038 - causticTime) * 10 + offsetC;
          if (cx === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 2. SPREADING LIQUID WATER RIPPLES / VIBRATIONS (Natural spreading wave like stone in water)
      ctx.save();
      for (let wIdx = waterWaves.length - 1; wIdx >= 0; wIdx--) {
        const wave = waterWaves[wIdx];
        wave.radius += wave.speed;
        wave.alpha -= wave.decay;

        if (wave.alpha <= 0 || wave.radius >= wave.maxRadius) {
          waterWaves.splice(wIdx, 1);
          continue;
        }

        const radX = wave.radius;
        const radY = wave.radius * wave.aspect;

        // Subtle water trough shadow (underneath wave crest)
        ctx.beginPath();
        ctx.ellipse(wave.x, wave.y + 1.2, radX, radY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 6, 15, ${wave.alpha * 0.30})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Delicate liquid water crest highlight (looks like real spreading liquid water)
        ctx.beginPath();
        ctx.ellipse(wave.x, wave.y, radX, radY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 235, 255, ${wave.alpha * 0.38})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Secondary gentle trailing ripple ring
        if (wave.radius > 22) {
          const innerRadX = radX - 16;
          const innerRadY = radY - 12;
          if (innerRadX > 0 && innerRadY > 0) {
            ctx.beginPath();
            ctx.ellipse(wave.x, wave.y, innerRadX, innerRadY, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(215, 245, 255, ${wave.alpha * 0.18})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Interactive Water Wave on Mouse Movement (Like touching calm water)
      if (mousePosRef.current.isHovering && time - lastMouseWaveTime > 0.38) {
        lastMouseWaveTime = time;
        waterWaves.push({
          x: mousePosRef.current.x,
          y: mousePosRef.current.y,
          radius: 4,
          maxRadius: 95,
          speed: 0.68,
          alpha: 0.42,
          decay: 0.0035,
          aspect: 0.78,
        });
      }

      // 3. SPARKLING WATER DROPS & FLOATING BUBBLES
      ctx.save();
      waterDrops.forEach((drop) => {
        drop.y -= drop.speedY;
        drop.wobblePhase += drop.wobbleSpeed;
        drop.sparklePhase += 0.05;
        const currentX = drop.x + Math.sin(drop.wobblePhase) * 2.0;

        if (drop.y < height * 0.22) {
          drop.y = height + 6;
          drop.x = width * (0.10 + Math.random() * 0.80);
        }

        const sparkle = 0.8 + Math.sin(drop.sparklePhase) * 0.2;
        const effectiveAlpha = drop.alpha * sparkle;

        ctx.beginPath();
        ctx.arc(currentX, drop.y, drop.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(186, 230, 253, ${effectiveAlpha})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          currentX - drop.radius * 0.32,
          drop.y - drop.radius * 0.32,
          drop.radius * 0.36,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${effectiveAlpha * 0.9})`;
        ctx.fill();
      });
      ctx.restore();

      // 4. UPDATE & DRAW CUTE SLENDER BABY KOI
      fishes.forEach((fish, fIdx) => {
        // Navigation & Gentle Waypoint Retargeting
        fish.retargetTimer--;
        const distToTarget = Math.hypot(fish.targetX - fish.x, fish.targetY - fish.y);
        if (distToTarget < 40 || fish.retargetTimer <= 0) {
          const newT = pickNewTarget();
          fish.targetX = newT.x;
          fish.targetY = newT.y;
          fish.retargetTimer = 160 + Math.random() * 140;
        }

        let steerX = fish.targetX - fish.x;
        let steerY = fish.targetY - fish.y;

        // Card Boundary Soft Cushion (Full edge-to-edge and top-to-bottom roam)
        const marginX = width * 0.05;
        const marginY = height * 0.06;
        if (fish.x < marginX) steerX += (marginX - fish.x) * 3.4;
        if (fish.x > width - marginX) steerX -= (fish.x - (width - marginX)) * 3.4;
        if (fish.y < marginY) steerY += (marginY - fish.y) * 3.4;
        if (fish.y > height - marginY) steerY -= (fish.y - (height - marginY)) * 3.4;

        // Companion Spacing
        fishes.forEach((otherFish, oIdx) => {
          if (fIdx === oIdx) return;
          const odx = fish.x - otherFish.x;
          const ody = fish.y - otherFish.y;
          const odist = Math.hypot(odx, ody);
          if (odist < 50 && odist > 1) {
            steerX += (odx / odist) * 40;
            steerY += (ody / odist) * 40;
          }
        });

        // Mouse Avoidance
        if (mousePosRef.current.isHovering) {
          const mdx = fish.x - mousePosRef.current.x;
          const mdy = fish.y - mousePosRef.current.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 75 && mdist > 1) {
            steerX += (mdx / mdist) * 80;
            steerY += (mdy / mdist) * 80;
          }
        }

        // Smooth Heading Turn Angle
        fish.targetAngle = Math.atan2(steerY, steerX);
        let angleDiff = fish.targetAngle - fish.currentAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        fish.currentAngle += angleDiff * fish.turnSpeed;

        // Burst & Glide Dynamics (Calm, graceful glide)
        fish.burstPhase += fish.burstSpeed;
        const surge = Math.max(0, Math.sin(fish.burstPhase));
        fish.speed = fish.baseSpeed * (0.86 + surge * 0.42);
        fish.tailSpeed = 0.145 + surge * 0.095;

        // Propel forward
        fish.x += Math.cos(fish.currentAngle) * fish.speed;
        fish.y += Math.sin(fish.currentAngle) * fish.speed;

        // Tail wave & yaw sway
        fish.tailPhase += fish.tailSpeed;
        fish.swimSway = Math.sin(fish.tailPhase) * 0.070;

        // Fish Water Vibration Ripple: Emit a gentle water wave when fish flicks its tail
        fish.lastRippleTimer++;
        if (surge > 0.80 && fish.lastRippleTimer > 50 && waterWaves.length < 7) {
          fish.lastRippleTimer = 0;
          const tailX = fish.x - Math.cos(fish.currentAngle) * (fish.scaleX * 100);
          const tailY = fish.y - Math.sin(fish.currentAngle) * (fish.scaleX * 100);
          waterWaves.push({
            x: tailX,
            y: tailY,
            radius: 5,
            maxRadius: 95 + Math.random() * 25,
            speed: 0.74,
            alpha: 0.32,
            decay: 0.0032,
            aspect: 0.78,
          });
        }

        // A. 3D Soft Underwater Shadow
        ctx.save();
        ctx.translate(fish.x + 7, fish.y + 10);
        ctx.rotate(fish.currentAngle + fish.swimSway);
        ctx.scale(fish.scaleX * 0.95, fish.scaleY * 0.85);
        ctx.beginPath();
        ctx.ellipse(0, 0, 95, 26, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(1, 6, 14, 0.38)";
        ctx.filter = "blur(6px)";
        ctx.fill();
        ctx.restore();

        // B. Draw Cute Slender Baby Koi (Streamlined, Petite & Cute)
        ctx.save();
        ctx.translate(fish.x, fish.y);
        ctx.rotate(fish.currentAngle + fish.swimSway);
        ctx.scale(fish.scaleX, fish.scaleY);

        if (
          isTorsoLoaded &&
          isTailLoaded &&
          torsoImg.complete &&
          tailImg.complete
        ) {
          const sw = 322;
          const sh = 169;

          // 1. Torso & Head (Zero Seams, Slender & Cute)
          ctx.drawImage(torsoImg, -161, -sh * 0.5, sw, sh);

          // 2. Tail Fin with Organic Wave Flexion
          const tailAngle = Math.sin(fish.tailPhase - 0.4) * 0.17;
          ctx.save();
          ctx.translate(-16, 0);
          ctx.rotate(tailAngle);
          ctx.drawImage(tailImg, -145, -sh * 0.5, sw, sh);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.ellipse(0, 0, 50, 14, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#E06D20";
          ctx.fill();
        }

        // C. Clean Water Glint over Fish Spine
        ctx.beginPath();
        ctx.ellipse(20, -2, 38, 7, -0.08, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [area.fishCount, index]);

  const Icon = area.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-between h-full min-h-[480px] sm:min-h-[510px] select-none ${
        isHovered
          ? "border-white/30 shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_24px_rgba(224,109,32,0.12)]"
          : "border-white/[0.10] shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
      }`}
      style={{
        backgroundColor: "rgba(14, 18, 27, 0.70)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* 1. CRYSTAL LIVING WATER CANVAS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 2. Frosted Edge Vignette & Top Specular Sheen */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 45px rgba(1, 4, 10, 0.70)",
        }}
      />

      {/* 3. CLEAN TYPOGRAPHY (No Enclosing Boxes on Head — Pure, Elegant Typography) */}
      <div className="relative z-20 p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          {/* Top Row: Clean Numeral, Plain Text Tag & Clean Icon (NO BOXES) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-2xl sm:text-3xl font-light tracking-widest"
                style={{
                  color: area.accent,
                  textShadow: `0 0 20px ${area.accent}60`,
                }}
              >
                {area.num}
              </span>
              <span className="text-[11px] font-mono tracking-[0.22em] text-[#94A3B8] uppercase font-medium">
                {area.systemTag}
              </span>
            </div>

            {/* Clean Icon without Enclosing Box */}
            <Icon
              size={20}
              className="transition-transform duration-300 group-hover:scale-110 opacity-90"
              style={{ color: area.accent }}
            />
          </div>

          {/* Domain Title Hierarchy — 100% Crisp & High Contrast */}
          <div className="pt-1">
            <div className="text-[11px] font-mono tracking-widest uppercase text-[#E06D20] font-medium">
              // CORE DOMAIN
            </div>
            <h3
              className="text-lg sm:text-xl font-medium text-white tracking-tight mt-0.5 font-[family-name:var(--font-outfit)] leading-snug"
              style={{
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.95)",
              }}
            >
              {area.title}
            </h3>
            <div
              className="text-xs font-mono text-[#E06D20] tracking-wide mt-0.5 font-medium"
              style={{
                textShadow: "0 1px 6px rgba(0, 0, 0, 0.95)",
              }}
            >
              {area.subtitle}
            </div>

            {/* Clear Body Description */}
            <p
              className="text-xs text-[#94A3B8] font-light leading-relaxed mt-2"
              style={{
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.95)",
              }}
            >
              {area.desc}
            </p>
          </div>
        </div>

        {/* Minimalist Production Checkpoints (Spacious Clean Finish) */}
        <div className="pt-4 border-t border-white/10 space-y-2 mt-auto">
          {area.points.map((point, pIdx) => (
            <div
              key={pIdx}
              className="flex items-start gap-2 text-xs text-[#F8FAFC] font-normal"
              style={{
                textShadow: "0 2px 6px rgba(0, 0, 0, 0.98)",
              }}
            >
              <Check
                size={13}
                className="shrink-0 mt-0.5"
                style={{ color: area.accent }}
              />
              <span className="leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
