import type { MetadataRoute } from "next";
import { getSitemapEntries, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries().map((entry) => ({
    url: `${siteUrl}${entry.path}`,
    lastModified: entry.lastModified ?? new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
