"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Cpu, Layers, Terminal, Binary } from "lucide-react";

interface SkillStreamBadge {
  id: number;
  text: string;
  category: string;
  side: "left" | "right";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
  borderColor: string;
  bgGlow: string;
  // Arc trajectory keyframes: Launches from laptop, sweeps wide in smooth continuous arc around torso/shoulders, ascends to sky apex
  arcX: number[];
  arcY: number[];
}

// 6 Core Skills: Alternates cleanly between LEFT and RIGHT sides
// Smooth continuous arc trajectory curves wide around the character body, never occluding torso, arms, or face/head
const SKILL_ITEMS = [
  {
    text: "SAP BODS Developer",
    category: "ENTERPRISE ETL",
    side: "left" as const,
    icon: Database,
    accentColor: "#14B8A6", // Cyan
    borderColor: "rgba(244, 122, 24, 0.65)",
    bgGlow: "rgba(244, 122, 24, 0.15)",
    arcX: [-68, -135, -205, -238, -242],
    arcY: [232, 192, 132, 68, 38],
  },
  {
    text: "SQL Pipelines",
    category: "DATA ARCHITECTURE",
    side: "right" as const,
    icon: Database,
    accentColor: "#F47A18", // Sky Blue
    borderColor: "rgba(244, 122, 24, 0.65)",
    bgGlow: "rgba(244, 122, 24, 0.15)",
    arcX: [-16, 135, 205, 238, 242],
    arcY: [232, 192, 132, 68, 38],
  },
  {
    text: "ServiceNow",
    category: "ITSM PLATFORM",
    side: "left" as const,
    icon: Layers,
    accentColor: "#14B8A6", // Emerald
    borderColor: "rgba(244, 122, 24, 0.65)",
    bgGlow: "rgba(244, 122, 24, 0.15)",
    arcX: [-70, -138, -208, -240, -244],
    arcY: [234, 194, 134, 70, 40],
  },
  {
    text: "RAG Systems",
    category: "GROUNDED RETRIEVAL",
    side: "right" as const,
    icon: Binary,
    accentColor: "#F47A18", // Amber
    borderColor: "rgba(244, 122, 24, 0.65)",
    bgGlow: "rgba(244, 122, 24, 0.30)",
    arcX: [-14, 138, 208, 240, 244],
    arcY: [232, 192, 132, 70, 40],
  },
  {
    text: "Agentic AI",
    category: "AUTONOMOUS AGENTS",
    side: "left" as const,
    icon: Cpu,
    accentColor: "#F47A18", // Violet
    borderColor: "rgba(244, 122, 24, 0.65)",
    bgGlow: "rgba(244, 122, 24, 0.15)",
    arcX: [-68, -135, -205, -238, -242],
    arcY: [230, 190, 130, 66, 36],
  },
  {
    text: "AI Orchestration",
    category: "MULTI-AGENT DAG",
    side: "right" as const,
    icon: Terminal,
    accentColor: "#F47A18", // Radiant Gold
    borderColor: "rgba(244, 122, 24, 0.65)",
    bgGlow: "rgba(244, 122, 24, 0.15)",
    arcX: [-16, 135, 205, 238, 242],
    arcY: [230, 190, 130, 66, 36],
  },
];

