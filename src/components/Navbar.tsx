"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for mobile menu

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-light text-primary py-4 shadow-md z-50 backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-lg font-semibold tracking-wide">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={32} /> : <FiMenu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-light text-primary flex flex-col items-center space-y-6 py-6 absolute top-16 left-0 w-full shadow-lg">
          <Link
            href="#work"
            className="hover:text-accent transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Work
          </Link>
          <Link
            href="#about"
            className="hover:text-accent transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/BrunoPinheiroResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Resume
          </Link>
          <Link
            href="#contact"
            className="hover:text-accent transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
