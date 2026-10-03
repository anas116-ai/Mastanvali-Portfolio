"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "./FadeIn";
import { InteractiveCharacter } from "./InteractiveCharacter";
import { ArrowDown, Github, Linkedin, FileText } from "lucide-react";
import { ResumeModal } from "@/components/resume/ResumeModal";

import { HeroSnowParticles } from "./HeroSnowParticles";
import { ShaderIgnitionButton } from "@/components/ui/ShaderIgnitionButton";
import { ProximityCommandDock, MobileNav } from "./ProximityCommandDock";
import { TextAnimationCollection } from "./TextAnimationCollection";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const characterY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="main-content"
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent px-5 sm:px-8 md:px-12 lg:px-16 pt-5 pb-12 select-none"
    >
      {/* --- 01. LUXURY KEYNOTE STAGE SPOTLIGHTS & SUBTLE ETHEREAL SNOW --- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Soft Keynote Stage Spotlight behind 3D Character */}
        <div className="absolute right-[-5%] sm:right-[5%] lg:right-[8%] top-[20%] sm:top-[28%] w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-[radial-gradient(circle,rgba(224,109,32,0.04)_0%,rgba(255,255,255,0.015)_40%,transparent_70%)] blur-3xl" />

        {/* Warm Burnished Amber Ambient Glow behind Headline */}
        <div className="absolute left-[-5%] sm:left-[5%] top-[18%] sm:top-[22%] w-[450px] sm:w-[580px] h-[450px] sm:h-[580px] rounded-full bg-[radial-gradient(circle,rgba(224,109,32,0.035)_0%,rgba(224,109,32,0.015)_45%,transparent_75%)] blur-3xl" />

        {/* Ultra-Subtle Ethereal Micro-Snow Falling Peacefully across Backdrop */}
        <HeroSnowParticles />

        {/* Sleek Studio Floor Reflection seamlessly blending into #07090E */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#07090E] via-[#07090E]/70 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* --- 02. EDITORIAL CAPSULE NAVBAR WITH PROXIMITY SPRING DOCK --- */}
      <FadeIn y={-15} delay={0} duration={0.6} className="w-full relative z-50 pointer-events-auto">
        <header className="w-full flex items-center justify-between z-50 relative pt-2 max-w-7xl mx-auto pointer-events-auto">
          {/* Brand Signature - Pure Typography, No Box, No Amber Dot, No "Vibe Coder" */}
          <a
            href="#top"
            className="group py-2 inline-flex items-center transition-all cursor-pointer focus:outline-none"
            aria-label="Mastan Vali Portfolio Top"
          >
            <span className="font-[family-name:var(--font-outfit)] font-bold text-sm sm:text-base tracking-[0.22em] text-[#F8FAFC] group-hover:text-[#E06D20] transition-colors uppercase select-none">
              MASTAN VALI
            </span>
          </a>

          {/* Center Navigation Links with ThreeUI Proximity Spring Physics */}
          <ProximityCommandDock />

          {/* Right Action Hub - Verified Interactive Social Profiles */}
          <div className="flex items-center gap-2 sm:gap-2.5 relative z-50 pointer-events-auto">
            <MobileNav />
            <a
              href="https://github.com/anas116-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#E06D20]/60 text-[#94A3B8] hover:text-[#E06D20] shadow-sm transition-all hover:scale-105 cursor-pointer relative z-50 pointer-events-auto flex items-center justify-center"
              title="GitHub Profile (anas116-ai)"
              aria-label="GitHub Profile"
            >
              <Github size={16} className="pointer-events-none" />
            </a>
            <a
              href="https://www.linkedin.com/in/mastan-vali-shaik-86952725a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#E06D20]/60 text-[#94A3B8] hover:text-[#E06D20] shadow-sm transition-all hover:scale-105 cursor-pointer relative z-50 pointer-events-auto flex items-center justify-center"
              title="LinkedIn Profile (Mastan Vali Shaik)"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} className="pointer-events-none" />
            </a>
          </div>
        </header>
      </FadeIn>

      {/* --- 03. ASYMMETRIC EDITORIAL HERO COMPOSITION --- */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center z-20 my-auto py-8 sm:py-12"
      >
        {/* Left Column (7 Cols): High-Impact Identity with Spacious Luxury Breathing Room */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center space-y-7 sm:space-y-9 z-20 py-2">
          {/* Eyebrow: Crisp White - Maintained Space before Name */}
          <FadeIn y={15} delay={0.1} duration={0.6}>
            <div className="inline-flex items-center gap-3 text-base sm:text-lg md:text-xl font-stencil tracking-[0.24em] text-white uppercase drop-shadow-[0_2px_22px_rgba(255,255,255,0.35)]">
              <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
              <span>HELLO ALL</span>
            </div>
          </FadeIn>

          {/* Large Hero Display Name: Warpaint + slow in-place reveal */}
          <FadeIn y={25} delay={0.18} duration={0.8}>
            <div className="relative inline-block select-none group max-w-full">
              {/* Subtle Luxury Ambient Halo */}
              <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(224,109,32,0.06)_0%,transparent_70%)] blur-2xl pointer-events-none -z-10" />

              <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
                <defs>
                  <filter id="warpaint-organic-distress" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.38 0.32" numOctaves="5" result="noise" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -4.2" result="distressCut" />
                    <feComposite in="SourceGraphic" in2="distressCut" operator="in" />
                  </filter>
                </defs>
              </svg>

              <h1
                className="font-warpaint inline-block max-w-full text-[clamp(2.75rem,11.5vw,4.75rem)] sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[9.2rem] tracking-[0.08em] uppercase text-[#E06D20] select-none leading-[0.9] drop-shadow-[0_4px_24px_rgba(224,109,32,0.18)] transition-all duration-500"
                style={{
                  filter: "url(#warpaint-organic-distress)",
                  WebkitFontSmoothing: "antialiased",
                  textRendering: "geometricPrecision",
                }}
              >
                <TextAnimationCollection
                  variant="threeui-intro"
                  mode="dark"
                  hue={0}
                  saturation={1.0}
                  brightness={1.0}
                  text="MASTAN VALI"
                />
              </h1>
            </div>
          </FadeIn>

          {/* 1. Clean Executive Role Line - Balanced & Spacious */}
          <FadeIn y={20} delay={0.25} duration={0.7}>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-xs sm:text-sm md:text-base font-semibold tracking-[0.14em] text-[#F8FAFC] font-[family-name:var(--font-outfit)]">
              <span className="text-[#E06D20] font-bold">Enterprise Data &amp; AI Systems Engineer</span>
              <span className="text-white/25 select-none">&bull;</span>
              <span className="text-[#F8FAFC]">SAP BODS 4.3</span>
              <span className="text-white/25 select-none">&bull;</span>
              <span className="text-[#94A3B8]">Autonomous AI Architectures</span>
            </div>
          </FadeIn>

          {/* 2. Clean, Readable Engineering Narrative - Balanced Spacing */}
          <FadeIn y={20} delay={0.35} duration={0.8}>
            <div className="max-w-xl">
              <p className="text-[#94A3B8] text-sm leading-relaxed font-light font-[family-name:var(--font-outfit)]">
                Software Engineer with enterprise production data expertise at <strong className="text-white font-semibold underline decoration-[#E06D20]/40 underline-offset-4">VHS Consulting India Pvt Ltd</strong>. Architecting mission-critical SAP ETL pipelines, AWS S3 cloud data lakes, and next-generation autonomous AI systems.
              </p>
            </div>
          </FadeIn>

          {/* 3. Action Buttons & Clean Unboxed Availability Status */}
          <FadeIn y={20} delay={0.45} duration={0.8} className="space-y-5">
            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Primary Explore CTA: Burnished Amber Shader Ignition Button */}
              <ShaderIgnitionButton
                variant="amber"
                href="#projects"
                ariaLabel="Explore Work - view projects"
                icon={<ArrowDown size={14} className="stroke-[2.8]" />}
                iconPosition="right"
                size="lg"
              >
                Explore Work
              </ShaderIgnitionButton>

              {/* View Resume CTA: Liquid Platinum Shader Ignition Button */}
              <ShaderIgnitionButton
                variant="platinum"
                onClick={() => setIsResumeOpen(true)}
                ariaLabel="View Resume"
                icon={<FileText size={15} className="text-[#F8FAFC]" />}
                iconPosition="left"
                size="md"
              >
                View Resume
              </ShaderIgnitionButton>

              {/* Secondary Contact CTA: Liquid Platinum Shader Ignition Button */}
              <ShaderIgnitionButton
                variant="platinum"
                href="#contact"
                ariaLabel="Contact Mastan Vali"
                size="md"
              >
                Contact Me
              </ShaderIgnitionButton>
            </div>

            {/* Clean, Simple Availability Status Note (No bulky box, normal body text font & size) */}
            <div className="flex items-center pt-1 sm:pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-[family-name:var(--font-outfit)] text-[#94A3B8]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E06D20] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E06D20]" />
                </span>
                <span className="tracking-wide">
                  Available for Hire <span className="text-white/25 mx-1.5">&bull;</span> Immediate Joiner <span className="text-white/25 mx-1.5">&bull;</span> Open to Relocation
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Interactive Verified Resume Modal */}
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </div>

        {/* Right Column (5 Cols): 4K Character in Spacious Three.js 3D WebGL World */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-end relative min-h-[420px] sm:min-h-[460px] md:min-h-[500px]">
          <motion.div
            style={{ y: characterY }}
            className="w-full sm:w-[320px] md:w-[350px] lg:w-[380px] xl:w-[410px] flex flex-col justify-end items-center relative pointer-events-auto"
          >
            <InteractiveCharacter
              src="/images/avatar/style_01_4k_transparent.png"
              alt="Mastan Vali - 4K Ultra-HD Haute-Tech Laptop & Code 3D WebGL"
              effectMode="webgl3d"
            />

            {/* REALISTIC STUDIO STAGE GROUNDING (Floor Reflection + Contact Shadows directly under sneaker soles) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] h-[58px] pointer-events-none z-10">
              {/* Studio Keynote Floor Light Pool */}
              <div className="absolute inset-x-0 bottom-1 h-[32px] rounded-[100%] bg-gradient-to-r from-transparent via-[rgba(224,109,32,0.14)] to-transparent blur-md" />
              <div className="absolute inset-x-8 bottom-2 h-[20px] rounded-[100%] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.10)] to-transparent blur-sm" />

              {/* Broad Feathered Floor Ambient Occlusion */}
              <div className="absolute inset-x-8 bottom-1 h-[24px] rounded-[100%] bg-black/85 blur-[7px]" />

              {/* High-Density Right Sneaker Sole Contact Occlusion (firmly planted on floor) */}
              <div className="absolute left-[calc(50%+38px)] bottom-1 w-[58px] h-[16px] -translate-x-1/2 rounded-[100%] bg-black/95 blur-[2px]" />

              {/* High-Density Left Sneaker Elevated Step Contact Shadow (angled, slightly raised) */}
              <div className="absolute left-[calc(50%-38px)] bottom-[30px] w-[52px] h-[14px] -translate-x-1/2 rounded-[100%] bg-black/70 blur-[4px]" />
            </div>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
