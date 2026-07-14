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
  openGraph: {
    title: "Bruno Pinheiro - Lead Product Designer & Design Engineer",
    description:
      "Bruno Pinheiro is a Lead Product Designer and Design Engineer who turns ambiguous problems into shipped products through UX, automation, and AI-assisted prototyping across edtech, web, mobile, and emerging technology.",
    images: [
      {
        url: "/images/cover.png",
        width: 1200,
        height: 627,
        alt: "Bruno Pinheiro - Lead Product Designer & Design Engineer",
      },
    ],
    type: "website",
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
