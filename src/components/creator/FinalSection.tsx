"use client";

import { useState } from "react";
import { FadeIn } from "./FadeIn";
import { PremiumNightBackdrop } from "./PremiumNightBackdrop";
import { Mail, FileText } from "lucide-react";
import { GithubMark, LinkedinMark } from "@/components/ui/BrandIcons";
import { ResumeModal } from "@/components/resume/ResumeModal";
import { ShaderIgnitionButton } from "@/components/ui/ShaderIgnitionButton";

const EMAIL = "sk.mastanvali0116@gmail.com";

export function FinalSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-transparent text-[#F4F5EF] pt-24 sm:pt-28 md:pt-32 pb-16 px-5 sm:px-8 md:px-12 lg:px-16 select-none"
    >
      {/* Floor wash. Lemon pooled low and held at a low alpha, so the page
          appears to end in light rather than in a glow. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(217,255,0,0.075)_0%,transparent_72%)] blur-[110px]" />
        {/* Premium night beams over the closing floor */}
        <PremiumNightBackdrop side="left" mood="calm" />
      </div>

      {/* The closing chapter stands open on the black field: no box, no slab,
          just centred type over the lemon floor wash. Modal stays outside:
          backdrop-filter would trap its fixed overlay. */}
      <div className="mx-auto max-w-5xl flex flex-col items-center text-center relative z-10 space-y-11 px-5 sm:px-10 md:px-14 py-12 sm:py-14">
        <FadeIn y={20} duration={0.8}>
          <div className="flex items-center gap-2.5 eyebrow justify-center">
            <span className="h-[5px] w-[5px] rounded-full bg-[#D9FF00] animate-pulse" />
            // Start a conversation
          </div>

          {/* Balanced to a short line so the closing reads as one confident
              statement rather than a slogan: "what's next" also echoes the
              Engineer/Vision note at the top of the page. */}
          <h2 className="stylish-header text-[clamp(1.95rem,5.6vw,3.4rem)] text-[#FFFFFF] mt-4 max-w-[16ch] text-balance">
            Let&apos;s build what&apos;s next
          </h2>

          <p className="stylish-sub mt-6 text-[14px] sm:text-[15.5px] leading-[1.7] text-[#F4F5EF] max-w-[46ch] text-pretty">
            I am looking for my next engineering role across enterprise data platforms,
            autonomous agent systems, and full-stack product work. Write to me about
            yours and I will reply with something useful.
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

        {/* Contact details, inline with slash rules. Phone stays masked. */}
        <FadeIn y={15} delay={0.3} duration={0.7} className="w-full max-w-2xl pt-4">
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-[12.5px] font-[family-name:var(--font-geist-mono)] tracking-[0.02em] text-[#7D8178]">
            <a
              href={`mailto:${EMAIL}`}
              className="text-[#B6B9B0] hover:text-[#E8FF45] transition-colors duration-300"
            >
              {EMAIL}
            </a>
            <span className="text-[#43433F] select-none">/</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#6A6A66]">Tel</span>
              <span className="text-[#B6B9B0] tabular-nums">+91 837488</span>
              {/* Redacted. The withheld digits never enter the document. */}
              <span
                aria-hidden
                className="text-[#6A6A66] blur-[3px] select-none pointer-events-none"
              >
                &#9688;&#9688;&#9688;&#9688;
              </span>
              <span className="sr-only">last four digits withheld, shared on request</span>
            </span>
          </div>
        </FadeIn>

        {/* Social */}
        <FadeIn y={10} delay={0.4} duration={0.6} className="flex items-center gap-3 pt-1">
          <a
            href="https://github.com/anas116-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9FF00]"
            title="GitHub"
            aria-label="GitHub Profile"
          >
            <GithubMark size={24} />
          </a>

          <a
            href="https://www.linkedin.com/in/mastan-vali-shaik-86952725a/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9FF00]"
            title="LinkedIn"
            aria-label="LinkedIn Profile"
          >
            <LinkedinMark size={24} />
          </a>
        </FadeIn>

        <div className="pt-8 border-t border-[rgba(244,245,239,0.07)] w-full text-center text-[11px] font-[family-name:var(--font-geist-mono)] tracking-[0.16em] uppercase text-[#43433F]">
          &copy; {new Date().getFullYear()} Shaik Mastan Vali
          <span className="mx-2 text-[#2A2A2E]">/</span>
          Enterprise data engineering, autonomous agents, full-stack systems
        </div>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </footer>
  );
}