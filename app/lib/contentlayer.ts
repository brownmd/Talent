let _allPosts: any[] = [];
let _allProjects: any[] = [];
let _allAbouts: any[] = [];

try {
  const generated = require("@/.contentlayer/generated");
  _allPosts = generated.allPosts ?? [];
  _allProjects = generated.allProjects ?? [];
  _allAbouts = generated.allAbouts ?? [];
} catch {
  // contentlayer not built yet (e.g. in v0 preview)
}

export const allPosts = _allPosts;
export const allProjects = _allProjects;
export const allAbouts = _allAbouts;