export function LaptopSkillStream() {
  const [activeItems, setActiveItems] = useState<
    Array<{
      badge: (typeof SKILL_ITEMS)[0];
      keyId: number;
    }>
  >([]);

  useEffect(() => {
    let counter = 0;

    const spawnBadge = () => {
      const nextBadge = SKILL_ITEMS[counter % SKILL_ITEMS.length];
      const uniqueId = Date.now() + Math.random();
      counter++;

      setActiveItems((prev) => {
        const trimmed = prev.slice(-2);
        return [...trimmed, { badge: nextBadge, keyId: uniqueId }];
      });
    };

    // Initial launch after 300ms
    const initialTimer = setTimeout(spawnBadge, 300);

    // Smooth rhythmic pacing: Spawns new badge right as the previous badge shatters at apex (every 3200ms)
    const interval = setInterval(spawnBadge, 3200);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // 60 Color-matched Stardust particles that pop outward at shatter apex and FLOATS SLOWLY & GRACEFULLY DOWN TO FEET (~440px - 490px descent)
  const stardustParticles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const angle = (i / 60) * Math.PI * 2 + (i % 5) * 0.16;
      const speed = 14 + (i % 8) * 5.0; // Radial bloom spread
      const popDx = Math.cos(angle) * speed;
      const popDy = Math.sin(angle) * (speed * 0.50) - 12; // Initial slight upward bloom
      // SLOW, FLOATING DESCENT TO FEET: Descends gently 440px to 490px from apex (y=38) down to feet level (y=475-525)
      const fallDy = popDy + 450 + (i % 12) * 4.0; 
      // Gentle natural lateral flutter/sway during slow float
      const fallDx = popDx * 1.5 + ((i % 2 === 0 ? 1 : -1) * (14 + (i % 7) * 4.0));
      // Particle sizes (1.4px to 3.4px) matching ambient dust
      const size = i % 4 === 0 ? 3.4 : i % 3 === 0 ? 2.5 : i % 2 === 0 ? 1.9 : 1.4;
      const delay = (i % 10) * 0.007;

      return {
        id: i,
        popDx,
        popDy,
        fallDx,
        fallDy,
        size,
        delay,
      };
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-visible select-none">
      <AnimatePresence>
        {activeItems.map(({ badge, keyId }) => {
          const Icon = badge.icon;
          const isLeft = badge.side === "left";

          return (
            <motion.div
              key={keyId}
              initial={{
                x: badge.arcX[0],
                y: badge.arcY[0],
                scale: 0.70,
                opacity: 0,
              }}
              animate={{
                // Continuous, non-stepped smooth arc path from Laptop -> Outer Flank -> Sky Apex
                x: badge.arcX,
                y: badge.arcY,
                scale: [0.70, 0.80, 0.85, 0.85, 0.85],
                opacity: [0, 1, 1, 1, 1],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 6.2,
                times: [0, 0.12, 0.28, 0.42, 1.0],
                ease: [0.25, 0.85, 0.35, 1],
              }}
              className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col transform-gpu will-change-transform"
              style={{
                filter: `drop-shadow(0 0 16px ${badge.accentColor}77)`,
              }}
            >
              {/* 1. Main Skill Badge: Crisp high-visibility box with smooth glide & visible shatter at apex */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{
                  scale: [0.95, 1, 1.02, 1.18, 0],
                  opacity: [0, 1, 1, 1, 0],
                  filter: [
                    "blur(0px) brightness(1)",
                    "blur(0px) brightness(1.05)",
                    "blur(0px) brightness(1.25)",
                    "blur(1px) brightness(2.4)",
                    "blur(6px) brightness(3.2)",
                  ],
                }}
                transition={{
                  duration: 6.2,
                  times: [0, 0.05, 0.39, 0.43, 0.46],
                  ease: "easeInOut",
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-2xl shadow-2xl border transform-gpu"
                style={{
                  backgroundColor: "rgba(5, 8, 17, 0.96)",
                  borderColor: badge.accentColor,
                  borderWidth: "1.5px",
                  boxShadow: `0 8px 24px -2px rgba(0,0,0,0.95), 0 0 20px ${badge.bgGlow}`,
                }}
              >
                <div
                  className="w-4 h-4 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: badge.bgGlow,
                    color: badge.accentColor,
                  }}
                >
                  <Icon size={11} />
                </div>
                <div className="flex flex-col leading-none pr-1">
                  <span
                    className="text-[8.5px] font-mono tracking-wider uppercase font-bold"
                    style={{ color: badge.accentColor }}
                  >
                    {badge.category}
                  </span>
                  <span className="text-[11px] font-semibold text-[#F3F1E8] whitespace-nowrap mt-0.5">
                    {badge.text}
                  </span>
                </div>
              </motion.div>

              {/* 2. VISIBLE CRYSTAL SHATTER SHARDS: 6 Distinct shards visibly fly apart at shatter point */}
              {[
                { sx: isLeft ? -32 : 32, sy: -22, fDx: isLeft ? -56 : 56, fDy: 60, r: isLeft ? -50 : 50 },
                { sx: isLeft ? 30 : -30, sy: -18, fDx: isLeft ? 52 : -52, fDy: 70, r: isLeft ? 55 : -55 },
                { sx: isLeft ? -26 : 26, sy: 20, fDx: isLeft ? -48 : 48, fDy: 130, r: isLeft ? -40 : 40 },
                { sx: isLeft ? 28 : -28, sy: 22, fDx: isLeft ? 50 : -50, fDy: 140, r: isLeft ? 60 : -60 },
                { sx: isLeft ? -14 : 14, sy: -28, fDx: isLeft ? -32 : 32, fDy: 95, r: isLeft ? -65 : 65 },
                { sx: isLeft ? 16 : -16, sy: 28, fDx: isLeft ? 34 : -34, fDy: 180, r: isLeft ? 70 : -70 },
              ].map((shard, sIdx) => (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    opacity: [0, 0, 1, 0.85, 0],
                    scale: [0, 0, 1, 0.70, 0],
                    x: [0, 0, shard.sx, shard.fDx],
                    y: [0, 0, shard.sy, shard.fDy],
                    rotate: [0, 0, shard.r * 0.5, shard.r],
                  }}
                  transition={{
                    duration: 6.2,
                    times: [0, 0.42, 0.46, 0.58, 0.72],
                    ease: "easeOut",
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-sm"
                  style={{
                    width: sIdx % 2 === 0 ? 9 : 7,
                    height: sIdx % 2 === 0 ? 5 : 4,
                    backgroundColor: "rgba(5, 8, 17, 0.94)",
                    border: `1px solid ${badge.accentColor}`,
                    boxShadow: `0 0 10px ${badge.accentColor}`,
                  }}
                />
              ))}

              {/* 3. Radiant Prism Bloom Pulse at Shatter Point */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 0, 0.8, 1.9, 2.8],
                  opacity: [0, 0, 1, 0.45, 0],
                }}
                transition={{
                  duration: 6.2,
                  times: [0, 0.41, 0.44, 0.50, 0.58],
                  ease: "easeOut",
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none transform-gpu"
              >
                <div
                  className="w-12 h-12 rounded-full blur-[2px]"
                  style={{
                    background: `radial-gradient(circle, #FFFFFF 0%, ${badge.accentColor} 50%, transparent 80%)`,
                    boxShadow: `0 0 28px ${badge.accentColor}`,
                  }}
                />
              </motion.div>

              {/* 4. EXACT COLOR-MATCHED STARDUST PARTICLES: Slow Graceful Floating Rain down ALL THE WAY TO FEET (~490px Rain) */}
              {stardustParticles.map((pt) => (
                <motion.div
                  key={pt.id}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: [0, 0, pt.popDx, pt.fallDx],
                    y: [0, 0, pt.popDy, pt.fallDy], // Drops gently & slowly all the way down to character's feet!
                    opacity: [0, 0, 1, 0.95, 0.85, 0.60, 0],
                    scale: [0, 0, 1.2, 1.0, 0.90, 0.75, 0],
                  }}
                  transition={{
                    duration: 6.2,
                    times: [0, 0.42 + pt.delay, 0.48, 0.65, 0.82, 0.94, 1.0],
                    ease: [0.25, 0.9, 0.45, 1], // Smooth floating gravity curve
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transform-gpu will-change-transform"
                  style={{
                    width: pt.size,
                    height: pt.size,
                    borderRadius: "9999px",
                    backgroundColor: badge.accentColor,
                    boxShadow: `0 0 10px ${badge.accentColor}, 0 0 4px ${badge.accentColor}, 0 0 1.5px #FFFFFF`,
                  }}
                />
              ))}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
