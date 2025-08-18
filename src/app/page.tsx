import Link from "next/link";
import CopyEmailButton from "@/components/CopyEmailButton";
import BrunixButton from "@/components/BrunixButton";

export default function Home() {
  return (
    <main className="bg-zinc-50 text-zinc-800 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b border-zinc-200">
        <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
          <Link href="/" className="font-bold text-zinc-800">
            Bruno Pinheiro
          </Link>
          <div className="flex gap-6 text-sm">
            <Link href="#work" className="hover:text-zinc-900">
              Work
            </Link>
            <Link href="#about" className="hover:text-zinc-900">
              About
            </Link>
            <Link href="#resume" className="hover:text-zinc-900">
              Resume
            </Link>
            <Link href="#contact" className="hover:text-zinc-900">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-zinc-900">
          I design and build digital solutions.
        </h1>
        <p className="mt-4 text-lg text-zinc-600 max-w-2xl mx-auto">
          UI, Design Systems, prototyping, automation, and 3D/VR when it makes
          sense.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            className="px-5 py-2 border rounded-lg hover:bg-zinc-100"
            href="#work"
          >
            View Projects
          </Link>
          <Link
            className="px-5 py-2 border rounded-lg hover:bg-zinc-100"
            href="#resume"
          >
            Resume
          </Link>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-semibold">Work</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <article className="border border-zinc-200 rounded-lg p-6 hover:shadow-md transition">
            <h3 className="font-medium text-lg">Bua na Cainte</h3>
            <p className="text-sm text-zinc-600">UI + Design System · EdTech</p>
            <Link
              className="inline-block mt-3 text-sm underline"
              href="/work/bua-na-cainte"
            >
              View case study
            </Link>
          </article>
          <article className="border border-zinc-200 rounded-lg p-6 hover:shadow-md transition">
            <h3 className="font-medium text-lg">VR Showroom</h3>
            <p className="text-sm text-zinc-600">3D/Realtime · Digital Twin</p>
            <Link
              className="inline-block mt-3 text-sm underline"
              href="/work/vr-showroom"
            >
              View case study
            </Link>
          </article>
        </div>
      </section>

      {/* Resume */}
      <section id="resume" className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-semibold">Resume</h2>
        <p className="mt-4 text-zinc-600">
          You can download my full CV or check my LinkedIn.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            className="px-5 py-2 border rounded-lg hover:bg-zinc-100"
            href="/BrunoPinheiroResume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download PDF
          </Link>
          <Link
            className="px-5 py-2 border rounded-lg hover:bg-zinc-100"
            href="https://www.linkedin.com/in/brunopinheiroeu"
            target="_blank"
          >
            LinkedIn
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-semibold">Contact</h2>
        <p className="mt-4 text-zinc-600">Let’s connect!</p>
        <div className="mt-6 flex gap-4">
          <Link
            className="px-5 py-2 border rounded-lg hover:bg-zinc-100"
            href="mailto:bruno@pinheiro.art.br"
          >
            Email
          </Link>
          <CopyEmailButton email="bruno@pinheiro.art.br" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 mt-auto">
        <div className="mx-auto max-w-5xl p-4 text-sm text-zinc-500 text-center">
          © {new Date().getFullYear()} Bruno Pinheiro — Thanks for visiting.
        </div>
      </footer>

      {/* Floating Button */}
      <BrunixButton />
    </main>
  );
}
