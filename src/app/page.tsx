"use client";

import { HeroSection } from "@/components/creator/HeroSection";
import { MarqueeSection } from "@/components/creator/MarqueeSection";
import { AboutSection } from "@/components/creator/AboutSection";
import { ExperienceSection } from "@/components/creator/ExperienceSection";
import { SkillsSection } from "@/components/creator/SkillsSection";
import { ProjectsSection } from "@/components/creator/ProjectsSection";
import { FinalSection } from "@/components/creator/FinalSection";
import { AmbientBackgroundLayers } from "@/components/creator/AmbientBackgroundLayers";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { SpotlightCursor } from "@/components/ui/SpotlightCursor";

export default function Home() {
  return (
    <div
      className="relative bg-[#0B0B0D] min-h-screen text-[#EAE8E2] antialiased selection:bg-[#E4E24A]/25 selection:text-[#EAE8E2]"
      id="top"
    >
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Luminous pointer light pool */}
      <SpotlightCursor />

      {/* Skip to content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#EDEC6B] focus:text-[#0B0B0D] focus:text-xs focus:font-medium focus:tracking-[0.16em] focus:uppercase focus:outline-none"
      >
        Skip to content
      </a>

      {/* Ambient background architecture */}
      <AmbientBackgroundLayers />

      {/* Warm vignette framing the composition */}
      <div
        className="fixed inset-0 pointer-events-none z-[50]"
        style={{
          background:
            "radial-gradient(150% 118% at 50% 38%, transparent 66%, rgba(6,6,80.58) 100%)",
        }}
      />

      {/* The single main landmark every reader navigates by */}
      <main id="main-content">
        {/* 01. Hero Section */}
        <HeroSection />

        {/* 02. Scroll-synchronised technology marquee */}
        <MarqueeSection />

        {/* 03. About: three live capability ponds */}
        <AboutSection />

        {/* 04. Verified enterprise experience */}
        <ExperienceSection />

        {/* 05. Core engineering disciplines */}
        <SkillsSection />

        {/* 06. Selected engineering work */}
        <ProjectsSection />
      </main>

      {/* 07. Contact and site footer */}
      <FinalSection />
    </div>
  );
}
