import { getProducts } from "@/lib/contentful";
import Nav from "@/components/Nav";
import FadeHeader from "@/components/FadeHeader";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen antialiased text-surface-foreground bg-primary/5">
      <Nav />
      <div className="pl-0 md:pl-20">
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <FadeHeader
              title="More Cases"
              subtitle="Every case study and experiment, in one place"
            />

            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
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
