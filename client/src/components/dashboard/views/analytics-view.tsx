import { useState, useEffect } from "react";
import { FaBookOpen, FaEye, FaClock, FaFeatherAlt, FaArrowRight } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { useWriter } from "@/lib/context/writer-context";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const AnalyticsView = () => {
  const { stats, articles, loaded, ensure, reload } = useWriter();
  const [reloading, setReloading] = useState(false);

  useEffect(() => { ensure(); }, [ensure]);

  const published = articles.filter((a) => a.status === "PUBLISHED");
  const drafts = articles.filter((a) => a.status === "DRAFT");
  const total = stats?.articles.total ?? 0;
  const publishRate = total > 0 ? Math.round((published.length / total) * 100) : 0;

  const statCards = [
    { label: "Total Articles", value: stats?.articles.total ?? 0, icon: <FaBookOpen size={15} />, color: "#E8A838" },
    { label: "Published", value: stats?.articles.published ?? 0, icon: <FaEye size={15} />, color: "#3DBDA7" },
    { label: "Drafts", value: stats?.articles.drafts ?? 0, icon: <FaClock size={15} />, color: "#5B8DEF" },
  ];

  const handleReload = async () => {
    setReloading(true);
    await reload();
    setReloading(false);
  };

  if (!loaded) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/4 border border-white/8 rounded-2xl p-5 h-28 animate-pulse" />
          ))}
        </div>
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6 h-48 animate-pulse" />
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6 h-64 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Reload */}
      <div className="flex justify-end">
        <button
          onClick={handleReload}
          disabled={reloading}
          title="Reload"
          className="text-white/25 hover:text-white/60 transition-colors disabled:opacity-30"
        >
          <FaArrowsRotate size={13} className={reloading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/4 border border-white/8 rounded-2xl p-4 sm:p-5 hover:bg-white/[0.07] transition-colors"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: `${stat.color}22`, color: stat.color }}
            >
              {stat.icon}
            </div>
            <p className="text-white text-xl sm:text-2xl font-bold mb-0.5">{stat.value}</p>
            <p className="text-white/35 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Publication breakdown */}
      <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
        <h3 className="text-white font-bold text-base mb-6 font-playfair">Publication Breakdown</h3>
        {total === 0 ? (
          <div className="text-center py-8 flex flex-col items-center gap-3">
            <FaFeatherAlt size={24} className="text-white/10" />
            <p className="text-white/25 text-sm">No articles written yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/50 text-xs">Published</span>
                <span className="text-white/70 text-xs font-semibold">{published.length} of {total}</span>
              </div>
              <div className="h-2 bg-white/6 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-[#3DBDA7] transition-all duration-700" style={{ width: `${publishRate}%` }} />
              </div>
              <p className="text-white/25 text-[10px] mt-1.5">{publishRate}% publish rate</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/50 text-xs">Drafts</span>
                <span className="text-white/70 text-xs font-semibold">{drafts.length} of {total}</span>
              </div>
              <div className="h-2 bg-white/6 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#5B8DEF] transition-all duration-700"
                  style={{ width: `${total > 0 ? Math.round((drafts.length / total) * 100) : 0}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Published articles list */}
      <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-base font-playfair">
            Published Articles
            {published.length > 0 && (
              <span className="text-white/25 font-normal text-sm ml-2">({published.length})</span>
            )}
          </h3>
        </div>
        {published.length === 0 ? (
          <div className="text-center py-8 flex flex-col items-center gap-3">
            <FaFeatherAlt size={24} className="text-white/10" />
            <p className="text-white/25 text-sm">No published articles yet.</p>
            <p className="text-white/15 text-xs">Publish your first article to see it here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {published.map((article, i) => (
              <div key={article.article_id} className="flex items-center gap-4">
                <span
                  className="text-xs font-bold w-5 shrink-0 text-center"
                  style={{ color: i === 0 ? "#E8A838" : "rgba(255,255,255,0.2)" }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-sm truncate">{article.title}</p>
                  <div className="mt-1.5 w-full bg-white/5 rounded-full h-1">
                    <div
                      className="h-1 rounded-full bg-amber-400/40"
                      style={{ width: `${Math.max(10, 100 - i * (80 / Math.max(published.length, 1)))}%` }}
                    />
                  </div>
                </div>
                <span className="text-white/25 text-xs shrink-0 hidden sm:block">
                  {article.published_at ? formatDate(article.published_at) : "—"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coming soon */}
      <div className="bg-amber-400/4 border border-amber-400/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0">
          <FaArrowRight size={14} className="text-amber-400/60" />
        </div>
        <div className="flex-1">
          <p className="text-amber-400/80 text-sm font-bold font-playfair mb-1">Detailed analytics coming soon</p>
          <p className="text-white/25 text-xs leading-relaxed">
            View counts, reader engagement, traffic sources, and follower growth will be available in a future update.
          </p>
        </div>
      </div>
    </div>
  );
};
