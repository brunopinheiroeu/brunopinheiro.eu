import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/contentful";
import Nav from "@/components/Nav";
import FadeHeader from "@/components/FadeHeader";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MarkdownWithEmbeds from "@/components/MarkdownWithEmbeds";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen antialiased text-surface-foreground bg-primary/5">
      <Nav />
      <div className="pl-0 md:pl-20">
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <FadeHeader
              title="All Projects"
              subtitle="Every case study and experiment, in one place"
            />

            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => {
                  const imageUrl =
                    product.home.image?.url ?? product.coverImage?.url;
                  const imageAlt =
                    product.home.image?.alt ||
                    product.coverImage?.alt ||
                    product.title;

                  return (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary to-secondary">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="mb-1 text-base font-semibold text-surface-foreground">
                          {product.home.projectName || product.title}
                        </h3>
                        {product.home.category && (
                          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                            {product.home.category}
                          </p>
                        )}
                        {product.frontPageText && (
                          <div className="mb-3 line-clamp-2 text-sm text-muted">
                            <MarkdownWithEmbeds
                              content={product.frontPageText}
                              inline
                              className="text-muted"
                            />
                          </div>
                        )}
                        <div className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:text-secondary">
                          Case Study <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="mt-12 rounded-2xl border border-dashed border-primary/20 bg-white/60 p-10 text-center shadow-inner">
                <p className="text-lg font-semibold text-surface-foreground">
                  No projects published yet
                </p>
              </div>
            )}
          </div>
        </section>

        <Contact />
        <Footer />
      </div>
    </div>
  );
}
