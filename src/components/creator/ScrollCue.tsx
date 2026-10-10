"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ScrollCue
 *
 * The invitation to keep travelling, drawn as a hairline rule rather than a
 * chevron. A chevron bounces, and a bouncing element reads as a UI widget.
 * This is a single hairline that fills from the top down over a long cycle,
 * with one slow light body descending it, so the eye follows it downward
 * without ever being told to.
 *
 * The label sits below the rule in mono at wide tracking, at the same dim
 * grey as every other technical label on the page. There is no dot, no
 * capsule, and no shadow.
 */
export function ScrollCue({ targetId = "about" }: { targetId?: string }) {
  const reduced = useReducedMotion();

  return (
    <a
      href={`#${targetId}`}
      aria-label="Scroll to the next section"
      className="group pointer-events-auto inline-flex select-none flex-col items-center gap-3 focus:outline-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <span className="eyebrow text-[10px] tracking-[0.42em] text-[#6A6A66] transition-colors duration-500 group-hover:text-[#7D8178] group-focus-visible:text-[#7D8178]">
        Scroll
      </span>

      {/* The rule: a 64px hairline. Fills downward on a 3.4s cycle. */}
      <span
        aria-hidden
        className="relative block h-16 w-px overflow-hidden bg-[rgba(244,245,239,0.11)]"
      >
        {!reduced && (
          <>
            {/* the fill, wiping from top to bottom */}
            <span
              className="absolute inset-x-0 top-0 h-full origin-top bg-[#D9FF00]"
              style={{
                animation: "cue-fill 3.4s cubic-bezier(0.165,0.84,0.44,1) infinite",
              }}
            />
            {/* one light body travelling the rule, slower than the fill */}
            <span
              className="absolute inset-x-0 h-6 bg-[linear-gradient(to_bottom,transparent,rgba(217,255,0,0.9),transparent)]"
              style={{
                animation: "cue-travel 3.4s cubic-bezier(0.44,0,0.56,1) infinite",
              }}
            />
          </>
        )}
      </span>
    </a>
  );
}