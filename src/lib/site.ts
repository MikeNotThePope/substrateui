import type { Metadata } from "next"

/**
 * Canonical facts about the marketing/docs site.
 *
 * Kept in one place because the same values are needed by the root metadata,
 * the sitemap, robots.txt and the Open Graph image — four files that must not
 * disagree about what this site is called or where it lives.
 */

/**
 * Production origin, no trailing slash.
 *
 * Deliberately a constant rather than `VERCEL_URL`: preview deploys should
 * still emit canonical URLs and share cards that point at production, so a
 * preview link pasted into Slack renders the real card and a crawler that
 * reaches a preview is told where the page actually lives.
 */
export const SITE_URL = "https://www.substrateui.dev"

export const SITE_NAME = "SubstrateUI"

/** One-line positioning statement. Used as the default meta description. */
export const SITE_DESCRIPTION =
  "A themeable React design system: 75 components on OKLCH, Tailwind CSS v4 and Base UI, with every colour pairing audited against WCAG AA."

/**
 * Schema.org description of the package, emitted as JSON-LD on the home page.
 *
 * SoftwareSourceCode rather than SoftwareApplication: this is a library you
 * install, not an app you run. Every field is a fact already stated in
 * package.json or on the page — structured data that claims more than the
 * page shows is the kind that gets a site's rich results turned off.
 */
export function softwareJsonLd({ version }: { version: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    codeRepository: "https://github.com/MikeNotThePope/substrateui",
    programmingLanguage: "TypeScript",
    runtimePlatform: "React",
    license: "https://opensource.org/licenses/MIT",
    version,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    keywords: "design system, react, tailwind css, base ui, oklch, accessibility",
  }
}

/**
 * Build the metadata for a single page.
 *
 * Exists because `openGraph` does not deep-merge: a page that declares its own
 * `openGraph` to set og:title replaces the parent's object wholesale, silently
 * dropping og:image, og:type and og:site_name. Every page shipping the same
 * hand-written block would mean 106 places to get that wrong, so the block
 * lives here once and pages pass only what differs.
 *
 * `images` is the /opengraph-image route rather than the file convention's
 * hashed URL, which is only auto-attached to segments that do not override
 * openGraph — which is every page that calls this.
 */
export function pageMetadata({
  title,
  description,
  route,
}: {
  title: string
  description: string
  route: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: route },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      url: route,
      title: `${title} · ${SITE_NAME}`,
      description,
      locale: "en_US",
      images: "/opengraph-image",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
      images: "/twitter-image",
    },
  }
}
