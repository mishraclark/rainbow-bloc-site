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
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    location: z.string().optional(),
    address: z.string().optional(),
    link: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { zines, events };
