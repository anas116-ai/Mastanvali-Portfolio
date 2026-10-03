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

  // Close on Escape key
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
    { src: "/images/resume/page-1.png", title: "PAGE 01 // SUMMARY, TECHNICAL SKILLS & WORK EXPERIENCE" },
    { src: "/images/resume/page-2.png", title: "PAGE 02 // ETL PIPELINES, SAP BODS & ANSIQ MULTI-AGENT" },
    { src: "/images/resume/page-3.png", title: "PAGE 03 // QODE-SYNC, B.TECH DEGREE & AVAILABILITY" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Window Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Verified Resume"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
            className="relative w-full max-w-5xl h-[94vh] bg-[#050811] text-white rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-10 border border-white/20"
          >
            {/* Modal Top Control Bar */}
            <div className="bg-[#050811] px-3 sm:px-6 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 shrink-0 select-none">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F47A18] animate-pulse" />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm text-[#F3F1E8] tracking-wider uppercase font-semibold">
                    Shaik Mastan Vali &bull; Verified Resume
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#F47A18]/15 border border-[#F47A18]/30 text-[#F47A18] font-medium">
                    3-Page Document
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <a
                  href={resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-[#B8C4CC] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Open original PDF in new tab"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Open New Tab</span>
                </a>

                <a
                  href={resumePdfPath}
                  download="Shaik-Mastan-Vali-Resume.pdf"
                  className="px-3.5 py-1.5 rounded-lg bg-[#F47A18] hover:bg-[#EA580C] text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(244,122,24,0.4)] transition-all cursor-pointer"
                  title="Download authentic PDF resume"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </a>

                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors ml-1 cursor-pointer"
                  aria-label="Close Resume"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Seamless 3-Page Authentic Document Scroll Viewport */}
            <div className="relative w-full flex-1 bg-[#050811] overflow-y-auto overflow-x-hidden p-3 sm:p-6 space-y-6">
              {resumePages.map((page, idx) => (
                <div key={idx} className="max-w-3xl mx-auto flex flex-col items-center space-y-2">
                  <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#94A3B8] px-2">
                    <span>{page.title}</span>
                    <span className="text-[#F47A18] font-semibold">{idx + 1} / 3</span>
                  </div>

                  <div className="w-full bg-white rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden border border-white/20">
                    <img
                      src={page.src}
                      alt={`Shaik Mastan Vali Resume - Page ${idx + 1}`}
                      className="w-full h-auto block select-text"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}

              {/* Bottom Quick Download Strip */}
              <div className="max-w-3xl mx-auto pt-4 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs font-mono text-[#94A3B8]">
                <span>OFFICIAL VERIFIED RECORD &bull; SHAIK MASTAN VALI</span>
                <a
                  href={resumePdfPath}
                  download="Shaik-Mastan-Vali-Resume.pdf"
                  className="px-4 py-2 rounded-lg bg-[#F47A18] hover:bg-[#EA580C] text-white font-bold flex items-center gap-2 shadow-lg transition-all"
                >
                  <Download size={14} />
                  <span>Download Original PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
