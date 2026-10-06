"use client";

import React, { useEffect, useState } from "react";
import { FadeIn } from "./FadeIn";
import { PremiumNightBackdrop } from "./PremiumNightBackdrop";
import { experience } from "@/data/experience";
import {
  Calendar,
  MapPin,
  Database,
  Layers,
  Cpu,
  Server,
  FileText,
  ShieldCheck,
  Rotate3d,
  type LucideIcon,
} from "lucide-react";
import { ResumeModal } from "@/components/resume/ResumeModal";

/* Lime-ramp stops only: one hue, four lightness steps. */
const pipelineStages = [
  {
    stage: "Stage 01",
    title: "SAP ECC",
    sub: "IDoc and BAPI extraction",
    icon: Database,
    color: "#CDFD02",
  },
  {
    stage: "Stage 02",
    title: "SAP BODS 4.3",
    sub: "Enterprise data flows",
    icon: Layers,
    color: "#DCFD3C",
  },
  {
    stage: "Stage 03",
    title: "SQL Server",
    sub: "Validation and reconciliation",
    icon: Cpu,
    color: "#8A8918",
  },
  {
    stage: "Stage 04",
    title: "AWS S3 and S/4HANA",
    sub: "Target staging and load",
    icon: Server,
    color: "#C9C8C3",
  },
];

const pillarColors = ["#CDFD02", "#8A8918", "#DCFD3C", "#C9C8C3"];

/* Machined plate: sharp 3px corners with the top right corner cut away.
   Built from stacked gradients so no drop shadow is ever needed. */
const cutCorner = {
  backgroundImage:
    "linear-gradient(225deg, transparent 13px, rgba(16,16,18,0.72) 13px), linear-gradient(180deg, rgba(16,16,18,0.78) 0%, rgba(16,16,18,0.82) 100%)",
  backgroundColor: "transparent",
  backdropFilter: "blur(14px) saturate(1.3)",
  WebkitBackdropFilter: "blur(14px) saturate(1.3)",
};

