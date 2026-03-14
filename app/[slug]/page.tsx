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

  return (
    <section>
      <h1 className="text-2xl font-bold mb-1">{post.title}</h1>
      <div className="flex space-x-2 text-[var(--fg-subtle)]">
        <span>{format(new Date(post.date), "MM/dd/yyyy")}</span>
        <span className="font-bold">·</span>
        <span>{post.readingTime.text}</span>
      </div>

      {/* Post Content */}
      <article className="my-10 prose prose-invert">
        <MdxRenderer source={post.body.code} />
      </article>

      <ShareBar title={post.title} url={baseURL + post.url} />
    </section>
  );
}
