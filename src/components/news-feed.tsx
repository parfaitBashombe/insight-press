"use client";

import { useEffect, useState } from "react";
import { Article } from "@/types/news";
import ArticleCard from "./article-card";

export default function NewsFeed({ query, limit }: { query: string; limit?: number }) {
  const [data, setData] = useState<Article[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      setData([]);
      try {
        const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);
        if (!res.ok) {
          throw new Error("Failed to fetch news from local API");
        }
        const json = await res.json();
        if (!isSubscribed) return;
        
        if (json.status === "error") {
            setError(json.results?.message || "Error from NewsData API");
        } else {
            setData(json.results || []);
            setNextPage(json.nextPage || null);
        }
      } catch (err: unknown) {
        if (isSubscribed) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };

    fetchNews();
    return () => { isSubscribed = false; };
  }, [query]);

  const loadMore = async () => {
    if (!nextPage) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/news?q=${encodeURIComponent(query)}&page=${encodeURIComponent(nextPage)}`);
      if (!res.ok) throw new Error("Failed to fetch more news");
      const json = await res.json();
      
      if (json.status !== "error") {
          setData(prev => [...prev, ...(json.results || [])]);
          setNextPage(json.nextPage || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-8 py-8 animate-pulse">
        {[...Array(limit || 4)].map((_, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-6 h-48 border-b border-[#e5e0d8] pb-8">
             <div className="flex-1 flex flex-col space-y-4">
                <div className="h-4 bg-[#e5e0d8] rounded w-1/4"></div>
                <div className="h-8 bg-[#e5e0d8] rounded w-3/4"></div>
                <div className="h-4 bg-[#e5e0d8] rounded w-full"></div>
             </div>
             <div className="w-full md:w-2/5 h-full bg-[#e5e0d8] rounded-sm"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block p-6 bg-[#f4ece3] rounded-sm border border-[#e5e0d8]">
          <h3 className="text-accent text-lg font-serif font-semibold">{error}</h3>
          <p className="text-[#5c5853] mt-2 font-sans">Please check your API key or network connection.</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-[#8c857d] text-xl font-serif italic">No stories found for &quot;{query}&quot;</h3>
      </div>
    );
  }

  const articlesToDisplay = limit ? data.slice(0, limit) : data;

  return (
    <div className="flex flex-col py-4">
      {articlesToDisplay.map((article, i) => (
        <ArticleCard key={article.article_id || `${article.link}-${i}`} article={article} />
      ))}
      
      {!limit && nextPage && (
        <div className="mt-12 mb-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="border border-foreground text-foreground px-8 py-4 font-sans uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
