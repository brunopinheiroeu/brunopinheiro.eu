"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const navRef = useRef<HTMLElement | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");

  // Shadow/bg on scroll
  useEffect(() => {
    const onScroll = () => {
      const nav = navRef.current;
      if (!nav) return;
      if (window.scrollY > 50)
        nav.classList.add("shadow-lg", "bg-white/90", "backdrop-blur");
      else nav.classList.remove("shadow-lg", "bg-white/90", "backdrop-blur");
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy (active link by section in view)
  useEffect(() => {
    const ids = ["home", "projects", "experience", "about", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((sec) => obs.observe(sec));
    return () => obs.disconnect();
  }, []);

  // Close mobile on ESC + lock scroll when open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // lock body scroll while menu is open
    const root = document.documentElement;
    root.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      root.style.overflow = "";
    };
  }, [mobileOpen]);

  const onAnchorClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const links = [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const linkBase =
    "relative inline-block font-bold transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:text-indigo-600 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40";

  return (
    <nav
      ref={navRef}
      className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur transition-shadow"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand with hover underline (desktop full name / mobile initials) */}
          <a
            href="#home"
            onClick={(e) => onAnchorClick(e, "home")}
            className="group relative inline-block text-xl font-bold text-indigo-600"
            aria-current={activeId === "home" ? "page" : undefined}
          >
            <span className="hidden md:inline">Bruno Pinheiro</span>
            <span className="md:hidden">BP</span>
            {/* underline animation left->right; stays when active */}
            <span
              className={`pointer-events-none absolute -bottom-1 left-0 block h-0.5 bg-indigo-600 transition-all duration-300 ${
                activeId === "home" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => onAnchorClick(e, link.id)}
                  className={`${linkBase} ${
                    activeId === link.id
                      ? "text-indigo-600 after:w-full"
                      : "text-slate-800"
                  }`}
                  aria-current={activeId === link.id ? "page" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-menu"
        className={`fixed right-0 top-0 z-50 h-full w-72 transform bg-white shadow-xl transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold text-indigo-700">Menu</span>
          <button
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="px-6">
          <ul className="space-y-3 pb-10">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => onAnchorClick(e, link.id)}
                  className={`block ${linkBase} ${
                    activeId === link.id
                      ? "text-indigo-600 after:w-full"
                      : "text-slate-800"
                  } py-2`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </nav>
  );
}
