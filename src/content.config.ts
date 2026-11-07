import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const cards = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/cards" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    tag: z.string().optional(),
    year: z.string(),
    order: z.number(),
    art: z.string(),
    background: z.string(),
    ink: z.string(),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  }),
})

export const collections = { cards }
