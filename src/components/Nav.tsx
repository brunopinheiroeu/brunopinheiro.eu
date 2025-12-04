"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Briefcase, Clock, User, Mail, Menu, X } from "lucide-react";
import Image from "next/image";
import { scrollToSection } from "@/lib/scroll";

export default function Nav() {
  const [activeId, setActiveId] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isProductPage = pathname?.startsWith("/products/");

  // Scroll spy (active link by section in view) - only on main page
  useEffect(() => {
    if (isProductPage) return;

    const ids = ["home", "products", "experience", "about", "contact"];
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
  }, [isProductPage]);

  const onAnchorClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (isProductPage) {
      // Navigate to main page with section hash
      router.push(`/#${id}`);
      // After navigation, scroll to section (handled by main page)
    } else {
      // On main page, just scroll to section
      scrollToSection(e, id);
    }
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    onAnchorClick(e, id);
    setIsMenuOpen(false);
  };

  const links = [
    { id: "home", label: "Home", icon: Home },
    { id: "products", label: "Products", icon: Briefcase },
    { id: "experience", label: "Experience", icon: Clock },
    { id: "about", label: "About", icon: User },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        className="fixed left-0 top-0 z-40 hidden h-screen w-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-lg transition-all md:block"
        aria-label="Main navigation"
      >
        <div className="flex h-full flex-col items-center py-8">
          {/* Brand Logo/Initial */}
          <a
            href={isProductPage ? "/#home" : "#home"}
            onClick={(e) => onAnchorClick(e, "home")}
            className="mb-12 flex h-12 w-12 items-center justify-center rounded-lg transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label="Home - Bruno Pinheiro"
          >
            <Image
              src="/images/bp-icon.png"
              alt="BP"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </a>

          {/* Navigation Links */}
          <ul className="flex flex-col items-center gap-6 flex-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = activeId === link.id;

              return (
                <li key={link.id} className="relative group">
                  <a
                    href={isProductPage ? `/#${link.id}` : `#${link.id}`}
                    onClick={(e) => onAnchorClick(e, link.id)}
                    className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                      isActive && !isProductPage
                        ? "bg-primary text-white shadow-md"
                        : "text-surface-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                    aria-current={
                      isActive && !isProductPage ? "page" : undefined
                    }
                    aria-label={link.label}
                  >
                    <Icon className="h-6 w-6" />
                  </a>

                  {/* Tooltip on hover */}
                  <span
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-800 dark:bg-slate-700 px-3 py-2 text-sm font-medium text-white opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100"
                    role="tooltip"
                  >
                    {link.label}
                    {/* Arrow pointing left */}
                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800 dark:border-r-slate-700" />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="fixed left-4 top-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 text-surface-foreground shadow-lg ring-1 ring-border backdrop-blur transition hover:bg-white dark:hover:bg-slate-800 md:hidden"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 transition md:hidden ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-surface-foreground/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className="absolute top-20 left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
          <div className="rounded-full bg-white/90 dark:bg-slate-800/90 px-4 py-4 shadow-[0_25px_80px_rgba(99,102,241,0.35)] ring-1 ring-primary/20 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = activeId === link.id;
                return (
                  <a
                    key={`floating-${link.id}`}
                    href={isProductPage ? `/#${link.id}` : `#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive && !isProductPage
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_30px_rgba(139,92,246,0.45)]"
                        : "bg-white/70 text-surface-foreground shadow-sm ring-1 ring-border hover:bg-primary/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
