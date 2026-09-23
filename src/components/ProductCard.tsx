import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/contentful";
import MarkdownWithEmbeds from "@/components/MarkdownWithEmbeds";

interface ProductCardProps {
  product: Product;
}

// Shared card for every "browse all products" context (the /products grid
// and the "More Cases" grid at the bottom of a case page - they must render
// identically). White base throughout, full uncropped Home · Product image
// (falls back to the cover image) on a neutral backdrop, name/category/
// summary in a white body below.
export default function ProductCard({ product }: ProductCardProps) {
  const image = product.home.image ?? product.coverImage;
  const name = product.home.projectName || product.title;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800"
    >
      <div className="relative h-48 shrink-0 overflow-hidden border-b border-border/60 bg-gradient-to-br from-accent/15 via-accent/25 to-accent/40 dark:bg-slate-700">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt || name}
            fill
            className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 text-base font-semibold text-surface-foreground">
          {name}
        </h3>
        {product.home.category && (
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
            {product.home.category}
          </p>
        )}
        {product.frontPageText && (
          <div className="mb-3 line-clamp-3 text-sm text-muted">
            <MarkdownWithEmbeds
              content={product.frontPageText}
              inline
              className="text-muted"
            />
          </div>
        )}
        <div className="mt-auto flex justify-end">
          <div className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:text-secondary">
            Case Study <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
