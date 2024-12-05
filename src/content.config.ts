import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    short: z.string(),
    katex: z.boolean().optional(),
    highlight: z.boolean().optional(),
    originalTitle: z.string().optional(),
  }),
});

const appCollection = defineCollection({
  loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/applist" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      id: z.string(),
      icon: image().optional(),
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
