"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      const raf = requestAnimationFrame(() => closeBtnRef.current?.focus());
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const resumePdfPath = "/shaik-mastan-vali-resume.pdf";

  const resumePages = [
    { src: "/images/resume/page-1.png", title: "Summary, technical skills, work experience" },
    { src: "/images/resume/page-2.png", title: "ETL pipelines, SAP BODS, AnsiQ multi-agent" },
    { src: "/images/resume/page-3.png", title: "Qode-Sync, B.Tech degree, availability" },
  ];

  const downloadClass =
    "px-3.5 py-2 bg-[#EDEC6B] hover:bg-[#E4E24A] text-[#0B0B0D] font-[family-name:var(--font-geist-sans)] text-[12px] font-medium tracking-[0.04em] flex items-center gap-1.5 transition-colors duration-300";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26 }}
            onClick={onClose}
            className="absolute inset-0 bg-[rgba(6,6,8,0.93)] backdrop-blur-[3px] cursor-pointer"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Verified resume"
            initial={{ opacity: 0, y: 18, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[94vh] bg-[#0C0C0F] text-[#EAE8E2] rounded-[3px] overflow-hidden flex flex-col z-10 border border-[rgba(234,232,226,0.14)]"
          >
            {/* Control rail */}
            <div className="px-3 sm:px-6 py-3 border-b border-[rgba(234,232,226,0.09)] flex flex-wrap items-center justify-between gap-2 shrink-0 select-none bg-[rgba(234,232,226,0.02)]">
              <div className="flex items-center gap-2.5">
                <span className="h-[5px] w-[5px] rounded-full bg-[#E4E24A] animate-pulse" />
                <div className="flex items-center gap-2.5">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] sm:text-xs text-[#EAE8E2] tracking-[0.18em] uppercase">
                    Shaik Mastan Vali
                  </span>
                  <span className="hidden sm:inline text-[10px] font-[family-name:var(--font-geist-mono)] tracking-[0.18em] uppercase text-[#6A6A66] px-2 py-0.5 border border-[rgba(234,232,226,0.11)]">
                    3 page record
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <a
                  href={resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-transparent hover:bg-[rgba(234,232,226,0.05)] text-[11px] font-[family-name:var(--font-geist-mono)] tracking-[0.14em] uppercase text-[#C9C8C3] hover:text-[#EAE8E2] flex items-center gap-1.5 transition-colors duration-300 cursor-pointer border border-[rgba(234,232,226,0.11)]"
                  title="Open the original PDF in a new tab"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Open PDF</span>
                </a>

                <a
                  href={resumePdfPath}
                  download="Shaik-Mastan-Vali-Resume.pdf"
                  className={downloadClass}
                  title="Download the verified PDF"
                >
                  <Download size={13} />
                  <span className="hidden sm:inline">Download PDF</span>
                </a>

                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-[rgba(234,232,226,0.05)] text-[#8C8C86] hover:text-[#EAE8E2] transition-colors duration-300 cursor-pointer border border-[rgba(234,232,226,0.11)]"
                  aria-label="Close resume"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Document scroll viewport */}
            <div className="relative w-full flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 space-y-6">
              {resumePages.map((page, idx) => (
                <div key={idx} className="max-w-3xl mx-auto flex flex-col items-center space-y-2.5">
                  <div className="w-full flex items-center justify-between text-[10.5px] font-[family-name:var(--font-geist-mono)] tracking-[0.16em] uppercase text-[#6A6A66] px-1">
                    <span>
                      <span className="text-[#43433F] mr-2">Page {idx + 1}</span>
                      {page.title}
                    </span>
                    <span className="text-[#E4E24A] tabular-nums">
                      {idx + 1} / {resumePages.length}
                    </span>
                  </div>

                  {/* The page itself stays paper white. That is the document, not the UI. */}
                  <div className="w-full bg-[#EFEBE2] rounded-[2px] overflow-hidden border border-[rgba(234,232,226,0.16)]">
                    <img
                      src={page.src}
                      alt={`Shaik Mastan Vali resume, page ${idx + 1}`}
                      className="w-full h-auto block select-text"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}

              <div className="max-w-3xl mx-auto pt-5 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[rgba(234,232,226,0.09)] text-[10.5px] font-[family-name:var(--font-geist-mono)] tracking-[0.18em] uppercase text-[#43433F]">
                <span>Verified record / Shaik Mastan Vali</span>
                <a href={resumePdfPath} download="Shaik-Mastan-Vali-Resume.pdf" className={downloadClass}>
                  <Download size={14} />
                  <span>Download original PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}