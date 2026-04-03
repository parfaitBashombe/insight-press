import { useState, useMemo } from "react";
import {
  FaSearch,
  FaShieldAlt,
  FaArrowRight,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  initials: string;
  accentColor: string;
  image: string;
  imageAlt: string;
  readTime: string;
  date: string;
  featured?: boolean;
}

const ALL_POSTS: Post[] = [
  {
    id: 1,
    category: "Design",
    title: "The Invisible Grid: How Whitespace Shapes Reader Trust",
    excerpt:
      "Great design isn't about what you add — it's about the breath you leave between ideas. Here's how whitespace communicates credibility.",
    author: "Amara Osei",
    role: "Product Designer",
    initials: "AO",
    accentColor: "#E8A838",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Abstract colourful design shapes",
    readTime: "5 min",
    date: "Mar 28, 2025",
    featured: true,
  },
  {
    id: 2,
    category: "Engineering",
    title: "Building for the Long Run: Why Boring Tech Wins",
    excerpt:
      "Chasing trends is tempting. But the most resilient products are built on dull, proven foundations that scale quietly for years.",
    author: "James Mwangi",
    role: "Senior Engineer",
    initials: "JM",
    accentColor: "#5B8DEF",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Code on a dark monitor screen",
    readTime: "7 min",
    date: "Mar 25, 2025",
  },
  {
    id: 3,
    category: "Writing",
    title: "The First Sentence Is Everything — Here's How to Write One",
    excerpt:
      "Readers decide within three seconds. A masterful opening doesn't announce itself — it simply pulls you forward without asking.",
    author: "Lena Kovač",
    role: "Journalist & Author",
    initials: "LK",
    accentColor: "#3DBDA7",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Open notebook with a pen on a wooden desk",
    readTime: "4 min",
    date: "Mar 22, 2025",
  },
  {
    id: 4,
    category: "Culture",
    title: "What Slow Journalism Can Teach Modern Content Creators",
    excerpt:
      "In the race to publish first, we've forgotten the value of depth. Slow journalism offers a radical counter-model worth revisiting.",
    author: "Sophie Renault",
    role: "Culture Writer",
    initials: "SR",
    accentColor: "#E87B5B",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Vintage newspaper spread on a table",
    readTime: "6 min",
    date: "Mar 19, 2025",
  },
  {
    id: 5,
    category: "Tech",
    title: "The Quiet Revolution of Edge Computing",
    excerpt:
      "Data processing is moving closer to where it's generated. Here's why this silent shift matters more than any headline AI announcement.",
    author: "Daniel Achebe",
    role: "Systems Architect",
    initials: "DA",
    accentColor: "#9B7FE8",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Server room with blue lighting",
    readTime: "8 min",
    date: "Mar 16, 2025",
  },
  {
    id: 6,
    category: "Life",
    title: "On Working Slowly in a World That Rewards Speed",
    excerpt:
      "We glorify hustle but admire craft. This contradiction is at the heart of every burned-out creator who ever quit their newsletter.",
    author: "Kwame Asante",
    role: "Essayist",
    initials: "KA",
    accentColor: "#3DBDA7",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Person sitting quietly by a mountain lake",
    readTime: "5 min",
    date: "Mar 12, 2025",
  },
  {
    id: 7,
    category: "Design",
    title: "Dark Mode Is Not an Aesthetic — It's an Accessibility Choice",
    excerpt:
      "Too many teams treat dark mode as a cosmetic toggle. When you understand who actually needs it, everything about how you build it changes.",
    author: "Amara Osei",
    role: "Product Designer",
    initials: "AO",
    accentColor: "#E8A838",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Dark UI design on a laptop screen",
    readTime: "6 min",
    date: "Mar 9, 2025",
  },
  {
    id: 8,
    category: "Writing",
    title: "Why Your Draft Is Probably One Revision Away from Great",
    excerpt:
      "Most writers abandon pieces that are a single ruthless edit away from something worth reading. Here's how to tell the difference.",
    author: "Lena Kovač",
    role: "Journalist & Author",
    initials: "LK",
    accentColor: "#3DBDA7",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Writer working at a desk with coffee",
    readTime: "4 min",
    date: "Mar 6, 2025",
  },
  {
    id: 9,
    category: "Engineering",
    title: "Type Systems Are Love Letters to Your Future Self",
    excerpt:
      "Six months from now, you won't remember why you wrote that function. TypeScript will — and it'll save you from yourself.",
    author: "James Mwangi",
    role: "Senior Engineer",
    initials: "JM",
    accentColor: "#5B8DEF",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=700&q=80&auto=format&fit=crop",
    imageAlt: "Closeup of TypeScript code",
    readTime: "7 min",
    date: "Mar 3, 2025",
  },
];

const CATEGORIES = [
  "All",
  "Design",
  "Engineering",
  "Writing",
  "Culture",
  "Tech",
  "Life",
];

