import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/contentful";
import { extractLoneVimeoUrls, getVimeoEmbeds } from "@/lib/vimeo";
import { CASE_DESIGN, EXTRA_LINKS, INTRO_ACCENT, accentFor } from "@/lib/story";
import SiteHeader from "@/components/site/SiteHeader";
import MarkdownWithEmbeds from "@/components/MarkdownWithEmbeds";
import { BackToWork, NextCase, ReadProgress } from "@/components/story/CaseChrome";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;

// Prerender every case at build so a click never waits on Contentful.
export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

const pad = (i: number) => String(i).padStart(2, "0");

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const name = product.home.projectName || product.title.split(" - ")[0];
  const image = product.home.image || product.coverImage;
  return {
    title: `${name} — Bruno Pinheiro`,
    description: product.frontPageText || product.home.headline,
    openGraph: {
      title: `${name} — Bruno Pinheiro`,
      description: product.frontPageText || product.home.headline,
      images: image ? [{ url: image.url, width: image.width, height: image.height, alt: image.alt }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, all] = await Promise.all([getProductBySlug(slug), getProducts()]);
  if (!product) notFound();

  const name = product.home.projectName || product.title.split(" - ")[0];
  const headline = product.title.includes(" - ") ? product.title.split(" - ").slice(1).join(" - ") : product.home.headline;
  const accent = accentFor(slug);
  const storyIndex = CASE_DESIGN.findIndex((d) => d.slug === slug);
  const inStory = storyIndex >= 0;
  const links = EXTRA_LINKS[slug] ?? (product.productUrl ? [{ label: name, url: product.productUrl }] : []);
  const image = product.home.image || product.coverImage;

  const vimeoUrls = product.content ? extractLoneVimeoUrls(product.content) : [];
  const vimeoEmbeds = vimeoUrls.length ? await getVimeoEmbeds(vimeoUrls) : {};

  const storySlugs = CASE_DESIGN.map((d) => d.slug).filter((s) => all.some((p) => p.slug === s));
  const nextSlug = storySlugs[(storySlugs.indexOf(slug) + 1) % storySlugs.length] ?? storySlugs[0];
  const nextProduct = all.find((p) => p.slug === nextSlug);
  const nextName = nextProduct ? nextProduct.home.projectName || nextProduct.title.split(" - ")[0] : undefined;
  const nextIndex = storySlugs.indexOf(nextSlug) + 1;

  const meta = [
    ["CATEGORY", product.home.category],
    ["ROLE", product.home.role],
    ["STATUS", product.home.status],
    ["CHAPTER", inStory ? `${pad(storyIndex + 1)} / ${pad(storySlugs.length)}` : undefined],
  ].filter((m): m is [string, string] => Boolean(m[1]));

  return (
    <div className="case-page" style={{ ["--accent" as string]: inStory ? accent : INTRO_ACCENT }}>
      <ReadProgress />
      <SiteHeader variant="page" current="work" />
      <div className="case-bar">
        <BackToWork slug={inStory ? slug : undefined} />
        <span className="case-bar-label mono">CASE STUDY{inStory ? ` · ${pad(storyIndex + 1)}` : ""} — {name.toUpperCase()}</span>
        {links.length > 0 && (
          <span className="case-bar-links">
            {links.map((l) => <a key={l.url} className="bar-link" href={l.url} target="_blank" rel="noopener noreferrer">Open {l.label} ↗</a>)}
          </span>
        )}
      </div>

      <article className="case-content">
        <div className="mask"><span className="c-rise eyebrow mono" style={{ ["--d" as string]: 0 }}>{inStory ? `${pad(storyIndex + 1)} / ${CASE_DESIGN[storyIndex].eyebrow}` : product.home.category}</span></div>
        <h1 className="display case-title"><span className="mask" style={{ display: "block" }}><span className="c-rise" style={{ ["--d" as string]: 1 }}>{name}</span></span></h1>
        {headline && <p className="c-rise case-sub" style={{ ["--d" as string]: 2 }}>{headline}</p>}
        {product.frontPageText && <p className="c-rise case-lead" style={{ ["--d" as string]: 3 }}>{product.frontPageText}</p>}
        {product.tags.length > 0 && (
          <div className="c-rise case-tags" style={{ ["--d" as string]: 3 }}>
            {product.tags.map((t) => <span key={t} className="case-tag">{t.replace("Optmization", "Optimization")}</span>)}
          </div>
        )}
        {product.home.before && product.home.after && (
          <div className="c-rise shift" style={{ ["--d" as string]: 4 }}>
            <div><span className="shift-label mono">BEFORE</span><span className="shift-before">{product.home.before}</span></div>
            <span className="shift-arrow" aria-hidden="true">→</span>
            <div><span className="shift-label mono">NOW</span><span className="shift-now">{product.home.after}</span></div>
            {product.home.evidence && <div className="shift-result">{product.home.evidence}</div>}
          </div>
        )}
        {meta.length > 0 && (
          <div className="c-rise case-meta" style={{ ["--d" as string]: 4 }}>
            {meta.map(([label, value]) => (
              <div className="case-meta-item" key={label}><span className="case-meta-label mono">{label}</span><span className="case-meta-value">{value}</span></div>
            ))}
          </div>
        )}
        {image && (
          <div className="c-rise case-figure" style={{ ["--d" as string]: 5 }}>
            <Image className="case-img" src={image.url} alt={image.alt || name} width={image.width ?? 1600} height={image.height ?? 1000} sizes="(max-width: 1120px) 100vw, 1008px" priority />
          </div>
        )}

        {product.content && (
          <div className="case-body">
            <MarkdownWithEmbeds content={product.content} vimeoEmbeds={vimeoEmbeds} unstyled />
          </div>
        )}

        {nextName && nextSlug !== slug && (
          <NextCase slug={nextSlug} name={nextName} accent={accentFor(nextSlug)} label={`${pad(nextIndex)} — ${nextName.toUpperCase()}`} />
        )}
      </article>
    </div>
  );
}
