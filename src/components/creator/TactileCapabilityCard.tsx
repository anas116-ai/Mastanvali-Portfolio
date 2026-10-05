"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, type LucideIcon } from "lucide-react";

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
  patternType: "etl-pipeline" | "ai-synapse" | "fullstack-matrix";
}

interface TactileCapabilityCardProps {
  area: CapabilityArea;
  index: number;
}

export function TactileCapabilityCard({ area, index }: TactileCapabilityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for physical 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for natural damping (Linear / Apple style)
  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6.5, -6.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  // Specular sheen coordinates
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize from -0.5 to 0.5
    mouseX.set((x / rect.width) - 0.5);
    mouseY.set((y / rect.height) - 0.5);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Domain-specific interactive Halftone / Canvas visualization
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

    // Particle nodes for each specific domain
    const numParticles = area.patternType === "ai-synapse" ? 28 : 22;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 1.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let tick = 0;

    const render = () => {
      tick += 0.02;
      ctx.clearRect(0, 0, width, height);

      // --- Halftone Dot Grid Base (Architectural & Crisp) ---
      const dotSpacing = 24;
      const cols = Math.ceil(width / dotSpacing);
      const rows = Math.ceil(height / dotSpacing);

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const dx = c * dotSpacing;
          const dy = r * dotSpacing;

          // Subtle wave modulation
          const distFromCenter = Math.hypot(dx - width / 2, dy - height / 2);
          const wave = Math.sin(distFromCenter * 0.04 - tick);
          const alpha = 0.035 + Math.max(0, wave * 0.035);

          ctx.beginPath();
          ctx.arc(dx, dy, 0.85, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      // --- Domain Specific Interactive Halftone Layer ---
      if (area.patternType === "etl-pipeline") {
        // CARD 01: Solar ETL Pipeline Data Streams (Horizontal / Vertical orthogonal flows)
        ctx.lineWidth = 1;
        const pipelineTracks = [height * 0.25, height * 0.5, height * 0.78];

        pipelineTracks.forEach((trackY, idx) => {
          // Track line
          ctx.beginPath();
          ctx.moveTo(0, trackY);
          ctx.lineTo(width, trackY);
          ctx.strokeStyle = "rgba(244, 122, 24, 0.08)";
          ctx.stroke();

          // Flowing data packets
          const speed = (idx + 1) * 0.8;
          const packetX = ((tick * 40 * speed) + idx * 80) % (width + 60) - 30;

          const grad = ctx.createRadialGradient(packetX, trackY, 0, packetX, trackY, 20);
          grad.addColorStop(0, "rgba(244, 122, 24, 0.45)");
          grad.addColorStop(1, "rgba(244, 122, 24, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(packetX, trackY, 20, 0, Math.PI * 2);
          ctx.fill();

          // Core packet dot
          ctx.fillStyle = "#F47A18";
          ctx.beginPath();
          ctx.arc(packetX, trackY, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (area.patternType === "ai-synapse") {
        // CARD 02: Synaptic Neural Network Mesh
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Connect nearby synaptic nodes
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 65) {
              const alpha = (1 - dist / 65) * 0.18;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // Synapse node with breathing pulse
          const pulse = Math.sin(tick * 2 + p.phase) * 0.5 + 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(139, 92, 246, 0.45)";
          ctx.fill();
        }
      } else {
        // CARD 03: Full-Stack Circuit Matrix & Telemetry Bus
        ctx.strokeStyle = "rgba(20, 184, 166, 0.1)";
        ctx.lineWidth = 0.8;

        const step = 45;
        for (let x = 0; x < width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Sweeping radar scan telemetry bar
        const scanY = (tick * 28) % height;
        const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
        scanGrad.addColorStop(0, "rgba(20, 184, 166, 0)");
        scanGrad.addColorStop(0.5, "rgba(20, 184, 166, 0.15)");
        scanGrad.addColorStop(1, "rgba(20, 184, 166, 0)");
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 20, width, 40);

        // Highlight intersection points
        const activeCols = [1, 3, 5];
        activeCols.forEach((col) => {
          const px = col * step;
          const py = (scanY + col * 20) % height;
          ctx.fillStyle = "rgba(20, 184, 166, 0.6)";
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [area.patternType]);

  const Icon = area.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-full select-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.018 : 1,
        }}
        transition={{
          scale: { duration: 0.25, ease: "easeOut" },
        }}
        className="h-full rounded-2xl p-7 sm:p-8 md:p-9 border relative overflow-hidden flex flex-col justify-between transition-colors duration-400"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          backgroundColor: "#080E18",
          borderColor: isHovered ? area.borderColor : "rgba(255, 255, 255, 0.08)",
          boxShadow: isHovered
            ? `0 35px 70px -15px rgba(0,0,0,0.95), 0 0 40px ${area.accent}22, inset 0 1px 1px rgba(255,255,255,0.18)`
            : "0 20px 45px -15px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Layer 0: Halftone Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.75 : 0.42,
            transform: "translateZ(0px)",
          }}
        />

        {/* Layer 1: Contrast Vignette Shield - Guarantees 100% Crisp Legibility */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, rgba(8, 14, 24, 0.72) 0%, rgba(5, 9, 16, 0.94) 85%)",
            transform: "translateZ(8px)",
          }}
        />

        {/* Layer 2: Subtle Ambient Corner Bloom (Warm and subdued, never neon AI blob) */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[65px] pointer-events-none transition-opacity duration-500"
          style={{
            backgroundColor: area.accent,
            opacity: isHovered ? 0.22 : 0.1,
            transform: "translateZ(14px)",
          }}
        />

        {/* Layer 3: Tactile Cursor Specular Glare (Matte Sapphire Glass Sheen) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(380px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.065), transparent 75%)`,
            transform: "translateZ(18px)",
          }}
        />

        {/* Layer 4: Content Body with Deep 3D Elevation */}
        <div
          className="space-y-4 relative z-10 flex-1 flex flex-col justify-between"
          style={{ transform: "translateZ(26px)" }}
        >
          <div className="space-y-4">
            {/* Top Row: Number, System Tag & Tactile Elevated Icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: area.accent }}
                >
                  {area.num}
                </span>
                <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded border uppercase text-[#8A97A8] border-white/10 bg-white/[0.02]">
                  {area.systemTag}
                </span>
              </div>

              {/* Elevated 3D Icon Badge */}
              <div
                className="p-2.5 rounded-xl border transition-all duration-300"
                style={{
                  color: area.accent,
                  backgroundColor: `${area.accent}14`,
                  borderColor: isHovered ? `${area.accent}55` : `${area.accent}28`,
                  transform: "translateZ(16px)",
                  boxShadow: isHovered ? `0 8px 20px -4px ${area.accent}30` : "none",
                }}
              >
                <Icon size={18} />
              </div>
            </div>

            {/* Domain Title Hierarchy */}
            <div>
              <div className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#8A97A8]">
                CORE DOMAIN
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#EEF0F3] tracking-tight mt-1 font-[family-name:var(--font-outfit)]">
                {area.title}
              </h3>
              <div
                className="text-xs font-mono font-medium mt-0.5 tracking-wide"
                style={{ color: area.accent }}
              >
                {area.subtitle}
              </div>
            </div>

            {/* Description - Highest Text Contrast */}
            <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed">
              {area.desc}
            </p>
          </div>

          {/* Architectural Production Bullet Points */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2.5 mt-5">
            {area.points.map((point, pIdx) => (
              <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#A8B8C4]">
                <CheckCircle2
                  size={14}
                  className="shrink-0 mt-0.5"
                  style={{ color: area.accent }}
                />
                <span className="font-light leading-relaxed text-[#CBD5E1]">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
