# Design System: Deep Black & Liquid Lime

Single-page portfolio for **Shaik Mastan Vali** (`src/app/page.tsx`). Everything below is
enforced in `src/app/globals.css`. Read this before adding a colour, a font, or a radius.

## Intent

Deep-black liquid glass lit by one lime pulse. Ground is `#0A0A0B` glass black, bone
`#F5F2EB` carries structure, and a single lime accent (`#CDFD02`) is held at ten percent.
Glass sheets stay neutral — all colour lives behind the glass as washed liquid glow, so
the page reads glossy, premium and crisp, never flat, never AI-slop. Nothing glows that
isn't a light source.

## Colour — 60 / 30 / 10

### 60% Ground (deep black `#0A0A0B`, glass-black tints)
| Token | Hex | Use |
|---|---|---|
| `bg` | `#0A0A0B` | page ground, liquid-glass backdrop |
| `bg-elevated` | `#101013` | footer / recessed bands |
| `bg-deep` | `#060607` | lightbox backdrop |
| `surface` | `rgba(20,21,24,0.72)` | glass plates, cards, modal |
| `surface-lit` | `rgba(26,27,31,0.82)` | raised surface, top edge of a lit surface |
| `glass` / `glass-black` | `rgba(10,10,11,0.60)` | crisp crystal sheet (chips, bars) |
| `glass-strong` | `rgba(10,10,11,0.82)` | sheets / modals |

### 30% Structure (bone hairlines from `#F5F2EB`, never shadow)
| Token | Hex | Use |
|---|---|---|
| `hairline` | `rgba(245,242,235,0.10)` | section borders, card edges |
| `hairline-strong` | `rgba(245,242,235,0.16)` | modal / lightbox frames |
| `edge-lit` | `rgba(245,242,235,0.045)` | engraved top light-line on plates |

Ground and surface differ by only 1.08:1, which is deliberate: a card never separates from
its ground by value. It separates by a hairline, or not at all.

### 10% Accent — one lime hue, five lightness stops
| Token | Hex | Meaning |
|---|---|---|
| **Lime hi** | `#DCFD3C` | hover, active CTA fill, brightest ink on dark |
| **Lime** | `#CDFD02` | primary. Diode, eyebrows, active state, rules |
| **Lime deep** | `#8A8918` | secondary data, pipeline stages, koi accents |
| **Lime dim** | `#4A4A12` | tertiary data slot when three accents are on screen |
| **Bone** (neutral) | `#C9C8C3` | the fourth data slot when accents are already spent |
| **Accent ink** | `#23230A` | lime for rules on cream paper only. Never on deep black |

The palette is the user-specified liquid-glass set: deep black `#0A0A0B`, bone `#F5F2EB`,
lime `#CDFD02`, glass-black tints (renamed from graphite `#0B0B0D` / bone `#EAE8E2` /
lemon `#E4E24A`). The old gold-on-espresso pair failed for a measured reason: only 16°
apart in hue, it read as one brown mass. Lime on cool deep black stays a single hue while
the ground and the two lights sit far enough apart that sheets and glows read as one
family. All accents collapse to one hue with lightness variation. No purple. No cyan.
No neon. No gradient between two different hues.

### Text scale (neutral, five steps, nothing more)
`#F5F2EB` primary · `#C9C8C3` secondary · `#8C8C86` muted · `#6A6A66` faint · `#43433F` structural

`#8C8C86` is defined as bone at 55% alpha rather than a new hue, which is what keeps the
muted tier from drifting warm or cool.

Measured contrast: bone on ground **17.4:1**. Lime on ground **16.3:1**.
Muted on surface **5.38:1**, an AA pass. `#43433F` is structural only, never reading copy.

## Typography

| Role | Family | Treatment |
|---|---|---|
| Display / headings | **Outfit** 200–600 | sentence case, tracking `-0.03em` → `-0.02em`, never uppercase |
| UI / body / nav / buttons | **Geist Sans** 400–500 | sentence case |
| Labels, eyebrows, data, mono | **Geist Mono** 400–500 | `0.14em`–`0.2em` tracking, uppercase only for technical labels |
| Hero wordmark | **Warpaint** | gradient-clipped metal, tracked `0.11em`, additive light-wear scratches (`.scratch-face`). Never retyped |

Reusable classes in `globals.css`: `.stylish-header`, `.stylish-sub`, `.eyebrow`,
`.rule-dot`, `.plate`, `.plate-elevated`, `.edge-lit`, `.glass`, `.glass-strong`,
`.glass-bar`, `.scratch-face`.

## Structure — machined crystal

- Corner radius: **`3px`** on plates, cards, chips, and modals — except feature
  panels (hero anchor `18px`, project cards `20px`), which go soft and frosty.
  The diode dots are fully round — they are shapes, not surfaces.
  The `ShaderIgnitionButton` bezel is **not** covered by that rule: it is machined
  geometry, and its radius is derived rather than chosen. The outer element carries
  a `1px` border and `1.5px` padding, so the chamber sits `2.5px` in; the inner
  radius must equal `outer − 2.5` or the two corners stop sharing one arc. It is
  `4px / 1.5px`. Do not set these independently — a `3px / 2px` pairing was shipped
  once and turned the bezel into an uneven seam at all four corners.
- **Cut corner**: the top-right corner is clipped with a 225° gradient triangle on
  every plate. *Specified but not implemented* — there is no `cut-corner` utility in
  `globals.css` today. Until one exists, do not describe plates as carrying it.
- **Accent cap**: a `2px` rule along the top-left edge in the card's own accent. Replaces
  card left stripes and coloured borders.
