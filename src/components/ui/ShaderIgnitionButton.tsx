"use client";

import React, { useRef, useEffect, useState, memo } from "react";

export type IgnitionColorVariant = "amber" | "teal" | "emerald" | "violet" | "platinum";

interface ColorConfig {
  dustRgb: [number, number, number];
  starLow: [number, number, number];
  starHigh: [number, number, number];
  glowRgb: [number, number, number];
  flashRgb: [number, number, number];
  borderIdle: string;
  borderHover: string;
  glowDrop: string;
  textGlow: string;
  bezelGrad: string;
}

const COLOR_VARIANTS: Record<IgnitionColorVariant, ColorConfig> = {
  // 01. Solar Amber Core
  amber: {
    dustRgb: [0.13, 0.06, 0.02],
    starLow: [1.0, 0.92, 0.82],
    starHigh: [1.0, 0.55, 0.2],
    glowRgb: [1.0, 0.72, 0.45],
    flashRgb: [1.0, 0.97, 0.92],
    borderIdle: "border-[#F47A18]/30",
    borderHover: "group-hover:border-[#F47A18]/75",
    glowDrop: "hover:shadow-[0_8px_24px_rgba(244,122,24,0.28)]",
    textGlow: "rgba(255, 175, 80, 0.6)",
    bezelGrad: "from-[#F47A18]/25 via-white/5 to-white/10",
  },
  // 02. Cyber Teal Core
  teal: {
    dustRgb: [0.02, 0.12, 0.12],
    starLow: [0.82, 0.98, 0.96],
    starHigh: [0.15, 0.75, 0.7],
    glowRgb: [0.35, 0.9, 0.85],
    flashRgb: [0.9, 1.0, 0.98],
    borderIdle: "border-[#14B8A6]/30",
    borderHover: "group-hover:border-[#14B8A6]/75",
    glowDrop: "hover:shadow-[0_8px_24px_rgba(20,184,166,0.28)]",
    textGlow: "rgba(20, 184, 166, 0.6)",
    bezelGrad: "from-[#14B8A6]/25 via-white/5 to-white/10",
  },
  // 03. Liquid Platinum Core
  platinum: {
    dustRgb: [0.07, 0.08, 0.1],
    starLow: [0.95, 0.97, 1.0],
    starHigh: [0.65, 0.75, 0.88],
    glowRgb: [0.85, 0.92, 1.0],
    flashRgb: [1.0, 1.0, 1.0],
    borderIdle: "border-white/25",
    borderHover: "group-hover:border-white/75",
    glowDrop: "hover:shadow-[0_8px_24px_rgba(255,255,255,0.18)]",
    textGlow: "rgba(255, 255, 255, 0.65)",
    bezelGrad: "from-white/30 via-white/5 to-white/10",
  },
  // 04. Emerald Core
  emerald: {
    dustRgb: [0.02, 0.12, 0.06],
    starLow: [0.82, 0.98, 0.88],
    starHigh: [0.15, 0.75, 0.42],
    glowRgb: [0.35, 0.9, 0.58],
    flashRgb: [0.9, 1.0, 0.94],
    borderIdle: "border-emerald-500/30",
    borderHover: "group-hover:border-emerald-400/75",
    glowDrop: "hover:shadow-[0_8px_24px_rgba(16,185,129,0.28)]",
    textGlow: "rgba(16, 185, 129, 0.6)",
    bezelGrad: "from-emerald-500/25 via-white/5 to-white/10",
  },
  // 05. Cyber Violet Core
  violet: {
    dustRgb: [0.1, 0.04, 0.15],
    starLow: [0.95, 0.88, 1.0],
    starHigh: [0.6, 0.3, 0.95],
    glowRgb: [0.75, 0.45, 1.0],
    flashRgb: [0.97, 0.92, 1.0],
    borderIdle: "border-[#8B5CF6]/30",
    borderHover: "group-hover:border-[#8B5CF6]/75",
    glowDrop: "hover:shadow-[0_8px_24px_rgba(139,92,246,0.28)]",
    textGlow: "rgba(139, 92, 246, 0.6)",
    bezelGrad: "from-[#8B5CF6]/25 via-white/5 to-white/10",
  },
};

