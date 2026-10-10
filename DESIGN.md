# Design System: Obsidian & Lemon Liquid Glass

Single-page portfolio for **Shaik Mastan Vali** (`src/app/page.tsx`). Everything below is
enforced in `src/app/globals.css`. Read this before adding a colour, a font, or a radius.

## Intent

Obsidian liquid glass lit by one lemon pulse. Ground is `#070807` smoked black, bone
`#F4F5EF` carries structure, and a single lemon accent (`#D9FF00`) is held at ten percent.
Glass sheets stay neutral — all colour lives behind the glass as washed liquid glow, so
the page reads glossy, premium and crisp, never flat, never AI-slop. Nothing glows that
isn't a light source.

## Colour — 60 / 30 / 10

### 60% Ground (obsidian `#070807`, smoked-glass tints)
| Token | Hex | Use |
|---|---|---|
| `bg` | `#070807` | page ground, liquid-glass backdrop |
| `bg-elevated` | `#0B0D0A` | footer / recessed bands |
| `bg-deep` | `#060607` | lightbox backdrop |
| `bg-warm` | `#10130F` | elevated band |
| `surface` | `rgba(18,22,17,0.72)` | glass plates, cards, modal |
| `surface-lit` | `rgba(22,27,20,0.82)` | raised surface, top edge of a lit surface |
| `glass` / `glass-black` | `rgba(18,22,17,0.60)` | crisp crystal sheet (chips, bars) |
| `glass-strong` | `rgba(18,22,17,0.82)` | sheets / modals |

### 30% Structure (bone hairlines from `#F4F5EF`, never shadow)
| Token | Hex | Use |
|---|---|---|
| `hairline` | `rgba(244,245,239,0.10)` | section borders, card edges |
| `hairline-strong` | `rgba(244,245,239,0.16)` | modal / lightbox frames |
| `edge-lit` | `rgba(244,245,239,0.045)` | engraved top light-line on plates |

Ground and surface differ by only a hair, which is deliberate: a card never separates
from its ground by value. It separates by a hairline, or not at all.

### 10% Accent — one lemon hue, five lightness stops
| Token | Hex | Meaning |
|---|---|---|
| **Lemon hi** | `#E8FF45` | hover, active CTA fill, brightest ink on dark |
| **Lemon** | `#D9FF00` | primary. Diode, eyebrows, active state, rules |
| **Lemon deep** | `#A8C900` | secondary data, pipeline stages, koi accents |
| **Lemon dim** | `#566000` | tertiary data slot when three accents are on screen |
| **Bone** (neutral) | `#B6B9B0` | the fourth data slot when accents are already spent |
| **Accent ink** | `#262B00` | lemon for rules on cream paper only. Never on deep black |

The palette is the user-specified liquid-glass set: obsidian `#070807`, bone `#F4F5EF`,
lemon `#D9FF00`, smoked-glass tints (evolved from graphite `#0B0B0D` / bone `#EAE8E2` /
lemon `#E4E24A`, then deep black `#0A0A0B` / lime `#CDFD02`). The old gold-on-espresso
pair failed for a measured reason: only 16° apart in hue, it read as one brown mass.
Lemon on smoked deep black stays a single hue while the ground and the two lights sit far
enough apart that sheets and glows read as one family. All accents collapse to one hue
with lightness variation. No purple. No cyan. No neon. No gradient between two different hues.

### Text scale (neutral, five steps, nothing more)
`#F4F5EF` primary · `#B6B9B0` secondary · `#7D8178` muted · `#6A6A66` faint · `#43433F` structural

`#7D8178` is a neutral grey step held slightly cool, so the muted tier never drifts warm
or cool into another hue.

Measured contrast: bone on ground **~18.3:1**. Lemon on ground **~17.4:1**.
Muted on surface **~4.8:1**, an AA pass. `#43433F` is structural only, never reading copy.

## Typography

| Role | Family | Treatment |
|---|---|---|
| Display / headings | **Outfit** 200–600 | sentence case, tracking `-0.03em` → `-0.02em`, never uppercase |
| UI / body / nav / buttons | **Geist Sans** 400–500 | sentence case |
| Labels, eyebrows, data, mono | **Geist Mono** 400–500 | `0.14em`–`0.2em` tracking, uppercase only for technical labels |
| Hero wordmark | **Warpaint** | lemon-only ramp, tracked `0.10em`, light light-wear scratches (`.scratch-face`), glyphs widened `1.07x`. Never retyped |

