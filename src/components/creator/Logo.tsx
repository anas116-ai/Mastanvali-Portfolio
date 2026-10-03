export function Logo({ light = false, sub = true }: { light?: boolean; sub?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3">
      <svg
        width="220"
        height="40"
        viewBox="0 0 220 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-auto cursor-pointer transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-[1.02]"
        aria-label="Shaik Mastan Vali"
      >
        <defs>
          <linearGradient id="smvMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C86A26" />
            <stop offset="50%" stopColor="#E06D20" />
            <stop offset="100%" stopColor="#D9A036" />
          </linearGradient>
        </defs>

        {/* geometric M monogram — outer stems + centre V */}
        <rect x="1" y="5" width="4" height="27" rx="0.6" fill="url(#smvMark)" />
        <rect x="17" y="5" width="4" height="27" rx="0.6" fill="url(#smvMark)" />
        <path
          d="M7 5 L12.5 24 L18 5"
          stroke="url(#smvMark)"
          strokeWidth="4.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />

        {/* floating data node */}
        <circle cx="20" cy="3" r="2" fill="url(#smvMark)" />

        <text
          x="32"
          y="23"
          fontFamily="var(--font-syne), sans-serif"
          fontSize="15.5"
          fontWeight="600"
          letterSpacing="2"
          fill={light ? "#0b0b0e" : "#F8FAFC"}
        >
          SHAIK MASTAN VALI
        </text>
        {sub && (
          <text
            x="32"
            y="34.5"
            fontFamily="var(--font-oswald), sans-serif"
            fontSize="7.5"
            fontWeight="500"
            letterSpacing="3.5"
            fill={light ? "#6b6b6b" : "#E06D20"}
          >
            DATA {String.fromCharCode(0x2192)} AI
          </text>
        )}
      </svg>
    </a>
  );
}