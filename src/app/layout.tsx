import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Script from "next/script";
import { Oswald, Open_Sans } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
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
        // Query param busts social platforms' (LinkedIn, Facebook, etc.)
        // image cache, which is keyed by exact URL - bump it whenever
        // cover.png changes so the new preview actually shows up.
        url: "/images/cover.png?v=2",
        width: 1200,
        height: 627,
        alt: "Bruno Pinheiro - Lead Product Designer & Design Engineer",
      },
    ],
    // "article" (instead of "website") is what makes LinkedIn/Facebook
    // actually render an author and a publish date on the preview card.
    type: "article",
    // Site's original launch date (first redesign commit) - bump
    // modifiedTime whenever the content changes meaningfully.
    publishedTime: "2025-09-03T00:00:00.000Z",
    modifiedTime: "2026-09-23T00:00:00.000Z",
    authors: ["https://linkedin.com/in/brunopinheiroeu"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${openSans.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <Script
          src="https://cdn.embedly.com/widgets/platform.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
