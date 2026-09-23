import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductBySlug, getProducts } from "@/lib/contentful";
import { getToolItems } from "@/lib/toolIcons";
import { extractLoneVimeoUrls, getVimeoEmbeds } from "@/lib/vimeo";
import Nav from "@/components/Nav";
// import BackButton from "./BackButton";
import FadeHeader from "@/components/FadeHeader";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MarkdownWithEmbeds from "@/components/MarkdownWithEmbeds";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mark page as dynamic since it fetches data from Contentful
export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const homeImage = product.home.image;
  const toolItems = getToolItems(product.tools);

  // Server-side, cached lookup of any lone Vimeo URLs in the case body so
  // MarkdownWithEmbeds can swap them for a real player (see lib/vimeo.ts).
  const vimeoUrls = product.content ? extractLoneVimeoUrls(product.content) : [];
  const vimeoEmbeds = vimeoUrls.length ? await getVimeoEmbeds(vimeoUrls) : {};

  // Fetch all projects for the case index section
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen antialiased text-surface-foreground bg-primary/5">
      <Nav />
      <div className="pl-0 md:pl-20">
        {/* Hero Header Section */}
        <header className="relative overflow-hidden bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end py-16 text-white">
          {/* Angled overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 1000 1000" className="h-full w-full">
              <polygon fill="white" points="0,0 1000,300 1000,1000 0,700" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6">
            {/* <BackButton
              href="/#products"
              sectionId="products"
              className="inline-flex items-center gap-2 mb-8 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
            /> */}

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div>
                <h1 className="text-4xl text-transform: uppercase font-extrabold mb-4 md:text-5xl">
                  {product.title}
                </h1>

                {product.frontPageText && (
                  <div className="text-xl text-highlight mb-6">
                    <MarkdownWithEmbeds
                      content={product.frontPageText}
                      inline
                      className="text-highlight"
                    />
                  </div>
                )}

                {product.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {product.tags.map((tag: string, index: number) => (
                      <span
                        key={`${tag}-${index}`}
                        className={`px-3 py-1 text-sm rounded-full font-medium backdrop-blur-md border ${
                          index % 2 === 0
                            ? "bg-primary/20 text-white border-white/20"
                            : "bg-secondary/20 text-white border-white/20"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {toolItems.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
                      Tools &amp; Stack
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {toolItems.map((tool) =>
                        tool.Icon ? (
                          <tool.Icon
                            key={tool.key}
                            className="h-8 w-8 text-white"
                          />
                        ) : (
                          <span
                            key={tool.key}
                            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white"
                          >
                            {tool.label}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Home · Product image - stands on its own, no frame/box */}
              {homeImage && (
                <div className="mx-auto w-full max-w-xs md:mx-0 md:ml-auto md:max-w-none">
                  <Image
                    src={homeImage.url}
                    alt={homeImage.alt || product.title}
                    width={homeImage.width ?? 900}
                    height={homeImage.height ?? 1200}
                    className="h-auto w-full"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Section */}
        <article className="mx-auto max-w-5xl px-6 py-8">
          {product.content ? (
            <section className="mb-10">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8 md:p-12">
                <MarkdownWithEmbeds
                  content={product.content}
                  className="text-surface-foreground/80"
                  vimeoEmbeds={vimeoEmbeds}
                />
              </div>
            </section>
          ) : null}
        </article>

        {/* More Cases Section */}
        {relatedProducts.length > 0 && (
          <section className="bg-primary/5 py-16">
            <div className="mx-auto max-w-6xl px-6">
              <FadeHeader title="More Cases" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.slug} product={relatedProduct} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
