import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { categories, shops, products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Public, indexable static routes (user-specific pages like dashboard/admin
  // are intentionally excluded and blocked in robots.ts).
  const staticPaths = [
    "",
    "/pricing",
    "/sell",
    "/for-makers",
    "/sellers",
    "/buyer-requests",
    "/search",
    "/how-to-pay",
    "/listing-policy",
    "/terms",
    "/privacy",
    "/account-deletion",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const shopEntries: MetadataRoute.Sitemap = shops.map((s) => ({
    url: `${SITE_URL}/shop/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...shopEntries,
    ...productEntries,
  ];
}
