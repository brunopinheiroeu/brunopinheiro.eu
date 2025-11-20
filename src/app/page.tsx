import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import HashScrollHandler from "@/components/HashScrollHandler";
import { getProducts } from "@/lib/contentful";

// Mark page as dynamic since it fetches data from Strapi
export const dynamic = "force-dynamic";

export default async function Page() {
  // Fetch products from Strapi backend
  const products = await getProducts();

  return (
    <div className="min-h-screen antialiased text-slate-900">
      <HashScrollHandler />
      <Nav />
      <div className="pl-20">
        <Hero />
        <Products products={products} />
        <Experience />
        <Skills />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
