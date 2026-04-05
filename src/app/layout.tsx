import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { DirectionController } from "@/components/providers/direction-controller";
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
      <body className={`${dmSans.variable} ${dmMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DirectionController>{children}</DirectionController>
        </ThemeProvider>
      </body>
    </html>
  );
}
