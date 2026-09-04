# rmurai.com

Portfolio site built with Astro and deployed to Cloudflare.

## Setup

```sh
pnpm install
pnpm dev
```

## Design

`docs/design.md` is the design spec, with the implementation deviations recorded in section 10.
`CLAUDE.md` covers the architecture, the animation contract and the accessibility invariants.

## Content

- Publications: `src/content/publications/*.yaml`
- Collections: `src/content.config.ts`
- Zenn fetcher: `src/lib/zenn.ts`
- Profile copy and links: `src/lib/site.ts`
- Social card source: `docs/og-card.html` -> `public/og.png`
