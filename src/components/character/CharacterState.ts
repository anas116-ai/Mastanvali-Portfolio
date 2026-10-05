export type CharacterStateMode =
  | "INTRO"
  | "IDLE"
  | "CURSOR_FOCUS"
  | "CURSOR_FAR"
  | "SCROLL_TRANSITION"
  | "SECTION_HERO"
  | "SECTION_ABOUT"
  | "SECTION_SKILLS"
  | "SECTION_PROJECTS"
  | "SECTION_CONTACT"
  | "MOBILE_IDLE"
  | "REDUCED_MOTION";

export interface CharacterAssetConfig {
  id: string;
  name: string;
  subtitle: string;
  src: string;
  src4k: string;
  accentColor: string;
  secondaryAccent: string;
  scaleOffset: number;
  yOffset: number;
}

export const CHARACTER_ASSETS: Record<string, CharacterAssetConfig> = {
  "01": {
    id: "01",
    name: "Haute-Tech Data & AI Architect",
    subtitle: "Midnight Navy Blazer + Open Laptop with Live Glowing Code",
    src: "/images/avatar/style_01_4k_transparent.png",
    src4k: "/images/avatar/style_01_4k_transparent.png",
    accentColor: "#FACC15",
    secondaryAccent: "#E2C799",
    scaleOffset: 1.0,
    yOffset: 0,
  },
  "07": {
    id: "07",
    name: "Solutions Architect Tablet",
    subtitle: "Navy Tailored Blazer + Luminous Glass Data Tablet",
    src: "/images/avatar/style_07_4k_transparent.png",
    src4k: "/images/avatar/style_07_4k_transparent.png",
    accentColor: "#E2C799",
    secondaryAccent: "#FACC15",
    scaleOffset: 1.0,
    yOffset: 0,
  },
  "04": {
    id: "04",
    name: "AI Data Pipeline Hologram",
    subtitle: "Navy Bomber + Floating 3D Neural DAG Nodes",
    src: "/images/avatar/style_04_transparent.png",
    src4k: "/images/avatar/style_04_transparent.png",
    accentColor: "#FACC15",
    secondaryAccent: "#E2C799",
    scaleOffset: 1.0,
    yOffset: 0,
  },
  "12": {
    id: "12",
    name: "Dual Stream Vibe Coder",
    subtitle: "Charcoal Bomber + Lemon & Champagne Stream Rays",
    src: "/images/avatar/style_12_transparent.png",
    src4k: "/images/avatar/style_12_transparent.png",
    accentColor: "#E2C799",
    secondaryAccent: "#FACC15",
    scaleOffset: 1.0,
    yOffset: 0,
  },
};

export const MOTION_PHYSICS_CONFIG = {
  // Spring dynamics with realistic mass and soft damping
  spring: {
    damping: 26,
    stiffness: 140,
    mass: 0.8,
  },
  // Coprime periodic cycles for continuous non-repeating life (in seconds)
  loopCycles: {
    primaryBodyBreath: 6.2,
    torsoTiltIncline: 5.7,
    ambientLightBloom: 4.8,
    laptopScreenPulse: 7.1,
    weightShiftLateral: 11.3,
    particleTurbulence: 8.4,
  },
  // Interaction thresholds
  proximity: {
    focusRadius: 350,
    maxAngularTiltX: 7.5,
    maxAngularTiltY: 13.5,
    maxTranslationX: 14.0,
    maxTranslationY: 8.0,
  },
};
