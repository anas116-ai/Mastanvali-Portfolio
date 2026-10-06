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
  GitBranch,
  Terminal,
} from "lucide-react";

/**
 * Borderless inventory tape. No capsules, no chips, no boxes: a single run of
 * words separated by hairline slashes, drifting in two counter-moving rows.
 * Accents come from the site's lime ramp family.
 */
const row1Nodes = [
  { icon: Database, name: "SAP BODS 4.3", color: "#DCFD3C" },
  { icon: GitBranch, name: "Multi-Agent DAGs", color: "#8A8918" },
  { icon: Database, name: "SQL Data Architecture", color: "#C9C8C3" },
  { icon: Cpu, name: "Python 3.12 and Async APIs", color: "#DCFD3C" },
  { icon: Code2, name: "Next.js 15 and React 19", color: "#C9C8C3" },
  { icon: Workflow, name: "Enterprise ETL Workflows", color: "#CDFD02" },
  { icon: Bot, name: "Autonomous LLM Agents", color: "#8A8918" },
];

const row2Nodes = [
  { icon: MonitorSmartphone, name: "Offline Desktop ERP", color: "#C9C8C3" },
  { icon: Zap, name: "Ollama and Local LLMs", color: "#CDFD02" },
  { icon: Server, name: "SAP HANA and S/4HANA", color: "#DCFD3C" },
  { icon: Layers, name: "ServiceNow and ITSM", color: "#C9C8C3" },
  { icon: Binary, name: "RAG Retrieval Systems", color: "#8A8918" },
  { icon: ShieldCheck, name: "Tesseract OCR Engines", color: "#DCFD3C" },
  { icon: Terminal, name: "SQLite WAL and Vector Indexing", color: "#8A8918" },
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
        setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.2);
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

  const renderRow = (nodes: typeof row1Nodes, keyPrefix: string, direction: number) => (
    <div
      className="flex items-center w-max"
      style={{
        transform: `translateX(${direction * offset - 300}px)`,
        willChange: "transform",
        transition: "transform 0.12s linear",
      }}
    >
      {nodes.map((node, idx) => {
        const Icon = node.icon;
        return (
          <span key={`${keyPrefix}-${idx}`} className="flex items-center shrink-0">
            <span className="flex items-center gap-2 px-6 sm:px-8 transition-colors duration-500 group">
              <Icon
                size={13}
                className="shrink-0 opacity-80"
                style={{ color: node.color }}
              />
              <span className="font-[family-name:var(--font-geist-sans)] text-[13px] sm:text-sm font-normal tracking-[-0.005em] text-[#8C8C86] hover:text-[#C9C8C3] whitespace-nowrap transition-colors duration-500">
                {node.name}
              </span>
            </span>
            <span className="text-[#35353A] select-none text-[13px]">/</span>
          </span>
        );
      })}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-transparent py-7 sm:py-8 border-y border-[rgba(245,242,235,0.06)] select-none"
      aria-label="Technologies and platforms"
    >
      {/* Feathered ends so the tape dissolves rather than stopping */}
      <div className="absolute left-0 top-0 bottom-0 w-28 sm:w-40 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/92 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-40 bg-gradient-to-l from-[#0A0A0B] via-[#0A0A0B]/92 to-transparent z-20 pointer-events-none" />

      <div className="flex flex-col gap-2.5">
        {renderRow(quadrupledRow1, "r1", 1)}
        {renderRow(quadrupledRow2, "r2", -1)}
      </div>
    </section>
  );
}
