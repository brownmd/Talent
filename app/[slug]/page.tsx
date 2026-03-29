import { allPosts } from "@/.contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxRenderer } from "../components/Mdx";
import { ShareBar } from "../components/ShareBar";
import { format } from "date-fns";
import { baseURL } from "@/blog.config";

function findPost(slug: string) {
  return (allPosts ?? []).find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return (allPosts ?? []).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return undefined;

  const description: string | undefined = (post as any).description ?? undefined;
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      url: `${baseURL}/${post.slug}`,
      images: [
        {
          url: `${baseURL}/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [`${baseURL}/${post.slug}/opengraph-image`],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: "David Brown", url: baseURL + "/about" },
    publisher: { "@type": "Person", name: "David Brown", url: baseURL },
    url: baseURL + post.url,
    description: (post as any).description ?? "",
    mainEntityOfPage: { "@type": "WebPage", "@id": baseURL + post.url },
  };

  return (
    <section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-2xl font-bold mb-1">{post.title}</h1>
      <div className="flex space-x-2 text-[var(--fg-subtle)]">
        <span>{format(new Date(post.date), "MM/dd/yyyy")}</span>
        <span className="font-bold">·</span>
        <span>{post.readingTime.text}</span>
      </div>

      {/* Post Content */}
      <article className="my-10 prose prose-invert prose-headings:font-bold prose-a:underline prose-a:underline-offset-4 prose-blockquote:border-l-4 prose-blockquote:border-[var(--fg)] prose-blockquote:bg-[var(--separator)] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded prose-blockquote:not-italic prose-table:text-center prose-th:font-bold prose-th:text-lg prose-td:text-sm prose-td:text-[var(--fg-muted)] prose-hr:border-[var(--border)] max-w-none">
        <MdxRenderer source={post.body.code} />
      </article>

      <ShareBar title={post.title} url={baseURL + post.url} />
    </section>
  );
}
