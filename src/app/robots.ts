import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The Storybook bundle is a client-rendered iframe app served out of
      // public/. A crawler gets an empty shell from it, and every story would
      // otherwise compete with the docs page that documents the same
      // component. Keep it reachable for humans, out of the index for robots.
      disallow: "/storybook",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
