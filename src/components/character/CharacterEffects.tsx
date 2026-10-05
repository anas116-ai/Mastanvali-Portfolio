"use client";

import { motion } from "framer-motion";

interface CharacterEffectsProps {
  accentColor?: string;
  secondaryAccent?: string;
  isActive?: boolean;
  className?: string;
}

// Side-flanking code streams (Left side vs Right side) to keep the face 100% clear
const leftCodeSnippets = [
  "SELECT * FROM pipeline;",
  "bods_job.execute(delta)",
  "99.98% SLA verified",
];

const rightCodeSnippets = [
  "model.generate_stream()",
  "agent.collaborate()",
  "neural_dag.optimize()",
];

export function CharacterEffects({
  accentColor = "#FACC15",
  secondaryAccent = "#E2C799",
  isActive = true,
  className = "",
}: CharacterEffectsProps) {
  if (!isActive) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 select-none overflow-visible z-20 ${className}`}>
      {/* --- 1. LEFT-FLANKING HOLOGRAPHIC CODE STREAM (Arcs to the left of the shoulder & fades out) --- */}
      {leftCodeSnippets.map((snippet, idx) => (
        <motion.div
          key={`left-${idx}`}
          initial={{ opacity: 0, x: -30, y: 0, scale: 0.85 }}
          animate={{
            x: [-35, -85 - idx * 28, -115 - idx * 35],
            y: [-5, -65 - idx * 32, -135 - idx * 38],
            opacity: [0, 0.9, 0.85, 0],
            scale: [0.85, 1.02, 0.9],
          }}
          transition={{
            duration: 4.6 + idx * 0.9,
            ease: [0.25, 0.1, 0.25, 1],
            repeat: Infinity,
            delay: idx * 1.6,
          }}
          className="absolute top-[48%] left-[24%] px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider backdrop-blur-md shadow-lg border whitespace-nowrap pointer-events-none"
          style={{
            color: accentColor,
            borderColor: "rgba(250, 204, 21, 0.35)",
            backgroundColor: "rgba(5, 9, 20, 0.85)",
            boxShadow: "0 0 16px rgba(250, 204, 21, 0.28)",
          }}
        >
          <span className="opacity-70 font-semibold">&gt;&nbsp;</span>
          {snippet}
        </motion.div>
      ))}

      {/* --- 2. RIGHT-FLANKING HOLOGRAPHIC CODE STREAM (Arcs to the right of the shoulder & fades out) --- */}
      {rightCodeSnippets.map((snippet, idx) => (
        <motion.div
          key={`right-${idx}`}
          initial={{ opacity: 0, x: 30, y: 0, scale: 0.85 }}
          animate={{
            x: [35, 85 + idx * 28, 115 + idx * 35],
            y: [-5, -65 - idx * 32, -135 - idx * 38],
            opacity: [0, 0.9, 0.85, 0],
            scale: [0.85, 1.02, 0.9],
          }}
          transition={{
            duration: 4.8 + idx * 0.9,
            ease: [0.25, 0.1, 0.25, 1],
            repeat: Infinity,
            delay: 0.8 + idx * 1.6,
          }}
          className="absolute top-[48%] right-[24%] px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider backdrop-blur-md shadow-lg border whitespace-nowrap pointer-events-none"
          style={{
            color: secondaryAccent,
            borderColor: "rgba(226, 199, 153, 0.35)",
            backgroundColor: "rgba(5, 9, 20, 0.85)",
            boxShadow: "0 0 16px rgba(226, 199, 153, 0.28)",
          }}
        >
          <span className="opacity-70 font-semibold">&gt;&nbsp;</span>
          {snippet}
        </motion.div>
      ))}

      {/* --- 3. REVOLVING 3D HOLOGRAPHIC DATA ORBIT RINGS (Constrained around laptop level) --- */}
      <motion.div
        animate={{
          rotateZ: [0, 360],
          scale: [0.95, 1.06, 0.95],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 14,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute top-[52%] left-[46%] -translate-x-1/2 -translate-y-1/2 w-[160px] h-[65px] rounded-full border border-dashed pointer-events-none"
        style={{
          borderColor: "rgba(250, 204, 21, 0.35)",
          transformStyle: "preserve-3d",
          transform: "rotateX(74deg)",
        }}
      />

      <motion.div
        animate={{
          rotateZ: [360, 0],
          scale: [1.05, 0.94, 1.05],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute top-[52%] left-[46%] -translate-x-1/2 -translate-y-1/2 w-[205px] h-[80px] rounded-full border border-dotted pointer-events-none"
        style={{
          borderColor: "rgba(226, 199, 153, 0.30)",
          transformStyle: "preserve-3d",
          transform: "rotateX(70deg)",
        }}
      />

      {/* --- 4. DYNAMIC SIDE DATA NODES (Undulating on the outer perimeter) --- */}
      {[
        { top: "42%", left: "18%", color: "#FACC15", delay: 0 },
        { top: "35%", right: "16%", color: "#E2C799", delay: 1.1 },
        { top: "56%", left: "15%", color: "#FFFFFF", delay: 2.3 },
        { top: "54%", right: "18%", color: "#FDE047", delay: 3.2 },
      ].map((node, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-6, 6, -6],
            x: [-3, 3, -3],
            scale: [0.8, 1.25, 0.8],
            opacity: [0.4, 0.95, 0.4],
          }}
          transition={{
            duration: 3.8 + i * 0.6,
            ease: "easeInOut",
            repeat: Infinity,
            delay: node.delay,
          }}
          className="absolute w-2.5 h-2.5 rounded-full flex items-center justify-center pointer-events-none"
          style={{
            top: node.top,
            ...(node.left ? { left: node.left } : { right: node.right }),
            backgroundColor: node.color,
            boxShadow: `0 0 12px ${node.color}`,
          }}
        >
          <div className="w-1 h-1 rounded-full bg-white" />
        </motion.div>
      ))}

      {/* --- 5. RHYTHMIC TYPING SCREEN LIGHT PULSE (At Laptop level only) --- */}
      <motion.div
        animate={{
          opacity: [0.2, 0.55, 0.25, 0.65, 0.2],
          scale: [0.98, 1.04, 0.99, 1.05, 0.98],
        }}
        transition={{
          duration: 2.6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute top-[50%] left-[46%] -translate-x-1/2 -translate-y-1/2 w-[110px] h-[65px] rounded-full blur-xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(20, 184, 166, 0.55) 0%, rgba(244,122,24,0.25) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}
