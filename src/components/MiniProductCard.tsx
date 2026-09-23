"use client";
import Image from "next/image";

interface MiniProductCardProps {
  name: string;
  category?: string;
  image: { src: string; alt: string };
  isActive: boolean;
  onClick: () => void;
}

// The small selector "tags" below the Featured Products slide - compact
// enough that the whole section still fits on one screen. Plain white pill
// with a small thumbnail on the left and the name/category next to it.
export default function MiniProductCard({
  name,
  category,
  image,
  isActive,
  onClick,
}: MiniProductCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group flex items-center gap-3 overflow-hidden rounded-2xl bg-white px-3 py-2 text-left transition dark:bg-slate-800",
        isActive
          ? "ring-2 ring-primary ring-offset-2 ring-offset-primary/5"
          : "ring-1 ring-border hover:ring-primary/40",
      ].join(" ")}
    >
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-2xl bg-white">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="40px"
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-surface-foreground">
          {name}
        </span>
        {category && (
          <span className="block truncate text-xs text-muted">
            {category}
          </span>
        )}
      </span>
    </button>
  );
}
