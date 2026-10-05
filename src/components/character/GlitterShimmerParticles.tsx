"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface GlitterSparkle {
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  type: "star" | "bokeh" | "cross";
  duration: number;
  delay: number;
}

export function GlitterShimmerParticles() {
  // Rich ThreeUI-Style Glitter & Shimmer Sparkle Field
  const sparkles: GlitterSparkle[] = useMemo(
    () => [
      // Starlight Diamonds around Laptop & Hands (High Density Glitter)
      { id: 1, x: "42%", y: "44%", size: 14, color: "#FFFFFF", type: "star", duration: 2.8, delay: 0 },
      { id: 2, x: "56%", y: "45%", size: 16, color: "#FACC15", type: "star", duration: 3.2, delay: 0.6 },
      { id: 3, x: "48%", y: "48%", size: 12, color: "#FFFFFF", type: "cross", duration: 2.4, delay: 1.1 },
      { id: 4, x: "38%", y: "52%", size: 10, color: "#E2C799", type: "bokeh", duration: 3.6, delay: 0.4 },
      { id: 5, x: "62%", y: "50%", size: 12, color: "#FDE047", type: "bokeh", duration: 3.8, delay: 1.4 },

      // Glitter Glimmers Floating in Atmospheric Z-Space (Left Side)
      { id: 6, x: "12%", y: "22%", size: 18, color: "#FFFFFF", type: "star", duration: 4.2, delay: 0.2 },
      { id: 7, x: "6%", y: "38%", size: 10, color: "#E2C799", type: "cross", duration: 3.4, delay: 1.8 },
      { id: 8, x: "16%", y: "58%", size: 14, color: "#FACC15", type: "bokeh", duration: 4.6, delay: 0.9 },
      { id: 9, x: "8%", y: "74%", size: 12, color: "#FFFFFF", type: "star", duration: 3.9, delay: 2.3 },

      // Glitter Glimmers Floating in Atmospheric Z-Space (Right Side)
      { id: 10, x: "84%", y: "20%", size: 16, color: "#FACC15", type: "star", duration: 4.4, delay: 0.5 },
      { id: 11, x: "92%", y: "36%", size: 12, color: "#CBD5E1", type: "cross", duration: 3.1, delay: 1.6 },
      { id: 12, x: "82%", y: "56%", size: 15, color: "#E2C799", type: "bokeh", duration: 4.8, delay: 1.0 },
      { id: 13, x: "88%", y: "76%", size: 11, color: "#FFFFFF", type: "star", duration: 3.7, delay: 2.5 },

      // Head & Aura Glimmer Halo
      { id: 14, x: "32%", y: "14%", size: 12, color: "#FFFFFF", type: "cross", duration: 3.5, delay: 1.3 },
      { id: 15, x: "68%", y: "15%", size: 14, color: "#FACC15", type: "star", duration: 3.8, delay: 0.7 },
      { id: 16, x: "50%", y: "8%", size: 10, color: "#E2C799", type: "bokeh", duration: 4.0, delay: 2.0 },

      // Additional 35-40% Extra Ambient Glimpses & Luxury Shimmer
      { id: 17, x: "24%", y: "32%", size: 13, color: "#FDE047", type: "star", duration: 3.6, delay: 0.8 },
      { id: 18, x: "76%", y: "30%", size: 14, color: "#E2C799", type: "cross", duration: 3.3, delay: 1.5 },
      { id: 19, x: "30%", y: "65%", size: 11, color: "#FACC15", type: "bokeh", duration: 4.1, delay: 1.1 },
      { id: 20, x: "70%", y: "66%", size: 13, color: "#CBD5E1", type: "star", duration: 3.9, delay: 2.1 },
      { id: 21, x: "52%", y: "38%", size: 15, color: "#FFFFFF", type: "star", duration: 2.7, delay: 0.3 },
      { id: 22, x: "18%", y: "45%", size: 12, color: "#FACC15", type: "cross", duration: 3.5, delay: 1.7 },
      { id: 23, x: "80%", y: "44%", size: 12, color: "#E2C799", type: "bokeh", duration: 4.3, delay: 0.9 },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible select-none z-20">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.95, 0.2, 1.0, 0],
            scale: [0.2, 1.2, 0.8, 1.3, 0.2],
            rotate: s.type === "star" ? [0, 45, 90, 135, 180] : [0, 90, 180],
            y: [-8, 8, -8],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
          }}
        >
          {s.type === "star" && (
            // 4-Point Diamond Starlight Flare
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full drop-shadow-[0_0_8px_currentColor]"
              style={{ color: s.color }}
            >
              <path
                fill="currentColor"
                d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
              />
              <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
            </svg>
          )}

          {s.type === "cross" && (
            // Delicate 4-Beam Glimmer Cross
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className="absolute w-full h-[2px] rounded-full blur-[0.5px]"
                style={{
                  backgroundColor: s.color,
                  boxShadow: `0 0 8px ${s.color}`,
                }}
              />
              <div
                className="absolute h-full w-[2px] rounded-full blur-[0.5px]"
                style={{
                  backgroundColor: s.color,
                  boxShadow: `0 0 8px ${s.color}`,
                }}
              />
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
            </div>
          )}

          {s.type === "bokeh" && (
            // Glowing Firefly / Luminous Data Ember Orb
            <div
              className="w-full h-full rounded-full blur-[1px] relative"
              style={{
                backgroundColor: s.color,
                boxShadow: `0 0 14px ${s.color}, inset 0 0 6px #ffffff`,
              }}
            >
              <div className="absolute inset-1 rounded-full bg-white opacity-80" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
