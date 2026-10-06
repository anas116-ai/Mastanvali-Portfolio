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
import { SiteHeader } from "@/components/navigation/SiteHeader";

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

      {/* Corner vignette framing the composition.
          The alpha was missing its comma, so this was resolving to a solid
          opaque blue instead of a near-black wash: rgba(6,6,80.58) parses
          as a fully opaque rgb(6,6,80). */}
      <div
        className="fixed inset-0 pointer-events-none z-[50]"
        style={{
          background:
            "radial-gradient(150% 118% at 50% 38%, transparent 66%, rgba(6,6,8,0.58) 100%)",
        }}
      />

      {/* 01. Masthead. A sibling of <main>, not a child of the hero: the
          hero clips its overflow, so a fixed bar placed inside it would be
          cut off, and in static form it scrolled away entirely. */}
      <SiteHeader />

      {/* The single main landmark every reader navigates by */}
      <main id="main-content">
        {/* 02. Hero Section */}
        <HeroSection />

        {/* 03. Scroll-synchronised technology marquee */}
        <MarqueeSection />

        {/* 04. About: three live capability ponds */}
        <AboutSection />

        {/* 05. Verified enterprise experience */}
        <ExperienceSection />

        {/* 06. Core engineering disciplines */}
        <SkillsSection />

        {/* 07. Selected engineering work */}
        <ProjectsSection />
      </main>

      {/* 08. Contact and site footer */}
      <FinalSection />
    </div>
  );
}
