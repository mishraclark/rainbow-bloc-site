import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { combineDateTime } from "./lib/datetime";

const emptyToUndefined = (v: unknown) => (v === "" ? undefined : v);
const optionalDate = z.preprocess(emptyToUndefined, z.coerce.date().optional());
const optionalString = z.preprocess(emptyToUndefined, z.string().optional());

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
  schema: z
    .object({
      name: z.string(),
      startDate: z.coerce.date(),
      startTime: optionalString,
      endDate: optionalDate,
      endTime: optionalString,
      recurrence: z.preprocess(
        emptyToUndefined,
        z.enum(["weekly", "biweekly", "monthly"]).optional(),
      ),
      recurrenceUntil: optionalDate,
      location: optionalString,
      address: optionalString,
      link: optionalString,
      image: optionalString,
      description: optionalString,
    })
    .transform((data) => {
      const start = combineDateTime(data.startDate, data.startTime);
      const endBaseDate = data.endDate ?? data.startDate;
      const end =
        data.endTime || data.endDate
          ? combineDateTime(endBaseDate, data.endTime ?? data.startTime)
          : undefined;
      return { ...data, start, end };
    }),
});

export const collections = { zines, events };
