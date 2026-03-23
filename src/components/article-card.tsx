import { Article } from "@/types/news";
import Link from "next/link";

const ArticleCard = ({ article }: { article: Article }) => {
  const imageUrl =
    article.image_url ||
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  // If there's no unique article ID, fallback to encoding the link so it doesn't crash,
  // but Newsdata API should usually provide article_id.
  const articleHref = article.article_id
    ? `/news/${article.article_id}`
    : article.link;

  return (
    <article className="flex flex-col bg-transparent group py-6 border-b border-[#e5e0d8] last:border-b-0 h-full">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs text-[#8c857d] mb-3 font-sans tracking-widest uppercase">
              <span className="font-semibold text-accent">
                {article.category?.[0] || "TOPIC"}
              </span>
              <span>•</span>
              <time>{formatDate(article.pubDate)}</time>
            </div>
            <Link href={articleHref}>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4 group-hover:text-accent transition-colors duration-300">
                {article.title}
              </h3>
            </Link>
            <p className="text-[#5c5853] font-sans line-clamp-3 text-[15px] leading-relaxed mb-6">
              {article.description ||
                article.content ||
                "Read the full story to discover more insights and details on this topic."}
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-sans text-[#8c857d]">
            <span className="font-medium text-foreground">
              {article.source_id.toUpperCase()}
            </span>
            {article.creator?.[0] && (
              <>
                <span className="opacity-50">|</span>
                <span>By {article.creator[0]}</span>
              </>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/5 aspect-4/3 md:aspect-auto overflow-hidden relative rounded-sm shadow-sm">
          <Link
            href={articleHref}
            className="absolute inset-0 z-10 block"
            aria-label={`Read ${article.title}`}
          ></Link>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            }}
          />
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
