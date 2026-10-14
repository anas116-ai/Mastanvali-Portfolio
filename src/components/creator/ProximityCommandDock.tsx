"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "skills", label: "Disciplines", href: "#skills" },
  { id: "projects", label: "Work", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function ProximityCommandDock({ activeId = "" }: { activeId?: string }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="hidden md:flex items-center gap-6 lg:gap-8 select-none"
      aria-label="Portfolio Navigation"
      onMouseLeave={() => setHoveredId(null)}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <motion.a
            key={item.id}
            href={item.href}
            onClick={(e) => handleScrollTo(e, item.href)}
            onMouseEnter={() => setHoveredId(item.id)}
            // Bouncy spring physics on hover and tap
            whileHover={{
              y: -3,
              scale: 1.08,
              transition: { type: "spring", stiffness: 450, damping: 12 },
            }}
            whileTap={{
              scale: 0.92,
              y: 0,
              transition: { type: "spring", stiffness: 500, damping: 15 },
            }}
            className={`relative py-1 cursor-pointer font-header-dynamic text-[15px] lg:text-[16px] tracking-[0.02em] font-medium transition-colors duration-200 ${
              isActive
                ? "text-[#E8FF45]"
                : isHovered
                ? "text-[#E8FF45]"
                : "text-[#B6B9B0] hover:text-white"
            }`}
          >
            <span>{item.label}</span>

            {/* Bouncy Spring Pill Dot beneath active/hovered link - NO enclosing box */}
            {(isHovered || (isActive && !hoveredId)) && (
              <motion.span
                layoutId="bouncy-nav-dot"
                className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-[#E8FF45] shadow-[0_0_10px_#E8FF45]"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 22,
                }}
              />
            )}
          </motion.a>
        );
      })}
    </nav>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const go = (item: NavItem) => {
    setOpen(false);
    const target = document.querySelector(item.href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="md:hidden relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="h-11 w-11 flex items-center justify-center border-0 bg-transparent text-[#B6B9B0] hover:text-[#E8FF45] transition-colors duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9FF00]"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <div className="fixed inset-x-4 top-[64px] z-50 rounded-2xl border border-white/[0.12] bg-[#0A0D0A]/90 backdrop-blur-xl p-3 shadow-2xl flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item);
              }}
              className="px-4 py-2.5 rounded-xl text-[#F4F5EF] hover:text-[#E8FF45] hover:bg-white/[0.05] transition-all duration-200 text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
