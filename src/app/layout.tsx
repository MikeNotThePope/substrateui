import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Archivo, Barlow_Condensed } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DirectionController } from "@/components/providers/direction-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteThemeProvider } from "@/components/theme-picker";
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

export const metadata: Metadata = {
  title: "SubstrateUI",
  description: "SubstrateUI Design System",
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
