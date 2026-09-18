"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "skills", label: "Capabilities", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function ProximityCommandDock() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeId, setActiveId] = useState("");

  // ThreeUI exact physics parameters
  const PROXIMITY = 122;
  const SPRING = 0.19;
  const DAMPING = 0.7;
  const SHIFT = 3.5;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Item physics state
    const states = NAV_ITEMS.map(() => ({
      target: 0,
      value: 0,
      velocity: 0,
    }));

    let animationFrameId = 0;
    let isMoving = false;

    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));

    const updatePhysics = () => {
      let stillMoving = false;

      states.forEach((state, index) => {
        const item = itemsRef.current[index];
        if (!item) return;

        // ThreeUI spring calculation
        state.velocity += (state.target - state.value) * SPRING;
        state.velocity *= DAMPING;
        state.value += state.velocity;

        // Threshold check for resting state
        if (
          Math.abs(state.target - state.value) < 0.001 &&
          Math.abs(state.velocity) < 0.001
        ) {
          state.value = state.target;
          state.velocity = 0;
        } else {
          stillMoving = true;
        }

        const val = clamp(state.value, 0, 1.15);

        // Fluid scale and sideways horizontal shift (instead of vertical)
        const scale = 1 + val * 0.14;
        const translateX = val * SHIFT;

        item.style.transform = `translate3d(${translateX.toFixed(2)}px, 0, 0) scale(${scale.toFixed(3)})`;

        // Luxury Cyber-Obsidian Refraction Box
        const bgPill = item.querySelector<HTMLElement>(".dock-glow-pill");
        if (bgPill) {
          bgPill.style.opacity = (val * 0.95).toFixed(2);
          bgPill.style.transform = `scale(${1 + val * 0.06})`;
          if (val > 0.6) {
            bgPill.style.borderColor = `rgba(244, 122, 24, ${((val - 0.5) * 0.6).toFixed(2)})`;
            bgPill.style.boxShadow = `0 0 16px rgba(244, 122, 24, ${((val - 0.5) * 0.4).toFixed(2)}), inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
          } else {
            bgPill.style.borderColor = "rgba(100, 210, 225, 0.18)";
            bgPill.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 4px 12px rgba(0, 0, 0, 0.35)";
          }
        }

        // High-contrast clean typography transitions
        const textSpan = item.querySelector<HTMLElement>(".dock-text");
        if (textSpan) {
          if (val > 0.65) {
            textSpan.style.color = "#F47A18";
            textSpan.style.textShadow = "0 0 12px rgba(244, 122, 24, 0.5)";
          } else if (val > 0.2) {
            textSpan.style.color = "#F3F1E8";
            textSpan.style.textShadow = "0 0 8px rgba(255, 255, 255, 0.25)";
          } else {
            textSpan.style.color = "";
            textSpan.style.textShadow = "";
          }
        }
      });

      if (stillMoving) {
        animationFrameId = requestAnimationFrame(updatePhysics);
      } else {
        isMoving = false;
      }
    };

    const startPhysics = () => {
      if (!isMoving) {
        isMoving = true;
        animationFrameId = requestAnimationFrame(updatePhysics);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      const rect = container.getBoundingClientRect();

      // Check boundary buffer around the dock
      if (
        clientX < rect.left - 40 ||
        clientX > rect.right + 40 ||
        clientY < rect.top - 30 ||
        clientY > rect.bottom + 40
      ) {
        handlePointerLeave();
        return;
      }

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const dist = Math.abs(clientX - itemCenterX);

        // Smoothstep Hermite influence curve from ThreeUI
        const proximity = clamp(1 - dist / PROXIMITY, 0, 1);
        const influence = proximity * proximity * (3 - 2 * proximity);

        states[index].target = influence;
      });

      startPhysics();
    };

    const handlePointerLeave = () => {
      states.forEach((state) => {
        state.target = 0;
      });
      startPhysics();
    };

    const handleWindowPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX < rect.left - 60 ||
        e.clientX > rect.right + 60 ||
        e.clientY < rect.top - 40 ||
        e.clientY > rect.bottom + 60
      ) {
        handlePointerLeave();
      }
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointermove", handleWindowPointerMove);
    };
  }, []);

  return (
    <nav
      ref={containerRef}
      className="hidden md:flex items-center gap-4 lg:gap-7 py-2 font-[family-name:var(--font-outfit)] font-bold text-xs uppercase tracking-[0.16em] select-none relative"
      aria-label="Portfolio Navigation"
    >
      {NAV_ITEMS.map((item, idx) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              setActiveId(item.id);
              const target = document.querySelector(item.href);
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="relative px-3.5 py-1.5 rounded-lg text-[#B8C4CC] hover:text-[#F47A18] transition-colors duration-200 will-change-transform inline-flex items-center justify-center group"
            style={{ transformOrigin: "left center" }}
          >
            {/* Signature Cyber-Obsidian Glow Box (Slightly Rounded Corners) */}
            <span
              className="dock-glow-pill absolute inset-0 rounded-lg opacity-0 pointer-events-none transition-transform"
              style={{
                background: "linear-gradient(180deg, rgba(20, 184, 166, 0.10) 0%, rgba(244, 122, 24, 0.08) 100%)",
                border: "1px solid rgba(100, 210, 225, 0.18)",
                boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 4px 14px rgba(0, 0, 0, 0.45)",
              }}
            />

            {/* Link Text */}
            <span className="dock-text relative z-10 transition-colors duration-150">
              {item.label}
            </span>

            {/* Active Indicator Micro-Glow Line */}
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-sm bg-[#F47A18] shadow-[0_0_8px_#F47A18]" />
            )}
          </a>
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
        className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] text-[#F3F1E8] hover:border-[#F47A18]/60 transition-colors cursor-pointer"
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>
      {open && (
        <div className="fixed inset-x-4 top-[4.5rem] z-50 rounded-2xl border border-white/15 bg-[#060A16]/95 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item);
              }}
              className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-[0.16em] text-[#F3F1E8] hover:text-[#F47A18] hover:bg-white/[0.04] transition-colors font-[family-name:var(--font-outfit)]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
