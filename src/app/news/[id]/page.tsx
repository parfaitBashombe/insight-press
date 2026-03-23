import { Article, NewsResponse } from "@/types/news";
import Navbar from "@/components/navbar";
import { notFound } from "next/navigation";

const getArticle = async (id: string): Promise<Article | null> => {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${apiKey}&id=${id}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) return null;

    const data: NewsResponse = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  const imageUrl =
    article.image_url ||
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric", // e.g. January 1, 2026
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <article className="w-10/12 mx-auto py-16 md:py-24">
        {/* Article Meta */}
        <div className="flex items-center justify-center space-x-3 text-sm text-accent mb-6 font-sans tracking-widest uppercase font-semibold">
          <span>{article.category?.[0] || "TOPIC"}</span>
          <span className="text-[#e5e0d8]">•</span>
          <span>{article.source_id.toUpperCase()}</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center leading-tight mb-8">
          {article.title}
        </h1>

        {/* Article Byline */}
        <div className="flex flex-col items-center justify-center space-y-2 text-[#8c857d] font-sans mb-12">
          {article.creator?.[0] && (
            <span className="font-medium text-foreground">
              By {article.creator[0]}
            </span>
          )}
          <time>{formatDate(article.pubDate)}</time>
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-video rounded-sm overflow-hidden mb-12 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-stone dark:prose-invert max-w-none font-serif text-[#2d2a26] leading-relaxed">
          <p className="text-lg md:text-xl font-medium text-[#5c5853] mb-8 leading-relaxed">
            {article.description}
          </p>

          {article.content && article.content !== article.description ? (
            <div className="whitespace-pre-wrap">{article.content}</div>
          ) : (
            <p className="italic text-[#8c857d] my-12 text-center">
              The full story text is not provided by this news source.
            </p>
          )}

          <div className="mt-16 pt-8 border-t border-[#e5e0d8] flex justify-center">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-foreground text-foreground px-8 py-4 font-sans uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Read Original Source
            </a>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 border-t border-[#e5e0d8] text-center mt-20">
        <p className="font-sans text-xs uppercase tracking-widest text-[#8c857d]">
          © 2026 Insight Press. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Page;
