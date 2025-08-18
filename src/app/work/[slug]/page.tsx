import Link from "next/link";
import { notFound } from "next/navigation";

const projects = {
  "bua-na-cainte": {
    title: "Bua na Cainte",
    subtitle: "UI + Design System · EdTech",
  },
  "vr-showroom": {
    title: "VR Showroom",
    subtitle: "3D/Realtime · Digital Twin",
  },
} as const;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Next 15: params é Promise
  const meta = projects[slug as keyof typeof projects];
  if (!meta) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">{meta.title}</h1>
        <p className="text-sm text-zinc-600 mt-1">{meta.subtitle}</p>
        {/* Placeholder cover */}
        <div className="mt-6 h-48 w-full rounded-lg bg-zinc-200" />
      </header>

      {/* Problem */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Problem</h2>
        <p className="mt-2 text-zinc-700">
          Context, constraints, stakeholders.
        </p>
      </section>

      {/* Goal & Success Criteria */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Goal &amp; Success Criteria</h2>
        <p className="mt-2 text-zinc-700">What “good” meant.</p>
      </section>

      {/* Process */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Process</h2>
        <div className="mt-2 space-y-3 text-zinc-700">
          <p>
            <strong>Research:</strong> …
          </p>
          <p>
            <strong>Design:</strong> …
          </p>
          <p>
            <strong>Execution:</strong> …
          </p>
        </div>
      </section>

      {/* AI Assist */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">AI Assist</h2>
        <p className="mt-2 text-zinc-700">Tools, automation, scripts used.</p>
      </section>

      {/* Solution */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Solution</h2>
        <p className="mt-2 text-zinc-700">Final deliverables + visuals.</p>
        {/* Placeholder gallery */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="h-24 bg-zinc-200 rounded" />
          <div className="h-24 bg-zinc-200 rounded" />
        </div>
      </section>

      {/* Impact */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold">Impact</h2>
        <ul className="mt-2 list-disc list-inside text-zinc-700">
          <li>Metric/result</li>
          <li>Feedback/testimonial</li>
        </ul>
      </section>

      {/* Reflection */}
      <section className="mb-4">
        <h2 className="text-xl font-semibold">Reflection</h2>
        <p className="mt-2 text-zinc-700">Lessons and improvements.</p>
      </section>

      {/* Back link */}
      <div className="mt-8">
        <Link
          href="/#work"
          className="text-sm underline text-zinc-600 hover:text-zinc-800"
        >
          ← Back to Work
        </Link>
      </div>
    </article>
  );
}
