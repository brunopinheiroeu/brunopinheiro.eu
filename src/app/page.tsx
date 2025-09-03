"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen antialiased text-slate-900">
      <Nav />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