- **No drop shadows.** Depth comes from surface value steps, hairline borders, and
  blurred *atmosphere* (large, low-opacity colour washes) — never an offset shadow.
- **Crystal glass, two tiers.** Crisp tier: tinted glass black, controlled
  `14px` blur, `1.45` saturate lift, hairline border, `1px` top specular — chips,
  bars, machined details. Frost tier (`.glass-frost`, feature panels only: hero
  anchor, project cards): milky `0.55` tint, deep `28px` blur, strong specular with
  inner glow, `18-24px` radius, settled by `.float-soft`. Utilities: `.glass`
  (`0.60`), `.glass-strong` (sheets/modals, `0.82`), `.glass-bar` (masthead).
  `.edge-lit` plates keep their engraved 1px line instead of a specular sheet, and
  inline-styled surfaces carry the blur in their style prop.
- **Glass needs something to refract.** Frost over flat black is invisible — every
  frost surface ships with ambient washes (neutral bone key glow) behind
  it. `.float-soft` is the one exception to the no-shadow rule: soft ambient
  depth only, never a hard offset.
- **Premium night backdrops** (`PremiumNightBackdrop`, every section) — static glints
  + top spotlight over flat deep black, inspired by premium black-and-gold references
  but never copied. Diagonal beams were removed — the night stays clean. Glints sit
  behind content at low alpha, sides alternate per section, hero runs `stage` mood
  while the rest stay `calm`. Dotted textures stay banned — glints only.
- **No dot grids, no bento grids, no skeletons.** A page either has content or it has
  nothing; it never shows a placeholder.

## Motion

One easing curve for everything: **`cubic-bezier(0.165, 0.84, 0.44, 1)`**, the front-loaded
curve measured off Linear's production timing. It covers most of the distance in the first
third and then settles without ever accelerating again, which is what separates a considered
entrance from a slide. Nothing overshoots, nothing bounces. Springs only where the gesture is
physical (proximity dock, modal entry). Duration band **0.24s–1.1s**; nothing snappier than
0.2s, nothing slower than 1.1s.

The hero wordmark's letter stagger is **0.24s** per letter so arrival is genuinely
sequential rather than a single stamp, then it holds for **10s** before replaying.

Unique signatures, one per section, no repeats:
- **Navbar** — proximity spring: letter-spacing opens and the label lifts 1.5px.
- **Hero wordmark** — per-letter drop, arriving one letter at a time, a single vivid
  lime ramp with `#CDFD02` as the signature tone (cloudy bone sheen + olive depth,
  no background glow behind it) with a
  tight single-hue ramp for depth. Tracked at `0.11em` so the stencil caps never touch (the
  word grows 429→482px at 96px and still fits one line at every breakpoint: 209/320, 482/657,
  482/497, 632/646, 632/730). The `hue`/`saturation`/`brightness` props are forced to `none`
  and recorded in `data-filter-unused`, which makes multicolor structurally impossible. Light
  wear is painted **above** the ink as near-bone streaks (`#FAF9E1`, additive, clipped to the
  glyphs), so the light scratches sit above the ink. On top of that, a subtractive
  grunge mask (fractal-noise tile, `stitchTiles`, fully encoded) knocks pits out of
  the ink itself — tile hole fraction 13.9% full-cut plus soft speckle edges
  (~18% effective removal) — so the distress reads heavy like the reference while
  every letter stays legible.
- **Hero stage (calm luxury)** — neutral bone wash only, no tinted glows. One solid
  lime primary CTA with a soft halo, directional bone liquid-flow bands and five
  glossy droplet beads and a hairline specular for the liquid feel. Eye path: wordmark → CTA → character.
- **Cursor** — a 340px light pool (lerp 0.16) with a 46px lime ring lagging behind
  (lerp 0.09). Native cursor preserved. Off on coarse pointer and reduced motion.
- **Koi cards** — deep neutral dark water, zero blue cast: drifting elliptical caustics, crest/trough ripples, silt,
  faint long wave curves, a static bubble field with thin rings, and edge vignette.
- **Skills** — square book proportions, cloth grain, an 11px rolled spine, a 14px fore-edge
  leaf stack, and a debossed title. Opening runs `scaleX 0.62 → 1` with `rotateX -7 → 0`
  while two covers fall open behind at `rotateY -34`, so it opens like a real book.
- **Projects** — brushed vertical grain over translucent crystal glass
  (`#101014` at 0.62) with a milled recess inset 7px.
- **The sheet** — `public/assets/three-paper/experience-paper.html`. A real resume printed
  on aged laid paper, laid out on a flow cursor so blocks cannot collide, lit by a neutral
  key with a lime rim.

`prefers-reduced-motion` collapses every animation to a single settled frame.

## Copy

- Sentence case in all headings. No `!` in UI microcopy.
- No em-dashes (`—`) or en-dashes (`–`). Use `to`, or the `/` slash rule.
- No checkmark bullets. Use a `1.6px` accent hairline tick, or a numbered row.
- No "it's not X, it's Y" constructions. No invented testimonials or metrics.
- Section eyebrows are technical and uppercase-after-slash: `// TECHNICAL CAPABILITIES`,
  `// WORK EXPERIENCE / PRINTED SHEET`. One lime diode dot, never boxed.

## Banned

Harsh gradients · lucide-as-decoration · pure white background · rainbow palettes ·
drop shadows (except `.float-soft`) · emojis · em/en-dashes · card left stripes · fake testimonials ·
bento grids · fake window chrome · "it's not X it's Y" · checkmark bullets ·
three-tier pricing · skeleton loaders · radial "ops" decoration · dot grids ·
sparkle icons · neon hover states · pastel basics · purple and black.