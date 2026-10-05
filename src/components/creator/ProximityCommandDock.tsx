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
  { id: "skills", label: "Disciplines", href: "#skills" },
  { id: "projects", label: "Work", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const PROXIMITY = 118;
const SPRING = 0.19;
const DAMPING = 0.7;
const SHIFT = 3;

export function ProximityCommandDock() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const states = NAV_ITEMS.map(() => ({ target: 0, value: 0, velocity: 0 }));

    let animationFrameId = 0;
    let isMoving = false;

    const clamp = (val: number, min: number, max: number) =>
      Math.max(min, Math.min(max, val));

    const updatePhysics = () => {
      let stillMoving = false;

      states.forEach((state, index) => {
        const item = itemsRef.current[index];
        if (!item) return;

        state.velocity += (state.target - state.value) * SPRING;
        state.velocity *= DAMPING;
        state.value += state.velocity;

        if (
          Math.abs(state.target - state.value) < 0.001 &&
          Math.abs(state.velocity) < 0.001
        ) {
          state.value = state.target;
          state.velocity = 0;
        } else {
          stillMoving = true;
        }

        const val = clamp(state.value, 0, 1.12);

        // Letter spacing opens slightly and the word lifts, no scaling gimmick.
        const tracking = val * 0.035;
        const lift = val * -1.5;

        item.style.transform = `translate3d(${(
          val * SHIFT
        ).toFixed(2)}px, ${lift.toFixed(2)}px, 0)`;

        const textSpan = item.querySelector<HTMLElement>(".dock-text");
        if (textSpan) {
          textSpan.style.letterSpacing = `${(0.055 + tracking).toFixed(4)}em`;
          // Brass warms up as the pointer approaches. No neon glow.
          const warmth = Math.round(val * 255);
          textSpan.style.color = `rgb(${215 + Math.round(warmth * 0.05)}, ${208 + Math.round(
            warmth * 0.02
          )}, ${198 - Math.round(warmth * 0.4)})`;
        }

        const ruleSpan = item.querySelector<HTMLElement>(".dock-rule");
        if (ruleSpan) {
          ruleSpan.style.opacity = String(clamp(val * 1.4, 0, 1));
          ruleSpan.style.transform = `scaleX(${clamp(val * 1.1, 0.08, 1).toFixed(3)})`;
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

    const releaseAll = () => {
      states.forEach((state) => {
        state.target = 0;
      });
      startPhysics();
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();

      if (
        e.clientX < rect.left - 40 ||
        e.clientX > rect.right + 40 ||
        e.clientY < rect.top - 30 ||
        e.clientY > rect.bottom + 40
      ) {
        releaseAll();
        return;
      }

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        const centerX = itemRect.left + itemRect.width / 2;
        const dist = Math.abs(e.clientX - centerX);

        const proximity = clamp(1 - dist / PROXIMITY, 0, 1);
        states[index].target = proximity * proximity * (3 - 2 * proximity);
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
        releaseAll();
      }
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", releaseAll);
    window.addEventListener("pointermove", handleWindowPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", releaseAll);
      window.removeEventListener("pointermove", handleWindowPointerMove);
    };
  }, []);

  return (
    <nav
      ref={containerRef}
      className="hidden md:flex items-center gap-4 lg:gap-7 py-2 font-[family-name:var(--font-geist-sans)] font-normal text-[13px] select-none relative"
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
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative inline-flex items-center justify-center py-1 cursor-pointer will-change-transform"
            style={{ transformOrigin: "left center" }}
          >
            <span
              className="dock-text text-[#8C8C86] hover:text-[#C9C8C3] transition-colors duration-300"
              style={{ letterSpacing: "0.055em" }}
            >
              {item.label}
            </span>

            {/* Hairline that surfaces under proximity and locks in when active */}
            <span
              className={`dock-rule absolute -bottom-0.5 left-0 h-px w-full origin-left ${
                isActive ? "bg-[#E4E24A] opacity-100" : "bg-[#E4E24A]"
              }`}
              style={{ opacity: isActive ? 1 : 0, transform: "scaleX(1)" }}
            />
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
        className="h-9 w-9 flex items-center justify-center border border-[rgba(234,232,226,0.11)] bg-transparent text-[#C9C8C3] hover:border-[rgba(237,236,107,0.42)] hover:text-[#EDEC6B] transition-colors duration-300 cursor-pointer"
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>
      {open && (
        <div className="fixed inset-x-4 top-[4.25rem] z-50 border border-[rgba(234,232,226,0.13)] bg-[#0F0F12]/97 backdrop-blur-2xl p-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item);
              }}
              className="block px-4 py-3 text-sm font-normal tracking-[0.01em] text-[#8C8C86] hover:text-[#EDEC6B] hover:bg-[rgba(234,232,226,0.03)] transition-colors duration-200 font-[family-name:var(--font-geist-sans)]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
