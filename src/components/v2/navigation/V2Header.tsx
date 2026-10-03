"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";

export function V2Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3.5 sm:py-4 flex justify-center items-center pointer-events-none ${
        isScrolled ? "backdrop-blur-xl bg-[#050914]/80 py-2.5 sm:py-3 border-b border-[rgba(100,210,225,0.12)]" : ""
      }`}
    >
      <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">
        {/* Brand Monogram Signature */}
        <a
          href="#top"
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#08131D]/85 border border-[rgba(100,210,225,0.16)] backdrop-blur-2xl hover:border-[#14B8A6]/45 transition-all shadow-sm group"
        >
          <span className="h-2 w-2 rounded-full bg-[#14B8A6] shadow-[0_0_10px_#14B8A6]" />
          <span className="font-extrabold text-xs sm:text-sm tracking-wider text-[#F3F1E8] group-hover:text-[#14B8A6] transition-colors uppercase font-[family-name:var(--font-outfit)]">
            MASTAN VALI
          </span>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/20 hidden sm:inline-block">
            v2 &bull; PRO
          </span>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 px-6 py-2 rounded-full bg-[#08131D]/85 border border-[rgba(100,210,225,0.16)] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] font-semibold uppercase tracking-[0.14em] text-[#B8C4CC] text-[11px] font-[family-name:var(--font-outfit)]">
          <a href="#work" className="hover:text-[#14B8A6] transition-colors py-1">
            Work
          </a>
          <a href="#capabilities" className="hover:text-[#14B8A6] transition-colors py-1">
            Capabilities
          </a>
          <a href="#experience" className="hover:text-[#14B8A6] transition-colors py-1">
            Experience
          </a>
          <a href="#philosophy" className="hover:text-[#14B8A6] transition-colors py-1">
            Philosophy
          </a>
          <a href="#contact" className="hover:text-[#14B8A6] transition-colors py-1">
            Contact
          </a>
        </nav>

        {/* Action Controls & Socials */}
        <div className="flex items-center gap-2">
          {/* Availability Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/25 text-[10px] font-mono text-[#14B8A6]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider">Immediate Joiner</span>
          </div>

          {/* GitHub Profile */}
          <a
            href="https://github.com/anas116-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#08131D]/85 border border-[rgba(100,210,225,0.16)] text-[#B8C4CC] hover:text-[#14B8A6] hover:border-[#14B8A6]/40 shadow-sm transition-all hover:scale-105"
            title="GitHub Profile"
          >
            <Github size={14} />
          </a>

          {/* LinkedIn Profile */}
          <a
            href="https://www.linkedin.com/in/mastan-vali-shaik-86952725a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#08131D]/85 border border-[rgba(100,210,225,0.16)] text-[#B8C4CC] hover:text-[#14B8A6] hover:border-[#14B8A6]/40 shadow-sm transition-all hover:scale-105"
            title="LinkedIn Profile"
          >
            <Linkedin size={14} />
          </a>

          {/* Contact Direct CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#14B8A6] text-[#050914] font-bold text-[11px] font-mono uppercase tracking-wider hover:bg-[#38BDF8] shadow-[0_0_20px_rgba(20, 184, 166, 0.35)] transition-all hover:scale-105"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={13} className="stroke-[2.5]" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
