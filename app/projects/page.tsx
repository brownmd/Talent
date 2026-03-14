import { allProjects } from "@/.contentlayer/generated";
import { Metadata } from "next";
import PostSection from "@/app/components/PostSection";
import { CONFIG } from "@/blog.config";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore talent acquisition tools, AI recruiting systems, and HR technology projects built by The Talent Operator.",
  openGraph: {
    title: `Projects | ${CONFIG.title}`,
    description:
      "Explore talent acquisition tools, AI recruiting systems, and HR technology projects built by The Talent Operator.",
    url: `${CONFIG.baseURL}/projects`,
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
    title: `Projects | ${CONFIG.title}`,
    description:
      "Explore talent acquisition tools, AI recruiting systems, and HR technology projects built by The Talent Operator.",
    images: [`${CONFIG.baseURL}/opengraph-image`],
  },
  alternates: {
    canonical: `${CONFIG.baseURL}/projects`,
  },
};

type Project = {
  title: string;
  date: string;
  slug: string;
  url: string;
  body: { code: string };
};

function organizeAndSortProjects(
  projects: Project[]
): { [year: string]: Project[] }[] {
  const organized = projects.reduce(
    (acc: { [year: string]: Project[] }, project: Project) => {
      const year = new Date(project.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(project);
      return acc;
    },
    {}
  );

  return Object.entries(organized)
    .map(([year, projects]) => ({
      [year]: projects.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    }))
    .sort((a, b) => parseInt(Object.keys(b)[0]) - parseInt(Object.keys(a)[0]));
}

const Page = () => {
  const projectsArray = organizeAndSortProjects(
    (allProjects ?? []) as unknown as Project[]
  );

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      {projectsArray.map((yearProjects) => {
        const year = Object.keys(yearProjects)[0];
        const projects = yearProjects[year];

        return (
          <PostSection
            year={year}
            posts={projects}
            basePath="/projects"
            key={year}
          />
        );
      })}
    </>
  );
};

export default Page;
