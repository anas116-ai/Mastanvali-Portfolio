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

export default function Home() {
  return (
    <div className="relative bg-[#07090E] min-h-screen text-[#F8FAFC] antialiased selection:bg-[#E06D20]/25 selection:text-[#FFFFFF]" id="top">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Skip to content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#E06D20] focus:text-[#07090E] focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-[#E06D20]"
      >
        Skip to content
      </a>

      {/* Creative Technical & Professional Ambient Background Architecture */}
      <AmbientBackgroundLayers />

      {/* Subtle Atmospheric Vignette framing the edges with soft luxury depth */}
      <div
        className="fixed inset-0 pointer-events-none z-[50]"
        style={{
          background: "radial-gradient(145% 115% at 50% 40%, transparent 72%, rgba(5, 8, 17, 0.32) 100%)",
        }}
      />

      {/* 01. Hero Section with 4K Character & Avatar */}
      <HeroSection />

      {/* 02. Two-Row Scroll-Synchronized Marquee */}
      <MarqueeSection />

      {/* 03. About Section with High-End Bento Architecture */}
      <AboutSection />

      {/* 04. Verified Enterprise Experience (VHS / TCS / Fortune 500 Grainger) */}
      <ExperienceSection />

      {/* 05. Technical Capabilities — 3 Master Hardcover Tomes (Enterprise Data, AI, Full-Stack) */}
      <SkillsSection />

      {/* 06. Sticky-Stacking Engineered Projects (AnPharmacy, AnsiQ, Anasify, Qode-Sync) */}
      <ProjectsSection />

      {/* 07. Final Contact Hub & Verified Information Footer */}
      <FinalSection />
    </div>
  );
}