export function ExperienceSection() {
  const [viewMode, setViewMode] = useState<"3d" | "specs">("3d");
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) setViewMode("specs");
  }, []);

  const modeButton = (mode: "3d" | "specs", label: string, Icon: LucideIcon) => {
    const active = viewMode === mode;
    return (
      <button
        type="button"
        onClick={() => setViewMode(mode)}
        aria-pressed={active}
        className={`relative px-4 py-2 text-[11px] font-mono uppercase tracking-[0.18em] transition-colors duration-300 cursor-pointer flex items-center gap-2 ${
          active ? "text-[#0A0A0B]" : "text-[#8C8C86] hover:text-[#F5F2EB]"
        }`}
      >
        <span
          className={`absolute inset-0 transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "#DCFD3C" }}
        />
        <Icon size={12} className="relative z-10" />
        <span className="relative z-10 font-medium">{label}</span>
      </button>
    );
  };

  return (
    <section
      id="experience"
      className="relative w-full bg-transparent py-24 sm:py-28 md:py-32 text-[#F5F2EB] z-20 select-none border-t border-[rgba(245,242,235,0.07)]"
    >
      {/* Premium night beams over the spec sheet */}
      <PremiumNightBackdrop side="right" mood="calm" />
      <div className="max-w-7xl mx-auto relative z-20 space-y-12 sm:space-y-14 px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section header with role metadata set directly beneath it */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-7 border-b border-[rgba(245,242,235,0.11)]">
          <div className="space-y-4 max-w-3xl">
            <FadeIn y={20} delay={0.1} duration={0.8}>
              <div className="eyebrow flex items-center gap-2.5">
                <span className="h-[5px] w-[5px] rounded-full bg-[#CDFD02] animate-pulse" />
                // Curriculum vitae / printed sheet
              </div>
              <h2 className="stylish-header text-[2.1rem] sm:text-[2.6rem] lg:text-[3.1rem] text-[#F5F2EB] mt-3">
                Experience
              </h2>
            </FadeIn>

            <FadeIn y={15} delay={0.2} duration={0.8}>
              <div className="pt-1 space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xl sm:text-2xl text-[#F5F2EB] font-[family-name:var(--font-outfit)] font-medium tracking-[-0.02em]">
                    {experience.title}
                  </span>
                  <span className="rule-dot text-[13px] sm:text-sm text-[#DCFD3C] font-[family-name:var(--font-geist-mono)] tracking-[0.06em]">
                    {experience.company}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-[family-name:var(--font-geist-mono)] text-[11.5px] tracking-[0.05em] text-[#8C8C86]">
                  <span>
                    Client {experience.client} <span className="text-[#43433F]">/</span> Project{" "}
                    {experience.project}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#6A6A66]" />
                    <span>{experience.period}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#6A6A66]" />
                    <span>{experience.location}</span>
                  </span>
                </div>

                <p className="stylish-sub text-xs sm:text-sm text-[#C9C8C3] max-w-xl">
                  Engineering enterprise ETL batch workflows, SAP ECC extraction routines,
                  SQL Server reconciliation, and mission-critical production data pipelines.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* View switch and resume */}
          <FadeIn y={15} delay={0.3} duration={0.8}>
            <div className="flex flex-wrap items-center gap-3">
              <div
                role="group"
                aria-label="Experience view"
                className="relative inline-flex items-stretch p-px border border-[rgba(245,242,235,0.13)] bg-[rgba(245,242,235,0.045)] backdrop-blur-[10px] saturate-[1.2]"
              >
                {modeButton("3d", "The sheet", Rotate3d)}
                {modeButton("specs", "Specification", FileText)}
              </div>

              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="px-4 py-2.5 bg-transparent hover:bg-[rgba(245,242,235,0.05)] text-[11px] font-mono uppercase tracking-[0.18em] text-[#C9C8C3] border border-[rgba(245,242,235,0.13)] hover:border-[rgba(205,253,2,0.42)] transition-colors duration-300 flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck size={13} className="text-[#CDFD02]" />
                <span className="font-medium">Verified resume</span>
              </button>
            </div>
          </FadeIn>
        </div>

        {/* PRIMARY DISPLAY VIEWPORT */}
        {viewMode === "3d" ? (
          <FadeIn y={20} duration={0.8}>
            <div className="relative w-full flex flex-col items-center justify-center">
              {/* Warm gallery wash behind the paper. No rings, no orbit, no spin. */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
                <div className="w-[720px] sm:w-[940px] h-[720px] sm:h-[940px] blur-3xl opacity-70 bg-[radial-gradient(ellipse_at_center,rgba(205,253,2,0.13)_0%,rgba(205,253,2,0.06)_40%,transparent_72%)]" />
              </div>

              <div className="relative w-full h-[600px] sm:h-[980px] md:h-[1080px] z-10">
                <iframe
                  title="Resume of Mastan Vali, printed on a sheet of paper you can turn"
                  src="/assets/three-paper/experience-paper.html?v=6"
                  className="w-full h-full border-0 bg-transparent block"
                  loading="eager"
                  style={{ background: "transparent", colorScheme: "dark" }}
                />
                <div className="absolute top-4 right-4 flex items-center gap-2 text-[#DCFD3C] font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.16em] uppercase pointer-events-none select-none">
                  <Rotate3d size={13} />
                  <span className="hidden sm:inline">Drag to rotate</span>
                </div>
              </div>

              {/* Plinth: a machined brass rule with survey ticks instead of a shadow */}
              <div className="w-full max-w-xl h-6 pointer-events-none relative -mt-4 z-0 flex items-end justify-center">
                <div className="w-full h-px bg-[linear-gradient(90deg,transparent,rgba(220,253,60,0.28)_30%,rgba(220,253,60,0.28)_70%,transparent)]" />
                <div className="absolute bottom-0 flex w-full justify-center gap-6">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`block w-px bg-[rgba(220,253,60,0.26)] ${i === 2 ? "h-2.5" : "h-1.5"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center text-[11px] font-[family-name:var(--font-geist-mono)] text-[#6A6A66] tracking-[0.22em] uppercase pt-4 select-none">
                Drag to rotate / pinch to zoom
              </div>
            </div>
          </FadeIn>
        ) : (
          <FadeIn y={20} duration={0.8}>
            <div
              className="relative border border-[rgba(245,242,235,0.13)] p-7 sm:p-10 md:p-12 space-y-9 overflow-hidden edge-lit"
              style={cutCorner}
            >
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(168deg,rgba(27,27,29,0.55)_0%,rgba(13,13,15,0.66)_58%,rgba(9,9,10,0.72)_100%)]" />

              {/* Pipeline stages */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow">
                    Enterprise pipeline / Client {experience.client} / Project {experience.project}
                  </span>
                  <span className="hidden sm:inline text-[11px] font-[family-name:var(--font-geist-mono)] tracking-[0.2em] uppercase text-[#8A8918]">
                    High reliability ETL
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {pipelineStages.map((stg, i) => {
                    const NodeIcon = stg.icon;
                    return (
                      <div
                        key={i}
                        className="edge-lit relative overflow-hidden p-4 pt-5 border border-[rgba(245,242,235,0.09)] bg-[rgba(245,242,235,0.05)] backdrop-blur-[12px] saturate-[1.15] transition-colors duration-300 hover:border-[rgba(245,242,235,0.2)]"
                      >
                        <span
                          className="absolute top-0 left-0 h-[2px] w-9"
                          style={{ backgroundColor: stg.color }}
                        />
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-[family-name:var(--font-geist-mono)] tracking-[0.22em] uppercase font-medium"
                            style={{ color: stg.color }}
                          >
                            {stg.stage}
                          </span>
                          <NodeIcon size={15} style={{ color: stg.color }} />
                        </div>

                        <div className="mt-5">
                          <div className="text-sm text-[#F5F2EB] font-[family-name:var(--font-outfit)] font-medium tracking-[-0.01em]">
                            {stg.title}
                          </div>
                          <div className="text-[11.5px] font-[family-name:var(--font-geist-mono)] text-[#8C8C86] mt-1 leading-relaxed">
                            {stg.sub}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Four responsibility pillars */}
              <div className="space-y-5">
                <span className="eyebrow">Verified production responsibilities</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(245,242,235,0.09)] border border-[rgba(245,242,235,0.09)]">
                  {experience.domains.map((dom, dIdx) => {
                    const accent = pillarColors[dIdx % pillarColors.length];
                    return (
                      <div key={dIdx} className="p-5 bg-[rgba(12,12,13,0.68)] backdrop-blur-[12px] space-y-3.5">
                        <div
                          className="flex items-center gap-2.5 text-[11px] font-[family-name:var(--font-geist-mono)] tracking-[0.16em] uppercase font-medium"
                          style={{ color: accent }}
                        >
                          <span className="block h-px w-5" style={{ backgroundColor: accent }} />
                          <span>
                            Pillar 0{dIdx + 1} / {dom.title}
                          </span>
                        </div>
                        <ul className="space-y-2.5">
                          {dom.items.map((it, iIdx) => (
                            <li
                              key={iIdx}
                              className="flex items-start gap-3 text-[12.5px] text-[#C9C8C3] leading-relaxed"
                            >
                              <span
                                aria-hidden
                                className="shrink-0 mt-[7px] block h-px w-3"
                                style={{ backgroundColor: accent }}
                              />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Production stack, inline with slash rules rather than chips */}
              <div className="pt-6 border-t border-[rgba(245,242,235,0.09)]">
                <span className="eyebrow">Production stack</span>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12px] font-[family-name:var(--font-geist-mono)] text-[#8C8C86]">
                  {experience.environment.map((env, i) => (
                    <span key={env} className="flex items-center gap-2">
                      <span className="transition-colors duration-300 hover:text-[#F5F2EB]">{env}</span>
                      {i < experience.environment.length - 1 && (
                        <span className="text-[#43433F]">/</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}