"use client";

import { ArrowUpRight, Mail } from "lucide-react";

export function ContactButton({
  label = "Contact Me",
  href = "#contact",
  className = "",
}: {
  label?: string;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F8FAFC] bg-[#0E121B]/90 hover:bg-[#131926] border border-white/20 hover:border-[#E06D20]/50 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${className}`}
    >
      <Mail size={15} className="relative z-10 text-[#E06D20] group-hover:text-[#D9A036] transition-colors duration-300 stroke-[2.2]" />
      <span className="relative z-10 font-bold tracking-wider text-[#F8FAFC] font-[family-name:var(--font-outfit)]">
        {label}
      </span>
      <ArrowUpRight size={15} className="relative z-10 text-[#94A3B8] group-hover:text-[#F8FAFC] stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export function LiveProjectButton({
  label = "Inspect Repository",
  href = "#",
  className = "",
}: {
  label?: string;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden inline-flex items-center gap-2 rounded-xl border px-5 py-3 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F8FAFC] bg-[#0E121B]/90 hover:bg-[#131926] hover:border-[#E06D20]/60 border-white/15 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg active:translate-y-0 ${className}`}
    >
      <span className="relative z-10 font-[family-name:var(--font-outfit)]">{label}</span>
      <ArrowUpRight size={14} className="relative z-10 text-[#E06D20] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
    </a>
  );
}

export { LiveProjectButton as ProjectLink };
