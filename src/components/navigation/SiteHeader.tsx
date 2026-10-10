"use client";

import { useEffect, useState } from "react";
import { GithubMark, LinkedinMark } from "@/components/ui/BrandIcons";
import { ProximityCommandDock, MobileNav } from "@/components/creator/ProximityCommandDock";

/* The masthead.
 *
 * It used to live inside the hero as a static element in the hero's flex
 * flow, which meant that past about 400px of scroll the page had no
 * navigation on it at all. It also inherited the hero's `overflow-hidden`,
 * so no amount of `fixed` would have worked from in there. Both problems
 * disappear when the header is a sibling of <main> rather than a child.
 *
 * It stays a faint liquid sheet over the hero and only becomes a
 * full smoked surface once the page has scrolled off it, so the
 * opening frame still carries the glass material without being
 * capped by a heavy bar it does not need.
 */

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
      "h-11 w-11 flex items-center justify-center transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9FF00]",
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: pastHero ? "rgba(7, 9, 7, 0.66)" : "rgba(7, 9, 7, 0.30)",
        WebkitBackdropFilter: "blur(28px) saturate(1.75)",
        backdropFilter: "blur(28px) saturate(1.75)",
        borderBottom: "none",
        boxShadow: "none",
        transition: "background-color 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        <a
          href="#top"
          className="group inline-flex items-center cursor-pointer"
          aria-label="Mastan Vali, back to top"
        >
          <span className="font-header-dynamic text-[17px] sm:text-[18px] font-medium uppercase tracking-[0.16em] text-white select-none">
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
            <GithubMark size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/mastan-vali-shaik-86952725a/"
            target="_blank"
            rel="noopener noreferrer"
            className={social.className}
            title="LinkedIn (Mastan Vali Shaik)"
            aria-label="LinkedIn Profile"
          >
            <LinkedinMark size={24} />
          </a>
        </div>
        </div>
      </div>
    </header>
  );
}