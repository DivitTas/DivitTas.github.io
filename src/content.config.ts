import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const devlog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/devlog' }),
  schema: z.object({
    num: z.string(),
    title: z.string(),
    date: z.string(),
    minutes: z.number(),
    tags: z.array(z.string()),
    weekOf: z.string().optional(),
    summary: z.string(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    minutes: z.number(),
    summary: z.string(),
  }),
});

export const collections = { devlog, notes };
