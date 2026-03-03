import { allPosts } from "@/app/lib/contentlayer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxRenderer } from "../components/Mdx";
import { ShareBar } from "../components/ShareBar";
import { format } from "date-fns";
import { baseURL } from "@/blog.config";
import Link from "next/link";

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
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = findPost(params.slug);
  if (!post) return undefined;

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      type: "article",
      publishedTime: post.date,
      url: `${baseURL}/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug);

  if (!post) return notFound();

  return (
    <section>
      <h1 className="text-2xl font-bold mb-1">{post.title}</h1>
      <div className="flex space-x-2 text-gray-500">
        <span>{format(new Date(post.date), "dd/MM/yy")}</span>
        <span className="font-bold">·</span>
        <span>{post.readingTime.text}</span>
      </div>

      {/* Post Content */}
      <article className="my-10 prose prose-invert">
        <MdxRenderer source={post.body.code} />
      </article>

      <ShareBar title={post.title} url={baseURL + post.url} />

      <div className="mt-4 text-gray-500 tracking-wider">
        <div className="space-x-1">
          <span className="font-light">&gt; </span>
          <Link
            href="/"
            className="text-gray-200 hover:underline hover:text-gray-50"
          >
            cd ..
          </Link>
        </div>
      </div>
    </section>
  );
}
