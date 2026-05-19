import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaArrowLeft, FaClock, FaTwitter, FaUserPlus, FaUserCheck,
  FaUsers, FaCalendarAlt, FaBookOpen,
} from "react-icons/fa";
import { FaFeatherAlt } from "react-icons/fa";
import { getAuthorProfile } from "@/lib/api/reader";
import { followWriter, unfollowWriter, getFollowStatus } from "@/lib/api/follow";
import { useAuth } from "@/context/AuthContext";
import type { AuthorProfile, ProfileArticle } from "@/types/reader";

const ACCENT_COLORS = ["#E8A838", "#5B8DEF", "#3DBDA7", "#E87B5B", "#9B7FE8"];
const accentFor = (id: string) => ACCENT_COLORS[id.charCodeAt(0) % ACCENT_COLORS.length];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const joinedYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });

const readingTime = (html: string) => {
  const words = html.replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const authorInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const ArticleCard = ({ article }: { article: ProfileArticle }) => {
  const color = accentFor(article.article_id);
  const mins = readingTime(article.content);
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-50/80 transition-all duration-400 flex flex-col"
    >
      {article.cover_image ? (
        <div className="relative overflow-hidden h-44 shrink-0">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <div
          className="h-44 shrink-0 flex items-center justify-center"
          style={{ backgroundColor: `${color}12` }}
        >
          <FaFeatherAlt size={30} style={{ color }} className="opacity-30" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[#1A1A1A] font-bold text-base leading-snug mb-2.5 group-hover:text-amber-700 transition-colors duration-200 font-playfair line-clamp-2 flex-1">
          {article.title}
        </h3>
        <p className="text-[#6B6B6B] text-sm leading-relaxed line-clamp-2 mb-4">
          {article.content.replace(/<[^>]*>/g, "").slice(0, 110)}…
        </p>
        <div className="flex items-center justify-between pt-3.5 border-t border-[#F0EDE7]">
          <span className="text-[#9B9B9B] text-xs">{formatDate(article.published_at)}</span>
          <span className="flex items-center gap-1.5 text-[#9B9B9B] text-xs">
            <FaClock size={9} className="text-amber-400" />
            {mins} min read
          </span>
        </div>
      </div>
    </Link>
  );
};

const AuthorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [profile, setProfile] = useState<AuthorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const fetchProfile = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await getAuthorProfile(id);
      setProfile(res.data);
      setFollowerCount(res.data.author.followerCount);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!user || !id) return;
    getFollowStatus(id)
      .then((res) => setFollowing(res.data.following))
      .catch(() => {});
  }, [user, id]);

  const handleFollow = async () => {
    if (!user || !id) return;
    setFollowLoading(true);
    try {
      if (following) {
        await unfollowWriter(id);
        setFollowing(false);
        setFollowerCount((c) => Math.max(0, c - 1));
      } else {
        await followWriter(id);
        setFollowing(true);
        setFollowerCount((c) => c + 1);
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

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-400/10 flex items-center justify-center mb-2">
          <FaFeatherAlt size={28} className="text-amber-400/50" />
        </div>
        <h1 className="text-[#1a1a1a] text-2xl font-bold font-playfair">Author not found</h1>
        <p className="text-[#6B6B6B] text-sm">This author profile doesn't exist or has been removed.</p>
        <Link to="/blogs" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-6 py-2.5 rounded-full text-sm transition-all mt-2">
          <FaArrowLeft size={11} /> Back to all posts
        </Link>
      </div>
    );
  }

  const { author, articles } = profile;
  const color = accentFor(author.user_id);
  const isOwnProfile = user?.user_id === author.user_id;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Entire sticky block: back link + hero + section header */}
      <div className="sticky top-0 z-40 bg-[#0C0C0C] overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-12"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Back link — flush at the very top, right below the fixed navbar */}
        <div className="relative pt-20 px-6 pb-0">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-xs font-medium tracking-wide uppercase transition-colors py-3"
            >
              <FaArrowLeft size={9} /> All posts
            </Link>
          </div>
        </div>

        {/* Author hero */}
        <div className="relative px-6 pt-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center text-2xl font-bold text-white shadow-2xl"
                  style={{ backgroundColor: color, boxShadow: `0 16px 50px ${color}40` }}
                >
                  {authorInitials(author.fullname)}
                </div>
                <div
                  className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 border-[#0C0C0C] flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  <FaFeatherAlt size={8} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h1 className="text-white text-2xl md:text-3xl font-bold font-playfair leading-tight">
                    {author.fullname}
                  </h1>
                  {author.department && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                      style={{ color, backgroundColor: `${color}14`, borderColor: `${color}30` }}
                    >
                      {author.department}
                    </span>
                  )}
                </div>

                {author.bio && (
                  <p className="text-white/40 text-sm leading-relaxed max-w-lg mb-3">
                    {author.bio}
                  </p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5 text-white/40 text-xs">
                    <FaUsers size={10} style={{ color }} />
                    <span className="text-white font-semibold">{followerCount.toLocaleString()}</span>
                    <span>{followerCount === 1 ? "follower" : "followers"}</span>
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1.5 text-white/40 text-xs">
                    <FaBookOpen size={10} style={{ color }} />
                    <span className="text-white font-semibold">{articles.length}</span>
                    <span>{articles.length === 1 ? "article" : "articles"}</span>
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1.5 text-white/40 text-xs">
                    <FaCalendarAlt size={9} style={{ color }} />
                    <span>Joined {joinedYear(author.createdAt.toString())}</span>
                  </span>
                  {author.twitter && (
                    <>
                      <span className="w-px h-3 bg-white/10" />
                      <a
                        href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-white/40 hover:text-sky-400 text-xs transition-colors"
                      >
                        <FaTwitter size={10} />
                        <span>{author.twitter}</span>
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Follow CTA */}
              {!isOwnProfile && (
                <div className="shrink-0 self-start md:self-center">
                  {user ? (
                    <button
                      onClick={handleFollow}
                      disabled={followLoading}
                      className={`cursor-pointer inline-flex items-center gap-2 font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        following
                          ? "bg-white/8 border border-white/15 text-white/70 hover:bg-white/5 hover:text-white/50"
                          : "bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] shadow-lg shadow-amber-400/20 hover:shadow-amber-400/35 hover:-translate-y-0.5"
                      }`}
                    >
                      {following ? <FaUserCheck size={13} /> : <FaUserPlus size={13} />}
                      {following ? "Following" : "Follow"}
                    </button>
                  ) : (
                    <Link
                      to="/signin"
                      className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-lg shadow-amber-400/20"
                    >
                      <FaUserPlus size={13} />
                      Follow
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section header — also inside the sticky block so it never moves */}
        <div className="relative border-t border-white/6 bg-[#0f0f0f] px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-amber-400/70 text-[10px] font-bold tracking-widest uppercase mb-0.5">
                Published Work
              </p>
              <h2 className="text-white text-base font-bold font-playfair">
                All Articles
                <span className="text-white/25 font-normal text-sm ml-2">({articles.length})</span>
              </h2>
            </div>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}18` }}
            >
              <FaFeatherAlt size={12} style={{ color }} className="opacity-70" />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable articles grid */}
      <main className="bg-[#F8F6F1] px-6 py-10">
        <div className="max-w-5xl mx-auto">
          {articles.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/8 flex items-center justify-center">
                <FaFeatherAlt size={26} className="text-amber-400/40" />
              </div>
              <h3 className="text-[#1A1A1A] text-xl font-bold font-playfair">No articles yet</h3>
              <p className="text-[#9B9B9B] text-sm">This author hasn't published anything yet.</p>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-amber-600 font-medium text-sm hover:underline mt-2"
              >
                <FaArrowLeft size={11} /> Browse all posts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.article_id} article={article} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AuthorProfilePage;
