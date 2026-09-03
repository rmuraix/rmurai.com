// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

/**
 * Japanese fallbacks are intentionally *system* fonts: the site content is
 * English, so shipping Shippori Mincho / Noto Sans JP webfonts (multi-MB, 100+
 * unicode-range chunks) would cost far more than it returns. The stacks keep
 * the mincho/gothic pairing from the design spec for any future JP copy.
 */
const jpSerif = ["Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", "YuMincho"];
const jpSans = ["Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic"];

// https://astro.build/config
export default defineConfig({
  site: "https://rmurai.com",
  adapter: cloudflare(),

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--sn-font-heading",
      weights: ["400 600"],
      styles: ["normal"],
      subsets: ["latin"],
      display: "swap",
      fallbacks: [...jpSerif, "serif"],
      optimizedFallbacks: true,
    },
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--sn-font-body",
      weights: ["300 500"],
      styles: ["normal"],
      subsets: ["latin"],
      display: "swap",
      fallbacks: [...jpSans, "sans-serif"],
      optimizedFallbacks: true,
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--sn-font-mono",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      display: "swap",
      fallbacks: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      optimizedFallbacks: true,
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
