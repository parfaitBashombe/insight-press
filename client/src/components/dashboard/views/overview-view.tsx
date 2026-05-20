import { useState, useEffect } from "react";
import { FaEye, FaBookOpen, FaClock, FaArrowRight } from "react-icons/fa";
import { FaFeather, FaArrowsRotate } from "react-icons/fa6";
import {
  publishArticle,
  unpublishArticle,
  deleteArticle,
} from "@/lib/api/writer";
import { useAuth } from "@/lib/context/auth-context";
import { useWriter } from "@/lib/context/writer-context";
import type { Article } from "@/types/writer";
import type { WriterView } from "@/components/dashboard/types";
import { PostDetailModal } from "@/components/dashboard/post-detail-modal";
import { Avatar } from "@/components/avatar";

interface Props {
  navigate: (v: WriterView) => void;
  onEdit: (article: Article) => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const OverviewView = ({ navigate, onEdit }: Props) => {
  const { user } = useAuth();
  const {
    stats,
    articles,
    loaded,
    ensure,
    reload,
    patchArticle,
    removeArticle,
  } = useWriter();
  const [detailArticle, setDetailArticle] = useState<Article | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    ensure();
  }, [ensure]);

  const recentArticles = articles.slice(0, 5);


  const statCards = stats
    ? [
        {
          label: "Total Articles",
          value: stats.articles.total,
          icon: <FaBookOpen size={15} />,
          color: "#E8A838",
        },
        {
          label: "Published",
          value: stats.articles.published,
          icon: <FaEye size={15} />,
          color: "#3DBDA7",
        },
        {
          label: "Drafts",
          value: stats.articles.drafts,
          icon: <FaClock size={15} />,
          color: "#5B8DEF",
        },
      ]
    : [];

  const handleReload = async () => {
    setReloading(true);
    await reload();
    setReloading(false);
  };

  const handlePublish = async (articleId: string) => {
    setActionInProgress(articleId);
    try {
      await publishArticle(articleId);
      patchArticle(articleId, {
        status: "PUBLISHED",
        published_at: new Date().toISOString(),
      });
      setDetailArticle((prev) =>
        prev?.article_id === articleId
          ? {
              ...prev,
              status: "PUBLISHED",
              published_at: new Date().toISOString(),
            }
          : prev,
      );
    } catch (e) {
      console.error(e);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleUnpublish = async (articleId: string) => {
    setActionInProgress(articleId);
    try {
      await unpublishArticle(articleId);
      patchArticle(articleId, { status: "DRAFT" });
      setDetailArticle((prev) =>
        prev?.article_id === articleId ? { ...prev, status: "DRAFT" } : prev,
      );
    } catch (e) {
      console.error(e);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleDelete = async (articleId: string) => {
    if (!window.confirm("Delete this article? This cannot be undone.")) return;
    setActionInProgress(articleId);
    try {
      await deleteArticle(articleId);
      removeArticle(articleId);
      setDetailArticle(null);
    } catch (e) {
      console.error(e);
    } finally {
      setActionInProgress(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {detailArticle && (
        <PostDetailModal
          article={detailArticle}
          onClose={() => setDetailArticle(null)}
          onEdit={onEdit}
          onPublish={handlePublish}
          onUnpublish={handleUnpublish}
          onDelete={handleDelete}
          actionInProgress={actionInProgress === detailArticle.article_id}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        {user && <Avatar name={user.fullname} avatar={user.avatar} id={user.user_id} size={11} />}
        <div>
          <p className="text-white/30 text-xs">Welcome back,</p>
          <h1 className="text-white text-xl sm:text-2xl font-bold font-playfair">
            {user?.fullname ?? "Writer"}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={handleReload}
            disabled={reloading}
            title="Reload data"
            className="text-white/25 hover:text-white/60 transition-colors disabled:opacity-30"
          >
            <FaArrowsRotate
              size={13}
              className={reloading ? "animate-spin" : ""}
            />
          </button>
          <div className="hidden sm:flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1.5">
            <FaFeather size={9} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-semibold">
              Verified Author
            </span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      {!loaded ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white/4 border border-white/8 rounded-2xl p-5 h-28 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/4 border border-white/8 rounded-2xl p-4 sm:p-5 hover:bg-white/[0.07] transition-colors duration-200"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                style={{
                  backgroundColor: `${stat.color}22`,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
              <p className="text-white text-xl sm:text-2xl font-bold mb-0.5">
                {stat.value}
              </p>
              <p className="text-white/35 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recent articles */}
      <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-base font-playfair">
            Recent Articles
          </h3>
          <button
            onClick={() => navigate("my-posts")}
            className="text-amber-400 text-xs font-semibold hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            View all <FaArrowRight size={10} />
          </button>
        </div>

        {!loaded ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-white/4 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : recentArticles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white/30 text-sm mb-4">No articles yet.</p>
            <button
              onClick={() => navigate("new-post")}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-5 py-2.5 rounded-full text-xs transition-all"
            >
              Write your first post
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentArticles.map((article) => (
              <div
                key={article.article_id}
                onClick={() => setDetailArticle(article)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/4 transition-colors duration-150 group cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">
                    {article.title}
                  </p>
                  <p className="text-white/25 text-xs mt-0.5">
                    {formatDate(article.createdAt)}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${
                    article.status === "PUBLISHED"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-white/5 text-white/30 border-white/8"
                  }`}
                >
                  {article.status === "PUBLISHED" ? "Published" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-amber-400/8 to-amber-500/4 border border-amber-400/15 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-1">
            Ready to write?
          </p>
          <p className="text-white text-lg sm:text-xl font-bold font-playfair">
            Start your next piece.
          </p>
        </div>
        <button
          onClick={() => navigate("new-post")}
          className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:shadow-xl hover:shadow-amber-400/25 shrink-0"
        >
          Open editor <FaArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};