const VS_SOURCE = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

// Exact ThreeUI Ignition Core Physics — Calibrated to be light & pleasant (not overly heavy or blinding)
const FS_EXACT_WARP = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_warp;
uniform float u_flash;
uniform vec3 u_dust;
uniform vec3 u_star_low;
uniform vec3 u_star_high;
uniform vec3 u_glow;
uniform vec3 u_flash_col;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}

float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),
             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
}

float fbm(vec2 p){
  float v=0.0; float a=0.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.07+vec2(13.1,5.7); a*=0.5; }
  return v;
}

void main(){
  vec2 sc = gl_FragCoord.xy / u_res;
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float r = length(uv);
  float rr = max(r, 0.08);
  float a = atan(uv.y, uv.x);
  float t = u_time;

  // 1. Deep Obsidian Space Interior
  vec3 col = vec3(0.012, 0.011, 0.014);

  // 2. Cosmic Ambient FBM Dust (Soft & Gentle)
  float hz = fbm(uv * 2.6 + vec2(t * 0.35, 1.7));
  col += u_dust * hz * (0.6 + 0.5 * u_warp);

  // 3. True ThreeUI High-Energy Warp Core Rays (Calibrated Lightness)
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float ringN = 26.0 + fi * 9.0;
    vec2 sp = vec2((a / 6.28318 + 0.5) * ringN,
                   (0.3 + fi * 0.22) / rr + t * (2.0 + fi * 1.2));
    vec2 cell = floor(sp);
    vec2 f = fract(sp);
    float h = hash(cell + fi * 17.31);
    float on = step(0.68, h);
    vec2 c = vec2(0.2 + 0.6 * hash(cell + 4.7), 0.5);
    vec2 dlt = f - c;

    // Authentic elongation during hover warp acceleration
    float sy = mix(130.0, 8.0, u_warp);
    float star = on * exp(-(dlt.x * dlt.x * 150.0 + dlt.y * dlt.y * sy));
    float tw = 0.7 + 0.3 * sin(h * 81.0 + t * 9.0);
    tw = mix(tw, 1.0, u_warp);

    // Dynamic Star Colors (Core vs Edge)
    vec3 sCol = mix(u_star_low, u_star_high, step(0.9, h));
    float fade = smoothstep(0.02, 0.25, r);

    // Balanced intensity (so it stays light and refined, not blindingly heavy)
    col += sCol * star * tw * fade * (0.85 + 0.55 * u_warp);
  }

  // 4. Central Reactor Sun Core (Softened moderate glow)
  col += u_glow * u_warp * 0.22 * exp(-r * 4.0);

  // 5. Clean Edge Vignette
  vec2 e = sc * (1.0 - sc);
  col *= 0.3 + 0.7 * pow(clamp(e.x * e.y * 16.0, 0.0, 1.0), 0.3);

  // 6. Crisp Click Ignition Flash
  col = mix(col, u_flash_col, clamp(u_flash, 0.0, 1.0));

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface ShaderIgnitionButtonProps {
  children: React.ReactNode;
  variant?: IgnitionColorVariant;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
}

