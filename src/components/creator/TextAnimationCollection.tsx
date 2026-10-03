"use client";

import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * TextAnimationCollection — variant `threeui-intro` (slow in-place luxury reveal)
 *
 * Inspired by the opening beat of ThreeUI registered source `threeui-intro`
 * (rev 5a736cd3c1f6f19802f61ebb10e1701b9f7aa26e, `makeWordmark`, 0.00–1.72s),
 * re-authored per approved plan as a SLOW, IN-PLACE reveal:
 *
 *   - Every letter stays at its own final position (no scatter/fly-in).
 *   - Per letter: opacity 0→1, translateY 16px→0, blur 8px→0, expo ease-out.
 *   - Staggered 70ms per letter, 1.1s each → ~2.6s total, plays ONCE.
 *   - No chromatic fringing, no loop, no sheen sweep.
 *
 * Props keep the requested `<TextAnimationCollection variant="threeui-intro"
 * mode hue saturation brightness />` API; hue/sat/brightness via CSS filter.
 */

export type TextIntroVariant = "threeui-intro";
export type TextIntroMode = "dark" | "light";

interface TextAnimationCollectionProps {
  variant?: TextIntroVariant;
  mode?: TextIntroMode;
  hue?: number;
  saturation?: number;
  brightness?: number;
  text?: string;
  className?: string;
  /** Kept for API compat — animation always plays once. */
  loop?: boolean;
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a || 1e-6), 0, 1);
const eOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

const LETTER_DELAY = 0.07; // seconds between letters
const LETTER_DURATION = 1.1; // seconds per letter

export function TextAnimationCollection({
  variant = "threeui-intro",
  mode = "dark",
  hue = 0,
  saturation = 1.0,
  brightness = 1.0,
  text = "MASTAN VALI",
  className = "",
}: TextAnimationCollectionProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const reduced = useReducedMotion();
  const playingRef = useRef(false);

  const words = useMemo(() => text.split(" "), [text]);
  const total = useMemo(
    () => LETTER_DELAY * (text.replace(/ /g, "").length - 1) + LETTER_DURATION,
    [text]
  );

  useEffect(() => {
    if (variant !== "threeui-intro") return;
    const root = rootRef.current;
    const nodes = charsRef.current;
    if (!root || !nodes.length) return;

    const lock = () => {
      for (const n of nodes) {
        if (!n) continue;
        n.style.transform = "translateY(0px)";
        n.style.opacity = "1";
        n.style.filter = "none";
      }
    };

    if (reduced) {
      lock();
      return;
    }

    let raf = 0;
    let cancelled = false;

    // One slow in-place pass; replays when hero scrolls into view or on hover,
    // so the motion is seen whenever the user looks at the name.
    const play = () => {
      if (playingRef.current || cancelled) return;
      playingRef.current = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed = (now - t0) / 1000;
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          if (!n) continue;
          const q = eOut(seg(elapsed, i * LETTER_DELAY, i * LETTER_DELAY + LETTER_DURATION));
          n.style.transform = `translateY(${((1 - q) * 16).toFixed(1)}px)`;
          n.style.opacity = q.toFixed(3);
          n.style.filter = q < 0.99 ? `blur(${((1 - q) * 8).toFixed(2)}px)` : "none";
        }
        if (elapsed < total + 0.2) {
          raf = requestAnimationFrame(tick);
        } else {
          lock();
          playingRef.current = false;
        }
      };
      raf = requestAnimationFrame(tick);
    };

    play();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) play();
      },
      { threshold: 0.4 }
    );
    io.observe(root);
    root.addEventListener("mouseenter", play);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      root.removeEventListener("mouseenter", play);
    };
  }, [variant, reduced, total, text]);

  const filter = `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`;
  let charIndex = -1;

  return (
    <span
      ref={rootRef}
      className={`threeui-intro-wordmark ${mode === "light" ? "is-light" : "is-dark"} ${className}`}
      role="text"
      aria-label={text}
      style={{ filter }}
    >
      <span className="threeui-intro-line" aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} className="threeui-intro-word" aria-hidden="true">
            {word.split("").map((c, ci) => {
              charIndex += 1;
              const idx = charIndex;
              return (
                <span
                  key={ci}
                  ref={(el) => {
                    if (el) charsRef.current[idx] = el;
                  }}
                  className="threeui-intro-char"
                >
                  {c}
                </span>
              );
            })}
            {wi < words.length - 1 ? <span className="threeui-intro-space"> </span> : null}
          </span>
        ))}
      </span>
    </span>
  );
}

export default TextAnimationCollection;
