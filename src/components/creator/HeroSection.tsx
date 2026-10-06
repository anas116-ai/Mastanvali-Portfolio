"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { InteractiveCharacter } from "./InteractiveCharacter";
import { ArrowDown, FileText } from "lucide-react";
import { ResumeModal } from "@/components/resume/ResumeModal";

import { ShaderIgnitionButton } from "@/components/ui/ShaderIgnitionButton";
import { TextAnimationCollection } from "./TextAnimationCollection";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* The exit holds, then leaves.
     The wordmark stays fully present through the first half of the exit
     and only then falls away, so the hero reads as being left behind
     rather than being pushed off. The character travels further and
     slower than the type, which separates the two planes in depth
     instead of sliding them out as one block. */
  const heroOpacity = useTransform(scrollYProgress, [0, 0.52, 1], [1, 1, 0]);
  const characterY = useTransform(scrollYProgress, [0, 1], [0, 132]);
  const characterOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.035]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-center overflow-hidden bg-transparent px-5 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-20 pb-12 select-none"
    >
      {/* ── 01. Stage lighting — calm luxury wash, no tinted glows ─────── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Single neutral key light behind the character */}
        <div className="absolute right-[-8%] sm:right-[4%] lg:right-[7%] top-[16%] sm:top-[22%] w-[540px] sm:w-[700px] h-[540px] sm:h-[700px] bg-[radial-gradient(circle,rgba(245,242,235,0.07)_0%,transparent_68%)] blur-[110px]" />

        {/* Soft neutral fill, opposite side */}
        <div className="absolute left-[-6%] sm:left-[3%] top-[14%] sm:top-[18%] w-[500px] sm:w-[640px] h-[500px] sm:h-[640px] bg-[radial-gradient(circle,rgba(245,242,235,0.045)_0%,transparent_72%)] blur-[110px]" />

        {/* Liquid flow: directional molten bands in bone light, not blobs.
            Bespoke pour lines — the opposite of generic AI gradient mush. */}
        <div className="absolute left-[-10%] top-[10%] h-[200px] sm:h-[280px] w-[130%] rotate-[-14deg] bg-[linear-gradient(90deg,transparent_0%,rgba(245,242,235,0.08)_30%,rgba(255,255,255,0.13)_50%,rgba(245,242,235,0.08)_70%,transparent_100%)] blur-[60px]" />
        <div className="absolute left-[-10%] top-[48%] h-[140px] sm:h-[200px] w-[130%] rotate-[-14deg] bg-[linear-gradient(90deg,transparent_0%,rgba(245,242,235,0.06)_35%,rgba(255,255,255,0.10)_55%,transparent_80%)] blur-[60px]" />

        {/* Droplet glints riding the flow — glossy liquid beads with a hot
            top-left specular, like light on a real bead. Static, zero motion
            cost, plain spans so the glass stays cheap. */}
        <span aria-hidden className="absolute left-[22%] top-[24%] h-[9px] w-[9px] rounded-full bg-[radial-gradient(circle_at_32%_28%,#FFFFFF_0%,rgba(255,255,255,0.8)_45%,rgba(245,242,235,0.18)_100%)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_0_14px_rgba(255,255,255,0.6)]" />
        <span aria-hidden className="absolute right-[15%] top-[46%] h-[6px] w-[6px] rounded-full bg-[radial-gradient(circle_at_32%_28%,#FFFFFF_0%,rgba(255,255,255,0.8)_45%,rgba(245,242,235,0.15)_100%)] shadow-[0_1px_2px_rgba(0,0,0,0.5),0_0_11px_rgba(255,255,255,0.55)]" />
        <span aria-hidden className="absolute left-[34%] top-[72%] h-[5px] w-[5px] rounded-full bg-[radial-gradient(circle_at_32%_28%,#FFFFFF_0%,rgba(255,255,255,0.75)_50%,rgba(205,253,2,0.35)_100%)] shadow-[0_0_10px_rgba(205,253,2,0.8)]" />
        <span aria-hidden className="absolute right-[30%] top-[78%] h-[4px] w-[4px] rounded-full bg-[radial-gradient(circle_at_32%_28%,#FFFFFF_0%,rgba(255,255,255,0.7)_50%,rgba(245,242,235,0.2)_100%)] shadow-[0_0_9px_rgba(255,255,255,0.5)]" />
        {/* Long liquid specular: a hairline sheen crossing the flow, not a blob */}
        <span aria-hidden className="absolute left-[12%] top-[60%] h-px w-[38%] rotate-[-14deg] bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[0.5px]" />

        {/* Floor settling into the obsidian foundation */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/88 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── 02. Hero composition ───────────────────────────────────── */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center z-20 my-auto py-8 sm:py-12 will-change-[transform]"
      >
        <div className="lg:col-span-7 flex flex-col items-start justify-center space-y-7 sm:space-y-8 z-20 py-2">
          {/* Eyebrow: plain mono type, no capsule, with a live diode */}
          <FadeIn y={12} delay={0.1} duration={0.7}>
            <div className="flex items-center gap-2.5 eyebrow">
              <span className="h-[5px] w-[5px] rounded-full bg-[#CDFD02] animate-pulse" />
              <span>// PORTFOLIO · ENTERPRISE SYSTEMS ARCHITECT</span>
            </div>
          </FadeIn>

          {/* Signature wordmark */}
          <FadeIn y={22} delay={0.16} duration={0.8}>
            <div className="relative inline-block select-none group max-w-full">
              <h1
                className="font-warpaint inline-block max-w-full text-[clamp(2.6rem,11vw,4.5rem)] sm:text-7xl md:text-8xl xl:text-[7.875rem] tracking-[0.11em] uppercase select-none leading-[0.95]"
                style={{
                  WebkitFontSmoothing: "antialiased",
                  textRendering: "geometricPrecision",
                }}
              >
                {/* One lime, struck one letter at a time. */}
                <TextAnimationCollection variant="threeui-intro" mode="dark" text="MASTAN VALI" />
              </h1>
            </div>
          </FadeIn>

          {/* Discipline line */}
          <FadeIn y={16} delay={0.25} duration={0.7}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] sm:text-sm md:text-[15px] font-[family-name:var(--font-geist-sans)] font-normal tracking-[-0.005em]">
              <span className="text-[#DCFD3C]">Enterprise Data &amp; Cloud Pipelines</span>
              <span className="text-[#43433F] select-none">/</span>
              <span className="text-[#C9C8C3]">SAP BODS 4.3</span>
              <span className="text-[#43433F] select-none">/</span>
              <span className="text-[#CDFD02]">Autonomous LLM Agent Architect</span>
            </div>
          </FadeIn>

          {/* Narrative */}
          <FadeIn y={16} delay={0.35} duration={0.8}>
            <div className="max-w-xl">
              <p className="text-[#8C8C86] text-sm sm:text-[15px] leading-[1.7] font-[family-name:var(--font-geist-sans)] font-normal">
                Software Engineer with enterprise production data expertise at{" "}
                <span className="text-[#F5F2EB]">VHS Consulting India Pvt Ltd</span>. Architecting
                mission-critical SAP ETL pipelines, AWS S3 cloud data lakes, and autonomous agent
                systems that hold their shape under load.
              </p>
            </div>
          </FadeIn>

          {/* Actions and availability */}
          <FadeIn y={16} delay={0.45} duration={0.8} className="space-y-5">
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Primary CTA carries a soft lemon halo so the eye lands
                  on the single action first — the reference-grade pop. */}
              <span className="relative inline-flex">
                <span aria-hidden className="absolute -inset-2 rounded-[6px] bg-[radial-gradient(ellipse_at_center,rgba(205,253,2,0.28)_0%,transparent_70%)] blur-md pointer-events-none" />
                <ShaderIgnitionButton
                  variant="lemon"
                  href="#projects"
                  ariaLabel="Explore Work, view projects"
                  icon={<ArrowDown size={14} className="stroke-[2.6]" />}
                  iconPosition="right"
                  size="lg"
                >
                  Explore Work
                </ShaderIgnitionButton>
              </span>

              <ShaderIgnitionButton
                variant="bone"
                onClick={() => setIsResumeOpen(true)}
                ariaLabel="View Resume"
                icon={<FileText size={14} />}
                iconPosition="left"
                size="md"
              >
                View Resume
              </ShaderIgnitionButton>

              <ShaderIgnitionButton
                variant="lemonHi"
                href="#contact"
                ariaLabel="Contact Me, send a note to Mastan Vali"
                size="md"
              >
                Contact Me
              </ShaderIgnitionButton>
            </div>

            {/* Availability, set as plain inline text */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-[family-name:var(--font-geist-sans)] text-[#8C8C86]">
              <span className="relative flex h-[6px] w-[6px]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CDFD02] opacity-60" />
                <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-[#CDFD02]" />
              </span>
              <span className="text-[#C9C8C3]">Available for hire</span>
              <span className="text-[#43433F] select-none">/</span>
              <span>Immediate joiner</span>
              <span className="text-[#43433F] select-none">/</span>
              <span>Open to relocation</span>
            </div>
          </FadeIn>

          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </div>

        {/* Character stage */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-end relative min-h-[420px] sm:min-h-[460px] md:min-h-[500px]">
          <motion.div
            style={{ y: characterY, opacity: characterOpacity, scale: stageScale }}
            className="w-full sm:w-[320px] md:w-[350px] lg:w-[380px] xl:w-[410px] flex flex-col justify-end items-center relative pointer-events-auto will-change-[transform,opacity]"
          >
            <InteractiveCharacter
              src="/images/avatar/style_01_4k_transparent.png"
              alt="Mastan Vali, laptop and code in three dimensional WebGL"
              effectMode="webgl3d"
            />

            {/* Natural contact shadow — single soft neutral grounding, no color glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-[48px] pointer-events-none z-10">
              <div className="absolute inset-x-10 bottom-2 h-[24px] rounded-[100%] bg-black/60 blur-[14px]" />
              <div className="absolute inset-x-16 bottom-3 h-[14px] rounded-[100%] bg-black/50 blur-[8px]" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
