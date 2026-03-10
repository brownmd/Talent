import { allProjects } from "@/.contentlayer/generated";
import { Metadata } from "next";
import PostSection from "@/app/components/PostSection";

export const metadata: Metadata = {
  title: "Projects",
  description: "A list of my personal projects",
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
