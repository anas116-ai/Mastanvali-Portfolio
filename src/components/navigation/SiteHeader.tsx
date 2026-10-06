"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { ProximityCommandDock, MobileNav } from "@/components/creator/ProximityCommandDock";

/* The masthead.
 *
 * It used to live inside the hero as a static element in the hero's flex
 * flow, which meant that past about 400px of scroll the page had no
 * navigation on it at all. It also inherited the hero's `overflow-hidden`,
 * so no amount of `fixed` would have worked from in there. Both problems
 * disappear when the header is a sibling of <main> rather than a child.
 *
 * It stays transparent over the hero and only becomes a surface once the
 * page has scrolled off the hero, so the opening frame is not capped with
 * a bar it does not need.
 */

const SECTIONS = ["about", "experience", "skills", "projects", "contact"];

export function SiteHeader() {
  const [pastHero, setPastHero] = useState(false);
  const [section, setSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      /* The hero section, not `#top`. `#top` is the wrapper around the
         entire page, so measuring against it meant pastHero could only
         become true within 96px of the very bottom and the bar stayed
         transparent over every section it was supposed to cap. */
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

  /* The dock sets its own active state on click, but a masthead that only
     knows where you last clicked is wrong after any manual scroll. This
     tracks the real position instead. */
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
      "h-9 w-9 flex items-center justify-center border border-[rgba(234,232,226,0.11)] text-[#8C8C86] hover:text-[#EDEC6B] hover:border-[rgba(237,236,107,0.42)] transition-colors duration-300 cursor-pointer",
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        pastHero
          ? "bg-[rgba(11,11,13,0.82)] backdrop-blur-xl border-b border-[rgba(234,232,226,0.10)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 h-14 flex items-center justify-between">
        <a
          href="#top"
          className="group inline-flex items-center gap-2.5 cursor-pointer"
          aria-label="Mastan Vali, back to top"
        >
          <span className="h-[5px] w-[5px] rounded-full bg-[#E4E24A] shrink-0" />
          <span className="font-[family-name:var(--font-geist-sans)] text-[13px] font-medium tracking-[0.02em] text-[#C9C8C3] group-hover:text-[#EAE8E2] transition-colors duration-300 select-none">
            Mastan Vali
          </span>
        </a>

        <ProximityCommandDock activeId={section} />

        <div className="flex items-center gap-2 sm:gap-2.5">
          <MobileNav />
          <a
            href="https://github.com/anas116-ai"
            target="_blank"
            rel="noopener noreferrer"
            className={social.className}
            title="GitHub (anas116-ai)"
            aria-label="GitHub Profile"
          >
            <Github size={15} className="pointer-events-none" />
          </a>
          <a
            href="https://www.linkedin.com/in/mastan-vali-shaik-86952725a/"
            target="_blank"
            rel="noopener noreferrer"
            className={social.className}
            title="LinkedIn (Mastan Vali Shaik)"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={15} className="pointer-events-none" />
          </a>
        </div>
      </div>
    </header>
  );
}