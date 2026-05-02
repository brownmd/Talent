import { allProjects } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { MdxRenderer } from "@/app/components/Mdx";
import type { Metadata } from "next";
import { CONFIG } from "@/blog.config";

function findProject(slug: string) {
  return (allProjects ?? []).find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return (allProjects ?? []).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return undefined;

  const description: string | undefined = (project as any).description ?? undefined;
  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: `${CONFIG.baseURL}/projects/${project.slug}`,
      images: [
        {
          url: `${CONFIG.baseURL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [`${CONFIG.baseURL}/opengraph-image`],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    datePublished: project.date,
    author: { "@type": "Person", name: "David Brown", url: `${CONFIG.baseURL}/about` },
    url: `${CONFIG.baseURL}/projects/${project.slug}`,
    description: (project as any).description ?? "",
  };
  const projectDescription: string | undefined = (project as any).description ?? undefined;

  return (
    <section className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header>
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--fg-faint)]">Project</p>
        <h1 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">{project.title}</h1>
        {projectDescription ? (
          <p className="mt-3 text-sm text-[var(--fg-muted)] md:text-base">{projectDescription}</p>
        ) : null}
      </header>

      <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:tracking-tight prose-h2:border-b prose-h2:border-[var(--border)] prose-h2:pb-2 prose-h3:text-[var(--fg)] prose-p:text-[var(--fg-muted)] prose-strong:text-[var(--fg)] prose-a:text-[var(--fg)] prose-a:underline-offset-4 hover:prose-a:text-[var(--fg-muted)] prose-hr:border-[var(--separator)] prose-blockquote:border-l-[var(--separator)] prose-blockquote:text-[var(--fg-muted)] prose-li:marker:text-[var(--fg-faint)] prose-th:border prose-th:border-[var(--separator)] prose-th:bg-[rgba(255,255,255,0.04)] prose-th:px-3 prose-th:py-2 prose-td:border prose-td:border-[var(--separator)] prose-td:px-3 prose-td:py-2">
        <MdxRenderer source={project.body.code} />
      </article>
    </section>
  );
}
