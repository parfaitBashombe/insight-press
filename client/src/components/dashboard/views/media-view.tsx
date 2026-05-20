import { useEffect, useState } from "react";
import { FaFeatherAlt } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { getMyArticles } from "@/lib/api/writer";
import type { Article } from "@/types/writer";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const MediaView = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyArticles(1, 50)
      .then((res) => setArticles(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const withCovers = articles.filter((a) => !!a.cover_image);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-white font-bold text-lg font-playfair">Article Covers</h3>
            <p className="text-white/25 text-xs mt-0.5">
              Cover images from your articles — add them via the editor.
            </p>
          </div>
          {!loading && withCovers.length > 0 && (
            <span className="text-white/25 text-xs">{withCovers.length} image{withCovers.length !== 1 ? "s" : ""}</span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : withCovers.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/4 flex items-center justify-center">
              <FaFeatherAlt size={24} className="text-white/10" />
            </div>
            <div>
              <p className="text-white/30 text-sm font-medium mb-1">No cover images yet</p>
              <p className="text-white/15 text-xs max-w-xs mx-auto leading-relaxed">
                Add a cover image URL when writing or editing an article and it will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {withCovers.map((article) => (
              <div
                key={article.article_id}
                className="group relative bg-[#1a1a1a] border border-white/8 rounded-xl overflow-hidden hover:border-amber-400/30 transition-all duration-300"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={article.cover_image!}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget.closest(".group") as HTMLElement)?.remove(); }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={article.cover_image!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-amber-400 hover:text-[#0C0C0C] text-white flex items-center justify-center transition-colors cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaArrowUpRightFromSquare size={12} />
                    </a>
                  </div>
                </div>
                <div className="p-3 border-t border-white/8 bg-white/2">
                  <p className="text-white/80 text-xs font-semibold truncate mb-0.5" title={article.title}>
                    {article.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-white/30 text-[10px]">{formatDate(article.createdAt)}</p>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        article.status === "PUBLISHED"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-white/5 text-white/25"
                      }`}
                    >
                      {article.status === "PUBLISHED" ? "Live" : "Draft"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coming soon note */}
      <div className="bg-white/2 border border-white/6 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-white/4 flex items-center justify-center shrink-0">
          <FaFeatherAlt size={11} className="text-amber-400/40" />
        </div>
        <p className="text-white/20 text-xs leading-relaxed">
          File uploads and a full media library with cloud storage are coming in a future update.
        </p>
      </div>
    </div>
  );
};
