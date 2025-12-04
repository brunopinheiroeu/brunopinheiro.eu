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
  title: "Bruno Pinheiro - 20+ years designing digital experiences",
  description:
    "Bruno Pinheiro is a AI Product Builder & Design Technologist with 20+ years of experience creating digital products across web, mobile, AR/VR, and edtech. Passionate about blending design and technology to turn complex ideas into seamless, human-centered experiences.",
  openGraph: {
    title: "Bruno Pinheiro - 20+ years designing digital experiences",
    description:
      "Bruno Pinheiro is a AI Product Builder & Design Technologist with 20+ years of experience creating digital products across web, mobile, AR/VR, and edtech. Passionate about blending design and technology to turn complex ideas into seamless, human-centered experiences.",
    images: [
      {
        url: "/images/cover.png",
        width: 1200,
        height: 627,
        alt: "Bruno Pinheiro - AI Product Builder & Design Technologist",
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
