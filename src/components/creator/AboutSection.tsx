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
    accent: "#E06D20", // Burnished Amber
    borderColor: "rgba(224, 109, 32, 0.30)",
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
    accent: "#E06D20", // Burnished Amber
    borderColor: "rgba(224, 109, 32, 0.30)",
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
    accent: "#E06D20", // Burnished Amber
    borderColor: "rgba(224, 109, 32, 0.30)",
    icon: MonitorSmartphone,
    systemTag: "ZERO-LATENCY // WAL ERP",
    fishCount: 3, // 3 playful baby Kois
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#07090E] py-24 sm:py-28 md:py-32 text-[#F8FAFC] z-20 select-none border-t border-white/[0.08] font-[family-name:var(--font-sans)]"
    >
      {/* Subtle Architectural Atmosphere (Zero Cheap Wireframe Checks) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(224,109,32,0.025)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 space-y-12 sm:space-y-14 relative z-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col items-start space-y-3 max-w-3xl">
            <FadeIn y={20} delay={0.1} duration={0.8}>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-[#E06D20] uppercase">
                <Sparkles size={13} />
                <span>// ABOUT ME · ARCHITECTURAL FOUNDATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[#F8FAFC] font-[family-name:var(--font-outfit)] tracking-tight mt-2">
                Engineering &amp; Vision
              </h2>
            </FadeIn>

            <FadeIn y={15} delay={0.2} duration={0.8}>
              <p className="text-[#94A3B8] text-sm sm:text-base font-light leading-relaxed max-w-2xl font-[family-name:var(--font-plus-jakarta)]">
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
