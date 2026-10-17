import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  // An empty sitemap is intentional until the owner supplies the definitive origin.
  if (!siteUrl) return [];
  return ["/", "/portfolio", "/orcamento"].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
