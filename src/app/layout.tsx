import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Press_Start_2P } from "next/font/google"; // ✅ Correct built-in import

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const testFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-test",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bruno Pinheiro | Turning Ideas into Reality",
  description:
    "Bruno Pinheiro is a passionate product designer & developer who blends creativity and technology to craft seamless digital experiences. With expertise in UX/UI, frontend development, and emerging tech, he turns ideas into reality through innovation and design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${testFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