export const ShaderIgnitionButton = memo(function ShaderIgnitionButton({
  children,
  variant = "amber",
  onClick,
  href,
  target,
  rel,
  className = "",
  icon,
  iconPosition = "left",
  ariaLabel,
  type = "button",
  size = "md",
}: ShaderIgnitionButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Runtime animation state
  const stateRef = useRef({
    warp: 0,
    warpTarget: 0,
    flash: 0,
    z: 0,
    last: 0,
    isVisible: true,
  });

  const config = COLOR_VARIANTS[variant] || COLOR_VARIANTS.amber;

  useEffect(() => {
    stateRef.current.warpTarget = isHovered ? 1 : 0;
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    function createShader(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vs = createShader(gl.VERTEX_SHADER, VS_SOURCE);
    const fs = createShader(gl.FRAGMENT_SHADER, FS_EXACT_WARP);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const locP = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(locP);
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uWarp = gl.getUniformLocation(prog, "u_warp");
    const uFlash = gl.getUniformLocation(prog, "u_flash");

    const uDust = gl.getUniformLocation(prog, "u_dust");
    const uStarLow = gl.getUniformLocation(prog, "u_star_low");
    const uStarHigh = gl.getUniformLocation(prog, "u_star_high");
    const uGlow = gl.getUniformLocation(prog, "u_glow");
    const uFlashCol = gl.getUniformLocation(prog, "u_flash_col");

    gl.uniform3fv(uDust, config.dustRgb);
    gl.uniform3fv(uStarLow, config.starLow);
    gl.uniform3fv(uStarHigh, config.starHigh);
    gl.uniform3fv(uGlow, config.glowRgb);
    gl.uniform3fv(uFlashCol, config.flashRgb);

    let animId: number;

    const resize = () => {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    resize();

    // Auto-pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        stateRef.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    stateRef.current.last = performance.now();

    const render = (now: number) => {
      if (!stateRef.current.isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min(0.05, (now - stateRef.current.last) / 1000);
      stateRef.current.last = now;

      // Smooth ThreeUI warp acceleration
      stateRef.current.warp +=
        (stateRef.current.warpTarget - stateRef.current.warp) *
        Math.min(1, dt * 2.8);

      // Exponential flash decay
      stateRef.current.flash *= Math.exp(-4.5 * dt);

      // Warp progression
      stateRef.current.z += dt * (0.05 + stateRef.current.warp * 1.35);

      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, stateRef.current.z);
      gl.uniform1f(uWarp, stateRef.current.warp);
      gl.uniform1f(uFlash, stateRef.current.flash);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      if (gl) {
        gl.deleteProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buf);
      }
    };
  }, [config]);

  const triggerIgnition = () => {
    stateRef.current.flash = 1.0;
    stateRef.current.warp = 0;
    stateRef.current.z = 0;
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    triggerIgnition();
    if (onClick) onClick(e);
  };

  // Compact, Balanced Dimensions
  const sizeStyles = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-4.5 py-2.5 sm:px-5 sm:py-2.5 text-xs sm:text-[13px]",
    lg: "px-6 py-3 sm:px-6.5 sm:py-3 text-sm",
  }[size];

  const content = (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`group relative inline-flex p-[1.5px] rounded-xl bg-gradient-to-b ${config.bezelGrad} border ${config.borderIdle} ${config.borderHover} shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.18)] ${config.glowDrop} transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] cursor-pointer select-none ${className}`}
    >
      {/* Inner Chamber Housing the Exact ThreeUI Warp Shader */}
      <div className={`relative flex items-center justify-center gap-2 rounded-[10.5px] overflow-hidden bg-[#06050a] ${sizeStyles} shadow-[inset_0_1px_4px_rgba(0,0,0,0.85)]`}>
        {/* Full-bleed WebGL Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full hidden md:block pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Top Micro-Edge Specular Glass Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Icon (Left) */}
        {icon && iconPosition === "left" && (
          <span className="relative z-10 flex items-center text-white/90 group-hover:text-white transition-colors duration-200">
            {icon}
          </span>
        )}

        {/* Crisp Button Typography */}
        <span
          className="relative z-10 font-bold uppercase tracking-[0.08em] text-[#F3F1E8] group-hover:text-white transition-all duration-200 font-[family-name:var(--font-outfit)]"
          style={{
            textShadow: isHovered
              ? `0 0 12px ${config.textGlow}, 0 1px 3px rgba(0,0,0,0.9)`
              : "0 1px 3px rgba(0,0,0,0.8)",
          }}
        >
          {children}
        </span>

        {/* Icon (Right) */}
        {icon && iconPosition === "right" && (
          <span className="relative z-10 flex items-center text-white/90 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={handleClick}
        aria-label={ariaLabel}
        className="inline-block outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      aria-label={ariaLabel}
      className="inline-block outline-none bg-transparent border-0 p-0"
    >
      {content}
    </button>
  );
});
