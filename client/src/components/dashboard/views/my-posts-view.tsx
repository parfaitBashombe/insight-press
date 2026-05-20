import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FaPlus, FaEllipsis, FaTrash, FaEye as FaPublish, FaEyeSlash, FaArrowsRotate } from "react-icons/fa6";
import { publishArticle, unpublishArticle, deleteArticle } from "@/lib/api/writer";
import { useWriter } from "@/lib/context/writer-context";
import type { Article } from "@/types/writer";
import type { WriterView } from "@/components/dashboard/types";
import { PostDetailModal } from "@/components/dashboard/PostDetailModal";

interface Props {
  navigate: (v: WriterView) => void;
  onEdit: (article: Article) => void;
}

const PAGE_SIZE = 15;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

type StatusFilter = "All" | "Published" | "Drafts";

export const MyPostsView = ({ navigate, onEdit }: Props) => {
  const { articles, loaded, ensure, reload, patchArticle, removeArticle } = useWriter();

  useEffect(() => { ensure(); }, [ensure]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [detailArticle, setDetailArticle] = useState<Article | null>(null);
  const [reloading, setReloading] = useState(false);

  // Reset page when filter changes
  useEffect(() => { setPage(1); }, [statusFilter]);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filtered = articles.filter((a) => {
    if (statusFilter === "Published") return a.status === "PUBLISHED";
    if (statusFilter === "Drafts") return a.status === "DRAFT";
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleReload = async () => {
    setReloading(true);
    await reload();
    setReloading(false);
  };

  const handlePublish = async (articleId: string) => {
    setActionInProgress(articleId);
    setOpenMenuId(null);
    try {
      await publishArticle(articleId);
      patchArticle(articleId, { status: "PUBLISHED", published_at: new Date().toISOString() });
      setDetailArticle((prev) => prev?.article_id === articleId ? { ...prev, status: "PUBLISHED", published_at: new Date().toISOString() } : prev);
    } catch {
    } finally {
      setActionInProgress(null);
    }
  };

  const handleUnpublish = async (articleId: string) => {
    setActionInProgress(articleId);
    setOpenMenuId(null);
    try {
      await unpublishArticle(articleId);
      patchArticle(articleId, { status: "DRAFT" });
      setDetailArticle((prev) => prev?.article_id === articleId ? { ...prev, status: "DRAFT" } : prev);
    } catch {
    } finally {
      setActionInProgress(null);
    }
  };

  const handleDelete = async (articleId: string) => {
    if (!window.confirm("Delete this article? This cannot be undone.")) return;
    setActionInProgress(articleId);
    setOpenMenuId(null);
    try {
      await deleteArticle(articleId);
      removeArticle(articleId);
      setDetailArticle(null);
    } catch {
    } finally {
      setActionInProgress(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-2">
          {(["All", "Published", "Drafts"] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`text-xs px-4 py-2 rounded-full border transition-all duration-150 ${
                statusFilter === f
                  ? "bg-white/10 text-white border-white/20"
                  : "border-white/8 text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={handleReload}
            disabled={reloading}
            title="Reload"
            className="text-white/25 hover:text-white/60 transition-colors disabled:opacity-30"
          >
            <FaArrowsRotate size={13} className={reloading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => navigate("new-post")}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-4 py-2 rounded-full text-xs transition-all duration-200"
          >
            <FaPlus size={10} /> New Post
          </button>
        </div>
      </div>

      {!loaded ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white/4 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : paginated.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/30 text-sm mb-4">
            {statusFilter === "All" ? "No articles yet." : `No ${statusFilter.toLowerCase()} articles.`}
          </p>
          <button
            onClick={() => navigate("new-post")}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-5 py-2.5 rounded-full text-xs transition-all"
          >
            Write your first post
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {paginated.map((article) => {
            const isActing = actionInProgress === article.article_id;
            return (
              <div
                key={article.article_id}
                onClick={() => setDetailArticle(article)}
                className={`group bg-white/4 hover:bg-white/[0.07] border border-white/6 rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-200 cursor-pointer ${
                  isActing ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">
                    {article.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-white/25 text-xs">{formatDate(article.createdAt)}</span>
                    {article.status === "PUBLISHED" && article.published_at && (
                      <>
                        <span className="text-white/15 text-xs">·</span>
                        <span className="flex items-center gap-1 text-white/25 text-xs">
                          <FaEye size={9} /> Published {formatDate(article.published_at)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                      article.status === "PUBLISHED"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-white/5 text-white/30 border-white/8"
                    }`}
                  >
                    {article.status === "PUBLISHED" ? "Published" : "Draft"}
                  </span>

                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setOpenMenuId(openMenuId === article.article_id ? null : article.article_id)}
                      className="text-white/20 hover:text-white/50 transition-colors p-1"
                    >
                      <FaEllipsis size={14} />
                    </button>
                    {openMenuId === article.article_id && (
                      <div className="absolute right-0 top-full mt-1 w-40 bg-[#1a1a1a] border border-white/8 rounded-xl shadow-2xl z-10 overflow-hidden">
                        <button
                          onClick={() => { setOpenMenuId(null); onEdit(article); }}
                          className="w-full text-left px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 text-xs transition-colors"
                        >
                          Edit
                        </button>
                        {article.status === "DRAFT" ? (
                          <button
                            onClick={() => handlePublish(article.article_id)}
                            className="w-full text-left px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 text-xs transition-colors flex items-center gap-2"
                          >
                            <FaPublish size={10} /> Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnpublish(article.article_id)}
                            className="w-full text-left px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 text-xs transition-colors flex items-center gap-2"
                          >
                            <FaEyeSlash size={10} /> Unpublish
                          </button>
                        )}
                        <div className="border-t border-white/6" />
                        <button
                          onClick={() => handleDelete(article.article_id)}
                          className="w-full text-left px-4 py-2.5 text-red-400/70 hover:text-red-400 hover:bg-red-500/5 text-xs transition-colors flex items-center gap-2"
                        >
                          <FaTrash size={10} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {loaded && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-xs px-4 py-2 rounded-full border border-white/8 text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-30 transition-all"
          >
            Previous
          </button>
          <span className="text-white/30 text-xs">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-xs px-4 py-2 rounded-full border border-white/8 text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-30 transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
