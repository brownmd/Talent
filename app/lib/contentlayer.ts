// Safe contentlayer exports - provides empty arrays when contentlayer hasn't run
// In production builds, contentlayer generates the real data at build time

let _allPosts: any[] = [];
let _allProjects: any[] = [];
let _allAbouts: any[] = [];

try {
  const cl = require("@/.contentlayer/generated");
  _allPosts = cl.allPosts ?? [];
  _allProjects = cl.allProjects ?? [];
  _allAbouts = cl.allAbouts ?? [];
} catch {
  // contentlayer hasn't generated files yet (e.g. v0 preview)
}

export const allPosts = _allPosts;
export const allProjects = _allProjects;
export const allAbouts = _allAbouts;
