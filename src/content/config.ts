import { z, defineCollection } from "astro:content";
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    short: z.string(),
    katex: z.boolean().optional(),
    highlight: z.boolean().optional(),
    originalTitle: z.string().optional(),
  }),
});

const appCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    id: z.string(),
    icon: z.string().optional(),
    iconPixelated: z.boolean().optional(),
    short: z.string(),
    order: z.number(),
    category: z.array(z.string()),
    latest: z.object({
      dateiso: z.string().or(z.date()).optional(),
      version: z.string().optional(),
    }),
    links: z.array(
      z.object({
        text: z.string().optional(),
        label: z.string().optional(),
        url: z.string(),
        main: z.boolean().optional(),
      })
    ),
  }),
});

export const collections = {
  blog: blogCollection,
  applist: appCollection,
};
