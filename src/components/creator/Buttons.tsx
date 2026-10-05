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
      className={`group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#EEF0F3] bg-[#0C0F18]/90 hover:bg-[#101521] border border-white/[0.08] hover:border-[#C8702A]/50 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${className}`}
    >
      <Mail size={15} className="relative z-10 text-[#C8702A] group-hover:text-[#C49A38] transition-colors duration-300 stroke-[2.2]" />
      <span className="relative z-10 font-bold tracking-wider text-[#EEF0F3] font-[family-name:var(--font-outfit)]">
        {label}
      </span>
      <ArrowUpRight size={15} className="relative z-10 text-[#8A97A8] group-hover:text-[#EEF0F3] stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
      className={`group relative overflow-hidden inline-flex items-center gap-2 rounded-xl border px-5 py-3 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#EEF0F3] bg-[#0C0F18]/90 hover:bg-[#101521] hover:border-[#C8702A]/60 border-white/[0.08] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg active:translate-y-0 ${className}`}
    >
      <span className="relative z-10 font-[family-name:var(--font-outfit)]">{label}</span>
      <ArrowUpRight size={14} className="relative z-10 text-[#C8702A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
    </a>
  );
}

export { LiveProjectButton as ProjectLink };