Reusable classes in `globals.css`: `.stylish-header`, `.stylish-sub`, `.eyebrow`,
`.rule-dot`, `.plate`, `.plate-elevated`, `.edge-lit`, `.glass`, `.glass-strong`,
`.glass-bar`, `.scratch-face`.

## Structure — machined crystal

- Corner radius: **`3px`** on plates, cards, chips, and modals — except feature
  panels (hero anchor `18px`, project cards `20px`), which go soft and frosty.
  The diode dots are fully round — they are shapes, not surfaces.
  The `ShaderIgnitionButton` bezel is **not** covered by that rule: it is one
  machined rectangle, outer `6px` with `1.5px` padding inside a `1px` border,
  so the chamber sits `2.5px` in and carries `3.5px`. Outer and chamber share
  one arc and one shape language — never a pill outside a square inside.
  Every variant idles on a lemon-tinted border with a lemon hover glow, so
  the full button set reads as one family from nav to footer.
- **Cut corner**: the top-right corner is clipped with a 225° gradient triangle on
  every plate. *Specified but not implemented* — there is no `cut-corner` utility in
  `globals.css` today. Until one exists, do not describe plates as carrying it.
- **Accent cap**: a `2px` rule along the top-left edge in the card's own accent. Replaces
  card left stripes and coloured borders.
- **No drop shadows.** Depth comes from surface value steps, hairline borders, and
  blurred *atmosphere* (large, low-opacity colour washes) — never an offset shadow.
- **Shiny black crystal glass, two tiers.** Crisp tier: true-black tint held at
  high transparency, `32px` blur, `1.75` saturate lift, hairline border, bright
  `1px` top specular — chips, bars, machined details. Frost tier (`.glass-frost`,
  feature panels only: hero anchor, project cards): shiny black `0.40` tint, deep
  `54px` blur, strong specular with a lit inner rim, `18-24px` radius, settled by
  `.float-soft`. Utilities: `.glass` (`0.42`), `.glass-strong` (sheets/modals,
  `0.66`), `.glass-bar` (masthead). No drawn texture sits on any glass: no cloth
  grain, no brushed stripes, no dot fields — the sheet carries its own light.
  `.edge-lit` plates keep their engraved 1px line instead of a specular sheet, and
  inline-styled surfaces carry the blur in their style prop.
- **Glass needs something to refract.** Frost over flat black is invisible — every
  frost surface ships with ambient washes (neutral bone key glow) behind
  it. `.float-soft` is the one exception to the no-shadow rule: soft ambient
  depth only, never a hard offset.
- **Premium night backdrops** (`PremiumNightBackdrop`, every section) — a single
  soft top spotlight over flat deep black, inspired by premium black-and-gold
  references but never copied. Diagonal beams and static glints were both removed:
  nothing drawn sits in the night. Sides alternate per section, hero runs `stage`
  mood while the rest stay `calm`. Dot and line textures stay banned.
- **No dot grids, no bento grids, no skeletons, no framing lines.** The ambient
  field is soft circular pools only. A page either has content or it has
  nothing; it never shows a placeholder.

## Motion

One easing curve for everything: **`cubic-bezier(0.165, 0.84, 0.44, 1)`**, the front-loaded
curve measured off Linear's production timing. It covers most of the distance in the first
third and then settles without ever accelerating again, which is what separates a considered
entrance from a slide. Nothing overshoots, nothing bounces. Springs only where the gesture is
physical (proximity dock, modal entry). Duration band **0.24s–1.1s**; nothing snappier than
0.2s, nothing slower than 1.1s.

The hero wordmark's letter stagger is **0.14s** per letter so arrival is genuinely
sequential rather than a single stamp, then it holds for **10s** before replaying.

Unique signatures, one per section, no repeats:
- **Navbar** — brand wordmark in full caps, crisp bone white, flush with the
  container edge so it starts where the hero wordmark starts. Links rest at
  bone white and ramp to lemon on proximity, with one bounce (rise,
  overshoot, settle) on hover. Socials are the original brand marks, opaque.
