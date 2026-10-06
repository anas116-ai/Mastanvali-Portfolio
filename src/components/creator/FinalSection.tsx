"use client";

import { useState } from "react";
import { FadeIn } from "./FadeIn";
import { PremiumNightBackdrop } from "./PremiumNightBackdrop";
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import { ResumeModal } from "@/components/resume/ResumeModal";
import { ShaderIgnitionButton } from "@/components/ui/ShaderIgnitionButton";

const EMAIL = "sk.mastanvali0116@gmail.com";

export function FinalSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-transparent text-[#F5F2EB] pt-24 sm:pt-28 md:pt-32 pb-16 px-5 sm:px-8 md:px-12 lg:px-16 select-none border-t border-[rgba(245,242,235,0.07)]"
    >
      {/* Floor wash. Lemon pooled low and held at a low alpha, so the page
          appears to end in light rather than in a glow. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(205,253,2,0.075)_0%,transparent_72%)] blur-[110px]" />
        {/* Premium night beams over the closing floor */}
        <PremiumNightBackdrop side="left" mood="calm" />
      </div>

      <div className="mx-auto max-w-4xl flex flex-col items-center text-center relative z-10 space-y-11">
        <FadeIn y={20} duration={0.8}>
          <div className="flex items-center gap-2.5 eyebrow justify-center">
            <span className="h-[5px] w-[5px] rounded-full bg-[#CDFD02] animate-pulse" />
            // Start a conversation
          </div>

          {/* The heading is balanced so its two lines carry equal weight, and the
              caption is set to its own measure on the same optical centre. Neither
              is allowed to run long: the caption holds a 62 character line, which
              is where this face still reads as a sentence rather than a block. */}
          <h2 className="stylish-header text-[clamp(1.95rem,5.6vw,3.4rem)] text-[#F5F2EB] mt-4 max-w-[16ch] text-balance">
            Let&apos;s Build Something Extraordinary
          </h2>

          <p className="stylish-sub mt-6 text-[13.5px] sm:text-[15px] leading-[1.7] text-[#8C8C86] max-w-[46ch] text-pretty">
            Open to engineering roles across enterprise data platforms, autonomous agent
            systems, and full-stack product work. Send a note and I will reply with
            something useful.
          </p>
        </FadeIn>

        {/* Two actions only. The shape stays, the type is Geist. */}
        <FadeIn y={15} delay={0.2} duration={0.7} className="flex flex-wrap items-center justify-center gap-3.5">
          <ShaderIgnitionButton
            variant="lemon"
            href={`mailto:${EMAIL}`}
            ariaLabel="Send an email to Mastan Vali"
            icon={<Mail size={15} />}
            iconPosition="left"
            size="lg"
          >
            Send an email
          </ShaderIgnitionButton>

          <ShaderIgnitionButton
            variant="bone"
            onClick={() => setIsResumeOpen(true)}
            ariaLabel="View resume"
            icon={<FileText size={15} />}
            iconPosition="left"
            size="lg"
          >
            Resume
          </ShaderIgnitionButton>
        </FadeIn>

        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

        {/* Contact details, inline with slash rules. Phone stays masked. */}
        <FadeIn y={15} delay={0.3} duration={0.7} className="w-full max-w-2xl pt-4">
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-[12.5px] font-[family-name:var(--font-geist-mono)] tracking-[0.02em] text-[#8C8C86]">
            <a
              href={`mailto:${EMAIL}`}
              className="text-[#C9C8C3] hover:text-[#DCFD3C] transition-colors duration-300"
            >
              {EMAIL}
            </a>
            <span className="text-[#43433F] select-none">/</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#6A6A66]">Tel</span>
              <span className="text-[#C9C8C3] tabular-nums">+91 837488</span>
              {/* Redacted. The withheld digits never enter the document. */}
              <span
                aria-hidden
                className="text-[#6A6A66] blur-[3px] select-none pointer-events-none"
              >
                &#9688;&#9688;&#9688;&#9688;
              </span>
              <span className="sr-only">last four digits withheld, shared on request</span>
            </span>
            <span className="text-[#43433F] select-none">/</span>
            <span className="text-[#C9C8C3]">Hyderabad, India</span>
          </div>
        </FadeIn>

        {/* Social */}
        <FadeIn y={10} delay={0.4} duration={0.6} className="flex items-center gap-3 pt-1">
          <a
            href="https://github.com/anas116-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-[rgba(245,242,235,0.11)] text-[#8C8C86] hover:text-[#DCFD3C] hover:border-[rgba(220,253,60,0.42)] transition-colors duration-300"
            title="GitHub"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>

          <a
            href="https://www.linkedin.com/in/mastan-vali-shaik-86952725a/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-[rgba(245,242,235,0.11)] text-[#8C8C86] hover:text-[#DCFD3C] hover:border-[rgba(220,253,60,0.42)] transition-colors duration-300"
            title="LinkedIn"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
        </FadeIn>

        <div className="pt-8 border-t border-[rgba(245,242,235,0.07)] w-full text-center text-[11px] font-[family-name:var(--font-geist-mono)] tracking-[0.16em] uppercase text-[#43433F]">
          &copy; {new Date().getFullYear()} Shaik Mastan Vali
          <span className="mx-2 text-[#2A2A2E]">/</span>
          Enterprise data engineering, autonomous agents, full-stack systems
        </div>
      </div>
    </footer>
  );
}