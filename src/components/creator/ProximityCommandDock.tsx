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

        // High-contrast clean typography transitions (No clunky box/pill)
        const textSpan = item.querySelector<HTMLElement>(".dock-text");
        if (textSpan) {
          if (val > 0.65) {
            textSpan.style.color = "#E06D20";
            textSpan.style.textShadow = "0 0 12px rgba(224, 109, 32, 0.4)";
          } else if (val > 0.2) {
            textSpan.style.color = "#F8FAFC";
            textSpan.style.textShadow = "0 0 8px rgba(255, 255, 255, 0.2)";
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
            className="relative px-3.5 py-1.5 rounded-lg text-[#94A3B8] hover:text-[#E06D20] transition-colors duration-200 will-change-transform inline-flex items-center justify-center group"
            style={{ transformOrigin: "left center" }}
          >
            {/* Link Text - Clean, unboxed typography with smooth color transition */}
            <span className="dock-text relative z-10 transition-colors duration-150">
              {item.label}
            </span>

            {/* Active Indicator Micro-Glow Line */}
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-sm bg-[#E06D20] shadow-[0_0_8px_rgba(224,109,32,0.6)]" />
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
        className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] text-[#F8FAFC] hover:border-[#E06D20]/60 transition-colors cursor-pointer"
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>
      {open && (
        <div className="fixed inset-x-4 top-[4.5rem] z-50 rounded-2xl border border-white/15 bg-[#0E121B]/95 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item);
              }}
              className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-[0.16em] text-[#F8FAFC] hover:text-[#E06D20] hover:bg-white/[0.04] transition-colors font-[family-name:var(--font-outfit)]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