const PostCard = ({ post, delay = 0 }: { post: Post; delay?: number }) => {
  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-50/80 transition-all duration-500 cursor-pointer flex flex-col"
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="relative overflow-hidden h-44 bg-[#F0EDE7] shrink-0">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <span
          className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full text-white shadow-md"
          style={{ backgroundColor: post.accentColor }}
        >
          {post.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3
          className="text-[#1A1A1A] font-bold text-lg leading-snug mb-2.5 group-hover:text-amber-700 transition-colors duration-200 flex-1"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {post.title}
        </h3>
        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#F0EDE7]">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              style={{ backgroundColor: post.accentColor }}
            >
              {post.initials}
            </div>
            <div>
              <p className="text-[#1A1A1A] text-xs font-semibold leading-tight">
                {post.author}
              </p>
              <p className="text-[#9B9B9B] text-[10px]">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#9B9B9B] text-xs">
            <FaClock size={10} className="text-amber-400" />
            <span>{post.readTime} read</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const FeaturedCard = ({ post }: { post: Post }) => {
  return (
    <article className="group relative rounded-3xl overflow-hidden cursor-pointer h-105 md:h-120">
      <img
        src={post.image}
        alt={post.imageAlt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <span
          className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full text-white mb-4"
          style={{ backgroundColor: post.accentColor }}
        >
          {post.category}
        </span>
        <h2
          className="text-white text-3xl md:text-4xl font-bold leading-snug mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {post.title}
        </h2>
        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xl">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: post.accentColor }}
            >
              {post.initials}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{post.author}</p>
              <div className="flex items-center gap-1.5">
                <FaShieldAlt size={9} className="text-amber-400" />
                <p className="text-white/40 text-xs">{post.role}</p>
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium group-hover:gap-3 transition-all duration-200">
            Read article <FaArrowRight size={12} />
          </span>
        </div>
      </div>
    </article>
  );
};

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const featured = ALL_POSTS.find((p) => p.featured)!;

  const filtered = useMemo(() => {
    return ALL_POSTS.filter((p) => {
      const matchCat =
        activeCategory === "All" || p.category === activeCategory;
      const matchQ =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        p.author.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [activeCategory, query]);

  const gridPosts = filtered.filter(
    (p) => !p.featured || activeCategory !== "All" || query !== "",
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <section className="bg-[#0C0C0C] pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-125 h-125 rounded-full bg-amber-500/5 blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-3">
            The Inscribe Journal
          </p>
          <h1
            className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Stories worth reading.
          </h1>
          <p className="text-white/40 text-lg max-w-xl mb-10">
            Curated posts from verified authors across design, engineering,
            writing, and culture.
          </p>

          <div className="relative max-w-md">
            <FaSearch
              size={13}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts, authors…"
              className="w-full bg-white/6 border border-white/10 rounded-full pl-10 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 focus:bg-white/8 transition-all duration-200"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="bg-[#0C0C0C] border-b border-white/6 px-6 pb-5">
        <div className="max-w-6xl mx-auto flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-amber-400 text-[#0C0C0C]"
                    : "bg-white/5 text-white/50 hover:text-white hover:bg-white/8 border border-white/8"
                }`}
              >
                {cat}
                {cat !== "All" && isActive && (
                  <span className="ml-1.5 opacity-60">
                    ({ALL_POSTS.filter((p) => p.category === cat).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <main className="bg-[#F8F6F1] px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {activeCategory === "All" && query === "" && (
            <div className="mb-12">
              <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-5">
                Featured Post
              </p>
              <FeaturedCard post={featured} />
            </div>
          )}

          {(query || activeCategory !== "All") && (
            <p className="text-[#6B6B6B] text-sm mb-8">
              Showing{" "}
              <span className="text-[#1A1A1A] font-semibold">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "post" : "posts"}
              {activeCategory !== "All" && (
                <>
                  {" "}
                  in{" "}
                  <span className="text-[#1A1A1A] font-semibold">
                    {activeCategory}
                  </span>
                </>
              )}
              {query && (
                <>
                  {" "}
                  for "
                  <span className="text-[#1A1A1A] font-semibold">{query}</span>"
                </>
              )}
            </p>
          )}

          {gridPosts.length > 0 ? (
            <>
              {activeCategory === "All" && query === "" && (
                <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-5">
                  Latest Posts
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCategory === "All" && query === ""
                  ? gridPosts
                  : filtered
                ).map((post, i) => (
                  <PostCard key={post.id} post={post} delay={i * 60} />
                ))}
              </div>

              <div className="mt-14 text-center">
                <button className="inline-flex items-center gap-2 bg-white border border-[#E8E4DC] hover:border-amber-300 text-[#1A1A1A] font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-100 text-sm">
                  Load more posts
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🔍</p>
              <h3
                className="text-[#1A1A1A] text-2xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                No posts found
              </h3>
              <p className="text-[#6B6B6B] text-sm">
                Try a different search term or category.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                className="mt-6 text-amber-600 text-sm font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      <section className="bg-[#0C0C0C] px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-white text-3xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Have a story to tell?
            </h3>
            <p className="text-white/40 text-sm">
              Get verified and publish your first post today.
            </p>
          </div>
          <Link
            to="/signup"
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
