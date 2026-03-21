// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import cloudflare from '@astrojs/cloudflare';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Space Grotesk",
      cssVariable: "--sn-font-heading",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
    },
    {
      provider: fontProviders.google(),
      name: "Manrope",
      cssVariable: "--sn-font-body",
      weights: [400, 500, 600],
      styles: ["normal"],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});