import { glob, file } from "astro/loaders";
import { z, defineCollection } from "astro:content";
const blog = defineCollection({
    loader: glob({ pattern: '*.mdx', base: "./src/posts" }),
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }).optional(),
      tags: z.array(z.string()),
    })
});

const thoughts = defineCollection({
    loader: glob({ pattern: '*.md', base: "./src/thoughts" }),
    schema: z.object({
      pubDate: z.date(),
      tags: z.array(z.string()).optional(),
    })
});


const events = defineCollection({
    loader: file("src/data/events.yaml"),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string().optional(),
      startDate: z.date().optional(),
      // `ongoing` renders as an open-ended range, e.g. "feb 2026 - ongoing"
      endDate: z.union([z.date(), z.literal("ongoing")]).optional(),
      links: z.object({
        website: z.string().url(),
        github: z.string().url().optional(),
        finances: z.string().url().optional(),
        video: z.string().url().optional(),
      }),
    })
});

export const collections = { blog, thoughts, events };
