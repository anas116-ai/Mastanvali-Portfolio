"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { CheckCircle2, ExternalLink, Github, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { ShaderIgnitionButton, IgnitionColorVariant } from "@/components/ui/ShaderIgnitionButton";

interface ProjectItem {
  no: string;
  name: string;
  category: string;
  flow: string;
  simpleMeaning: string;
  whatItDoes: string[];
  keyHighlights: string[];
  repo: string;
  version: string;
  tags: string[];
  bannerImg: string;
  telemetry: string;
  stat1: string;
  stat2: string;
  accent: string;
}

const projectList: ProjectItem[] = [
  {
    no: "01",
    name: "AnPharmacy",
    category: "HEALTHCARE DISTRIBUTION ERP · OFFLINE-FIRST",
    flow: "Medicine → Purchase → Inventory → Batch → Expiry → Sales → Stock → Reports",
    simpleMeaning:
      "A comprehensive offline-first distribution ERP built for pharmacies to manage medicine inventory, batch allocation, and sales compliance without relying on active internet.",
    whatItDoes: [
      "FEFO (First-Expired, First-Out) automated batch allocation during sales",
      "Near-expiry proactive alerts preventing dispensing of expired stock",
      "OCR-driven invoice & bill scanning via embedded Tesseract.js",
      "Offline-first ACID local database persistence via SQLite in WAL mode",
      "Hardware-bound licensing, AES-256 automated backups & Excel import/export",
    ],
    keyHighlights: [
      "Offline-first ACID compliance via SQLite WAL mode with 0.00ms read latency",
      "Strict FEFO algorithm prevents selling expired medicine stock",
      "OCR camera & PDF bill parsing for instantaneous inventory stock-in",
    ],
    repo: "https://github.com/anas116-ai/AnPharmacy",
    version: "v3.2.0-stable",
    tags: ["Electron", "React 19", "better-sqlite3 WAL", "Tesseract.js OCR", "FEFO Engine", "TypeScript", "Tailwind CSS"],
    bannerImg: "/images/projects/anpharmacy_v2.jpg",
    telemetry: "ACID WAL · 0.00s Latency",
    stat1: "100% FEFO Safe",
    stat2: "Offline SQLite",
    accent: "#E06D20", // Burnished Amber
  },
  {
    no: "02",
    name: "Anasify",
    category: "AI ATS RESUME BUILDER & JOB DESCRIPTION MATCHER",
    flow: "Company Job Opening → JD Requirement Matching → 98% ATS Compatibility Score → Super Premium Resume → PDF Export",
    simpleMeaning:
      "A career tech platform offering super premium resume templates that parses company job openings, matches JD requirements with 98% ATS compatibility, and prevents AI hallucination via a strict Truth Verification Workflow.",
    whatItDoes: [
      "Super Premium Resume Templates: 12+ executive designs engineered for high-impact visual appeal and ATS readability",
      "Company Job Opening Matcher: Automatically aligns candidate qualifications to target job descriptions and requirements",
      "Applicant Tracking System (ATS) Score: Real-time 98% ATS compatibility score checking formatting and keyword density",
      "Truth Verification Protocol: Enforces candidate confirmation so AI never invents or hallucinates unpossessed skills",
      "One-click high-resolution ATS-friendly PDF and DOCX exports with OAuth version history",
    ],
    keyHighlights: [
      "Dual-panel workflow: Target JD requirements parser + Super premium resume template designer",
      "98% ATS compatibility score tested against Fortune 500 employer ATS filters",
      "Zero hallucination guarantee — authentic candidate experience only",
    ],
    repo: "https://github.com/anas116-ai/anasify",
    version: "v2.1.0-prod",
    tags: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "ATS Score Engine", "Tailwind CSS"],
    bannerImg: "/images/projects/anasify_v2.jpg",
    telemetry: "98% ATS Match Engine",
    stat1: "98% Target Score",
    stat2: "0 Hallucinations",
    accent: "#E06D20", // Burnished Amber
  },
  {
    no: "03",
    name: "AnsiQ",
    category: "AI MULTI-AGENT TASK ORCHESTRATION & PERSISTENT MEMORY",
    flow: "User Goal → Task Decomposition → Frontend / Backend / Database Agents → ChromaDB Memory Recall → Verification Gate",
    simpleMeaning:
      "An autonomous multi-agent framework that splits complex user goals across specialized agents (Frontend, Backend, Database) and features persistent memory in ChromaDB so it never forgets previously solved bugs and solutions.",
    whatItDoes: [
      "Task Decomposition: Splits complex goals into Frontend (React/UI), Backend (FastAPI), and Database (PostgreSQL) tasks",
      "Persistent Solution Memory: Stores past solved bugs and architectures in ChromaDB so it never has to debug the same error twice",
      "Local inference execution via Ollama (Llama 3) with zero cloud telemetry or recurring API costs",
      "Dynamic DAG state management with automated error isolation and parallel execution",
      "787 automated unit and integration tests verifying 100% deterministic coordination",
    ],
    keyHighlights: [
      "Specialized worker agent delegation: Frontend, Backend, and Database parallel streams",
      "ChromaDB solution recall: Automatically retrieves and applies previous bug fixes",
      "787 automated unit/integration tests with zero hallucination leaks",
    ],
    repo: "https://github.com/anas116-ai/AnsiQ",
    version: "v1.8.4-core",
    tags: ["Python 3.12+", "FastAPI", "Ollama", "Multi-Agent DAG", "ChromaDB", "Task Splitting", "Persistent Memory"],
    bannerImg: "/images/projects/ansiq_v3.jpg",
    telemetry: "Persistent Memory DAG",
    stat1: "787 Tests Pass",
    stat2: "Ollama Llama-3",
    accent: "#E06D20", // Burnished Amber
  },
  {
    no: "04",
    name: "Qode-Sync",
    category: "MULTI-REPO UPSTREAM SYNC & FORK AUTOMATION",
    flow: "Forked Repositories → Upstream Change Detection → 1-Click Auto Sync → Commit Diff Inspection → Webhook Telemetry",
    simpleMeaning:
      "A developer productivity tool that automatically monitors forked repositories for upstream code updates, alerts developers to drift, and syncs all repos with a single click — eliminating manual git pull and rebase hassles.",
    whatItDoes: [
      "Automated Upstream Monitoring: Continuously scans upstream repositories to detect when forked repos fall behind",
      "1-Click Auto Sync: Automatically pulls, rebases, and synchronizes all forked repositories with a single button click",
      "Visual Commit Diff Inspector: Inspects incoming upstream additions (+lines), deletions (-lines), and mergeability",
      "Real-time Webhook Event Stream: Live notification listener tracking push events, releases, and repository sync health",
      "Multi-repository dashboard managing multiple open-source and team forks from a unified console",
    ],
    keyHighlights: [
      "1-Click multi-repo sync: Eliminates manual upstream git remote add, fetch, and rebase commands",
      "Live drift detection alerting you when original repositories receive developer updates",
      "Deep GitHub REST & GraphQL API integration with automated webhook triggers",
    ],
    repo: "https://github.com/anas116-ai/Qode-Sync",
    version: "v2.4.0-stable",
    tags: ["Next.js", "TypeScript", "GitHub REST & GraphQL API", "1-Click Fork Sync", "Webhook Triggers", "Tailwind CSS"],
    bannerImg: "/images/projects/qodesync_v2.jpg",
    telemetry: "1-Click Upstream Sync",
    stat1: "1-Click Sync",
    stat2: "0 Drift Guaranteed",
    accent: "#E06D20", // Burnished Amber
  },
];

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-transparent pt-24 sm:pt-28 md:pt-32 pb-32 text-[#F8FAFC] z-20 select-none border-t border-white/10 font-[family-name:var(--font-sans)]"
    >
      {/* Ambient Depth Aurora */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-1/3 -left-28 w-[850px] h-[850px] rounded-full blur-[160px] opacity-10"
          style={{
            background: "radial-gradient(circle, #E06D20 0%, rgba(224, 109, 32, 0.15) 45%, transparent 75%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-24 w-[800px] h-[800px] rounded-full blur-[160px] opacity-10"
          style={{
            background: "radial-gradient(circle, #E06D20 0%, rgba(224, 109, 32, 0.15) 45%, transparent 75%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 relative z-20">
        {/* Section Heading */}
        <div className="flex flex-col items-start space-y-3 max-w-4xl mb-14 sm:mb-16">
          <FadeIn y={20} delay={0.1} duration={0.8}>
            <div className="text-xs font-mono tracking-[0.25em] text-[#E06D20] uppercase">
              // MY PROJECTS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#F8FAFC] font-medium font-[family-name:var(--font-outfit)] tracking-normal mt-2">
              Engineered Systems &amp; Software
            </h2>
          </FadeIn>

          <FadeIn y={15} delay={0.2} duration={0.8}>
            <p className="text-[#94A3B8] text-sm sm:text-base font-light leading-relaxed max-w-2xl font-[family-name:var(--font-plus-jakarta)]">
              Four verified software systems architected, tested, and published to GitHub. Designed with clean, muted realism and honest engineering depth.
            </p>
          </FadeIn>
        </div>

        {/* EXPANSIVE FULL-WIDTH PROJECT CARDS (Left-Matter, Right-Image with Smooth Sticky Stacking) */}
        <div className="relative flex flex-col pb-16 sm:pb-24">
          {projectList.map((project, index) => (
            <ProjectCard
              key={project.no}
              project={project}
              index={index}
              total={projectList.length}
              onOpenModal={(src, title) => setModalImage({ src, title })}
            />
          ))}
        </div>
      </div>

      {/* FULL-RESOLUTION 16K LIGHTBOX MODAL (Click to View Full UI Screen) */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <div
              className="relative max-w-6xl w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.9)] bg-[#07090E]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/70 hover:bg-[#E06D20] text-white hover:text-[#07090E] border border-white/20 transition-all duration-200"
                title="Close Full Screen"
              >
                <X size={18} />
              </button>

              <div className="absolute top-4 left-4 z-50 px-3.5 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-[#F8FAFC]">
                {modalImage.title} &bull; Full 16K Display
              </div>

              <Image
                src={modalImage.src}
                alt={modalImage.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="text-[#94A3B8] text-xs font-mono mt-3">
              Press ESC or click outside to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
  onOpenModal,
}: {
  project: ProjectItem;
  index: number;
  total: number;
  onOpenModal: (src: string, title: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.95, 0.75]);
  const isLast = index === total - 1;

  return (
    <div
      ref={cardRef}
      className="min-h-[85vh] h-auto lg:h-[90vh] flex items-start w-full sticky top-16 sm:top-20 md:top-24 mb-10 lg:mb-0"
      style={{
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale: isLast ? 1 : scale,
          opacity: isLast ? 1 : opacity,
          backgroundColor: "#0E121B",
          borderColor: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 40px 100px -20px rgba(0,0,0,0.95), inset 0 1px 1px rgba(255,255,255,0.06)",
        }}
        className="w-full rounded-3xl border backdrop-blur-3xl p-6 sm:p-9 md:p-11 relative overflow-hidden group transition-all duration-300 hover:border-[#E06D20]/40"
      >
        {/* Subtle Ambient Corner Glow (Muted) */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[110px] opacity-15"
          style={{ backgroundColor: project.accent }}
        />

        {/* 2-COLUMN SPLIT: BALANCED 7/5 SPLIT (Left-Hand Matter / Right-Hand Vertical UI Stage) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* LEFT COLUMN (7 Cols): Deep Matter, Flow, Meaning, Features, Tags & GitHub Action */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
            {/* Top Tag & Number */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl sm:text-2xl font-bold" style={{ color: project.accent }}>
                  {project.no}
                </span>
                <span className="text-white/20">/</span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                  {project.category}
                </span>
              </div>

              {/* Title: Refined Slender Display Font (Outfit) */}
              <h3 className="text-xl sm:text-2xl md:text-[1.85rem] font-medium text-[#F8FAFC] font-[family-name:var(--font-outfit)] tracking-normal flex flex-wrap items-center gap-3">
                <span>{project.name}</span>
                <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[#94A3B8]">
                  {project.telemetry}
                </span>
              </h3>
            </div>

            {/* End-to-End Execution Flow (Highlighted Muted Box) */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-[#94A3B8] space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider block" style={{ color: project.accent }}>
                END-TO-END SYSTEM FLOW //
              </span>
              <div className="text-xs sm:text-sm text-[#F8FAFC] leading-relaxed">
                {project.flow}
              </div>
            </div>

            {/* Simple Meaning / Problem Solved */}
            <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed font-[family-name:var(--font-sans)]">
              {project.simpleMeaning}
            </p>

            {/* Key System Architectures / Implementation */}
            <div className="space-y-2 pt-1 border-t border-white/[0.06]">
              <div className="text-xs font-mono uppercase tracking-wider text-[#F8FAFC] font-semibold">
                What It Implements:
              </div>
              <ul className="space-y-1.5 text-xs text-[#94A3B8] font-[family-name:var(--font-sans)]">
                {project.whatItDoes.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: project.accent }} />
                    <span className="leading-relaxed font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-[#94A3B8] border border-white/[0.08]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons & Status */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Project GitHub Button (single brand amber) */}
              {(() => {
                const variant: IgnitionColorVariant = "amber";

                return (
                  <ShaderIgnitionButton
                    variant={variant}
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    ariaLabel={`View GitHub repository for ${project.name}`}
                    icon={<Github size={14} />}
                    iconPosition="left"
                    size="sm"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-xs">
                      <span>VIEW GITHUB REPO</span>
                      <ExternalLink size={12} className="opacity-80" />
                    </span>
                  </ShaderIgnitionButton>
                );
              })()}

              <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                  {project.stat1}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                  {project.stat2}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5 Cols): Vertical Portrait High-Fidelity UI Stage */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center justify-center space-y-2.5">
            <div
              onClick={() => onOpenModal(project.bannerImg, project.name)}
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#07090E] via-[#0E121B] to-[#07090E] shadow-2xl group transition-all duration-300 hover:border-[#E06D20]/40 cursor-zoom-in p-3 flex items-center justify-center"
              title="Click to view full uncropped resolution"
            >
              <div className="relative w-full h-full">
                <Image
                  src={project.bannerImg}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  priority
                />
              </div>

              {/* Hover Expand Prompt */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-xl bg-black/85 border border-white/20 text-xs font-mono text-white flex items-center gap-1.5 shadow-lg">
                  <Maximize2 size={13} />
                  <span>Click to Expand (Full UI)</span>
                </span>
              </div>
            </div>

            {/* Under-Image Telemetry Bar */}
            <div className="w-full max-w-[380px] sm:max-w-[420px] flex items-center justify-between px-2 text-xs font-mono text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.accent }} />
                <span>Verified Vertical UI</span>
              </span>
              <span className="font-medium" style={{ color: project.accent }}>{project.telemetry}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
