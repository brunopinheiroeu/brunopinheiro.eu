import type { Metadata } from "next";
import { getProducts } from "@/lib/contentful";
import { buildChapters } from "@/lib/story";
import AboutExperience from "@/components/story/AboutExperience";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About — Bruno Pinheiro",
  description: "Lead Product Designer and Design Engineer connecting product strategy, user experience, and development.",
};

export default async function AboutPage() {
  const chapters = buildChapters(await getProducts()).map((c) => ({ slug: c.slug, name: c.name }));
  return <AboutExperience chapters={chapters} />;
}
