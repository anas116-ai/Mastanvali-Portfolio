# Portfolio Redesign Plan

## Design read

Redesign the existing developer portfolio for recruiters and engineering teams as a distinctive, high-end dark-tech portfolio. Keep the dark obsidian and lime identity, the existing Warpaint hero wordmark, the character, section anchors, navigation labels, project content, resume interactions, and contact paths. Use references for motion and composition ideas only, never as templates.

## Direction

- Design variance: 8/10. Use varied editorial compositions without making navigation or reading unpredictable.
- Motion intensity: 7/10. Reserve cinematic movement for the opening and project storytelling; use restrained reveals elsewhere and honor reduced motion.
- Visual density: 4/10. Reduce copy collisions, nested cards, and decorative metadata while preserving meaningful technical detail.
- Core visual language: obsidian, bone, one lime accent, precise typography, broad negative space, restrained materials, and real project imagery.

## Reference synthesis

- The supplied portfolio demonstrates an interactive 3D character and a clear section journey.
- Animation/component libraries offer many effects; use only motion that clarifies hierarchy, progress, or interaction.
- Cinematic showcase references use focused transitions and art direction rather than stacking unrelated effects.
- Preserve the site's own character, type treatment, technical subject matter, and content instead of reproducing any reference layout.

## Implementation slices

### 1. Refining the opening and shared visual field

- Establish consistent spacing, contrast, and a single restrained ambient background.
- Recompose the hero so its name, value proposition, calls to action, availability, and character read clearly on desktop and mobile.
- Keep the Warpaint hero-name font and existing character implementation.
- Keep the current navigation labels and white navbar name.

### 2. Clarifying capabilities and motion

- Replace the fish-pond capability cards with an editorial layout that presents the same three real engineering disciplines.
- Replace scroll-state React updates in the technology tape with one restrained, reduced-motion-aware marquee treatment.
- Remove competing decorative glows and unnecessary perpetual effects.

### 3. Unifying experience and skills

- Retain the resume, specification, and keyboard interactions while clarifying the experience section's hierarchy and responsive layout.
- Retain the three discipline records and their detail interaction while simplifying their presentation.
- Ensure motion supports reading and interaction instead of competing with them.

### 4. Reframing selected work and contact

- Give each existing project image and repository a distinct, spacious presentation.
- Preserve project links, image enlargement, and truthful implementation details.
- Make the closing contact action clear and consistent with the rest of the page.

### 5. End-to-end verification

- Build the production app and check TypeScript/editor diagnostics.
- Verify the hero, section navigation, experience controls, project image modal, and contact links at desktop and mobile widths.
- Check browser console/runtime errors and reduced-motion behavior.

## Risks and safeguards

| Risk | Safeguard |
|---|---|
| Existing worktree has many unrelated edits | Restrict changes to the listed active portfolio components; never reset or clean unrelated files |
| Existing resume and project interactions are easy to regress | Preserve component state, URLs, section IDs, keyboard behavior, and modal paths |
| Excessive motion harms performance and accessibility | Prefer transform/opacity reveals, eliminate per-scroll React state, honor `prefers-reduced-motion`, and pause offscreen animation |
| Hero content clips on narrow screens | Verify complete name, buttons, availability, and character at mobile viewport sizes |
