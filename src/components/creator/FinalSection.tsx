"use client";

import { useState } from "react";
import { FadeIn } from "./FadeIn";
import { Mail, Linkedin, Github, FileText, Copy, Check } from "lucide-react";
import { ResumeModal } from "@/components/resume/ResumeModal";
import { ShaderIgnitionButton } from "@/components/ui/ShaderIgnitionButton";

export function FinalSection() {
  const [copied, setCopied] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const email = "sk.mastanvali0116@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-transparent text-[#F8FAFC] pt-20 sm:pt-24 md:pt-28 pb-20 px-5 sm:px-8 md:px-12 lg:px-16 select-none font-[family-name:var(--font-sans)]"
    >
      {/* --- LUXURY OBSIDIAN HORIZON --- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Architectural Coordinate Marks */}
        <div className="absolute top-8 right-8 text-white/30 font-mono text-[11px] tracking-widest hidden md:block">
          COMMUNICATION_TERMINAL // STATUS: OPEN
        </div>
        <div className="absolute bottom-8 left-8 text-white/30 font-mono text-[11px] tracking-widest hidden md:block">
          HYDERABAD_INDIA // IMMEDIATE_JOINER
        </div>
      </div>

      <div className="mx-auto max-w-5xl flex flex-col items-center text-center relative z-10 space-y-8">
        <FadeIn y={20} duration={0.8}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider mb-4 bg-[#E06D20]/10 text-[#E06D20] border border-[#E06D20]/30 shadow-[0_0_15px_rgba(224,109,32,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#E06D20] animate-pulse" />
            <span>Available for Opportunities &bull; Immediate Joiner</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#F8FAFC] mb-4 font-medium font-[family-name:var(--font-outfit)] tracking-normal">
            Let&apos;s Build Something Extraordinary
          </h2>

          <p className="text-[#94A3B8] text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed font-[family-name:var(--font-plus-jakarta)]">
            Open to engineering roles across <strong className="text-[#F8FAFC] font-medium">Enterprise Data Engineering (SAP BODS / SQL / ETL)</strong>, <strong className="text-[#F8FAFC] font-medium">AI Multi-Agent Systems</strong>, or <strong className="text-[#F8FAFC] font-medium">Full-Stack Application Development</strong>.
          </p>
        </FadeIn>

        {/* Action Hub with Shader Ignition Buttons */}
        <FadeIn y={15} delay={0.2} duration={0.7} className="flex flex-wrap items-center justify-center gap-3.5">
          <ShaderIgnitionButton
            variant="amber"
            href={`mailto:${email}`}
            ariaLabel="Send an Email to Mastan Vali"
            icon={<Mail size={15} className="text-[#E06D20]" />}
            iconPosition="left"
            size="md"
          >
            Send an Email
          </ShaderIgnitionButton>

          <ShaderIgnitionButton
            variant="platinum"
            onClick={handleCopy}
            ariaLabel="Copy Email Address"
            icon={
              copied ? (
                <Check size={14} className="text-[#E06D20] stroke-[2.5]" />
              ) : (
                <Copy size={14} className="text-[#E06D20]" />
              )
            }
            iconPosition="left"
            size="md"
          >
            {copied ? "Copied Email" : "Copy Email"}
          </ShaderIgnitionButton>

          <ShaderIgnitionButton
            variant="platinum"
            onClick={() => setIsResumeOpen(true)}
            ariaLabel="View Resume"
            icon={<FileText size={15} className="text-[#F8FAFC]" />}
            iconPosition="left"
            size="md"
          >
            Resume (View / Print)
          </ShaderIgnitionButton>
        </FadeIn>

        {/* Verified Resume Modal */}
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

        {/* Verified Direct Contact Details (Seamless, Borderless) */}
        <FadeIn y={15} delay={0.3} duration={0.7} className="pt-2 w-full max-w-2xl">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-mono py-2">
            <div className="flex items-center gap-2">
              <span className="text-[#94A3B8] font-mono">// PHONE:</span>
              <a href="tel:8374882630" className="text-[#F8FAFC] hover:text-[#E06D20] font-semibold transition-colors">
                +91 8374882630
              </a>
            </div>

            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />

            <div className="flex items-center gap-2">
              <span className="text-[#94A3B8] font-mono">// LOCATION:</span>
              <span className="text-[#F8FAFC] font-semibold">
                AP / Hyderabad, India
              </span>
            </div>

            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />

            <div className="flex items-center gap-2">
              <span className="text-[#94A3B8] font-mono">// RELOCATION:</span>
              <span className="text-[#E06D20] font-semibold">
                Immediate Availability
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Social Badges */}
        <FadeIn y={10} delay={0.4} duration={0.6} className="flex items-center gap-3 pt-2">
          <a
            href="https://github.com/anas116-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-[#94A3B8] hover:text-[#E06D20] hover:border-[#E06D20]/60 transition-all hover:scale-105 shadow-md"
            title="GitHub"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>

          <a
            href="https://www.linkedin.com/in/mastan-vali-shaik-86952725a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-[#94A3B8] hover:text-[#E06D20] hover:border-[#E06D20]/60 transition-all hover:scale-105 shadow-md"
            title="LinkedIn"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
        </FadeIn>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 w-full text-center text-xs font-mono text-[#94A3B8]">
          &copy; {new Date().getFullYear()} Shaik Mastan Vali &bull; Enterprise Data Engineering &bull; AI Systems &bull; Full-Stack Development
        </div>
      </div>
    </footer>
  );
}
