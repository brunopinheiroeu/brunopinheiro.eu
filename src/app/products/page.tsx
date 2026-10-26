import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/contentful";
import SiteHeader from "@/components/site/SiteHeader";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "All case studies — Bruno Pinheiro",
  description: "Every case study and experiment by Bruno Pinheiro, in one place.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="case-page">
      <SiteHeader variant="page" current="work" />
      <main className="case-content">
        <span className="eyebrow mono">Index</span>
        <h1 className="display case-title">All cases</h1>
        <p className="case-lead">Every case study and experiment, in one place.</p>
        <div className="all-cases">
          {products.map((p) => {
            const image = p.home.image || p.coverImage;
            const name = p.home.projectName || p.title.split(" - ")[0];
            return (
              <Link key={p.slug} href={`/products/${p.slug}`} className="case-card">
                {image && <Image src={image.url} alt={image.alt || name} width={image.width ?? 800} height={image.height ?? 600} sizes="(max-width: 640px) 100vw, 360px" />}
                <span className="eyebrow mono" style={{ marginBottom: 0 }}>{p.home.category}</span>
                <span className="case-card-title">{name}</span>
                <span className="case-card-text">{p.home.headline || p.frontPageText}</span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
