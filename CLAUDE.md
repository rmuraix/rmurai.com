# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev           # Start dev server
pnpm build         # Production build
pnpm preview       # Build then preview locally
pnpm deploy        # Build then deploy to Cloudflare Workers
pnpm generate-types  # Regenerate Cloudflare Worker types (worker-configuration.d.ts)
```

No test suite is configured. CI runs `pnpm build` only.

## Architecture

Personal portfolio site (single page) built with **Astro 7 + Tailwind CSS v4**, deployed to
**Cloudflare Workers** via `@astrojs/cloudflare`. Output is `static`, so everything below
happens at build time.

There is **no UI framework**. React, shadcn/ui and their supporting packages were removed
once nothing hydrated; the runtime dependency list is Astro, the Cloudflare adapter, the
sitemap integration, Tailwind and Motion. Do not reintroduce a framework for a single
animation — see the animation contract below for how motion is done here.

### Data flow

`src/pages/index.astro` is the only route. At build time it:
1. Queries the `publications` content collection (`src/content/publications/*.yaml`) and sorts by year desc, then title asc.
2. Calls `fetchZennArticles("rmuraix")` in `src/lib/zenn.ts`, which hits `https://zenn.dev/api/articles`; the top 3 are featured.

Shared profile copy and link data live in `src/lib/site.ts` — edit there, not in the components.

### Component model

Every component is a `.astro` file. The page ships **no framework JavaScript at all** — the
only client script is `src/scripts/motion.ts` (~3.8 kB gzip), imported from `Layout.astro`.

### Design system

See `docs/design.md` for the full spec. In short: near-black background, Fraunces headings,
Inter body, JetBrains Mono for metadata, one electric-blue accent, and terminal details
(`$ section` prompts, a blinking hero cursor, mono dates and DOIs).

Tokens live at `:root` in `src/styles/global.css` (`--sn-*`) and the handful Tailwind needs are
re-exported through `@theme inline` as `--color-ink`, `--color-ink-muted`, `--color-hair`,
`--color-brand`, `--color-brand-bright`, `--color-elevated` and `--color-border`. Prefer those
utilities (`text-ink-muted`) over arbitrary values (`text-[var(--sn-fg-muted)]`).

### Accessibility invariants

Two of these were regressions caught in review — do not undo them:

- Body-adjacent text never goes below `--sn-fg-muted` (#8A8A8E, 5.75:1 on the background).
  Dimming muted text further with `opacity` drops it under WCAG AA.
- Small monospace links (13px, ~19.5px tall) carry `.tap` so they clear the 24x24 CSS px
  target minimum (WCAG 2.5.8).
- Content must render fully without JavaScript and under `prefers-reduced-motion` — see the
  animation contract below.

### Animation contract

`src/scripts/motion.ts` uses Motion (`motion/mini`'s `animate` plus `inView`) and is driven
entirely by data attributes:

- `data-reveal` — fade + rise when scrolled into view; elements crossing the viewport
  together are staggered as one burst.
- `data-reveal-delay="0.2"` — extra delay in seconds.
- `data-reveal-after-type` — in the hero, wait for the typewriter to finish first.
- `data-reveal-char` — one character of the typed headline.
- `data-indicator-for="<section id>"` — section-indicator link, gets `aria-current`.

The hidden start state applies **only** under `html.js-motion`, a class set by an inline
`<head>` script in `Layout.astro` when `prefers-reduced-motion` is not `reduce`. That script
also arms a 2.5 s watchdog that strips the class if `motion.ts` never runs, so content is never
trapped invisible. Keep that contract intact when adding animations.

### Content collections

Defined in `src/content.config.ts` with Zod. Each publication YAML must have `title`,
`authors[]`, `venue`, `year`, `url`; optional `doi` (bare identifier, linked via `doi.org`),
`abstract`, `pdfUrl`.

### Styling

Tailwind CSS v4 is loaded via the Vite plugin (`@tailwindcss/vite`). Global styles, design
tokens and the component layer are all in `src/styles/global.css`.

Fonts are self-hosted through the `astro:assets` `Font` component with CSS variables
`--sn-font-heading` (Fraunces), `--sn-font-body` (Inter) and `--sn-font-mono` (JetBrains Mono),
configured in `astro.config.mjs`. Japanese fallbacks are **system** fonts on purpose — the site
content is English and JP webfonts would dominate the payload.

### Path alias

`@/` resolves to `src/` (configured in `tsconfig.json` and `components.json`).

### Cloudflare deployment

`wrangler.jsonc` configures the Worker. The `global_fetch_strictly_public` compatibility flag is
required for external API calls (Zenn) inside the Worker runtime. Run `pnpm generate-types` after
changing `wrangler.jsonc` to keep `worker-configuration.d.ts` in sync.
