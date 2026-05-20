import { FaClock, FaCalendar, FaEye, FaEyeSlash } from "react-icons/fa";
import { Avatar } from "@/components/avatar";
import { FaPencil, FaTrash, FaXmark } from "react-icons/fa6";
import { useAuth } from "@/lib/context/auth-context";
import type { Article } from "@/types/writer";

const QUILL_PROSE = `
  .modal-article-body h1, .modal-article-body h2, .modal-article-body h3 { font-family: 'Playfair Display', serif; color: #1a1a1a; margin: 1.5em 0 0.5em; }
  .modal-article-body h1 { font-size: 2rem; }
  .modal-article-body h2 { font-size: 1.5rem; }
  .modal-article-body h3 { font-size: 1.25rem; }
  .modal-article-body p { color: #3a3a3a; line-height: 1.85; margin-bottom: 1.25em; font-size: 1.0625rem; }
  .modal-article-body a { color: #d97706; text-decoration: underline; }
  .modal-article-body blockquote { border-left: 3px solid #fbbf24; padding-left: 1.25rem; color: #6b6b6b; font-style: italic; margin: 1.5em 0; }
  .modal-article-body ul, .modal-article-body ol { padding-left: 1.5rem; margin-bottom: 1.25em; color: #3a3a3a; line-height: 1.85; }
  .modal-article-body li { margin-bottom: 0.4em; }
  .modal-article-body pre { background: #f0ede7; border-radius: 10px; padding: 1rem 1.25rem; overflow-x: auto; margin-bottom: 1.25em; }
  .modal-article-body code { font-family: monospace; font-size: 0.9rem; color: #1a1a1a; }
  .modal-article-body img { max-width: 100%; border-radius: 12px; margin: 1.5em 0; }
`;

interface Props {
  article: Article;
  onClose: () => void;
  onEdit: (article: Article) => void;
  onPublish: (articleId: string) => void;
  onUnpublish: (articleId: string) => void;
  onDelete: (articleId: string) => void;
  actionInProgress: boolean;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

const readingTime = (html: string) => {
  const words = html.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};


export const PostDetailModal = ({
  article,
  onClose,
  onEdit,
  onPublish,
  onUnpublish,
  onDelete,
  actionInProgress,
}: Props) => {
  const { user } = useAuth();
  const mins = readingTime(article.content);
  const isPublished = article.status === "PUBLISHED";
  const authorName = user?.fullname ?? "Author";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <style>{QUILL_PROSE}</style>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#F8F6F1] rounded-2xl shadow-2xl overflow-hidden font-dm-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/70 hover:text-white bg-[#0C0C0C] hover:bg-[#1a1a1a] border border-white/10 rounded-full p-1.5 transition-colors shadow-lg"
        >
          <FaXmark size={13} />
        </button>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 scrollbar-light">

          {/* Dark hero — matches ArticleDetail */}
          <div className="bg-[#0C0C0C] pt-10 pb-10 px-8">


            {/* Status badge */}
            <div className="mb-4">
              <span
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                  isPublished
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-white/5 text-white/30 border-white/10"
                }`}
              >
                {isPublished ? "Published" : "Draft"}
              </span>
            </div>

            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-6 font-playfair">
              {article.title || <span className="text-white/20 italic">Untitled</span>}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-white/40 text-sm">
              <div className="flex items-center gap-2.5">
                <Avatar name={authorName} avatar={user?.avatar} id={user?.user_id} size={8} />
                <span className="text-white/70 font-medium">{authorName}</span>
              </div>
              {isPublished && article.published_at ? (
                <span className="flex items-center gap-1.5">
                  <FaCalendar size={11} className="text-amber-400/60" />
                  {formatDate(article.published_at)}
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-white/25">
                  <FaCalendar size={11} className="text-amber-400/30" />
                  Not published yet
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <FaClock size={11} className="text-amber-400/60" />
                {mins} min read
              </span>
            </div>
          </div>

          {/* Cover image */}
          {article.cover_image && (
            <div className="max-w-3xl mx-auto px-6 -mt-1">
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full rounded-2xl object-cover max-h-80"
              />
            </div>
          )}

          {/* Light content area */}
          <div className="bg-[#F8F6F1] px-8 py-10">

            {/* Article body */}
            {article.content ? (
              <div
                className="modal-article-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <p className="text-[#9b9b9b] italic text-sm">No content written yet.</p>
            )}
          </div>
        </div>

        {/* Action bar */}
        <div className="shrink-0 border-t border-[#E8E4DC] bg-white px-8 py-4 flex items-center gap-3 flex-wrap">
          <button
            onClick={() => { onEdit(article); onClose(); }}
            disabled={actionInProgress}
            className="inline-flex items-center gap-2 bg-[#F0EDE7] hover:bg-[#E8E4DC] border border-[#E8E4DC] text-[#3a3a3a] disabled:opacity-40 font-medium px-4 py-2 rounded-full text-xs transition-all"
          >
            <FaPencil size={10} /> Edit
          </button>

          {isPublished ? (
            <button
              onClick={() => onUnpublish(article.article_id)}
              disabled={actionInProgress}
              className="inline-flex items-center gap-2 bg-[#F0EDE7] hover:bg-[#E8E4DC] border border-[#E8E4DC] text-[#3a3a3a] disabled:opacity-40 font-medium px-4 py-2 rounded-full text-xs transition-all"
            >
              <FaEyeSlash size={10} /> Unpublish
            </button>
          ) : (
            <button
              onClick={() => onPublish(article.article_id)}
              disabled={actionInProgress}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] disabled:opacity-40 font-bold px-4 py-2 rounded-full text-xs transition-all"
            >
              <FaEye size={10} /> Publish
            </button>
          )}

          <button
            onClick={() => onDelete(article.article_id)}
            disabled={actionInProgress}
            className="ml-auto inline-flex items-center gap-2 text-red-500/60 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200 disabled:opacity-40 font-medium px-4 py-2 rounded-full text-xs transition-all"
          >
            <FaTrash size={10} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
