import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const zines = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/zines" }),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    file: z.string(),
    description: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/events" }),
  schema: z.object({
    name: z.string(),
    start: z.string(),
    end: z.string().optional(),
    location: z.string().optional(),
    address: z.string().optional(),
    link: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
  }),
});

const whistles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/whistles" }),
  schema: z.object({
    name: z.string(),
    file: z.string(),
    recommended: z.boolean().default(false),
    notes: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { zines, events, whistles };
