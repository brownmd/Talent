type Post = {
  title: string;
  date: string;
  slug: string;
  url: string;
  readingTime?: { text: string };
  body: { code: string };
  draft?: boolean;
};
import { format } from "date-fns";
import Card from "./Card";

const PostSection = ({
  posts,
  year,
  basePath = "",
}: {
  posts: Post[];
  year: string;
  basePath?: string;
}) => {
  const isArticleSection = basePath === "";

  return (
    <div className="mt-10">
      <span
        className={`font-bold ${
          isArticleSection ? "text-[var(--accent-clay-soft)]" : "text-[var(--fg)]"
        }`}
      >
        {year}
      </span>
      <div className="group/section">
        <div className="group-hover/section:text-[var(--fg-subtle)]">
          {posts.map((post: Post) => {
            let postDate = format(new Date(post.date), "MMMM do");
            return (
              <Card
                title={post.title}
                date={postDate}
                slug={post.slug}
                basePath={basePath}
                key={post.slug}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostSection;
