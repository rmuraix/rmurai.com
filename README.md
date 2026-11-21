# rmurai.com

Portfolio site built with Astro and deployed to Cloudflare.

## Setup

```sh
pnpm install
pnpm dev
```

## Content

- Publications: `src/content/publications/*.yaml`
- Awards: `src/content/awards/*.yaml` (optionally linked to a publication by its file name)
- Collections: `src/content.config.ts`
- Zenn fetcher: `src/lib/zenn.ts`
- Profile copy and links: `src/lib/site.ts`
- Social card source: `docs/og-card.html` -> `public/og.png`
