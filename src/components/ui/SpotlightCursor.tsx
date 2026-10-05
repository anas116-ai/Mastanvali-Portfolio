"use client";

import { useEffect, useRef } from "react";

/**
 * SpotlightCursor
 *
 * A warm light pool that travels with the pointer, plus a thin brass ring
 * that lags behind it slightly. The native cursor is left untouched so
 * precision tasks (text selection, small targets) stay exact.
 *
 * Disabled on touch devices and when the visitor asks for reduced motion.
 */

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, select, textarea, summary, [data-spotlight-stop]';

export function SpotlightCursor() {
  const layerRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const pool = poolRef.current;
    const ring = ringRef.current;
    if (!layer || !pool || !ring) return;

    const coarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (coarsePointer || reducedMotion) {
      layer.dataset.disabled = "true";
      return;
    }

    // Pointer target position, and the two rendered positions (one lags).
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const poolPos = { ...target };
    const ringPos = { ...target };

    let frame = 0;
    let visible = false;
    let hovered = false;

    const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;

    const render = () => {
      poolPos.x = lerp(poolPos.x, target.x, 0.16);
      poolPos.y = lerp(poolPos.y, target.y, 0.16);
      ringPos.x = lerp(ringPos.x, target.x, 0.09);
      ringPos.y = lerp(ringPos.y, target.y, 0.09);

      pool.style.transform = `translate3d(${poolPos.x}px, ${poolPos.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;

      frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!visible) {
        visible = true;
        // Enter without a fly-in from the old position.
        poolPos.x = ringPos.x = target.x;
        poolPos.y = ringPos.y = target.y;
        layer.dataset.active = "true";
        frame = requestAnimationFrame(render);
      }
    };

    const onOver = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      hovered = !!event.target.closest(INTERACTIVE_SELECTOR);
      layer.dataset.hover = String(hovered);
    };

    const onLeaveWindow = () => {
      visible = false;
      hovered = false;
      layer.dataset.active = "false";
      layer.dataset.hover = "false";
      cancelAnimationFrame(frame);
    };

    const onEnterWindow = () => {
      if (visible) return;
      visible = true;
      layer.dataset.active = "true";
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
    };
  }, []);

  return (
    <div ref={layerRef} className="spotlight-layer" aria-hidden="true">
      <div ref={poolRef} className="spotlight-pool" />
      <div ref={ringRef} className="spotlight-ring" />
    </div>
  );
}

export default SpotlightCursor;
