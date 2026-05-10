import { allPosts, allProjects } from "@/.contentlayer/generated";
import { CONFIG } from "@/blog.config";
import { MetadataRoute } from "next";

function toIsoDate(value?: string) {
  if (!value) return new Date().toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = (allPosts ?? [])
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${CONFIG.baseURL}/${post.slug}`,
      lastModified: toIsoDate(post.date),
    }));

  const projects = (allProjects ?? []).map((project) => ({
    url: `${CONFIG.baseURL}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["", "/about", "/projects"].map((route) => ({
    url: `${CONFIG.baseURL}${route}`,
    lastModified: new Date().toISOString(),
    priority: 1,
  }));

  return [...routes, ...posts, ...projects];
}
