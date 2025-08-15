"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-6 right-6 z-50 flex justify-between items-start pt-[20px]">
      {/* Logo (Left-Aligned) */}
      <Link
        href="#intro"
        className="transition-transform duration-300 hover:scale-105"
        onClick={() =>
          document
            .querySelector("#intro")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <Image src="/logo.svg" alt="Logo" width={60} height={60} />
      </Link>

      {/* Stacked Menu (Right-Aligned, Now Visible) */}
      <div className="flex flex-col items-end space-y-4 text-lg font-semibold">
        <Link
          href="#work"
          className="hover:text-accent transition-colors duration-300"
        >
          Work
        </Link>
        <Link
          href="#about"
          className="hover:text-accent transition-colors duration-300"
        >
          About
        </Link>
        <Link
          href="/BrunoPinheiroResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors duration-300"
        >
          Resume
        </Link>
        <Link
          href="#contact"
          className="hover:text-accent transition-colors duration-300"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
