import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getProjects, getStrapiImageUrl } from "@/lib/strapi";
import { Calendar, ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import BackButton from "./BackButton";
import FadeHeader from "@/components/FadeHeader";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MarkdownContent from "@/components/MarkdownContent";
import FormattedDate from "@/components/FormattedDate";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const coverImageUrl = getStrapiImageUrl(project.cover_image?.url);

  // Fetch all projects for related projects section
  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

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
                  {project.title}
                </h1>

                {project.excerpt && (
                  <div className="text-xl text-blue-100 mb-6">
                    <MarkdownContent
                      content={project.excerpt}
                      inline
                      className="text-blue-100"
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {project.publishedAt && (
                    <div className="flex items-center gap-2 text-sm text-blue-100">
                      <Calendar className="h-4 w-4" />
                      <FormattedDate dateString={project.publishedAt} />
                    </div>
                  )}
                  {/* Tags */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags
                        .split(",")
                        .map((tag: string, index: number) => (
                          <span
                            key={index}
                            className={`px-3 py-1 text-sm rounded-full font-medium backdrop-blur-md border ${
                              index % 2 === 0
                                ? "bg-indigo-400/20 text-white border-white/20"
                                : "bg-violet-400/20 text-white border-white/20"
                            }`}
                          >
                            {tag.trim()}
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
                      alt={project.title}
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
          {project.content ? (
            <section className="mb-16">
              <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
                <MarkdownContent
                  content={project.content}
                  className="text-slate-700"
                />
              </div>
            </section>
          ) : null}
        </article>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="bg-indigo-50 py-24">
            <div className="mx-auto max-w-6xl px-6">
              <FadeHeader
                title="Related Projects"
                subtitle="Explore more of my work"
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
                {relatedProjects.map((relatedProject) => {
                  const relatedImageUrl = getStrapiImageUrl(
                    relatedProject.cover_image?.url
                  );
                  return (
                    <Link
                      key={relatedProject.slug}
                      href={`/products/${relatedProject.slug}`}
                      className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-700">
                        {relatedImageUrl ? (
                          <Image
                            src={relatedImageUrl}
                            alt={relatedProject.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-white/10 [mask-image:radial-gradient(40%_40%_at_30%_20%,black,transparent)]" />
                      </div>
                      <div className="p-4">
                        <h3 className="mb-2 text-sm font-semibold text-slate-900 line-clamp-2">
                          {relatedProject.title}
                        </h3>
                        {relatedProject.excerpt && (
                          <div className="mb-3 line-clamp-2 text-xs text-slate-600">
                            <MarkdownContent
                              content={relatedProject.excerpt}
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
