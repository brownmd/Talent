import { allAbouts } from "@/.contentlayer/generated";
import { MdxRenderer } from "../components/Mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONFIG } from "@/blog.config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the talent operator behind this site — a decade-plus of experience in talent acquisition, recruiting strategy, and HR technology.",
  openGraph: {
    title: `About | ${CONFIG.title}`,
    description:
      "Learn about the talent operator behind this site — a decade-plus of experience in talent acquisition, recruiting strategy, and HR technology.",
    url: `${CONFIG.baseURL}/about`,
    siteName: CONFIG.title,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${CONFIG.baseURL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: CONFIG.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${CONFIG.title}`,
    description:
      "Learn about the talent operator behind this site — a decade-plus of experience in talent acquisition, recruiting strategy, and HR technology.",
    images: [`${CONFIG.baseURL}/opengraph-image`],
  },
  alternates: {
    canonical: `${CONFIG.baseURL}/about`,
  },
};
const About = () => {
  const about = (allAbouts ?? [])[0];
  if (!about) return notFound();
  return (
    <article className="prose prose-invert mt-10">
      <MdxRenderer source={about.body.code} />
    </article>
  );
};

export default About;
