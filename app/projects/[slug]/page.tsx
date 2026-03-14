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

  return (
    <section>
      <span className="font-medium text-sm text-[var(--fg-faint)]">Project</span>
      <h2 className="text-2xl font-bold">{project.title}</h2>
      <article className="mt-10 prose prose-invert">
        <MdxRenderer source={project.body.code} />
      </article>
    </section>
  );
}
