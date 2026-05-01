import Link from "next/link";

interface CardProps {
  title: string;
  slug: string;
  date: string;
  basePath?: string;
}

const Card = (props: CardProps) => {
  const { title, slug, date, basePath = "" } = props;
  const isArticleCard = basePath === "";

  return (
    <Link
      className={`justify-between py-2 flex group transition-colors duration-200 ${
        isArticleCard
          ? "hover:text-[var(--accent-clay)]"
          : "hover:text-[var(--fg)]"
      }`}
      href={`${basePath}/${slug}`}
      aria-label={`Read article: ${title}`}
    >
      <h2 className="overflow-hidden whitespace-nowrap text-ellipsis">
        {title}
      </h2>
      <span
        className={`text-[var(--fg-subtle)] transition-colors duration-150 ml-3 flex-shrink-0 ${
          isArticleCard
            ? "group-hover:text-[var(--accent-clay-soft)]"
            : "group-hover:text-[var(--fg)]"
        }`}
      >
        {date}
      </span>
    </Link>
  );
};

export default Card;
