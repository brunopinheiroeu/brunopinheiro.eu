import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Inter_Tight, JetBrains_Mono, Newsreader } from "next/font/google";
import { AppearanceProvider, PREFS_BOOT_SCRIPT } from "@/components/site/Appearance";
import { TransitionProvider } from "@/components/site/Transition";
import "./globals.css";

const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["500", "600"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://brunopinheiro.eu"),
  title: "Bruno Pinheiro - Lead Product Designer & Design Engineer",
  description:
    "Bruno Pinheiro is a Lead Product Designer and Design Engineer who turns ambiguous problems into shipped products through UX, automation, and AI-assisted prototyping across edtech, web, mobile, and emerging technology.",
  authors: [{ name: "Bruno Pinheiro", url: "https://brunopinheiro.eu" }],
  openGraph: {
    title: "Bruno Pinheiro - Lead Product Designer & Design Engineer",
    description:
      "Bruno Pinheiro is a Lead Product Designer and Design Engineer who turns ambiguous problems into shipped products through UX, automation, and AI-assisted prototyping across edtech, web, mobile, and emerging technology.",
    images: [
      {
        // Query param busts social platforms' image cache, which is keyed by
        // exact URL - bump it whenever cover.png changes.
        url: "/images/cover.png?v=2",
        width: 1200,
        height: 627,
        alt: "Bruno Pinheiro - Lead Product Designer & Design Engineer",
      },
    ],
    // "article" (instead of "website") makes LinkedIn/Facebook render an
    // author and a publish date on the preview card.
    type: "article",
    publishedTime: "2025-09-03T00:00:00.000Z",
    modifiedTime: "2026-10-26T00:00:00.000Z",
    authors: ["https://linkedin.com/in/brunopinheiroeu"],
  },
};

export const viewport: Viewport = {
  themeColor: "#EDEEF1",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${interTight.variable} ${jetbrains.variable}`} data-theme="studio" data-font="serif" data-size="m" data-motion="cinematic" data-wash="on" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PREFS_BOOT_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <AppearanceProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </AppearanceProvider>
        <Analytics />
        <Script src="https://cdn.embedly.com/widgets/platform.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
