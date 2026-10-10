"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  RefreshCw,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ResumeManifest {
  pageCount: number;
  titles: string[];
  updatedAt: number;
}

interface PendingPage {
  title: string;
  dataUrl: string;
}

interface PreviewResponse {
  pageCount: number;
  pages: string[];
  titles: string[];
}

const DEFAULT_PAGES = [
  { src: "/images/resume/page-1.png", title: "Summary, technical skills, work experience" },
  { src: "/images/resume/page-2.png", title: "ETL pipelines, SAP BODS, AnsiQ multi-agent" },
  { src: "/images/resume/page-3.png", title: "Qode-Sync, B.Tech degree, availability" },
];

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [manifest, setManifest] = useState<ResumeManifest | null>(null);
  const [ownerEnabled, setOwnerEnabled] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [pending, setPending] = useState<PendingPage[] | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [phase, setPhase] = useState<"idle" | "rendering" | "saving" | "done" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [dragging, setDragging] = useState(false);

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

  /* Every open re-reads the manifest (fresh pages) and probes whether the
     owner tooling is enabled. That probe answers `enabled: false` on the
     public site, so no upload control is ever rendered for visitors. */
  useEffect(() => {
    if (!isOpen) return;
    let alive = true;
    fetch("/images/resume/manifest.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((m: ResumeManifest | null) => {
        if (alive && m && typeof m.pageCount === "number" && Array.isArray(m.titles)) {
          setManifest(m);
        }
      })
      .catch(() => {});
    fetch("/api/resume-admin", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (alive && s && s.enabled) setOwnerEnabled(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [isOpen]);

  const resumePdfPath = "/shaik-mastan-vali-resume.pdf";

  const pages = manifest
    ? manifest.titles.map((title, i) => ({
        src: `/images/resume/page-${i + 1}.png?v=${manifest.updatedAt}`,
        title,
      }))
    : DEFAULT_PAGES;

  const clearPending = useCallback(() => {
    setPending(null);
    setPendingFile(null);
  }, []);

  /* The owner picks a PDF; the local server renders it with the same
     renderer the save step uses, so the thumbnails shown here are exactly
     what every resume view will show once saved. */
  const acceptFile = useCallback(async (file: File | undefined | null) => {
    if (!file) return;
    const looksPdf =
      (!file.type || file.type === "application/pdf") ||
      file.name.toLowerCase().endsWith(".pdf");
    if (!looksPdf) {
      setPhase("error");
      setStatusMsg("Please choose a PDF file.");
      return;
    }
    setPhase("rendering");
    setStatusMsg("Rendering pages from the PDF…");
    try {
      const fd = new FormData();
      fd.append("action", "preview");
      fd.append("pdf", file);
      const res = await fetch("/api/resume-admin", { method: "POST", body: fd });
      const body = (await res.json().catch(() => ({}))) as Partial<PreviewResponse> & {
        error?: string;
      };
      const pages = body.pages;
      const titles = body.titles;
      if (!res.ok || !Array.isArray(pages) || !Array.isArray(titles)) {
        throw new Error(body.error || res.statusText);
      }
      setPending(
        titles.map((title, i) => ({ title, dataUrl: pages[i] ?? "" }))
      );
      setPendingFile(file);
      setPhase("idle");
      setStatusMsg("");
    } catch (err) {
      setPhase("error");
      setStatusMsg(`Could not read the PDF: ${(err as Error).message}`);
    }
  }, []);

  const save = async () => {
    if (!pending || !pendingFile || phase === "saving" || phase === "rendering") return;
    setPhase("saving");
    setStatusMsg("Saving files into the site…");
    try {
      const fd = new FormData();
      fd.append("action", "save");
      fd.append("pdf", pendingFile);
      fd.append("pagesMeta", JSON.stringify(pending.map((p) => p.title)));
      const res = await fetch("/api/resume-admin", { method: "POST", body: fd });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || res.statusText);
      setManifest(body as ResumeManifest);
      setPhase("done");
      setStatusMsg(
        "Saved. The modal, downloads, and printed sheet now all show this resume. Publish with git when ready."
      );
      /* Let the experience sheet repaint without a page reload. */
      window.dispatchEvent(new CustomEvent("resume-updated"));
    } catch (err) {
      setPhase("error");
      setStatusMsg((err as Error).message);
    }
  };

  const cancelUpdate = () => {
    setShowUpdate(false);
    clearPending();
    setPhase("idle");
    setStatusMsg("");
  };

  const downloadClass =
    "px-3.5 py-2 bg-[#E8FF45] hover:bg-[#D9FF00] text-[#070807] font-[family-name:var(--font-geist-sans)] text-[12px] font-medium tracking-[0.04em] flex items-center gap-1.5 transition-colors duration-300";

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
            className="relative w-full max-w-5xl h-[94vh] glass-strong text-[#F4F5EF] rounded-[3px] overflow-hidden flex flex-col z-10 border border-[rgba(244,245,239,0.14)]"
          >
            {/* Control rail */}
            <div className="px-3 sm:px-6 py-3 border-b border-[rgba(244,245,239,0.09)] flex flex-wrap items-center justify-between gap-2 shrink-0 select-none bg-[rgba(244,245,239,0.02)]">
              <div className="flex items-center gap-2.5">
                <span className="h-[5px] w-[5px] rounded-full bg-[#D9FF00] animate-pulse" />
                <div className="flex items-center gap-2.5">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] sm:text-xs text-[#F4F5EF] tracking-[0.18em] uppercase">
                    Shaik Mastan Vali
                  </span>
                  <span className="hidden sm:inline text-[10px] font-[family-name:var(--font-geist-mono)] tracking-[0.18em] uppercase text-[#6A6A66] px-2 py-0.5 border border-[rgba(244,245,239,0.11)]">
                    {pages.length} page record
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Owner-only control — rendered only when the local owner
                    API answers, which never happens on the public site. */}
                {ownerEnabled && (
                  <button
                    type="button"
                    onClick={() => (showUpdate ? cancelUpdate() : setShowUpdate(true))}
                    className={`px-3 py-1.5 text-[11px] font-[family-name:var(--font-geist-mono)] tracking-[0.14em] uppercase flex items-center gap-1.5 transition-colors duration-300 cursor-pointer border ${
                      showUpdate
                        ? "bg-[rgba(217,255,0,0.14)] border-[#E8FF45] text-[#D9FF00]"
                        : "bg-transparent hover:bg-[rgba(217,255,0,0.10)] border-[rgba(217,255,0,0.42)] text-[#E8FF45] hover:text-[#D9FF00]"
                    }`}
                    title="Owner: replace the resume PDF (visible locally only)"
                  >
                    <RefreshCw size={13} />
                    <span className="hidden sm:inline">Update</span>
                  </button>
                )}

                <a
                  href={resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-transparent hover:bg-[rgba(244,245,239,0.05)] text-[11px] font-[family-name:var(--font-geist-mono)] tracking-[0.14em] uppercase text-[#B6B9B0] hover:text-[#F4F5EF] flex items-center gap-1.5 transition-colors duration-300 cursor-pointer border border-[rgba(244,245,239,0.11)]"
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
                  className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-[rgba(244,245,239,0.05)] text-[#7D8178] hover:text-[#F4F5EF] transition-colors duration-300 cursor-pointer border border-[rgba(244,245,239,0.11)]"
                  aria-label="Close resume"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Document scroll viewport */}
            <div className="relative w-full flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 space-y-6">
              {/* Owner upload panel */}
              {ownerEnabled && showUpdate && (
                <div className="max-w-3xl mx-auto border border-[rgba(217,255,0,0.35)] bg-[rgba(217,255,0,0.04)] p-4 sm:p-5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.18em] uppercase text-[#E8FF45]">
                      Owner · Upload latest resume
                    </span>
                    <span className="font-[family-name:var(--font-geist-mono)] text-[9.5px] tracking-[0.14em] uppercase text-[#6A6A66]">
                      Local only / visitors never see this
                    </span>
                  </div>

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      acceptFile(e.dataTransfer.files?.[0]);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed ${
                      dragging
                        ? "border-[#E8FF45] bg-[rgba(217,255,0,0.08)]"
                        : "border-[rgba(244,245,239,0.22)] hover:border-[rgba(217,255,0,0.5)]"
                    } px-4 py-6 flex flex-col items-center gap-2 cursor-pointer transition-colors duration-200`}
                  >
                    <Upload size={18} className="text-[#E8FF45]" />
                    <span className="font-[family-name:var(--font-geist-sans)] text-[12.5px] text-[#B6B9B0] text-center">
                      {pendingFile
                        ? pendingFile.name
                        : "Drop the new resume PDF here, or click to choose"}
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf,.pdf"
                      className="hidden"
                      onChange={(e) => {
                        acceptFile(e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                  </div>

                  {pending && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {pending.map((p, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="bg-[#EFEBE2] border border-[rgba(244,245,239,0.16)] overflow-hidden">
                            <img
                              src={p.dataUrl}
                              alt={`Rendered resume page ${i + 1}`}
                              className="w-full h-auto block"
                            />
                          </div>
                          <input
                            value={p.title}
                            onChange={(e) =>
                              setPending((prev) =>
                                prev
                                  ? prev.map((x, j) =>
                                      j === i ? { ...x, title: e.target.value } : x
                                    )
                                  : prev
                              )
                            }
                            className="w-full bg-[rgba(244,245,239,0.04)] border border-[rgba(244,245,239,0.12)] px-2 py-1.5 text-[11px] font-[family-name:var(--font-geist-mono)] text-[#B6B9B0] focus:border-[rgba(217,255,0,0.5)] focus:outline-none"
                            placeholder={`Page ${i + 1} title`}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {statusMsg && (
                    <div
                      className={`flex items-start gap-2 text-[11.5px] font-[family-name:var(--font-geist-mono)] leading-relaxed ${
                        phase === "error"
                          ? "text-[#FF8A7A]"
                          : phase === "done"
                            ? "text-[#E8FF45]"
                            : "text-[#B6B9B0]"
                      }`}
                      role="status"
                    >
                      {(phase === "rendering" || phase === "saving") && (
                        <Loader2 size={13} className="animate-spin shrink-0 mt-0.5" />
                      )}
                      {phase === "done" && (
                        <CheckCircle2 size={13} className="shrink-0 mt-0.5" />
                      )}
                      {phase === "error" && (
                        <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                      )}
                      <span>{statusMsg}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={save}
                      disabled={!pending || phase === "saving" || phase === "rendering"}
                      className="px-4 py-2 bg-[#E8FF45] hover:bg-[#D9FF00] disabled:opacity-40 disabled:cursor-not-allowed text-[#070807] text-[12px] font-medium tracking-[0.04em] flex items-center gap-1.5 transition-colors duration-300 cursor-pointer"
                    >
                      <Upload size={13} />
                      {phase === "saving" ? "Saving…" : "Save to site"}
                    </button>
                    <button
                      type="button"
                      onClick={cancelUpdate}
                      className="px-4 py-2 bg-transparent hover:bg-[rgba(244,245,239,0.05)] border border-[rgba(244,245,239,0.16)] text-[#B6B9B0] hover:text-[#F4F5EF] text-[12px] tracking-[0.04em] transition-colors duration-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <span className="font-[family-name:var(--font-geist-mono)] text-[9.5px] tracking-[0.12em] uppercase text-[#6A6A66]">
                      Saved locally / git push publishes it
                    </span>
                  </div>
                </div>
              )}

              {pages.map((page, idx) => (
                <div key={idx} className="max-w-3xl mx-auto flex flex-col items-center space-y-2.5">
                  <div className="w-full flex items-center justify-between text-[10.5px] font-[family-name:var(--font-geist-mono)] tracking-[0.16em] uppercase text-[#6A6A66] px-1">
                    <span>
                      <span className="text-[#43433F] mr-2">Page {idx + 1}</span>
                      {page.title}
                    </span>
                    <span className="text-[#D9FF00] tabular-nums">
                      {idx + 1} / {pages.length}
                    </span>
                  </div>

                  {/* The page itself stays paper white. That is the document, not the UI. */}
                  <div className="w-full bg-[#EFEBE2] rounded-[2px] overflow-hidden border border-[rgba(244,245,239,0.16)]">
                    <img
                      src={page.src}
                      alt={`Shaik Mastan Vali resume, page ${idx + 1}`}
                      className="w-full h-auto block select-text"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}

              <div className="max-w-3xl mx-auto pt-5 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[rgba(244,245,239,0.09)] text-[10.5px] font-[family-name:var(--font-geist-mono)] tracking-[0.18em] uppercase text-[#43433F]">
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
