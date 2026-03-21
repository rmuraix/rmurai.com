import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.yaml' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number().int(),
    doi: z.string(),
    abstract: z.string().optional(),
    url: z.string().url().optional(),
    pdfUrl: z.string().url().optional(),
  }),
});

export const collections = { publications };
