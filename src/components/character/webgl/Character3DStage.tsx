"use client";

import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { DepthCharacterMesh } from "./DepthCharacterMesh";
import { GroundShadow3D } from "./GroundShadow3D";

interface Character3DStageProps {
  onInteract?: () => void;
  className?: string;
}

// 100% Authentic Enterprise SAP BODS & Production SQL Data Pipeline Snippets (TCS Enterprise)
const leftCodeSnippets = [
  "SELECT * FROM SAP_ECC.INV_MSTR",
  "BODS_JOB.execute(cdc_mode='FULL_DIFF')",
  "MERGE INTO STG_ENTERPRISE_BW tgt USING...",
  "SCD_Type2.apply(dim_contractor_key)",
  "VALIDATE_PIPELINE(sla='99.98%')",
];

// 100% Authentic Autonomous AI Multi-Agent & Vibe Coding Snippets (AnsiQ Framework)
const rightCodeSnippets = [
  "@ansiq_tool(domain='data_mesh')",
  "Ollama.run('llama3:70b', temp=0.2)",
  "AgentDAG.route(Coordinator -> Synthesizer)",
  "ChromaDB.vector_query(hybrid_fts5)",
  "Truth_Verification.validate(strict=True)",
];

export function Character3DStage({ onInteract, className = "" }: Character3DStageProps) {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mousePosition.current = { x, y };
  };

  const handleMouseLeave = () => {
    mousePosition.current = { x: 0, y: 0 };
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onInteract}
      className={`relative w-full h-[520px] sm:h-[580px] md:h-[640px] flex items-end justify-center cursor-pointer select-none ${className}`}
    >
      {/* --- 1. SPATIAL 3D CANVAS STAGE --- */}
      <Canvas
        camera={{ position: [0, -0.02, 5.35], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full pointer-events-auto"
      >
        <Suspense fallback={null}>
          {/* Studio Lights: High-contrast, crystal clear laptop illumination */}
          <ambientLight intensity={0.70} />
          <pointLight position={[2.5, 2.5, 3.2]} intensity={1.4} color="#14B8A6" />
          <pointLight position={[-2.5, 1.8, 2.8]} intensity={1.1} color="#F47A18" />
          {/* Dedicated laptop & hands key light so the laptop and keyboard are razor-sharp */}
          <pointLight position={[0.2, 0.4, 2.2]} intensity={1.8} color="#FFFFFF" />

          {/* 4K Realistic Human Depth Mesh */}
          <DepthCharacterMesh
            diffuseSrc="/images/avatar/style_01_4k_transparent.png"
            closedEyesSrc="/images/avatar/style_01_eyes_closed.png"
            depthSrc="/images/avatar/style_01_depth.png"
            normalSrc="/images/avatar/style_01_normal.png"
            mousePosition={mousePosition}
          />

          {/* Ground Contact Shadow */}
          <GroundShadow3D mousePosition={mousePosition} />

        </Suspense>
      </Canvas>

      {/* --- 2. GENTLE, SLOW-DRIFTING SAP BODS & AI CODE STREAMS --- */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-visible select-none">
        {/* Left Side: Real SAP BODS & SQL Streams */}
        {leftCodeSnippets.map((snippet, idx) => (
          <motion.div
            key={`left-${idx}`}
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{
              x: [-20, -50 - idx * 16, -75 - idx * 20],
              y: [10, -30 - idx * 18, -75 - idx * 22],
              opacity: [0, 0.95, 0.95, 0],
              scale: [0.94, 1, 0.96],
            }}
            transition={{
              duration: 11.5 + idx * 1.5, // Ultra-slow, peaceful, elegant drift
              ease: [0.22, 1, 0.36, 1],
              repeat: Infinity,
              delay: idx * 2.8,
            }}
            className="absolute top-[48%] left-[8%] sm:left-[12%] px-3 py-1.5 rounded-lg text-[10px] font-mono font-medium tracking-wider backdrop-blur-xl shadow-2xl border whitespace-nowrap"
            style={{
              color: "#14B8A6",
              borderColor: "rgba(20, 184, 166, 0.35)",
              backgroundColor: "rgba(3, 7, 14, 0.92)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.8), 0 0 12px rgba(20, 184, 166, 0.20)",
            }}
          >
            <span className="opacity-70 text-[#14B8A6] font-bold">&gt;&nbsp;</span>
            {snippet}
          </motion.div>
        ))}

        {/* Right Side: Real AI Multi-Agent Streams */}
        {rightCodeSnippets.map((snippet, idx) => (
          <motion.div
            key={`right-${idx}`}
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{
              x: [20, 50 + idx * 16, 75 + idx * 20],
              y: [10, -30 - idx * 18, -75 - idx * 22],
              opacity: [0, 0.95, 0.95, 0],
              scale: [0.94, 1, 0.96],
            }}
            transition={{
              duration: 12.0 + idx * 1.5, // Ultra-slow, peaceful, elegant drift
              ease: [0.22, 1, 0.36, 1],
              repeat: Infinity,
              delay: 1.4 + idx * 2.8,
            }}
            className="absolute top-[48%] right-[8%] sm:right-[12%] px-3 py-1.5 rounded-lg text-[10px] font-mono font-medium tracking-wider backdrop-blur-xl shadow-2xl border whitespace-nowrap"
            style={{
              color: "#F47A18",
              borderColor: "rgba(244, 122, 24, 0.35)",
              backgroundColor: "rgba(3, 7, 14, 0.92)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.8), 0 0 12px rgba(244, 122, 24, 0.20)",
            }}
          >
            <span className="opacity-70 text-[#F47A18] font-bold">&gt;&nbsp;</span>
            {snippet}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
