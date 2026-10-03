"use client";

import { FadeIn } from "./FadeIn";
import { Database, Bot, MonitorSmartphone, Sparkles } from "lucide-react";
import { ZenKoiPondCard, type CapabilityArea } from "./ZenKoiPondCard";

const capabilityAreas: CapabilityArea[] = [
  {
    num: "01",
    title: "Enterprise ETL & SAP Ecosystems",
    subtitle: "SAP BODS 4.3 & Cloud Migration",
    desc: "Architecting robust enterprise ETL pipelines using SAP BODS 4.3, secure AWS S3 target loading, and automated S/4HANA cloud migration routines.",
    points: [
      "SAP BODS 4.3 ETL Pipelines & AWS S3 Target Loading (IDoc / BAPI)",
      "SAP BW Process Chains & S/4HANA Migration (LTMOM, LSMW, LTMC)",
      "SCD Type 1 & 2 Dimensions with SQL Server Data Reconciliation",
    ],
    accent: "#F47A18", // Warm Solar Bronze & Gold
    borderColor: "rgba(244, 122, 24, 0.40)",
    icon: Database,
    systemTag: "SAP BODS 4.3 // S/4HANA",
    fishCount: 1, // 1 peaceful baby Koi
  },
  {
    num: "02",
    title: "Autonomous AI Agent Systems",
    subtitle: "Deterministic DAG Frameworks",
    desc: "Building production Python multi-agent orchestrators with dynamic skill routing, persistent ChromaDB vector memory, and Ollama local LLM execution.",
    points: [
      "AnsiQ multi-agent DAG framework with 787 verified unit tests",
      "Local inference execution with Ollama (Llama 3, Mistral) & Cloud APIs",
      "Persistent memory with SQLite FTS5 indexing & ChromaDB vector search",
    ],
    accent: "#F47A18", // Solar Amber (single brand accent)
    borderColor: "rgba(244, 122, 24, 0.40)",
    icon: Bot,
    systemTag: "MULTI-AGENT // DAG NODES",
    fishCount: 2, // 2 companion baby Kois
  },
  {
    num: "03",
    title: "Full-Stack Products & Desktop ERP",
    subtitle: "Zero-Latency Software Engineering",
    desc: "Engineering high-reliability software ranging from offline-first healthcare desktop ERPs to real-time AI ATS resume engineering SaaS web platforms.",
    points: [
      "AnPharmacy: Electron + SQLite WAL distribution ERP with FEFO logic",
      "Anasify: AI ATS resume optimizer with strict truth verification",
      "Next.js 15, React 19, TypeScript, Prisma, and Tailwind CSS architectures",
    ],
    accent: "#F47A18", // Solar Amber (single brand accent)
    borderColor: "rgba(244, 122, 24, 0.40)",
    icon: MonitorSmartphone,
    systemTag: "ZERO-LATENCY // WAL ERP",
    fishCount: 3, // 3 playful baby Kois
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#050811] py-24 sm:py-28 md:py-32 text-[#F3F1E8] z-20 select-none border-t border-white/[0.08] font-[family-name:var(--font-sans)]"
    >
      {/* Concept 1: Pure Minimal Obsidian & Architectural Blueprint Grid (No AI Color Blobs) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.035]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
              <path d="M 38 40 L 42 40 M 40 38 L 40 42" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 space-y-12 sm:space-y-14 relative z-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col items-start space-y-3 max-w-3xl">
            <FadeIn y={20} delay={0.1} duration={0.8}>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#F47A18] uppercase">
                <Sparkles size={13} />
                <span>// ABOUT ME · ARCHITECTURAL FOUNDATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[#F3F1E8] font-[family-name:var(--font-outfit)] tracking-tight mt-2">
                Engineering &amp; Vision
              </h2>
            </FadeIn>

            <FadeIn y={15} delay={0.2} duration={0.8}>
              <p className="text-[#B8C4CC] text-sm sm:text-base font-light leading-relaxed max-w-2xl font-[family-name:var(--font-plus-jakarta)]">
                Bridging enterprise-grade data architecture and autonomous AI agent systems. Grounded in mission-critical reliability, verified deterministic logic, and fluid zero-latency systems.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* 3 Zen Water Pond Capability Cards: Full Size, Spacious & Proportional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {capabilityAreas.map((area, i) => (
            <FadeIn key={area.num} y={20} delay={0.2 + i * 0.12} duration={0.8} className="h-full">
              <ZenKoiPondCard area={area} index={i} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
