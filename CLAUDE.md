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

No test suite is configured.

## Architecture

Personal portfolio site (single-page) built with **Astro 6 + React 19 + Tailwind CSS v4 + shadcn/ui**, deployed to **Cloudflare Workers** via `@astrojs/cloudflare`.

### Data flow

`src/pages/index.astro` is the only route. At build time it:
1. Queries the `publications` content collection (`src/content/publications/*.yaml`) and sorts by year desc, then title asc.
2. Calls `fetchZennArticles("rmuraix")` in `src/lib/zenn.ts`, which hits `https://zenn.dev/api/articles` and returns the top 3 for display.

### Component model

- **Astro components** (`.astro`) — used for all sections and the footer; zero client-side JS by default.
- **React components** (`.tsx`) — only `SiteHeader` uses React with `client:load` hydration. shadcn/ui components live in `src/components/ui/`.

### Content collections

Defined in `src/content.config.ts` with Zod. Each publication YAML must have `title`, `authors[]`, `venue`, `year`, `url`; optional `doi`, `abstract`, `pdfUrl`.

### Styling

Tailwind CSS v4 is loaded via the Vite plugin (`@tailwindcss/vite`). shadcn/ui uses the `radix-nova` style with `neutral` base color and CSS variables. Global styles and design tokens are in `src/styles/global.css`.

Fonts are loaded via `astro/assets` `Font` component with CSS variables `--sn-font-heading` (Space Grotesk) and `--sn-font-body` (Manrope).

### Path alias

`@/` resolves to `src/` (configured in `tsconfig.json` and `components.json`).

### Cloudflare deployment

`wrangler.jsonc` configures the Worker. The `global_fetch_strictly_public` compatibility flag is required for external API calls (Zenn) inside the Worker runtime. Run `pnpm generate-types` after changing `wrangler.jsonc` to keep `worker-configuration.d.ts` in sync.
