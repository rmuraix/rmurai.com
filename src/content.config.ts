import { glob } from 'astro/loaders';
import { defineCollection, reference } from 'astro:content';
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
    url: z.url(),
    pdfUrl: z.url().optional(),
  }),
});

const awards = defineCollection({
  loader: glob({ base: './src/content/awards', pattern: '**/*.yaml' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    year: z.number().int(),
    /** The awarded paper, when it is listed under publications. */
    publication: reference('publications').optional(),
    /** Announcement or proceedings page, when one exists. */
    url: z.url().optional(),
  }),
});

export const collections = { publications, awards };