- **Hero wordmark** — per-letter drop, arriving one letter at a time (0.14s
  stagger, 0.8s quartic fall, 0.9s silk settle), a single lemon-only ramp
  (`#F2FF70` to `#8AA500`, no bone sheen, no white stop) with depth inside
  that one hue. Tracked at `0.10em` with a `1.07` horizontal widening so caps
  read broad and settled. The `hue`/`saturation`/`brightness` props are forced
  to `none` and recorded in `data-filter-unused`, which makes multicolor
  structurally impossible. Light wear is painted **above** the ink as
  near-bone streaks (`#FAF9E1`, additive, clipped to the glyphs), so the
  light scratches sit above the ink. On top of that, a light subtractive
  grunge mask (fractal-noise tile, `stitchTiles`, fully encoded) knocks
  sparse pits out of the ink itself (~4% full-cut plus soft speckle edges,
  ~8% effective removal) while every letter stays whole.
- **Hero stage (calm luxury)** — clear circular liquid pools only: a neutral bone
  key and fill, plus one low lemon pool settling behind the figure. No diagonal flow
  bands, no droplet dots, no hairline specular. One single-shape lemon primary CTA,
  no halo behind it. The figure stands on raw obsidian with one neutral contact
  shadow: no slab, no vitrine, no tinted pool. Eye path: wordmark → CTA → character.
- **Cursor** — a 340px light pool (lerp 0.16) with a 46px lemon ring lagging behind
  (lerp 0.09). Native cursor preserved. Off on coarse pointer and reduced motion.
- **Koi cards** — deep neutral dark water in bone light, zero blue cast: drifting elliptical caustics, crest/trough ripples,
  the surface meniscus, and edge vignette. No drawn wave lines, no silt motes, no
  bubble dot field, no tinted top wash, no cut corner: the light lives in the water.
- **Skills** — slim bound volumes held to a narrower measure, square book proportions, an 11px rolled spine, a 14px smooth glass fore-edge,
  and a debossed title. No cloth grain and no leaf stripes: the cover stays a clear
  sheet. Opening runs `scaleX 0.62 → 1` with `rotateX -7 → 0`
  while two covers fall open behind at `rotateY -34`, so it opens like a real book.
- **Projects** — translucent shiny black crystal glass with a milled recess inset
  7px. No brushed grain: the sheet is defined by its hairline, its specular, and the
  washes refracting behind it.
- **The sheet** — `public/assets/three-paper/experience-paper.html`. The restored 3D Experience
  Docket: one hanging leaf on raw obsidian, printed like a verified production record
  (role, company, client, pipeline stages, responsibility pillars, production stack),
  lit by a lemon key and a lemon rim. No pages, no fold control, no second leaf — drag
  to rotate is the only interaction. (Inside the canvas document, em-dashes and the
  verified badge are part of the printed-record look; the UI copy rules above do not
  apply to the sheet's interior.)

`prefers-reduced-motion` collapses every animation to a single settled frame.

## Copy

- Sentence case in all headings. No `!` in UI microcopy.
- No em-dashes (`—`) or en-dashes (`–`). Use `to`, or the `/` slash rule.
- No checkmark bullets. Use a `1.6px` accent hairline tick, or a numbered row.
- No "it's not X, it's Y" constructions. No invented testimonials or metrics.
- Section eyebrows are technical and uppercase-after-slash: `// TECHNICAL CAPABILITIES`,
  `// WORK EXPERIENCE / PRINTED SHEET`. One lemon diode dot, never boxed — except the
  hero eyebrow and the masthead wordmark, which are plain type set flush.

## Banned

Harsh gradients · lucide-as-decoration · pure white background · rainbow palettes ·
drop shadows (except `.float-soft`) · emojis · em/en-dashes · card left stripes · fake testimonials ·
bento grids · fake window chrome · "it's not X it's Y" · checkmark bullets ·
three-tier pricing · skeleton loaders · radial "ops" decoration · dot grids ·
sparkle icons · neon hover states · pastel basics · purple and black.