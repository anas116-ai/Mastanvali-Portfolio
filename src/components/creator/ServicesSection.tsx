"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";
import {
  Database,
  Bot,
  MonitorSmartphone,
  Cpu,
  Server,
  ShieldCheck,
  BookOpen,
  X,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface ServiceCard {
  no: string;
  title: string;
  badge: string;
  desc: string;
  accent: string;
  coverGrad: string;
  icon: LucideIcon;
  topRoles: string[];
  tech: string[];
  sla: string;
}

const original6Services: ServiceCard[] = [
  {
    no: "01",
    title: "Enterprise ETL & Data Pipeline Engineering",
    badge: "ENTERPRISE CORE",
    desc: "Architecting high-throughput data extraction, historical SCD Type 1 & 2 dimensional pipelines, and automated reconciliation across Fortune 500 SAP infrastructures.",
    accent: "#C8702A",
    coverGrad: "from-[#100C08] via-[#0A0806] to-[#060404]",
    icon: Database,
    topRoles: [
      "SAP BODS 4.3 production batch & real-time ETL jobs, workflows, and data flows.",
      "SAP ECC & S/4HANA master/transaction extraction via IDocs, BAPIs, and tables.",
      "Slowly Changing Dimensions (SCD Type 1 & 2) with SQL Server reconciliation.",
      "SAP BW Process Chain monitoring, preventing job deadlocks & ensuring delta SLAs.",
    ],
    tech: ["SAP BODS 4.3", "AWS S3", "SAP BW", "S/4HANA", "SQL Server", "SCD 1 & 2"],
    sla: "100% Zero-Loss Delta SLA",
  },
  {
    no: "02",
    title: "Autonomous Multi-Agent Architecture",
    badge: "AI INTELLIGENCE",
    desc: "Designing and orchestrating autonomous multi-agent DAG frameworks that coordinate specialized LLM agents for non-deterministic code and data workflows.",
    accent: "#C8702A",
    coverGrad: "from-[#0E0C12] via-[#090810] to-[#040307]",
    icon: Bot,
    topRoles: [
      "Directed Acyclic Graph (DAG) multi-agent coordination with intelligent task routing.",
      "Local inference execution via Ollama (Llama 3, Mistral) & multi-provider LLM logic.",
      "Persistent episodic semantic memory via ChromaDB vector retrieval without re-prompting.",
      "Modular framework architecture supporting dynamic tool calling & autonomous recovery.",
    ],
    tech: ["Python 3.12", "DAG Engine", "Ollama", "ChromaDB", "Llama 3", "787 Tests"],
    sla: "787 Verified Unit Tests",
  },
  {
    no: "03",
    title: "Offline-First Desktop Software & ERP",
    badge: "SOFTWARE SYSTEMS",
    desc: "Engineering zero-latency cross-platform desktop applications with local ACID compliance via SQLite in WAL mode and hardware-bound distribution licenses.",
    accent: "#C8702A",
    coverGrad: "from-[#080E0E] via-[#050A0A] to-[#020606]",
    icon: MonitorSmartphone,
    topRoles: [
      "Electron + React 19 cross-platform desktop ERP with zero-latency response time.",
      "Local ACID compliance & high-performance SQLite in WAL (Write-Ahead Logging) mode.",
      "Automated FEFO (First-Expired, First-Out) batch allocation algorithm for inventory.",
      "Embedded client-side Tesseract.js invoice OCR document parsing & extraction.",
    ],
    tech: ["Electron", "React 19", "better-sqlite3", "Tesseract OCR", "WAL Mode", "FEFO"],
    sla: "Offline-First Zero Latency",
  },
  {
    no: "04",
    title: "Modern Full-Stack AI SaaS Platforms",
    badge: "PRODUCT BUILDING",
    desc: "Building production web applications using Next.js 15, React 19, TypeScript, PostgreSQL, and multi-model LLM APIs with strict truth-verification engines.",
    accent: "#C8702A",
    coverGrad: "from-[#080D16] via-[#050910] to-[#02040A]",
    icon: Cpu,
    topRoles: [
      "Next.js 15 App Router, React 19 Server Actions, and high-speed edge streaming.",
      "Prisma ORM schema design with strictly typed PostgreSQL database relations.",
      "Multi-model AI fallback orchestration with automated schema validation.",
      "Zero-hallucination candidate truth verification protocols & real-time ATS scoring.",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    sla: "Sub-100ms Edge TTFB",
  },
  {
    no: "05",
    title: "Developer Workflow & Git Telemetry",
    badge: "DEV PRODUCTIVITY",
    desc: "Custom productivity systems designed for developer workflows, interactive Git branch trees, automated PR code review scoring, and webhook triggers.",
    accent: "#C8702A",
    coverGrad: "from-[#080E0A] via-[#050A07] to-[#020503]",
    icon: Server,
    topRoles: [
      "Real-time GitHub REST & GraphQL API integrations monitoring upstream repositories.",
      "Interactive branch synchronization tree visualization with commit drift diffs.",
      "Automated 1-click multi-fork sync engine replacing manual git rebase routines.",
      "Real-time webhook listener pipelines enforcing automated CI/CD quality gates.",
    ],
    tech: ["GitHub APIs", "GraphQL", "Webhooks", "CI/CD Gates", "Git Trees", "Next.js"],
    sla: "Instant Webhook Feedback",
  },
  {
    no: "06",
    title: "Production Support & Incident Reliability",
    badge: "RELIABILITY SLA",
    desc: "Mission-critical production engineering for high-consequence enterprise environments with ITIL incident triage, root cause analysis, and automated checksums.",
    accent: "#C8702A",
    coverGrad: "from-[#0E1218] via-[#090C12] to-[#040609]",
    icon: ShieldCheck,
    topRoles: [
      "24/7 enterprise production support maintaining 99.98% SLA compliance for Fortune 500.",
      "ServiceNow incident ticket investigation, log analysis, and Root Cause Analysis (RCA).",
      "Source-to-Target Mapping (STTM) specifications & validation test case authoring.",
      "User Acceptance Testing (UAT) signoff governance & defect remediation verification.",
    ],
    tech: ["99.98% SLA", "ServiceNow", "ITIL Framework", "RCA Reports", "Data Checksums"],
    sla: "99.98% Enterprise Uptime",
  },
];

export function ServicesSection() {
  const [openedBook, setOpenedBook] = useState<number | null>(null);

  const toggleBook = (idx: number) => {
    setOpenedBook((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#06080D] py-20 sm:py-24 text-[#EEF0F3] z-20 select-none border-t border-white/[0.06] font-[family-name:var(--font-sans)]"
    >
      {/* Precision Blueprint Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.035]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="services-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
              <path d="M 38 40 L 42 40 M 40 38 L 40 42" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#services-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 space-y-12 relative z-20">
        {/* Section Header */}
        <div className="flex flex-col items-start space-y-2.5 max-w-3xl">
          <FadeIn y={15} delay={0.1} duration={0.7}>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.22em] text-[#C8702A]/80 uppercase">
              <Sparkles size={13} />
              <span>// ARCHITECTURAL CAPABILITIES · 6 HARDCOVER TOMES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EEF0F3] font-[family-name:var(--font-outfit)] tracking-tight mt-1.5">
              Solutions &amp; Services
            </h2>
          </FadeIn>

          <FadeIn y={15} delay={0.2} duration={0.7}>
            <p className="text-[#8A97A8] text-xs sm:text-sm font-light leading-relaxed max-w-2xl font-[family-name:var(--font-plus-jakarta)]">
              The 6 core engineering capabilities. Click any book to open its cover right in-place and inspect verified production roles, deliverables, and technical stack.
            </p>
          </FadeIn>
        </div>

        {/* ─── 2 ROWS OF 3 HARDCOVER BOOKS (IN-PLACE OPEN & FLIP) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 sm:gap-x-8 justify-items-center [perspective:1200px]">
          {original6Services.map((card, idx) => {
            const Icon = card.icon;
            const isOpen = openedBook === idx;

            return (
              <div key={card.no} className="flex justify-center w-full">
                {/* 3D BOOK CONTAINER — Compact, Proportional (w: 255px, h: 345px) */}
                <motion.div
                  whileHover={!isOpen ? { y: -8, rotateY: -10, rotateX: 2, scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 350, damping: 24 }}
                  onClick={() => toggleBook(idx)}
                  className="relative group cursor-pointer select-none"
                  style={{
                    width: "255px",
                    height: "345px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Under-book Contact Shadow */}
                  <div
                    className="absolute -bottom-3 inset-x-3 h-5 rounded-full blur-md opacity-40 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.95) 0%, ${card.accent}35 45%, transparent 80%)`,
                    }}
                  />

                  {/* 1. Fore-edge: Dark Antiqued Slate Paper Block on the Right (No White Glare!) */}
                  <div
                    className="absolute right-0 top-1.5 bottom-1.5 w-3.5 bg-[#141A24] rounded-r-sm z-0 pointer-events-none shadow-[inset_2px_0_4px_rgba(0,0,0,0.6)] flex flex-col justify-around px-0.5 overflow-hidden border-y border-r border-[#20293A]"
                    style={{
                      transform: "translateX(7px) translateZ(-4px)",
                    }}
                  >
                    <div className="w-full h-[1px] bg-[#2C384E]/70" />
                    <div className="w-full h-[1px] bg-[#2C384E]/70" />
                    <div className="w-full h-[1px] bg-[#2C384E]/70" />
                    <div className="w-full h-[1px] bg-[#2C384E]/70" />
                    <div className="w-full h-[1px] bg-[#2C384E]/70" />
                    <div className="w-full h-[1px] bg-[#2C384E]/70" />
                  </div>

                  {/* 2. Top & Bottom Edge Inset Dark Paper Trim */}
                  <div
                    className="absolute top-0 right-1.5 w-[215px] h-1.5 bg-[#121720] border-b border-[#20293A]/50 pointer-events-none rounded-t-sm"
                    style={{ transform: "translateZ(-3px)" }}
                  />
                  <div
                    className="absolute bottom-0 right-1.5 w-[215px] h-1.5 bg-[#121720] border-t border-[#20293A]/50 pointer-events-none rounded-b-sm"
                    style={{ transform: "translateZ(-3px)" }}
                  />

                  {/* 3. HARDCOVER CASE: IN-PLACE REVEAL (FRONT COVER vs OPENED INNER PAGE) */}
                  <div
                    className="relative w-full h-full rounded-r-md rounded-l-[3px] overflow-hidden flex flex-col justify-between border border-white/[0.08] z-10 transition-colors duration-300"
                    style={{
                      background: isOpen
                        ? "linear-gradient(150deg, #0C0F18 0%, #06080D 100%)"
                        : `linear-gradient(145deg, ${card.coverGrad})`,
                      boxShadow: isOpen
                        ? `0 20px 45px rgba(0,0,0,0.95), 0 0 25px ${card.accent}25, inset 0 0 1px rgba(255,255,255,0.15)`
                        : "0 12px 30px rgba(0,0,0,0.85), -5px 0 12px rgba(0,0,0,0.75)",
                    }}
                  >
                    {/* 3A. Authentic 3D Book Spine on Left Edge */}
                    <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/90 via-black/45 to-transparent z-20 pointer-events-none">
                      <div className="absolute top-[22%] left-0 w-full h-[2.5px] bg-gradient-to-r from-black via-white/25 to-black shadow-sm" />
                      <div className="absolute top-[48%] left-0 w-full h-[2.5px] bg-gradient-to-r from-black via-white/25 to-black shadow-sm" />
                      <div className="absolute top-[74%] left-0 w-full h-[2.5px] bg-gradient-to-r from-black via-white/25 to-black shadow-sm" />
                    </div>

                    {/* 3B. Vertical Debossed Hinge Joint */}
                    <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-black/70 shadow-[1px_0_0_rgba(255,255,255,0.06)] z-20 pointer-events-none" />

                    {/* ── STATE A: FRONT COVER (When closed) ── */}
                    {!isOpen && (
                      <motion.div
                        key="front-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative z-10 pl-9 pr-4 pt-4 pb-4 flex-1 flex flex-col justify-between h-full"
                      >
                        {/* Top: Numeral + Badge */}
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                          <div className="flex items-center gap-2">
                            <span
                              className="font-mono text-xl font-bold tracking-widest"
                              style={{
                                color: card.accent,
                                textShadow: `0 0 14px ${card.accent}50`,
                              }}
                            >
                              {card.no}
                            </span>
                            <span className="text-[8.5px] font-mono text-[#8A97A8] uppercase font-semibold">
                              {card.badge}
                            </span>
                          </div>
                          <Icon size={18} style={{ color: card.accent }} />
                        </div>

                        {/* Middle: Title & Description */}
                        <div className="space-y-2 py-1 my-auto">
                          <h3
                            className="text-sm sm:text-[15px] font-bold text-[#EEF0F3] tracking-tight leading-snug font-[family-name:var(--font-outfit)]"
                            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.95)" }}
                          >
                            {card.title}
                          </h3>

                          <p className="text-[11px] sm:text-[11.5px] text-[#8A97A8] font-light leading-relaxed line-clamp-3">
                            {card.desc}
                          </p>
                        </div>

                        {/* Bottom: SLA Metric & Open Action */}
                        <div className="pt-2.5 border-t border-white/[0.06] flex items-center justify-between">
                          <span className="text-[8.5px] font-mono text-[#C49A38] tracking-wider uppercase font-medium">
                            {card.sla}
                          </span>

                          <div
                            className="inline-flex items-center gap-1 text-[10.5px] font-mono font-medium tracking-wide transition-transform group-hover:translate-x-1"
                            style={{ color: card.accent }}
                          >
                            <span>OPEN</span>
                            <BookOpen size={12} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STATE B: IN-PLACE OPENED INNER PAGE (When clicked) ── */}
                    {isOpen && (
                      <motion.div
                        key="inner-page"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.25 }}
                        className="relative z-10 pl-8 pr-3.5 pt-3.5 pb-3.5 flex-1 flex flex-col justify-between h-full overflow-y-auto"
                      >
                        {/* Opened Page Header */}
                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-[#EEF0F3] font-bold">
                              {card.no}
                            </span>
                            <span className="text-[8.5px] font-mono text-[#C8702A] uppercase font-semibold">
                              TOP ROLES &amp; RESPONSIBILITIES
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenedBook(null);
                            }}
                            className="p-1 rounded-md bg-white/[0.08] hover:bg-white/[0.15] text-[#8A97A8] hover:text-[#EEF0F3] transition-colors"
                            aria-label="Close book"
                            title="Close Book"
                          >
                            <X size={13} />
                          </button>
                        </div>

                        {/* 4 Top Roles & Deliverables Bulleted */}
                        <div className="space-y-1.5 py-2">
                          {card.topRoles.map((role, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-1.5 text-[10.5px] leading-tight text-[#EEF0F3]">
                              <CheckCircle2
                                size={12}
                                className="shrink-0 mt-0.5"
                                style={{ color: card.accent }}
                              />
                              <span className="font-light">{role}</span>
                            </div>
                          ))}
                        </div>

                        {/* Opened Page Bottom: Tech Stack & Close button */}
                        <div className="pt-2 border-t border-white/[0.08] space-y-1.5">
                          <div className="flex flex-wrap gap-1">
                            {card.tech.slice(0, 4).map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[#EEF0F3]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-[9px] font-mono text-[#8A97A8] pt-1">
                            <span className="text-[#C8702A] font-semibold">{card.sla}</span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenedBook(null);
                              }}
                              className="cursor-pointer hover:underline text-[#EEF0F3] font-semibold flex items-center gap-0.5"
                            >
                              <span>CLOSE</span>
                              <span>✕</span>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* 3E. Silk Satin Bookmark Ribbon */}
                    <div
                      className="absolute -bottom-3 left-10 w-3 h-5.5 transition-transform duration-300 group-hover:translate-y-1 pointer-events-none z-30 shadow-md"
                      style={{
                        backgroundColor: card.accent,
                        clipPath: "polygon(0 0, 100% 0, 100% 82%, 50% 100%, 0 82%)",
                      }}
                    />

                    {/* Shimmer Sweep on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
