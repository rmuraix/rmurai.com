import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.yaml' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number().int(),
    doi: z.string().optional(),
    abstract: z.string().optional(),
    url: z.string().url(),
    pdfUrl: z.string().url().optional(),
  }),
});

export const collections = { publications };
