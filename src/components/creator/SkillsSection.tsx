"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./FadeIn";
import {
  Database,
  Bot,
  MonitorSmartphone,
  BookOpen,
  X,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  type LucideIcon,
} from "lucide-react";

interface MasterBook {
  no: string;
  badge: string;
  domainCode: string;
  title: string;
  whatIDo: string;
  accent: string;
  coverGrad: string;
  icon: LucideIcon;
  topRoles: string[];
  tech: string[];
  sla: string;
  archPhilosophy: string;
}

const masterBooks: MasterBook[] = [
  {
    no: "01",
    badge: "ENTERPRISE DATA",
    domainCode: "SYS-DATA-01",
    title: "SAP BODS & Enterprise Data Systems",
    whatIDo: "Designing high-throughput ETL data pipelines, SAP S/4HANA & ECC migration, SQL reconciliation, and 24/7 mission-critical SLA governance.",
    accent: "#E06D20", // Burnished Amber
    coverGrad: "from-[#07090E] via-[#0E121B] to-[#07090E]",
    icon: Database,
    topRoles: [
      "SAP BODS 4.3 production batch & real-time ETL jobs, workflows, and data stores.",
      "SAP ECC & S/4HANA master/transaction extraction via IDoc, BAPI, and tables.",
      "Slowly Changing Dimensions (SCD Type 1 & 2) with SQL Server reconciliation.",
      "SAP BW Process Chain monitoring, deadlock prevention & 24/7 ServiceNow incident triage.",
    ],
    tech: ["SAP BODS 4.3", "SAP ECC", "SAP BW", "S/4HANA", "SQL Server", "ServiceNow", "SCD 1 & 2"],
    sla: "99.98% Enterprise Production Uptime",
    archPhilosophy: "Mission-critical enterprise data flows demand zero-loss reconciliation, deterministic audit trails, and 24/7 SLA governance. Architected to bridge legacy ECC ERPs with modern S/4HANA and cloud staging.",
  },
  {
    no: "02",
    badge: "AI MULTI-AGENT",
    domainCode: "SYS-AGENT-02",
    title: "Autonomous Multi-Agent Architecture",
    whatIDo: "Orchestrating Directed Acyclic Graph (DAG) agent frameworks, local open-source LLM inference execution, and persistent episodic semantic memory.",
    accent: "#E06D20", // Burnished Amber
    coverGrad: "from-[#07090E] via-[#0E121B] to-[#07090E]",
    icon: Bot,
    topRoles: [
      "Directed Acyclic Graph (DAG) multi-agent coordination with intelligent task routing.",
      "Local inference execution via Ollama (Llama 3, Mistral) & multi-provider LLM logic.",
      "Persistent episodic semantic memory via ChromaDB vector retrieval without re-prompting.",
      "Modular framework architecture supporting dynamic tool calling & autonomous recovery.",
    ],
    tech: ["Python 3.12", "FastAPI", "DAG Engine", "Ollama", "ChromaDB", "Vector RAG", "Prompt Arch"],
    sla: "Verified Autonomous Multi-Agent DAG",
    archPhilosophy: "Next-generation intelligence is defined by deterministic multi-agent graphs, dynamic tool dispatch, and local vector retrieval. Built for zero-leak privacy and self-healing agent pipelines.",
  },
  {
    no: "03",
    badge: "FULL-STACK SYSTEMS",
    domainCode: "SYS-STACK-03",
    title: "Modern Full-Stack & Desktop Systems",
    whatIDo: "Engineering Next.js 15 production web platforms, zero-latency Electron desktop software with SQLite WAL mode, and automated Git CI/CD pipelines.",
    accent: "#E06D20", // Burnished Amber
    coverGrad: "from-[#07090E] via-[#0E121B] to-[#07090E]",
    icon: MonitorSmartphone,
    topRoles: [
      "Next.js 15 App Router & React 19 web platforms with Prisma ORM & PostgreSQL.",
      "Electron + React 19 cross-platform desktop ERP with SQLite WAL mode zero-latency.",
      "Automated FEFO (First-Expired, First-Out) inventory engine & Tesseract.js invoice OCR.",
      "GitHub REST/GraphQL API telemetry, webhook listeners, and 1-click multi-fork sync.",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Electron", "SQLite WAL", "Prisma", "GitHub APIs"],
    sla: "Zero-Latency Edge Production",
    archPhilosophy: "Seamless user experiences require offline-first desktop resilience combined with edge-rendered web microservices. Engineered with strict type-safety and sub-millisecond local reads.",
  },
];

export function SkillsSection() {
  const [openedBook, setOpenedBook] = useState<number | null>(null);

  // Keyboard navigation for open book (Esc to close, Left/Right arrows to flip volumes)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (openedBook === null) return;
      if (e.key === "Escape") setOpenedBook(null);
      if (e.key === "ArrowLeft") {
        setOpenedBook((prev) => (prev !== null ? (prev - 1 + masterBooks.length) % masterBooks.length : null));
      }
      if (e.key === "ArrowRight") {
        setOpenedBook((prev) => (prev !== null ? (prev + 1) % masterBooks.length : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openedBook]);

  return (
    <section
      id="skills"
      className="relative w-full bg-transparent py-20 sm:py-24 text-[#F8FAFC] z-20 select-none border-t border-white/10 font-[family-name:var(--font-sans)]"
    >

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 space-y-12 relative z-20">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2.5 max-w-3xl">
          <FadeIn y={15} delay={0.1} duration={0.7}>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.22em] text-[#E06D20] uppercase">
              <Sparkles size={13} />
              <span>// CORE DISCIPLINES · 3 ENGINEERING DOSSIERS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F8FAFC] font-[family-name:var(--font-outfit)] tracking-tight mt-1.5">
              Technical Capabilities
            </h2>
          </FadeIn>

          <FadeIn y={15} delay={0.2} duration={0.7}>
            <p className="text-[#94A3B8] text-xs sm:text-sm font-light leading-relaxed max-w-2xl font-[family-name:var(--font-plus-jakarta)]">
              The 3 foundational pillars of my engineering practice — spanning enterprise SAP data infrastructure, autonomous AI multi-agent orchestration, and modern full-stack systems. Click any dossier to open its two-page architectural spread and inspect verified deliverables.
            </p>
          </FadeIn>
        </div>

        {/* ─── 1. MODERN HOLOGRAPHIC 3D TECH DOSSIER FOLIOS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8 justify-items-center [perspective:1200px]">
          {masterBooks.map((book, idx) => {
            const Icon = book.icon;

            return (
              <div key={book.no} className="flex justify-center w-full">
                {/* Modern 3D Holographic Dossier Card */}
                <motion.div
                  whileHover={{ y: -10, rotateY: -6, rotateX: 3, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 24 }}
                  onClick={() => setOpenedBook(idx)}
                  className="relative group cursor-pointer select-none w-full max-w-[320px] h-[400px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#E06D20]/60 bg-[#0E121B]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(224,109,32,0.12)] transition-all duration-300 flex flex-col justify-between px-6 py-6 pb-7"
                >
                  {/* Subtle Left Luminous Spine Indicator */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2"
                    style={{
                      background: `linear-gradient(to bottom, ${book.accent}, ${book.accent}66, transparent)`,
                      boxShadow: `0 0 12px ${book.accent}50`,
                    }}
                  />

                  {/* Ambient Glow Pool inside Card */}
                  <div
                    className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: book.accent }}
                  />

                  {/* Top Header: System Code & Active Status */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: book.accent }} />
                      <span className="font-mono text-xs font-bold tracking-widest text-[#F8FAFC]">
                        {book.domainCode}
                      </span>
                    </div>
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 uppercase tracking-wider font-semibold"
                      style={{ color: book.accent }}
                    >
                      {book.badge}
                    </span>
                  </div>

                  {/* Middle: Icon & Title & Scope */}
                  <div className="relative z-10 space-y-3.5 my-auto">
                    {/* Modern Squircle Icon Badge with Back-Glow */}
                    <div
                      className="w-13 h-13 rounded-xl flex items-center justify-center border border-white/15 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${book.accent}25, rgba(14,18,27,0.8))`,
                      }}
                    >
                      <Icon size={24} style={{ color: book.accent }} />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] tracking-tight leading-snug font-[family-name:var(--font-outfit)] group-hover:text-[#E06D20] transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] font-light leading-relaxed line-clamp-3 font-[family-name:var(--font-plus-jakarta)]">
                        {book.whatIDo}
                      </p>
                    </div>

                    {/* Tech Preview Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {book.tech.slice(0, 3).map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[#94A3B8]"
                        >
                          {t}
                        </span>
                      ))}
                      {book.tech.length > 3 && (
                        <span className="text-[11px] font-mono px-1.5 py-0.5 text-white/40">
                          +{book.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="relative z-10 pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#94A3B8] tracking-wider uppercase">
                      REF: {book.no}
                    </span>

                    <div
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wide transition-all group-hover:translate-x-1"
                      style={{ color: book.accent }}
                    >
                      <span>OPEN DOSSIER</span>
                      <BookOpen size={14} />
                    </div>
                  </div>

                  {/* Top-Right Corner Hairline Accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                    <div className="w-full h-full border-t border-r border-white/20 rounded-tr-2xl" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 2. MODERN TWO-PAGE ARCHITECTURAL DOSSIER MODAL ─── */}
      <AnimatePresence>
        {openedBook !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 select-none">
            {/* Dark Backdrop with Luxury Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenedBook(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Central Two-Page Modern Architectural Dossier Folio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border border-white/15 bg-[#0E121B]/98 backdrop-blur-3xl shadow-[0_40px_120px_rgba(0,0,0,0.98),0_0_80px_rgba(224,109,32,0.07)] z-10 overflow-hidden"
            >
              {/* TOP DOSSIER TOOLBAR */}
              <div className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07090E] z-20">
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/[0.08] tracking-widest"
                    style={{ color: masterBooks[openedBook].accent }}
                  >
                    {masterBooks[openedBook].domainCode}
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8] hidden sm:inline">
                    ARCHITECTURAL DOSSIER · {masterBooks[openedBook].badge}
                  </span>
                </div>

                {/* Flip Dossier Navigator */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenedBook((prev) => (prev !== null ? (prev - 1 + masterBooks.length) % masterBooks.length : 0));
                    }}
                    className="p-1.5 px-2.5 rounded-lg bg-white/[0.06] hover:bg-white/15 text-[#94A3B8] hover:text-[#F8FAFC] transition-all text-xs font-mono flex items-center gap-1 cursor-pointer"
                    title="Previous Dossier (Left Arrow)"
                  >
                    <ChevronLeft size={14} />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <span className="text-xs font-mono text-white/60 px-1.5">
                    {openedBook + 1} / {masterBooks.length}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenedBook((prev) => (prev !== null ? (prev + 1) % masterBooks.length : 0));
                    }}
                    className="p-1.5 px-2.5 rounded-lg bg-white/[0.06] hover:bg-white/15 text-[#94A3B8] hover:text-[#F8FAFC] transition-all text-xs font-mono flex items-center gap-1 cursor-pointer"
                    title="Next Dossier (Right Arrow)"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={14} />
                  </button>

                  <div className="h-4 w-px bg-white/15 mx-1" />

                  {/* Close Book Button */}
                  <button
                    onClick={() => setOpenedBook(null)}
                    className="p-1.5 px-2.5 rounded-lg bg-white/[0.08] hover:bg-[#E06D20] text-[#94A3B8] hover:text-[#07090E] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                    title="Close Book (Esc)"
                    aria-label="Close Book"
                  >
                    <span className="hidden sm:inline">Close</span>
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* ─── TWO-PAGE SPREAD BODY (Left Panel + Central Laser Divider + Right Panel) ─── */}
              <div className="relative w-full flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 bg-[#07090E]">
                {/* Visual Central Luminous Laser Divider (md and up) */}
                <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none z-30">
                  <div className="w-full h-full bg-gradient-to-r from-black/60 via-black/90 to-black/60" />
                  <div
                    className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-[1.5px] opacity-70"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${masterBooks[openedBook].accent}, transparent)`,
                      boxShadow: `0 0 10px ${masterBooks[openedBook].accent}`,
                    }}
                  />
                </div>

                {/* ── LEFT PANEL (FOLIO 01: SYSTEM ARCHITECTURE & THESIS) ── */}
                <div className="relative p-6 sm:p-8 md:pr-10 flex flex-col justify-between space-y-6 border-b md:border-b-0 md:border-r border-white/10 bg-gradient-to-br from-[#07090E] to-[#0E121B]">
                  <div className="space-y-5">
                    {/* Top Folio Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: masterBooks[openedBook].accent }}>
                        <BookOpen size={14} />
                        <span className="tracking-widest">
                          FOLIO 01 // ARCHITECTURAL SPECIFICATION
                        </span>
                      </div>
                      <span className="text-xs font-mono text-white/50 tracking-wider">
                        REF: {masterBooks[openedBook].domainCode}
                      </span>
                    </div>

                    {/* Domain Title & Icon */}
                    <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                      <div
                        className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0 border border-white/20 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${masterBooks[openedBook].accent}30, #0E121B)`,
                        }}
                      >
                        {React.createElement(masterBooks[openedBook].icon, { size: 24, style: { color: masterBooks[openedBook].accent } })}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono tracking-widest uppercase font-bold" style={{ color: masterBooks[openedBook].accent }}>
                          {masterBooks[openedBook].badge}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#F8FAFC] font-[family-name:var(--font-outfit)] leading-snug">
                          {masterBooks[openedBook].title}
                        </h3>
                      </div>
                    </div>

                    {/* Scope of Engineering */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-mono tracking-wider uppercase font-semibold text-[#94A3B8]">
                        // SCOPE OF PRACTICE &amp; EXECUTION
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#94A3B8] font-light leading-relaxed font-[family-name:var(--font-plus-jakarta)]">
                        {masterBooks[openedBook].whatIDo}
                      </p>
                    </div>

                    {/* Architectural Thesis */}
                    <div className="space-y-2 p-4 rounded-xl bg-black/50 border border-white/[0.1] relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 inset-y-0" style={{ backgroundColor: masterBooks[openedBook].accent }} />
                      <div className="text-[10.5px] font-mono tracking-wider uppercase font-semibold pl-1" style={{ color: masterBooks[openedBook].accent }}>
                        // ARCHITECTURAL THESIS
                      </div>
                      <p className="text-xs text-[#F8FAFC] font-light leading-relaxed italic pl-1">
                        &ldquo;{masterBooks[openedBook].archPhilosophy}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Left Bottom SLA Badge */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono">
                      <ShieldCheck size={14} style={{ color: masterBooks[openedBook].accent }} />
                      <span className="text-[#F8FAFC] font-medium">{masterBooks[openedBook].sla}</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/50 tracking-wider">FOLIO · 01</span>
                  </div>
                </div>

                {/* ── RIGHT PANEL (FOLIO 02: VERIFIED DELIVERABLES & TECH STACK) ── */}
                <div className="relative p-6 sm:p-8 md:pl-10 flex flex-col justify-between space-y-6 bg-gradient-to-bl from-[#07090E] to-[#0E121B]">
                  <div className="space-y-4">
                    {/* Top Folio Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: masterBooks[openedBook].accent }}>
                        <Sparkles size={14} />
                        <span className="tracking-widest">
                          FOLIO 02 // PRODUCTION DELIVERABLES
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#E06D20]/10 text-[#E06D20] border border-[#E06D20]/20 font-bold tracking-wider">
                        VERIFIED ACTIVE
                      </span>
                    </div>

                    {/* 4 Core Deliverables */}
                    <div className="space-y-2.5 pt-1">
                      <div className="text-[11px] font-mono tracking-wider uppercase font-semibold text-[#94A3B8]">
                        // KEY RESPONSIBILITIES &amp; DELIVERABLES
                      </div>
                      <div className="space-y-2.5">
                        {masterBooks[openedBook].topRoles.map((role, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-[12.5px] leading-relaxed text-[#F8FAFC]">
                            <CheckCircle2
                              size={15}
                              className="shrink-0 mt-0.5"
                              style={{ color: masterBooks[openedBook].accent }}
                            />
                            <span className="font-light">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Production Tech Stack */}
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-mono tracking-wider uppercase font-semibold text-[#94A3B8]">
                        // PRODUCTION ENVIRONMENT STACK
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {masterBooks[openedBook].tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[#F8FAFC] hover:border-white/20 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Modern Holographic Tech Verification Badge */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider block">
                          SYSTEM VERIFICATION
                        </span>
                        <span className="text-xs font-mono font-bold text-[#F8FAFC] tracking-wide block">
                          AUTHENTICATED PRODUCTION ARTIFACT
                        </span>
                        <span className="text-[9.5px] font-mono text-[#94A3B8] block">
                          LEVEL 4 ENGINEERING EXECUTION
                        </span>
                      </div>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/20 shadow-md shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${masterBooks[openedBook].accent}30, #000000)`,
                        }}
                      >
                        <Award size={20} style={{ color: masterBooks[openedBook].accent }} />
                      </div>
                    </div>
                  </div>

                  {/* Right Bottom Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10.5px] font-mono text-white/50 tracking-wider">
                      OFFICIAL DOSSIER · CONFIDENTIAL
                    </span>
                    <span className="text-[10px] font-mono text-white/50 tracking-wider">FOLIO · 02</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
