# Portfolio Redesign Tasks

## Task 1: Refining the opening and shared visual field

**Description:** Unify ambient styling and improve the hero hierarchy while preserving the brand wordmark, character, primary navigation, and section anchors.

**Acceptance criteria:**
- [ ] Hero copy, actions, availability, and character are readable and intentionally composed at desktop and mobile widths.
- [ ] Hero name uses the existing Warpaint font; navbar name remains white.
- [ ] Background decoration is restrained and consistent with the obsidian/lime palette.

**Verification:** Inspect desktop and mobile browser layouts; run targeted diagnostics.

**Dependencies:** None.

## Task 2: Clarifying capabilities and motion

**Description:** Present the same three engineering disciplines with a clean editorial layout and make the technology ribbon lightweight and accessible.

**Acceptance criteria:**
- [ ] All existing capability information remains available without animated koi canvases.
- [ ] Only one intentional technology marquee remains; its motion respects reduced-motion preferences.
- [ ] No scroll handler updates React state on every scroll frame.

**Verification:** Inspect capability layout and mobile collapse; check reduced-motion mode and component diagnostics.

**Dependencies:** None.

## Task 3: Unifying experience and skills

**Description:** Refine the experience and technical-discipline presentations without removing the resume sheet, specification view, detail dialog, or keyboard controls.

**Acceptance criteria:**
- [ ] Existing resume and discipline content remains reachable.
- [ ] Buttons, dialogs, and mobile layouts remain functional.
- [ ] Repeated decorative framing and competing glows are reduced.

**Verification:** Test section controls, dialogs, keyboard dismissal/navigation, and responsive layout.

**Dependencies:** Task 1.

## Task 4: Reframing selected work and contact

**Description:** Improve project-image scale, content hierarchy, and contact closing while preserving project identities, links, image modal, and resume/email actions.

**Acceptance criteria:**
- [ ] All project images and repository links remain accessible.
- [ ] Project text is legible without sticky-card crowding.
- [ ] Contact action and footer remain keyboard accessible.

**Verification:** Open and close a project image, follow repository/contact links, and inspect mobile layout.

**Dependencies:** Task 1.

## Task 5: Verifying the complete portfolio

**Description:** Validate the visual redesign, responsive behavior, interactions, accessibility preferences, and production build.

**Acceptance criteria:**
- [ ] Production build and targeted diagnostics pass.
- [ ] Desktop and mobile pages show no clipping or horizontal overflow.
- [ ] Reduced motion leaves all content and controls usable.
- [ ] Browser console has no new application errors.

**Verification:** `npm run build`, editor diagnostics, and browser checks at desktop/mobile widths.

**Dependencies:** Tasks 1-4.
