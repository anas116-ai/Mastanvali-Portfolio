# Design System: Graphite & Lemon

Single-page portfolio for **Shaik Mastan Vali** (`src/app/page.tsx`). Everything below is
enforced in `src/app/globals.css`. Read this before adding a colour, a font, or a radius.

## Intent

A graphite workshop lit by one cold lamp. Neutral near-black ground, a single lemon
accent held at ten percent, hairline structure, one shared easing curve. Nothing glows
that isn't a light source.

## Colour — 60 / 30 / 10

### 60% Ground (cool graphite, never warm brown, never pure black)
| Token | Hex | Use |
|---|---|---|
| `bg` | `#0B0B0D` | page ground |
| `bg-elevated` | `#101014` | footer / recessed bands |
| `bg-deep` | `#07070A` | lightbox backdrop |
| `surface` | `#15151A` | machined plates, cards, modal |
| `surface-lit` | `#1E1E24` | raised surface, top edge of a lit surface |
| `cell` | `#131317` | grid cells in the domain matrix |

### 30% Structure (bone hairlines, never shadow)
| Token | Hex | Use |
|---|---|---|
| `hairline` | `rgba(234,232,226,0.10)` | section borders, card edges |
| `hairline-strong` | `rgba(234,232,226,0.16)` | modal / lightbox frames |
| `edge-lit` | `rgba(234,232,226,0.045)` | engraved top light-line on plates |

Ground and surface differ by only 1.08:1, which is deliberate: a card never separates from
its ground by value. It separates by a hairline, or not at all.

### 10% Accent — one hue, five lightness stops
| Token | Hex | Meaning |
|---|---|---|
| **Lemon hi** | `#EDEC6B` | hover, active CTA fill, brightest ink on dark |
| **Lemon** | `#E4E24A` | primary. Diode, eyebrows, active state, rules |
| **Lemon deep** | `#C9C73C` | secondary data, pipeline stages, koi accents |
| **Lemon dim** | `#8E8C2A` | tertiary data slot when three accents are on screen |
| **Bone** (neutral) | `#C9C8C3` | the fourth data slot when accents are already spent |
| **Accent ink** | `#6B6A18` | lemon for rules on cream paper only. Never on graphite |

The earlier palette failed for a measured reason, not a stylistic one: the old ground sat at
hue 30° while its accent sat at 46°, only 16° apart, so gold on espresso read as one brown
mass. Lemon forces a cool neutral ground — an 181° spread, near the maximum available. All
accents collapse to one hue with lightness variation. No purple. No cyan. No neon. No
gradient between two different hues.

### Text scale (neutral, five steps, nothing more)
`#EAE8E2` primary · `#C9C8C3` secondary · `#8C8C86` muted · `#6A6A66` faint · `#43433F` structural

`#8C8C86` is defined as bone at 55% alpha rather than a new hue, which is what keeps the
muted tier from drifting warm or cool.

Measured contrast: bone on ground **16.05:1**. Lemon on ground **14.30:1**.
Muted on surface **5.38:1**, an AA pass. `#43433F` is structural only, never reading copy.

## Typography

| Role | Family | Treatment |
|---|---|---|
| Display / headings | **Outfit** 200–600 | sentence case, tracking `-0.03em` → `-0.02em`, never uppercase |
| UI / body / nav / buttons | **Geist Sans** 400–500 | sentence case |
| Labels, eyebrows, data, mono | **Geist Mono** 400–500 | `0.14em`–`0.2em` tracking, uppercase only for technical labels |
| Hero wordmark | **Warpaint** | gradient-clipped metal + `.scratch-face` mask. Never retyped |

Reusable classes in `globals.css`: `.stylish-header`, `.stylish-sub`, `.eyebrow`,
`.rule-dot`, `.plate`, `.plate-elevated`, `.edge-lit`, `.scratch-face`.

## Structure — machined, not glassy

- Corner radius: **`3px`** on plates, cards, and modals. `2px` on the smallest chips.
  The only soft radii allowed are the `ShaderIgnitionButton` bezel and the diode dots,
  which are shapes, not surfaces.
- **Cut corner**: the top-right corner is clipped with a 225° gradient triangle. Every
  plate carries it. It is the site's structural signature.
- **Accent cap**: a `2px` rule along the top-left edge in the card's own accent. Replaces
  card left stripes and coloured borders.
- **No drop shadows.** Depth comes from surface value steps, hairline borders, and
  blurred *atmosphere* (large, low-opacity colour washes) — never an offset shadow.
- **No glassmorphism.** No backdrop-blur panels, no inner glows, no gradient sheen.
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
- **Hero wordmark** — per-letter drop, arriving one letter at a time, single lemon hue with a
  tight single-hue ramp for depth. The `hue`/`saturation`/`brightness` props are forced to
  `none` and recorded in `data-filter-unused`, which makes multicolor structurally impossible.
  A sparse scratch mask repeats 4 hairlines across a 260px tile, so roughly a twentieth of
  the letter surface is ever interrupted and every letter stays whole.
- **Cursor** — a 340px light pool (lerp 0.16) with a 46px lemon ring lagging behind
  (lerp 0.09). Native cursor preserved. Off on coarse pointer and reduced motion.
- **Koi cards** — cool slate water: drifting elliptical caustics, crest/trough ripples, silt.
- **Skills** — square book proportions, cloth grain, an 11px rolled spine, a 14px fore-edge
  leaf stack, and a debossed title. Opening runs `scaleX 0.62 → 1` with `rotateX -7 → 0`
  while two covers fall open behind at `rotateY -34`, so it opens like a real book.
- **Projects** — brushed vertical graphite grain at `#101014` with a milled recess inset 7px.
- **The sheet** — `public/assets/three-paper/experience-paper.html`. A real resume printed
  on aged laid paper, laid out on a flow cursor so blocks cannot collide, lit by a neutral
  key with a lemon rim.

`prefers-reduced-motion` collapses every animation to a single settled frame.

## Copy

- Sentence case in all headings. No `!` in UI microcopy.
- No em-dashes (`—`) or en-dashes (`–`). Use `to`, or the `/` slash rule.
- No checkmark bullets. Use a `1.6px` accent hairline tick, or a numbered row.
- No "it's not X, it's Y" constructions. No invented testimonials or metrics.
- Section eyebrows are technical and uppercase-after-slash: `// TECHNICAL CAPABILITIES`,
  `// WORK EXPERIENCE / PRINTED SHEET`. One lemon diode dot, never boxed.

## Banned

Harsh gradients · lucide-as-decoration · pure white background · rainbow palettes ·
drop shadows · emojis · em/en-dashes · card left stripes · fake testimonials ·
bento grids · fake window chrome · "it's not X it's Y" · checkmark bullets ·
three-tier pricing · skeleton loaders · radial "ops" decoration · dot grids ·
sparkle icons · neon hover states · pastel basics · purple and black.