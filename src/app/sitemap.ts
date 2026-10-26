import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { getCaseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/now`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${site.url}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...getCaseStudies().map((c) => ({
      url: `${site.url}/portfolio/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
