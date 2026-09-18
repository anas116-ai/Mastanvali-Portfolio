"use client";

import { useEffect, useRef, useState } from "react";
import {
  Database,
  Bot,
  MonitorSmartphone,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  Code2,
  Server,
  Binary,
  Workflow,
  Sparkles,
  Terminal,
} from "lucide-react";

// Clean, high-impact core technology capsules (Minimal Option 2: Clean, bold, zero clutter)
const row1Nodes = [
  { icon: Database, name: "SAP BODS 4.3", color: "#14B8A6" },
  { icon: Bot, name: "Multi-Agent DAGs", color: "#A78BFA" },
  { icon: Database, name: "SQL Data Architecture", color: "#38BDF8" },
  { icon: Cpu, name: "Python 3.12 & Async APIs", color: "#34D399" },
  { icon: Code2, name: "Next.js 15 & React 19", color: "#F3F1E8" },
  { icon: Workflow, name: "Enterprise ETL Workflows", color: "#F47A18" },
  { icon: Sparkles, name: "Autonomous AI Agents", color: "#FDE047" },
];

const row2Nodes = [
  { icon: MonitorSmartphone, name: "Offline Desktop ERP", color: "#14B8A6" },
  { icon: Zap, name: "Ollama & Local LLMs", color: "#F47A18" },
  { icon: Server, name: "SAP HANA & S/4HANA", color: "#38BDF8" },
  { icon: Layers, name: "ServiceNow & ITSM", color: "#34D399" },
  { icon: Binary, name: "RAG Retrieval Systems", color: "#A78BFA" },
  { icon: ShieldCheck, name: "Tesseract OCR Engines", color: "#FDE047" },
  { icon: Terminal, name: "SQLite WAL & Vector Indexing", color: "#10B981" },
];

const quadrupledRow1 = [...row1Nodes, ...row1Nodes, ...row1Nodes, ...row1Nodes];
const quadrupledRow2 = [...row2Nodes, ...row2Nodes, ...row2Nodes, ...row2Nodes];

export function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current) {
          rafRef.current = null;
          return;
        }
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.22;
        setOffset(calculatedOffset);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050811] py-8 sm:py-10 border-y border-white/[0.06] select-none font-[family-name:var(--font-outfit)]"
    >
      {/* Side Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#050811] via-[#050811]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#050811] via-[#050811]/90 to-transparent z-20 pointer-events-none" />

      <div className="flex flex-col gap-2.5">
        {/* Row 1 — Clean Minimal Tech Capsules */}
        <div
          className="flex gap-2.5 items-center"
          style={{
            transform: `translateX(${offset - 300}px)`,
            willChange: "transform",
            transition: "transform 0.1s linear",
          }}
        >
          {quadrupledRow1.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div
                key={`r1-${idx}`}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg border backdrop-blur-xl shrink-0 transition-all duration-300 hover:border-white/20 group"
                style={{
                  backgroundColor: "rgba(8, 14, 26, 0.85)",
                  borderColor: "rgba(255, 255, 255, 0.07)",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: node.color,
                    backgroundColor: `${node.color}15`,
                  }}
                >
                  <Icon size={12} />
                </div>
                <span className="font-mono text-xs font-semibold text-[#F3F1E8] tracking-wide whitespace-nowrap">
                  {node.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Row 2 — Clean Minimal Tech Capsules */}
        <div
          className="flex gap-2.5 items-center"
          style={{
            transform: `translateX(${-offset - 300}px)`,
            willChange: "transform",
            transition: "transform 0.1s linear",
          }}
        >
          {quadrupledRow2.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div
                key={`r2-${idx}`}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg border backdrop-blur-xl shrink-0 transition-all duration-300 hover:border-white/20 group"
                style={{
                  backgroundColor: "rgba(8, 14, 26, 0.85)",
                  borderColor: "rgba(255, 255, 255, 0.07)",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: node.color,
                    backgroundColor: `${node.color}15`,
                  }}
                >
                  <Icon size={12} />
                </div>
                <span className="font-mono text-xs font-semibold text-[#F3F1E8] tracking-wide whitespace-nowrap">
                  {node.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
