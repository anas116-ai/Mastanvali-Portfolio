"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, Terminal, Cpu } from "lucide-react";
import { AmbientSoundControl } from "@/components/hud/AmbientSoundControl";

const navLinks = [
  { label: "01 // WORK", href: "#work" },
  { label: "02 // PIPELINE", href: "#experience" },
  { label: "03 // HOW I BUILD", href: "#how-i-build" },
  { label: "04 // CAPABILITIES", href: "#capabilities" },
  { label: "05 // ABOUT", href: "#about" },
  { label: "06 // CONTACT", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 md:py-6 flex justify-center pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-5 py-2.5 rounded-full transition-all duration-500 max-w-6xl w-full ${
            scrolled
              ? "bg-[#05070B]/92 backdrop-blur-2xl saturate-150 shadow-[0_10px_40px_rgba(0,0,0,0.85)] border border-amber-400/20"
              : "bg-[#05070B]/60 backdrop-blur-xl border border-white/10"
          }`}
          aria-label="System Navigation"
        >
          {/* Brand & Telemetry Badge */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            title="Reset View"
          >
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-400 to-amber-600 p-[1px] transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#05070B] rounded-[5px] flex items-center justify-center">
                <Cpu size={14} className="text-amber-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors">
                MASTAN VALI
              </span>
              <span className="font-mono text-[9px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                SYS:ONLINE
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] text-slate-400 hover:text-amber-400 transition-all hover:translate-y-[-1px] tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right HUD Controls */}
          <div className="flex items-center gap-3">
            {/* Live Clock HUD */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
              <Terminal size={12} className="text-amber-400" />
              <span>{time || "00:00:00 IST"}</span>
            </div>

            {/* Ambient Sound Switch */}
            <AmbientSoundControl />

            {/* Social Icons */}
            <a
              href="https://github.com/anas116-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/mastan-vali-shaik-86952725a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-slate-300 hover:text-white p-1 ml-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Cyber Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#030305]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
              <div className="font-mono text-xs text-amber-400 tracking-widest uppercase mb-2 border-b border-white/10 pb-2">
                // SYSTEM MATRIX NAVIGATION
              </div>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-mono text-lg text-white hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ENTER →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
