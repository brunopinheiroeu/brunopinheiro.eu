import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/lib/contentful";
import { mapTools } from "@/lib/toolIcons";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import BackButton from "./BackButton";
import FadeHeader from "@/components/FadeHeader";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MarkdownContent from "@/components/MarkdownContent";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mark page as dynamic since it fetches data from Strapi
export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const coverImageUrl = product.coverImage?.url;
  const { icons: toolIcons, labels: toolLabels } = mapTools(product.tools);

  // Fetch all projects for related projects section
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen antialiased text-slate-900 bg-indigo-50">
      <Nav />
      <div className="pl-20">
        {/* Hero Header Section */}
        <header className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700 py-16 text-white">
          {/* Angled overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 1000 1000" className="h-full w-full">
              <polygon fill="white" points="0,0 1000,300 1000,1000 0,700" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <BackButton
              href="/#products"
              sectionId="products"
              className="inline-flex items-center gap-2 mb-8 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
            />

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div>
                <h1 className="text-4xl text-transform: uppercase font-extrabold mb-4 md:text-5xl">
                  {product.title}
                </h1>

                {product.frontPageText && (
                  <div className="text-xl text-blue-100 mb-6">
                    <MarkdownContent
                      content={product.frontPageText}
                      inline
                      className="text-blue-100"
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string, index: number) => (
                        <span
                          key={`${tag}-${index}`}
                          className={`px-3 py-1 text-sm rounded-full font-medium backdrop-blur-md border ${
                            index % 2 === 0
                              ? "bg-indigo-400/20 text-white border-white/20"
                              : "bg-violet-400/20 text-white border-white/20"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {(toolIcons.length > 0 || toolLabels.length > 0) && (
                    <div className="flex flex-wrap gap-3">
                      {toolIcons.map((Icon, idx) => (
                        <span
                          key={`hero-tool-icon-${idx}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10"
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </span>
                      ))}
                      {toolLabels.map((label) => (
                        <span
                          key={`hero-tool-label-${label}`}
                          className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Image - 50% size, vertical layout */}
              {coverImageUrl && (
                <div className="w-full max-w-md mx-auto md:mx-0">
                  <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-indigo-500 to-violet-700 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={coverImageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-white/5 [mask-image:radial-gradient(40%_40%_at_30%_20%,black,transparent)]" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Section */}
        <article className="mx-auto max-w-5xl px-6 py-12">
          {(toolIcons.length > 0 || toolLabels.length > 0) && (
            <section className="mb-10">
              <div className="rounded-2xl bg-indigo-600/5 p-6 shadow-inner border border-indigo-100">
                <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-indigo-700">
                  Tools & Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {toolIcons.map((Icon, idx) => (
                    <span
                      key={`body-tool-icon-${idx}`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-200 bg-white shadow-sm"
                    >
                      <Icon className="h-5 w-5 text-indigo-600" />
                    </span>
                  ))}
                  {toolLabels.map((label) => (
                    <span
                      key={`body-tool-label-${label}`}
                      className="rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {product.content ? (
            <section className="mb-16">
              <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
                <MarkdownContent
                  content={product.content}
                  className="text-slate-700"
                />
              </div>
            </section>
          ) : null}
        </article>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="bg-indigo-50 py-24">
            <div className="mx-auto max-w-6xl px-6">
              <FadeHeader
                title="Related Products"
                subtitle="Explore more of my work"
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
                {relatedProducts.map((relatedProduct) => {
                  const relatedImageUrl = relatedProduct.coverImage?.url;
                  return (
                    <Link
                      key={relatedProduct.slug}
                      href={`/products/${relatedProduct.slug}`}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-700">
                        {relatedImageUrl ? (
                          <Image
                            src={relatedImageUrl}
                            alt={relatedProduct.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-white/10 [mask-image:radial-gradient(40%_40%_at_30%_20%,black,transparent)]" />
                      </div>
                      <div className="p-4">
                        <h3 className="mb-2 text-sm font-semibold text-slate-900 line-clamp-2">
                          {relatedProduct.title}
                        </h3>
                        {relatedProduct.frontPageText && (
                          <div className="mb-3 line-clamp-2 text-xs text-slate-600">
                            <MarkdownContent
                              content={relatedProduct.frontPageText}
                              inline
                              className="text-slate-600"
                            />
                          </div>
                        )}
                        <div className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 group-hover:text-violet-700">
                          View Project <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
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
