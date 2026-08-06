import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Archivo, Barlow_Condensed } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DirectionController } from "@/components/providers/direction-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteThemeProvider } from "@/components/theme-picker";
import { SkipLink } from "@/components/ui/skip-link";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Site-only display and utility faces. Deliberately NOT wired into
// src/styles/tokens.css: --font-sans and --font-mono are shipped to
// consumers via @theme inline, so changing those would restyle every
// installation. These two stay on the marketing site.
const archivo = Archivo({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// The tiny type printed on the edge of a swatch card. Only ever used at
// 11-13px in uppercase, so one weight is enough.
const barlowCondensed = Barlow_Condensed({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

// `title.template` applies to child segments only, which is why `default` is
// required — it is what the home page itself renders. Every other page exports
// its own `title` string and gets the suffix appended.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — A themeable React design system`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "design system",
    "react components",
    "tailwind css v4",
    "base ui",
    "oklch",
    "theming",
    "accessible components",
    "wcag aa",
    "next.js",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    title: `${SITE_NAME} — A themeable React design system`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — A themeable React design system`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${archivo.variable} ${barlowCondensed.variable} font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteThemeProvider>
            <DirectionController>
              <div className="flex min-h-screen flex-col">
                {/* First focusable element in the document, so Tab from the
                    address bar reaches it before the header and the docs
                    sidebar. Each route supplies the #main-content target. */}
                <SkipLink />
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
            </DirectionController>
          </SiteThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
