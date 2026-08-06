import type { MetadataRoute } from "next"

import { routePriority, staticRoutes } from "@/lib/routes"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  // Build time, not request time — every page here is prerendered, so one
  // timestamp for the whole set is the honest answer.
  const lastModified = new Date()

  return staticRoutes().map((route) => ({
    url: route === "/" ? SITE_URL : `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: routePriority(route),
  }))
}
