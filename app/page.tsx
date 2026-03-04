import { allPosts } from "@/.contentlayer/generated";
import { organizeAndSortPosts } from "./lib/getPosts";
import PostSection from "./components/PostSection";

const Home = () => {
  const postsArray = organizeAndSortPosts(allPosts ?? []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">The Talent Operator</h1>
      {postsArray.map((yearPosts) => {
        const year = Object.keys(yearPosts)[0];
        const posts = yearPosts[year];

        return <PostSection year={year} posts={posts} key={year} />;
      })}
    </>
  );
};

export default Home;
