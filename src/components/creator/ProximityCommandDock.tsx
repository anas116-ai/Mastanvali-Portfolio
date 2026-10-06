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

type RGB = readonly [number, number, number];

function parseRGB(value: string): RGB {
  const m = value.match(/-?[\d.]+/g);
  if (!m || m.length < 3) return [140, 140, 134];
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}

/* The resting colour is whatever the stylesheet says, and the arriving
   colour is the lemon. Reading the rest state instead of hardcoding it
   means a palette change in globals.css carries the ramp with it. */
function readRamp(el: HTMLElement) {
  const rest = parseRGB(getComputedStyle(el).color);
  return { from: rest, to: [205, 253, 2] as RGB };
}

function mix(a: RGB, b: RGB, t: number) {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t)) as unknown as RGB;
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export function ProximityCommandDock({ activeId = "" }: { activeId?: string }) {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [clickedId, setClickedId] = useState("");
  const repaintRef = useRef<(() => void) | null>(null);

  /* The masthead supplies the section actually on screen, which is correct
     after any manual scroll. A click sets the same value immediately so the
     bar responds to the touch instead of waiting a beat for the smooth
     scroll to begin. The override retires as soon as the real tracker lands
     on the same section, and on any wheel input: otherwise the clicked
     value would outrank the tracked section indefinitely and the hairline
     would follow the last click rather than the page. */
  const currentId = clickedId || activeId;

  useEffect(() => {
    if (clickedId && clickedId === activeId) setClickedId("");
  }, [clickedId, activeId]);

  useEffect(() => {
    const retire = () => setClickedId("");
    window.addEventListener("wheel", retire, { passive: true });
    window.addEventListener("touchstart", retire, { passive: true });
    return () => {
      window.removeEventListener("wheel", retire);
      window.removeEventListener("touchstart", retire);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const states = NAV_ITEMS.map(() => ({ target: 0, value: 0, velocity: 0 }));
    const ramps: Array<{ from: RGB; to: RGB } | undefined> = NAV_ITEMS.map(() => undefined);

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
        /* An active section keeps its hairline open and its label at lemon,
           whatever the pointer is doing. Proximity can add emphasis but
           never take it away. */
        const held = item.dataset.active === "true";
        const emph = Math.max(val, held ? 1 : 0);

        if (textSpan) {
          textSpan.style.letterSpacing = `${(0.055 + tracking).toFixed(4)}em`;
          /* One ramp, muted to lemon. The previous ramp was left over from
             the brass palette and resolved to rgb(228, 213, 96) at full
             proximity, a muddy olive that is neither the muted grey the
             link rests at nor the lemon it is meant to become. The rest
             state is now read from the live computed style so the ramp
             cannot drift off the palette again. */
          const ramp = ramps[index] ?? (ramps[index] = readRamp(textSpan));
          textSpan.style.color = mix(ramp.from, ramp.to, emph);
        }

        const ruleSpan = item.querySelector<HTMLElement>(".dock-rule");
        if (ruleSpan) {
          ruleSpan.style.opacity = String(Math.max(clamp(val * 1.4, 0, 1), held ? 1 : 0));
          ruleSpan.style.transform = `scaleX(${Math.max(
            clamp(val * 1.1, 0, 1),
            held ? 1 : 0
          ).toFixed(3)})`;
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

    /* Section tracking repaints with no pointer involved, so a settle pass
       has to run when the active section changes or the hairline for the
       new section never opens. */
    const repaint = () => {
      states.forEach((state) => {
        state.value = state.target;
        state.velocity = 0;
      });
      updatePhysics();
      isMoving = false;
    };

    itemsRef.current.length = 0;

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
    repaintRef.current = repaint;

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", releaseAll);
      window.removeEventListener("pointermove", handleWindowPointerMove);
      repaintRef.current = null;
    };
  }, []);

  useEffect(() => {
    repaintRef.current?.();
  }, [currentId]);

  return (
    <nav
      ref={containerRef}
      className="hidden md:flex items-center gap-4 lg:gap-7 py-2 font-[family-name:var(--font-geist-sans)] font-normal text-[13px] select-none relative"
      aria-label="Portfolio Navigation"
    >
      {NAV_ITEMS.map((item, idx) => {
        const isActive = currentId === item.id;
        return (
          <a
            key={item.id}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
            href={item.href}
            data-active={isActive ? "true" : "false"}
            onClick={(e) => {
              e.preventDefault();
              setClickedId(item.id);
              const target = document.querySelector(item.href);
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative inline-flex items-center justify-center py-1 cursor-pointer will-change-transform"
            style={{ transformOrigin: "left center" }}
          >
            <span className="dock-text text-[#8C8C86] transition-colors duration-300">
              {item.label}
            </span>

            {/* Proximity surfaces the hairline; the active section holds it
                open. The physics loop reads data-active rather than
                setting an inline opacity, because an inline value written
                once by React is overwritten by the loop on the next frame. */}
            <span
              className="dock-rule absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[#CDFD02]"
              style={{ opacity: 0, transform: "scaleX(0)" }}
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
        className="h-9 w-9 flex items-center justify-center border border-[rgba(245,242,235,0.11)] bg-transparent text-[#C9C8C3] hover:border-[rgba(220,253,60,0.42)] hover:text-[#DCFD3C] transition-colors duration-300 cursor-pointer"
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>
      {open && (
        <div /* Anchored to the masthead's measured height (57px) plus a 4px gap.
             This was 4.25rem, tuned for the older taller bar, which left the
             panel floating 11px below the header it belongs to. */
        className="fixed inset-x-4 top-[61px] z-50 rounded-[3px] border border-[rgba(245,242,235,0.13)] glass-strong p-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                go(item);
              }}
              className="block px-4 py-3 text-sm font-normal tracking-[0.01em] text-[#8C8C86] hover:text-[#DCFD3C] hover:bg-[rgba(245,242,235,0.03)] transition-colors duration-200 font-[family-name:var(--font-geist-sans)]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
