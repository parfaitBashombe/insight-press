import { useState, useEffect, useRef } from "react";
import { FaSearch, FaArrowRight, FaClock, FaTimes } from "react-icons/fa";
import { FaFeatherAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useArticles } from "@/context/ArticlesContext";
import type { PublicArticle } from "@/types/reader";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const readingTime = (html: string) => {
  const words = html.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const authorInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const ACCENT_COLORS = ["#E8A838", "#5B8DEF", "#3DBDA7", "#E87B5B", "#9B7FE8"];
const accentFor = (id: string) => ACCENT_COLORS[id.charCodeAt(0) % ACCENT_COLORS.length];

const ArticleCard = ({ article }: { article: PublicArticle }) => {
  const color = accentFor(article.article_id);
  const mins = readingTime(article.content);
  const navigate = useNavigate();

  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-50/80 transition-all duration-500 flex flex-col"
    >
      {article.cover_image ? (
        <div className="relative overflow-hidden h-44 bg-[#F0EDE7] shrink-0">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-44 shrink-0 flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <FaFeatherAlt size={28} style={{ color }} className="opacity-40" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[#1A1A1A] font-bold text-lg leading-snug mb-2.5 group-hover:text-amber-700 transition-colors duration-200 flex-1 font-playfair">
          {article.title}
        </h3>
        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5 line-clamp-2">
          {article.content.replace(/<[^>]*>/g, "").slice(0, 120)}…
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#F0EDE7]">
          <button
            className="flex items-center gap-2.5 hover:opacity-70 transition-opacity cursor-pointer"
            onClick={(e) => { e.preventDefault(); navigate(`/authors/${article.author_id}`); }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              style={{ backgroundColor: color }}
            >
              {authorInitials(article.author.fullname)}
            </div>
            <div className="text-left">
              <p className="text-[#1A1A1A] text-xs font-semibold leading-tight">{article.author.fullname}</p>
              <p className="text-[#9B9B9B] text-[10px]">{formatDate(article.published_at)}</p>
            </div>
          </button>
          <div className="flex items-center gap-1 text-[#9B9B9B] text-xs">
            <FaClock size={10} className="text-amber-400" />
            <span>{mins} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedCard = ({ article }: { article: PublicArticle }) => {
  const color = accentFor(article.article_id);
  const mins = readingTime(article.content);
  const navigate = useNavigate();

  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group relative rounded-3xl overflow-hidden block"
      style={{ minHeight: "420px" }}
    >
      {article.cover_image ? (
        <img
          src={article.cover_image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${color}22, ${color}08)` }}
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h2 className="text-white text-3xl md:text-4xl font-bold leading-snug mb-3 font-playfair">
          {article.title}
        </h2>
        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xl">
          {article.content.replace(/<[^>]*>/g, "").slice(0, 160)}…
        </p>
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-3 hover:opacity-70 transition-opacity cursor-pointer"
            onClick={(e) => { e.preventDefault(); navigate(`/authors/${article.author_id}`); }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ backgroundColor: color }}
            >
              {authorInitials(article.author.fullname)}
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold">{article.author.fullname}</p>
              <p className="text-white/40 text-xs">
                {mins} min read · {formatDate(article.published_at)}
              </p>
            </div>
          </button>
          <span className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium group-hover:gap-3 transition-all duration-200">
            Read article <FaArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
};

const BlogsPage = () => {
  const { blog, ensureBlog, updateBlogQuery, loadMoreBlog } = useArticles();
  const [inputQuery, setInputQuery] = useState(blog.query);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureBlog();
  }, [ensureBlog]);

  // Keep local input in sync if context query changes (e.g. cleared externally)
  useEffect(() => {
    setInputQuery(blog.query);
  }, [blog.query]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !blog.loading && !blog.loadingMore) {
          loadMoreBlog();
        }
      },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMoreBlog, blog.loading, blog.loadingMore]);

  const handleQueryChange = (q: string) => {
    setInputQuery(q);
    updateBlogQuery(q);
  };

  const featured = blog.articles[0] ?? null;
  const gridArticles = blog.articles.slice(1);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <section className="bg-[#0C0C0C] pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-125 h-125 rounded-full bg-amber-500/5 blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
            The Insight Press Journal
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight font-playfair">
            Stories worth reading.
          </h1>
          <p className="text-white/40 text-lg max-w-xl mb-10">
            Curated posts from verified authors across design, engineering, writing, and culture.
          </p>

          <div className="relative max-w-md">
            <FaSearch size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search posts, authors…"
              className="w-full bg-white/6 border border-white/10 rounded-full pl-10 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/8 transition-all duration-200"
            />
            {inputQuery && (
              <button
                onClick={() => handleQueryChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        </div>
      </section>

      <main className="bg-[#F8F6F1] px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {blog.loading ? (
            <div className="space-y-8">
              <div className="h-96 bg-[#E8E4DC] rounded-3xl animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-[#E8E4DC] rounded-2xl animate-pulse" />
                ))}
              </div>
            </div>
          ) : blog.articles.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-[#1A1A1A] text-2xl font-bold mb-2 font-playfair">
                No posts found
              </h3>
              <p className="text-[#6B6B6B] text-sm">Try a different search term.</p>
              {inputQuery && (
                <button
                  onClick={() => handleQueryChange("")}
                  className="mt-6 text-amber-600 text-sm font-medium hover:underline cursor-pointer"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              {!blog.query && featured && (
                <div className="mb-12">
                  <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-5">
                    Featured Post
                  </p>
                  <FeaturedCard article={featured} />
                </div>
              )}

              {blog.query && (
                <p className="text-[#6B6B6B] text-sm mb-8">
                  Showing <span className="text-[#1A1A1A] font-semibold">{blog.articles.length}</span>{" "}
                  {blog.articles.length === 1 ? "post" : "posts"} for "
                  <span className="text-[#1A1A1A] font-semibold">{blog.query}</span>"
                </p>
              )}

              {((!blog.query && gridArticles.length > 0) || blog.query) && (
                <>
                  {!blog.query && (
                    <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-5">
                      Latest Posts
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(blog.query ? blog.articles : gridArticles).map((article) => (
                      <ArticleCard key={article.article_id} article={article} />
                    ))}
                  </div>
                </>
              )}

              {blog.loadingMore && (
                <div className="mt-10 flex justify-center">
                  <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <div ref={sentinelRef} className="h-4" />
            </>
          )}
        </div>
      </main>

      <section className="bg-[#0C0C0C] px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-3xl font-bold mb-2 font-playfair">
              Have a story to tell?
            </h3>
            <p className="text-white/40 text-sm">Get verified and publish your first post today.</p>
          </div>
          <Link
            to="/verify-request"
            className="shrink-0 inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/25 hover:-translate-y-0.5 text-sm"
          >
            Apply for Verification
            <FaArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
