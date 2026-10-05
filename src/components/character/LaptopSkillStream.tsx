"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Cpu, Layers, Terminal, Binary } from "lucide-react";

interface SkillStreamBadge {
  text: string;
  category: string;
  side: "left" | "right";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  /** Muted oxidised metal. Each badge gets its own tone from the family. */
  accent: string;
  arcX: number[];
  arcY: number[];
}

/**
 * Six disciplines lift out of the laptop one at a time, ride a slow arc clear of
 * the figure, hold legibly at the top of the frame, then dissolve upward as
 * motes of the same colour. Palette is drawn from the site's oxidised metal
 * family (brass, copper, bronze, bone) so nothing reads as neon.
 */
const SKILL_ITEMS: SkillStreamBadge[] = [
  {
    text: "SAP BODS 4.3",
    category: "ENTERPRISE ETL",
    side: "left",
    icon: Database,
    accent: "#EDEC6B",
    arcX: [-72, -142, -212, -246, -250],
    arcY: [236, 194, 132, 66, 34],
  },
  {
    text: "SQL Data Pipelines",
    category: "DATA ARCHITECTURE",
    side: "right",
    icon: Database,
    accent: "#C9C73C",
    arcX: [-18, 140, 210, 244, 248],
    arcY: [236, 194, 132, 68, 36],
  },
  {
    text: "ServiceNow ITSM",
    category: "PLATFORM GOVERNANCE",
    side: "left",
    icon: Layers,
    accent: "#C9C8C3",
    arcX: [-74, -144, -214, -248, -252],
    arcY: [238, 196, 134, 68, 36],
  },
  {
    text: "RAG Retrieval",
    category: "GROUNDED MEMORY",
    side: "right",
    icon: Binary,
    accent: "#E4E24A",
    arcX: [-16, 142, 212, 246, 250],
    arcY: [236, 194, 132, 68, 36],
  },
  {
    text: "Agentic Systems",
    category: "AUTONOMOUS AGENTS",
    side: "left",
    icon: Cpu,
    accent: "#D2D041",
    arcX: [-72, -142, -212, -246, -250],
    arcY: [234, 192, 130, 64, 34],
  },
  {
    text: "Multi-Agent DAG",
    category: "DISTRIBUTED GRAPH",
    side: "right",
    icon: Terminal,
    accent: "#B4B23A",
    arcX: [-18, 140, 210, 244, 248],
    arcY: [234, 192, 130, 64, 34],
  },
];

const LIFETIME = 7.4;

export function LaptopSkillStream() {
  const [activeItems, setActiveItems] = useState<Array<{ badge: SkillStreamBadge; keyId: number }>>(
    []
  );

  useEffect(() => {
    let counter = 0;

    const spawnBadge = () => {
      const nextBadge = SKILL_ITEMS[counter % SKILL_ITEMS.length];
      const keyId = Date.now() + Math.random();
      counter += 1;

      setActiveItems((prev) => {
        // Never more than two words on screen: legibility beats density.
        const trimmed = prev.slice(-1);
        return [...trimmed, { badge: nextBadge, keyId }];
      });
    };

    const initialTimer = setTimeout(spawnBadge, 400);
    const interval = setInterval(spawnBadge, LIFETIME * 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Motes of the badge's own colour, drifting up and dissolving. No shards,
  // no radial blast: this is steam off warm metal.
  const motes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        dx: (i % 2 === 0 ? 1 : -1) * (6 + (i % 7) * 4),
        dy: -(14 + (i % 9) * 9),
        size: i % 5 === 0 ? 2.4 : i % 3 === 0 ? 1.7 : 1.1,
        delay: (i % 12) * 0.02,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-visible select-none">
      <AnimatePresence>
        {activeItems.map(({ badge, keyId }) => {
          const Icon = badge.icon;
          const isLeft = badge.side === "left";

          return (
            <motion.div
              key={keyId}
              initial={{ x: badge.arcX[0], y: badge.arcY[0], opacity: 0 }}
              animate={{
                x: badge.arcX,
                y: badge.arcY,
                opacity: [0, 1, 1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: LIFETIME,
                times: [0, 0.14, 0.3, 0.86, 1],
                ease: [0.32, 0.72, 0.24, 1],
              }}
              className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col transform-gpu will-change-transform"
            >
              {/* The word itself. Dark plate, warm edge, readable at any size. */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.94, 1, 1, 0.985],
                  y: [0, 0, 0, -14],
                }}
                transition={{
                  duration: LIFETIME,
                  times: [0, 0.14, 0.86, 1],
                  ease: [0.22, 0.7, 0.3, 1],
                }}
                className="flex items-center gap-2.5 pl-2.5 pr-3.5 py-2 border bg-[#0F0F12]/92 backdrop-blur-xl"
                style={{
                  borderColor: `${badge.accent}59`,
                  boxShadow: `0 0 22px ${badge.accent}1F`,
                }}
              >
                <span
                  className="w-5 h-5 flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${badge.accent}1F`,
                    color: badge.accent,
                  }}
                >
                  <Icon size={11} />
                </span>

                <span className="flex flex-col leading-none">
                  <span
                    className="font-mono text-[8.5px] tracking-[0.2em] uppercase"
                    style={{ color: `${badge.accent}DD` }}
                  >
                    {badge.category}
                  </span>
                  <span className="mt-1 text-[12.5px] font-[family-name:var(--font-geist-sans)] font-medium tracking-[0.005em] text-[#EAE8E2] whitespace-nowrap">
                    {badge.text}
                  </span>
                </span>

                {/* Left cap picks up the badge colour, 2px, structural not decorative */}
                <span
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{ backgroundColor: badge.accent, opacity: 0.85 }}
                />
              </motion.div>

              {/* Colour-matched motes */}
              {motes.map((m) => (
                <motion.span
                  key={m.id}
                  className="absolute left-1/2 top-1/2 pointer-events-none rounded-full"
                  style={{
                    width: m.size,
                    height: m.size,
                    backgroundColor: badge.accent,
                    opacity: 0.5,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
                  animate={{
                    x: m.dx,
                    y: m.dy,
                    opacity: [0, 0.5, 0],
                    scale: [0.6, 1, 0.2],
                  }}
                  transition={{
                    duration: LIFETIME,
                    times: [0, 0.3 + m.delay * 0.1, 0.86, 0.9, 1],
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Faint trailing filament so the arc reads as a path */}
              <motion.span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-px origin-right"
                style={{
                  width: 210,
                  right: isLeft ? undefined : "50%",
                  left: isLeft ? "50%" : undefined,
                  background: `linear-gradient(${isLeft ? "to left" : "to right"}, ${badge.accent}3D, transparent)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.55, 0] }}
                transition={{ duration: LIFETIME, times: [0, 0.3, 0.8], ease: "easeInOut" }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
