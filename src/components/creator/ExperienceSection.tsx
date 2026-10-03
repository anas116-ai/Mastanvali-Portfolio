"use client";

import React, { useEffect, useState } from "react";
import { FadeIn } from "./FadeIn";
import { experience } from "@/data/experience";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  Database,
  Layers,
  Cpu,
  Server,
  FileText,
  Sparkles,
  ShieldCheck,
  Rotate3d,
} from "lucide-react";
import { ResumeModal } from "@/components/resume/ResumeModal";

const pipelineStages = [
  { stage: "STAGE 01", title: "SAP ECC", sub: "IDoc & BAPI Extraction", icon: Database },
  { stage: "STAGE 02", title: "SAP BODS 4.3", sub: "Enterprise Data Flows", icon: Layers },
  { stage: "STAGE 03", title: "SQL Server", sub: "Validation & Reconciliation", icon: Cpu },
  { stage: "STAGE 04", title: "AWS S3 & S/4HANA", sub: "Target Staging & Load", icon: Server },
];

export function ExperienceSection() {
  const [viewMode, setViewMode] = useState<"3d" | "specs">("3d");
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) setViewMode("specs");
  }, []);

  return (
    <section
      id="experience"
      className="relative w-full bg-transparent py-24 sm:py-28 md:py-32 text-[#F3F1E8] z-20 select-none border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto relative z-20 space-y-10 sm:space-y-12 px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header with Role Context placed directly under Experience */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-3xl">
            <FadeIn y={20} delay={0.1} duration={0.8}>
              <div className="text-xs font-mono tracking-[0.25em] text-[#F47A18] uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F47A18]" />
                // WORK EXPERIENCE
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[#F3F1E8] font-[family-name:var(--font-outfit)] tracking-tight mt-1.5">
                Experience
              </h2>
            </FadeIn>

            {/* Essential Role Metadata placed right under Experience header */}
            <FadeIn y={15} delay={0.2} duration={0.8}>
              <div className="pt-1 space-y-2">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xl sm:text-2xl font-bold text-[#F3F1E8] font-[family-name:var(--font-outfit)]">
                    {experience.title}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#F47A18] font-mono">
                    &bull; {experience.company}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm font-mono text-[#94A3B8]">
                  <span className="px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#F3F1E8]">
                    Client: {experience.client} | Project: {experience.project}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#F47A18]" />
                    <span>{experience.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#F47A18]" />
                    <span>{experience.location}</span>
                  </div>
                </div>

                <p className="text-[#B8C4CC] text-xs sm:text-sm font-light leading-relaxed pt-1 font-[family-name:var(--font-plus-jakarta)]">
                  Engineering enterprise ETL batch workflows, SAP ECC extraction routines, SQL Server reconciliation, and mission-critical production data pipelines.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Action Controls: 3D Docket vs Recruiter Specs + PDF Modal */}
          <FadeIn y={15} delay={0.3} duration={0.8}>
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="p-1 rounded-xl bg-[#050811]/80 border border-white/10 flex items-center">
                <button
                  onClick={() => setViewMode("3d")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "3d"
                      ? "bg-[#F47A18] text-white shadow-[0_0_15px_rgba(244,122,24,0.18)]"
                      : "text-[#94A3B8] hover:text-[#F3F1E8] hover:bg-white/[0.04]"
                  }`}
                >
                  <Sparkles size={13} />
                  <span>3D Tactile Docket</span>
                </button>
                <button
                  onClick={() => setViewMode("specs")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "specs"
                      ? "bg-[#F47A18] text-white shadow-[0_0_15px_rgba(244,122,24,0.18)]"
                      : "text-[#94A3B8] hover:text-[#F3F1E8] hover:bg-white/[0.04]"
                  }`}
                >
                  <FileText size={13} />
                  <span>Specification Sheet</span>
                </button>
              </div>

              <button
                onClick={() => setIsResumeOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-xs font-mono text-[#F3F1E8] border border-white/15 hover:border-[#F47A18]/50 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <ShieldCheck size={14} className="text-[#F47A18]" />
                <span>Verified Resume PDF</span>
              </button>
            </div>
          </FadeIn>
        </div>

        {/* PRIMARY DISPLAY VIEWPORT */}
        {viewMode === "3d" ? (
          /* --- 01. SEAMLESS FLOATING 3D PAPER (NO ARTIFICIAL BOX, 100% TRANSPARENT CANVAS) --- */
          <FadeIn y={20} duration={0.8}>
            <div className="relative w-full flex flex-col items-center justify-center">
              {/* Floating WebGL 3D Canvas Viewport (Elongated for rich verified resume) */}
              <div className="relative w-full h-[600px] sm:h-[980px] md:h-[1080px]">
                <iframe
                  title="3D Tactile Engineering Experience Docket"
                  src="/assets/three-paper/experience-paper.html"
                  className="w-full h-full border-0 bg-transparent block"
                  loading="eager"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050811]/85 backdrop-blur-xl border border-[rgba(244,122,24,0.35)] text-[#F47A18] text-xs font-mono pointer-events-none select-none">
                  <Rotate3d size={13} />
                  <span>Drag to rotate in 3D</span>
                </div>
              </div>

              {/* Minimalist, subtle interaction cue below the paper */}
              <div className="text-center text-xs font-mono text-[#94A3B8]/60 tracking-[0.25em] uppercase pt-2 select-none">
                Touch &amp; drag to rotate &bull; pinch to zoom
              </div>
            </div>
          </FadeIn>
        ) : (
          /* --- 02. HIGH-DENSITY RECRUITER SPECIFICATION SHEET (Accessible Text View) --- */
          <FadeIn y={20} duration={0.8}>
            <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#050811]/90 backdrop-blur-2xl p-7 sm:p-10 md:p-12 space-y-8 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
              {/* Architecture Pipeline Stages */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#F3F1E8] font-semibold flex items-center justify-between">
                  <span>Enterprise Data Pipeline Architecture &bull; Client: TCS | Project: Grainger</span>
                  <span className="text-[#F47A18] text-[11px] hidden sm:inline">HIGH-RELIABILITY ETL</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {pipelineStages.map((stg, i) => {
                    const NodeIcon = stg.icon;
                    return (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-white/10 bg-[#050811]/90 hover:bg-[#050811] flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-[#F47A18]/40"
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#F47A18]/10 text-[#F47A18] border border-[#F47A18]/20">
                            {stg.stage}
                          </span>
                          <NodeIcon size={15} className="text-[#F47A18]" />
                        </div>

                        <div className="mt-4 relative z-10">
                          <div className="text-sm font-semibold text-[#F3F1E8] font-[family-name:var(--font-outfit)]">
                            {stg.title}
                          </div>
                          <div className="text-xs font-mono text-[#94A3B8] mt-0.5">
                            {stg.sub}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Responsibilities 4 Core Domains */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#F3F1E8] font-semibold">
                  Verified Production Roles &amp; Responsibilities
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.domains.map((dom, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 rounded-xl bg-[#050811]/75 border border-white/[0.08] hover:border-[#F47A18]/30 transition-all space-y-3"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#F47A18] tracking-wide border-b border-white/[0.06] pb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F47A18]" />
                        <span>PILLAR 0{dIdx + 1} // {dom.title}</span>
                      </div>
                      <ul className="space-y-2">
                        {dom.items.map((it, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2.5 text-xs text-[#B8C4CC] leading-relaxed">
                            <CheckCircle2 size={14} className="text-[#F47A18] shrink-0 mt-0.5" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Environment Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.08]">
                <span className="text-xs font-mono text-[#94A3B8] mr-2">PRODUCTION STACK:</span>
                {experience.environment.map((env) => (
                  <span
                    key={env}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-[#F3F1E8] border border-white/[0.08] hover:border-[#F47A18]/40 transition-colors"
                  >
                    {env}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      {/* Verified Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
