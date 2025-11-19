import type { MouseEvent } from "react";

export type ScrollTarget = HTMLElement | null;

type ScrollOptions = ScrollIntoViewOptions & { block?: ScrollLogicalPosition };

export function scrollToSection(
  event: MouseEvent,
  id: string,
  options?: ScrollOptions
) {
  event.preventDefault();

  const target = document.getElementById(id) as ScrollTarget;

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
    ...options,
  });
}

