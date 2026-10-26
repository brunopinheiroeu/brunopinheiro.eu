import Link from "next/link";
import { getProducts } from "@/lib/contentful";
import { buildChapters } from "@/lib/story";
import StoryExperience from "@/components/story/StoryExperience";

export const dynamic = "force-dynamic";

export default async function Page() {
  const chapters = buildChapters(await getProducts());

  return (
    <>
      <StoryExperience chapters={chapters} />
      <nav className="sr-only" aria-label="Case studies">
        <ul>
          {chapters.map((c) => (
            <li key={c.slug}><Link href={`/products/${c.slug}`}>{c.name} — {c.headline}</Link></li>
          ))}
          <li><Link href="/about">About Bruno Pinheiro</Link></li>
          <li><Link href="/products">All case studies</Link></li>
        </ul>
      </nav>
    </>
  );
}
