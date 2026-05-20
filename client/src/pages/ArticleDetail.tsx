import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaClock, FaCalendar, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { FaFeatherAlt } from "react-icons/fa";
import { getArticleBySlug } from "@/lib/api/reader";
import { followWriter, unfollowWriter, getFollowStatus } from "@/lib/api/follow";
import { useAuth } from "@/lib/context/auth-context";
import type { PublicArticle } from "@/types/reader";

const QUILL_PROSE = `
  .article-body h1, .article-body h2, .article-body h3 { font-family: 'Playfair Display', serif; color: #1a1a1a; margin: 1.5em 0 0.5em; }
  .article-body h1 { font-size: 2rem; }
  .article-body h2 { font-size: 1.5rem; }
  .article-body h3 { font-size: 1.25rem; }
  .article-body p { color: #3a3a3a; line-height: 1.85; margin-bottom: 1.25em; font-size: 1.0625rem; }
  .article-body a { color: #d97706; text-decoration: underline; }
  .article-body blockquote { border-left: 3px solid #fbbf24; padding-left: 1.25rem; color: #6b6b6b; font-style: italic; margin: 1.5em 0; }
  .article-body ul, .article-body ol { padding-left: 1.5rem; margin-bottom: 1.25em; color: #3a3a3a; line-height: 1.85; }
  .article-body li { margin-bottom: 0.4em; }
  .article-body pre { background: #f0ede7; border-radius: 10px; padding: 1rem 1.25rem; overflow-x: auto; margin-bottom: 1.25em; }
  .article-body code { font-family: monospace; font-size: 0.9rem; color: #1a1a1a; }
  .article-body img { max-width: 100%; border-radius: 12px; margin: 1.5em 0; }
`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

const readingTime = (html: string) => {
  const words = html.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const authorInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const ACCENT_COLORS = ["#E8A838", "#5B8DEF", "#3DBDA7", "#E87B5B", "#9B7FE8"];
const accentFor = (id: string) => ACCENT_COLORS[id.charCodeAt(0) % ACCENT_COLORS.length];

const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();

  const [article, setArticle] = useState<PublicArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    getArticleBySlug(slug)
      .then((res) => setArticle(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!user || !article) return;
    getFollowStatus(article.author_id)
      .then((res) => setFollowing(res.data.following))
      .catch(() => {});
  }, [user, article?.author_id]);

  const handleFollow = async () => {
    if (!user || !article) return;
    setFollowLoading(true);
    try {
      if (following) {
        await unfollowWriter(article.author_id);
        setFollowing(false);
      } else {
        await followWriter(article.author_id);
        setFollowing(true);
      }
    } catch {
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center gap-4 px-6">
        <FaFeatherAlt size={36} className="text-amber-400/40" />
        <h1 className="text-[#1a1a1a] text-2xl font-bold font-playfair">Article not found</h1>
        <p className="text-[#6b6b6b] text-sm">It may have been removed or the link is incorrect.</p>
        <Link to="/blogs" className="inline-flex items-center gap-2 text-amber-600 font-medium text-sm hover:underline mt-2">
          <FaArrowLeft size={12} /> Back to all posts
        </Link>
      </div>
    );
  }

  const color = accentFor(article.article_id);
  const mins = readingTime(article.content);
  const isOwnArticle = user?.user_id === article.author_id;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{QUILL_PROSE}</style>

      <div className="bg-[#0C0C0C] pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors mb-8">
            <FaArrowLeft size={11} /> All posts
          </Link>

          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 font-playfair">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-white/40 text-sm">
            <Link
              to={`/authors/${article.author_id}`}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: color }}
              >
                {authorInitials(article.author.fullname)}
              </div>
              <span className="text-white/70 font-medium hover:text-white transition-colors">
                {article.author.fullname}
              </span>
            </Link>
            <span className="flex items-center gap-1.5">
              <FaCalendar size={11} className="text-amber-400/60" />
              {formatDate(article.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock size={11} className="text-amber-400/60" />
              {mins} min read
            </span>
          </div>
        </div>
      </div>

      {article.cover_image && (
        <div className="max-w-4xl mx-auto px-6 -mt-1">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full rounded-2xl object-cover max-h-96"
          />
        </div>
      )}

      <main className="bg-[#F8F6F1] px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between gap-4 bg-white border border-[#E8E4DC] rounded-2xl p-5 mb-10">
            <Link to={`/authors/${article.author_id}`} className="flex items-start gap-4 flex-1 min-w-0 hover:opacity-80 transition-opacity">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ backgroundColor: color }}
              >
                {authorInitials(article.author.fullname)}
              </div>
              <div className="min-w-0">
                <p className="text-[#1a1a1a] text-sm font-semibold mb-0.5">{article.author.fullname}</p>
                {article.author.bio ? (
                  <p className="text-[#6b6b6b] text-xs leading-relaxed">{article.author.bio}</p>
                ) : (
                  <p className="text-[#9b9b9b] text-xs">View all articles →</p>
                )}
              </div>
            </Link>

            {!isOwnArticle && (
              user ? (
                <button
                  onClick={handleFollow}
                  disabled={followLoading}
                  className={`cursor-pointer shrink-0 inline-flex items-center gap-2 font-bold px-4 py-2 rounded-full text-xs transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    following
                      ? "bg-[#F0EDE7] border border-[#E8E4DC] text-[#6b6b6b] hover:bg-[#E8E4DC]"
                      : "bg-amber-400 hover:bg-amber-300 text-[#0C0C0C]"
                  }`}
                >
                  {following ? <FaUserCheck size={11} /> : <FaUserPlus size={11} />}
                  {following ? "Following" : "Follow"}
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="shrink-0 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-4 py-2 rounded-full text-xs transition-all"
                >
                  <FaUserPlus size={11} /> Follow
                </Link>
              )
            )}
          </div>

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-14 pt-10 border-t border-[#E8E4DC] flex items-center justify-between flex-wrap gap-4">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-amber-600 font-medium text-sm hover:underline">
              <FaArrowLeft size={12} /> Back to all posts
            </Link>
            <p className="text-[#9b9b9b] text-xs">Published on {formatDate(article.published_at)}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
