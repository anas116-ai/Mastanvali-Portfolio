"use client";

import { useEffect, useState } from "react";
import { GithubMark, LinkedinMark } from "@/components/ui/BrandIcons";
import { ProximityCommandDock, MobileNav } from "@/components/creator/ProximityCommandDock";

const SECTIONS = ["about", "experience", "skills", "projects", "contact"];

export function SiteHeader() {
  const [pastHero, setPastHero] = useState(false);
  const [section, setSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>("#main-content > section");
      const threshold = hero
        ? hero.offsetTop + hero.offsetHeight - 96
        : window.innerHeight * 0.9;
      setPastHero(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const line = window.scrollY + window.innerHeight * 0.34;
      let current = "";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= line) current = id;
      }
      setSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const social = {
    className:
      "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/[0.08] hover:text-[#E8FF45] text-[#B6B9B0] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8FF45]",
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out"
      style={{
        backgroundColor: pastHero ? "rgba(10, 13, 10, 0.65)" : "rgba(10, 13, 10, 0.40)",
        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        backdropFilter: "blur(24px) saturate(1.8)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
        boxShadow: pastHero ? "0 12px 36px -12px rgba(0, 0, 0, 0.6)" : "none",
      }}
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <a
            href="#top"
            className="group inline-flex items-center cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Mastan Vali, back to top"
          >
            <span className="font-header-dynamic text-[16px] sm:text-[18px] font-semibold uppercase tracking-[0.16em] text-white select-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8FF45] shadow-[0_0_8px_#E8FF45]" />
              MASTAN VALI
            </span>
          </a>

          <ProximityCommandDock activeId={section} />

          <div className="flex items-center gap-2 sm:gap-3">
            <MobileNav />
            <a
              href="https://github.com/anas116-ai"
              target="_blank"
              rel="noopener noreferrer"
              className={social.className}
              title="GitHub (anas116-ai)"
              aria-label="GitHub Profile"
            >
              <GithubMark size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mastan-vali-shaik-86952725a/"
              target="_blank"
              rel="noopener noreferrer"
              className={social.className}
              title="LinkedIn (Mastan Vali Shaik)"
              aria-label="LinkedIn Profile"
            >
              <LinkedinMark size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
