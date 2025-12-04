import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
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
  title: "Bruno Pinheiro - Senior Product Designer & Technologist",
  description:
    "Bruno Pinheiro is a Senior Product Designer & Technologist with 20+ years of experience creating digital products across web, mobile, AR/VR, and edtech. Passionate about blending design and technology to turn complex ideas into seamless, human-centered experiences.",
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
      </body>
    </html>
  );
}
