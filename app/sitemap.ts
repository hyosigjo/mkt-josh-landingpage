import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";

const SITE = "https://mkt.joshlife.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    { url: SITE, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/blog`, lastModified: posts[0]?.date, changeFrequency: "weekly", priority: 0.9 },
    ...getAllTags().map((t) => ({
      url: `${SITE}/blog/tag/${t.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.updated ?? p.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
