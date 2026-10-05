"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface VersionItem {
  id: string;
  href: string;
  tag: string;
  name: string;
  accent: string;
}

const websiteVersions: VersionItem[] = [
  {
    id: "v1",
    href: "/",
    tag: "V1",
    name: "Keynote Creator",
    accent: "#FACC15",
  },
  {
    id: "v2",
    href: "/v2",
    tag: "V2",
    name: "Modular Tech",
    accent: "#E2C799",
  },
  {
    id: "v3",
    href: "/redesign",
    tag: "V3",
    name: "Luxury Editorial",
    accent: "#F8FAFC",
  },
  {
    id: "v4",
    href: "/kage",
    tag: "V4",
    name: "3D Cyber World",
    accent: "#FDE047",
  },
  {
    id: "compare",
    href: "/versions",
    tag: "STUDIO",
    name: "Compare All",
    accent: "#CBD5E1",
  },
];

export function VersionPreviewDock() {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  const getActiveId = () => {
    if (pathname === "/") return "v1";
    if (pathname === "/v2") return "v2";
    if (pathname === "/redesign") return "v3";
    if (pathname === "/kage") return "v4";
    if (pathname === "/versions") return "compare";
    return "";
  };

  const activeId = getActiveId();

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 select-none pointer-events-auto max-w-[96vw]">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.button
            key="minimized-pill"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#080E1B]/95 border border-white/20 text-[#F3F1E8] shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-xs font-mono font-bold tracking-wider hover:border-[#14B8A6]/60 transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PREVIEW 4 VERSIONS</span>
            <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform text-[#14B8A6]" />
          </motion.button>
        ) : (
          <motion.div
            key="expanded-dock"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="flex items-center gap-1.5 sm:gap-2 p-2 rounded-2xl sm:rounded-full bg-[#070D18]/95 border border-white/15 backdrop-blur-2xl shadow-[0_15px_50px_rgba(0,0,0,0.92),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all"
          >
            <div className="hidden lg:flex items-center gap-2 pl-3 pr-2 py-1 text-xs font-mono font-bold text-[#E2E8F0] border-r border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>WEBSITE VERSIONS:</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
              {websiteVersions.map((ver) => {
                const isActive = activeId === ver.id;

                return (
                  <Link
                    key={ver.id}
                    href={ver.href}
                    className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-black font-bold shadow-lg"
                        : "text-[#CBD5E1] hover:text-white hover:bg-white/[0.08]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeVersionDockIndicator"
                        className="absolute inset-0 rounded-full z-0"
                        style={{
                          backgroundColor: "#F3F1E8",
                          boxShadow: `0 0 20px ${ver.accent}80`,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: isActive ? "#000" : ver.accent }}
                      />
                      <span className="font-bold">{ver.tag}</span>
                      <span className="hidden md:inline font-normal">{ver.name}</span>
                    </span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 sm:p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
              title="Minimize version switcher"
              aria-label="Minimize version switcher"
            >
              <ChevronDown size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
