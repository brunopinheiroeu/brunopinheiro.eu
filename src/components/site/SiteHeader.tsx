"use client";

import Link from "next/link";
import { useAppearance } from "./Appearance";
import { usePageTransition } from "./Transition";
import { INTRO_ACCENT } from "@/lib/story";

type Props = {
  variant: "stage" | "page";
  current?: "work" | "about";
  onHome?: () => void;
  onWork?: () => void;
};

export default function SiteHeader({ variant, current, onHome, onWork }: Props) {
  const { panelOpen, setPanelOpen } = useAppearance();
  const { navigate } = usePageTransition();

  const go = (e: React.MouseEvent, href: string, handler?: () => void, label?: string, axis?: "x" | "y") => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    if (handler) handler();
    else navigate(href, { color: INTRO_ACCENT, label, axis });
  };

  return (
    <>
      <header className={`topbar${variant === "page" ? " is-page" : ""}`}>
        <Link className="brand" href="/" onClick={(e) => go(e, "/", onHome, "BRUNO PINHEIRO")}>
          <span className="brand-name">BRUNO PINHEIRO</span>
          <span className="brand-role">Lead Product Designer &amp; Design Engineer</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <Link className={`nav-link${current === "work" ? " is-current" : ""}`} href="/#work" onClick={(e) => go(e, "/#work", onWork, "WORK")}>Work</Link>
          <Link className={`nav-link${current === "about" ? " is-current" : ""}`} href="/about" aria-current={current === "about" ? "page" : undefined} onClick={(e) => go(e, "/about", undefined, "ABOUT", "x")}>About</Link>
          <span className="nav-divider" />
          <button type="button" className={`gear${panelOpen ? " is-on" : ""}`} onClick={() => setPanelOpen(!panelOpen)} aria-label="Appearance settings" aria-expanded={panelOpen}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 7h10M4 17h6M18 12H4" /><circle cx="16" cy="7" r="2" /><circle cx="12" cy="17" r="2" /><circle cx="20" cy="12" r="2" /></svg>
          </button>
        </nav>
      </header>
      {variant === "stage" && <div className="hairline" />}
    </>
  );
}
