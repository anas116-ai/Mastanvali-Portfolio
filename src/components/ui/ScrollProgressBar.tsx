"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] h-[2px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#C86A26] via-[#E06D20] to-[#D9A036]"
        style={{
          scaleX,
          boxShadow: "0 0 8px rgba(224, 109, 32, 0.35)",
        }}
      />
    </div>
  );
}
