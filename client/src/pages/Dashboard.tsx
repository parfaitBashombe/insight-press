/* eslint-disable react-hooks/static-components */
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  FaPen,
  FaFeatherAlt,
  FaArrowRight,
  FaCheck,
  FaEye,
  FaBookOpen,
  FaUsers,
  FaClock,
} from "react-icons/fa";
import {
  FaHouse,
  FaChartLine,
  FaGear,
  FaPlus,
  FaList,
  FaBars,
  FaXmark,
  FaTag,
  FaFloppyDisk,
  FaPaperPlane,
  FaTrash,
  FaEllipsis,
} from "react-icons/fa6";

type View = "overview" | "new-post" | "my-posts" | "analytics";

const STATS = [
  {
    label: "Total Views",
    value: "24,831",
    delta: "+12%",
    icon: <FaEye size={15} />,
    color: "#E8A838",
  },
  {
    label: "Followers",
    value: "1,204",
    delta: "+8%",
    icon: <FaUsers size={15} />,
    color: "#5B8DEF",
  },
  {
    label: "Posts Published",
    value: "38",
    delta: "+3",
    icon: <FaBookOpen size={15} />,
    color: "#3DBDA7",
  },
  {
    label: "Avg. Read Time",
    value: "4m 12s",
    delta: "+0:24",
    icon: <FaClock size={15} />,
    color: "#E87B5B",
  },
];

const POSTS = [
  {
    id: 1,
    title: "The Invisible Grid: How Whitespace Shapes Reader Trust",
    views: 3240,
    status: "published",
    date: "Mar 28, 2026",
    readTime: "5 min",
  },
  {
    id: 2,
    title: "Building for the Long Run: Why Boring Tech Wins",
    views: 1870,
    status: "published",
    date: "Mar 21, 2026",
    readTime: "7 min",
  },
  {
    id: 3,
    title: "The First Sentence Is Everything",
    views: 5120,
    status: "published",
    date: "Mar 14, 2026",
    readTime: "4 min",
  },
  {
    id: 4,
    title: "Notes on Creative Exhaustion",
    views: 0,
    status: "draft",
    date: "Apr 1, 2026",
    readTime: "—",
  },
  {
    id: 5,
    title: "Why I Stopped Using AI for First Drafts",
    views: 0,
    status: "draft",
    date: "Apr 2, 2026",
    readTime: "—",
  },
];

const ANALYTICS_DATA = [
  { month: "Oct", views: 1200 },
  { month: "Nov", views: 1800 },
  { month: "Dec", views: 1400 },
  { month: "Jan", views: 2100 },
  { month: "Feb", views: 3200 },
  { month: "Mar", views: 4800 },
];

const MAX_VIEWS = Math.max(...ANALYTICS_DATA.map((d) => d.views));

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

const NavItem = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
        : "text-white/40 hover:text-white/70 hover:bg-white/4"
    }`}
  >
    <span className={active ? "text-amber-400" : "text-white/30"}>{icon}</span>
    {label}
    {active && <FaCheck size={9} className="text-amber-400 ml-auto" />}
  </button>
);

const DashboardPage = () => {
  const [view, setView] = useState<View>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  //   const [postTags, setPostTags] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [publishedToast, setPublishedToast] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [postMenuOpen, setPostMenuOpen] = useState<number | null>(null);

  const wordCount = postContent
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() && tags.length < 5) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag));

  const triggerToast = (type: "publish" | "save") => {
    if (type === "publish") {
      setPublishedToast(true);
      setTimeout(() => setPublishedToast(false), 3000);
    } else {
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    }
  };

  const navigate = (v: View) => {
    setView(v);
    setSidebarOpen(false);
  };

  const navItems: { icon: React.ReactNode; label: string; id: View }[] = [
    { icon: <FaHouse size={14} />, label: "Overview", id: "overview" },
    { icon: <FaPlus size={14} />, label: "New Post", id: "new-post" },
    { icon: <FaList size={14} />, label: "My Posts", id: "my-posts" },
    { icon: <FaChartLine size={14} />, label: "Analytics", id: "analytics" },
  ];

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`${
        mobile ? "flex flex-col h-full" : "hidden lg:flex flex-col h-full"
      } w-64 bg-[#0C0C0C] border-r border-white/6 px-4 py-6 shrink-0`}
    >
      <Link to="/" className="flex items-center gap-2.5 mb-8 group w-fit">
        <span className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <FaPen size={13} className="text-[#0C0C0C]" />
        </span>
        <span
          className="text-white text-lg font-semibold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Insight Press
        </span>
      </Link>

      <p className="text-white/20 text-[10px] font-semibold tracking-widest uppercase mb-3 px-1">
        Workspace
      </p>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={view === item.id}
            onClick={() => navigate(item.id)}
          />
        ))}
      </nav>

      <div className="border-t border-white/6 pt-4 mt-4 space-y-1">
        <NavItem
          icon={<FaGear size={14} />}
          label="Settings"
          active={false}
          onClick={() => {}}
        />
      </div>

      <div className="mt-4 p-3 bg-white/4 border border-white/8 rounded-xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-[#0C0C0C] shrink-0">
          AO
        </div>
        <div className="min-w-0">
          <p className="text-white/80 text-xs font-semibold truncate">
            Amara Osei
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <FaFeatherAlt size={8} className="text-amber-400" />
            <p className="text-white/30 text-[10px]">Verified Author</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-[#0C0C0C] flex flex-col"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        .ql-container.ql-snow { border: none !important; font-family: 'DM Sans', sans-serif; }
        .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; background: rgba(255,255,255,0.03); border-radius: 12px 12px 0 0; padding: 10px 12px !important; }
        .ql-snow .ql-stroke { stroke: rgba(255,255,255,0.35) !important; }
        .ql-snow .ql-fill { fill: rgba(255,255,255,0.35) !important; }
        .ql-snow .ql-picker { color: rgba(255,255,255,0.35) !important; }
        .ql-snow .ql-picker-options { background: #1a1a1a !important; border: 1px solid rgba(255,255,255,0.08) !important; border-radius: 8px !important; }
        .ql-snow .ql-picker-item { color: rgba(255,255,255,0.6) !important; }
        .ql-snow .ql-picker-item:hover { color: #FBBF24 !important; }
        .ql-toolbar.ql-snow .ql-formats button:hover .ql-stroke { stroke: #FBBF24 !important; }
        .ql-toolbar.ql-snow .ql-formats button.ql-active .ql-stroke { stroke: #FBBF24 !important; }
        .ql-toolbar.ql-snow .ql-formats button:hover .ql-fill { fill: #FBBF24 !important; }
        .ql-toolbar.ql-snow .ql-formats button.ql-active .ql-fill { fill: #FBBF24 !important; }
        .ql-editor { min-height: 340px; color: rgba(255,255,255,0.8) !important; font-size: 15px !important; line-height: 1.8 !important; padding: 20px 24px !important; }
        .ql-editor.ql-blank::before { color: rgba(255,255,255,0.2) !important; font-style: normal !important; font-size: 15px; }
        .ql-editor h1, .ql-editor h2, .ql-editor h3 { color: white !important; font-family: 'Playfair Display', serif !important; }
        .ql-editor p { color: rgba(255,255,255,0.75) !important; }
        .ql-editor blockquote { border-left: 3px solid #FBBF24 !important; color: rgba(255,255,255,0.5) !important; padding-left: 16px !important; margin: 16px 0 !important; }
        .ql-editor a { color: #FBBF24 !important; }
        .ql-snow .ql-editor pre.ql-syntax { background: rgba(255,255,255,0.05) !important; color: rgba(255,255,255,0.8) !important; border-radius: 8px !important; }
      `}</style>

      {publishedToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-green-500/10 border border-green-500/25 text-green-400 px-5 py-3.5 rounded-2xl text-sm font-medium shadow-2xl backdrop-blur-sm">
          <FaCheck size={12} />
          Post published successfully
        </div>
      )}
      {savedToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-white/5 border border-white/10 text-white/70 px-5 py-3.5 rounded-2xl text-sm font-medium shadow-2xl backdrop-blur-sm">
          <FaFloppyDisk size={12} />
          Draft saved
        </div>
      )}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar mobile />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <header className="sticky top-0 z-20 bg-[#0C0C0C]/90 backdrop-blur-sm border-b border-white/6 px-5 sm:px-8 py-4 flex items-center gap-4">
            <button
              className="lg:hidden text-white/40 hover:text-white/70 transition-colors p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={18} />
            </button>
            <div className="flex-1 min-w-0">
              <h2
                className="text-white text-base sm:text-lg font-bold truncate"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {view === "overview" && "Overview"}
                {view === "new-post" && "New Post"}
                {view === "my-posts" && "My Posts"}
                {view === "analytics" && "Analytics"}
              </h2>
            </div>
            <button
              onClick={() => navigate("new-post")}
              className="hidden sm:inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-5 py-2.5 rounded-full text-xs transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20 shrink-0"
            >
              <FaPlus size={11} />
              New Post
            </button>
          </header>

          <main className="flex-1 px-5 sm:px-8 py-8">
            {view === "overview" && (
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-amber-400 flex items-center justify-center text-sm font-bold text-[#0C0C0C] shrink-0">
                    AO
                  </div>
                  <div>
                    <p className="text-white/30 text-xs">Good morning,</p>
                    <h1
                      className="text-white text-xl sm:text-2xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Amara Osei
                    </h1>
                  </div>
                  <div className="ml-auto hidden sm:flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1.5">
                    <FaFeatherAlt size={9} className="text-amber-400" />
                    <span className="text-amber-400 text-[10px] font-semibold">
                      Verified Author
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {STATS.map((stat) => (
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
                      <p className="text-white/35 text-xs mb-2">{stat.label}</p>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${stat.color}18`,
                          color: stat.color,
                        }}
                      >
                        {stat.delta} this month
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3
                      className="text-white font-bold text-base"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Recent Posts
                    </h3>
                    <button
                      onClick={() => navigate("my-posts")}
                      className="text-amber-400 text-xs font-semibold hover:text-amber-300 transition-colors flex items-center gap-1"
                    >
                      View all <FaArrowRight size={10} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {POSTS.slice(0, 4).map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/4 transition-colors duration-150 group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">
                            {post.title}
                          </p>
                          <p className="text-white/25 text-xs mt-0.5">
                            {post.date}
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 shrink-0">
                          {post.status === "published" ? (
                            <>
                              <span className="flex items-center gap-1 text-white/30 text-xs">
                                <FaEye size={10} />
                                {post.views.toLocaleString()}
                              </span>
                              <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-medium">
                                Published
                              </span>
                            </>
                          ) : (
                            <span className="text-[10px] bg-white/5 text-white/30 border border-white/8 px-2 py-0.5 rounded-full font-medium">
                              Draft
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-linear-to-br from-amber-400/8 to-amber-500/4 border border-amber-400/15 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-1">
                      Ready to write?
                    </p>
                    <p
                      className="text-white text-lg sm:text-xl font-bold"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Start your next piece.
                    </p>
                    <p className="text-white/40 text-sm mt-1">
                      Your last draft was saved 2 days ago.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("new-post")}
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:shadow-xl hover:shadow-amber-400/25 shrink-0"
                  >
                    Open editor
                    <FaArrowRight size={12} />
                  </button>
                </div>
              </div>
            )}

            {view === "new-post" && (
              <div className="max-w-3xl mx-auto space-y-5">
                <div>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Post title…"
                    className="w-full bg-transparent border-none outline-none text-white text-2xl sm:text-3xl font-bold placeholder-white/15"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 bg-white/6 border border-white/10 text-white/50 text-xs px-3 py-1 rounded-full"
                    >
                      <FaTag size={8} className="text-amber-400" />
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-white/30 hover:text-white/60 ml-0.5"
                      >
                        <FaXmark size={9} />
                      </button>
                    </span>
                  ))}
                  {tags.length < 5 && (
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Add tag… (press Enter)"
                      className="bg-transparent outline-none text-white/40 text-xs placeholder-white/20 min-w-32"
                    />
                  )}
                </div>

                <div className="border border-white/8 rounded-2xl overflow-hidden bg-white/3">
                  <ReactQuill
                    theme="snow"
                    value={postContent}
                    onChange={setPostContent}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Begin writing your story…"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-white/25 text-xs">
                    <FaFeatherAlt size={10} className="text-amber-400/50" />
                    <span>
                      {wordCount} {wordCount === 1 ? "word" : "words"}
                    </span>
                    {wordCount > 0 && (
                      <>
                        <span>·</span>
                        <span>
                          ~{Math.max(1, Math.ceil(wordCount / 200))} min read
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => triggerToast("save")}
                      className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/80 font-medium px-4 py-2.5 rounded-full text-xs transition-all duration-200 touch-manipulation"
                    >
                      <FaFloppyDisk size={11} />
                      <span className="hidden sm:inline">Save draft</span>
                    </button>
                    <button
                      onClick={() => triggerToast("publish")}
                      disabled={!postTitle.trim() || !postContent.trim()}
                      className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-[#0C0C0C] font-bold px-5 py-2.5 rounded-full text-xs transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20 touch-manipulation"
                    >
                      <FaPaperPlane size={11} />
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            )}

            {view === "my-posts" && (
              <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    {(["All", "Published", "Drafts"] as const).map((f) => (
                      <button
                        key={f}
                        className="text-xs px-4 py-2 rounded-full border border-white/8 text-white/40 hover:text-white/70 hover:border-white/20 transition-all duration-150"
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate("new-post")}
                    className="ml-auto inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-4 py-2 rounded-full text-xs transition-all duration-200"
                  >
                    <FaPlus size={10} />
                    New Post
                  </button>
                </div>

                <div className="space-y-2">
                  {POSTS.map((post) => (
                    <div
                      key={post.id}
                      className="group bg-white/4 hover:bg-white/[0.07] border border-white/6 rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-200"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="text-white/25 text-xs">
                            {post.date}
                          </span>
                          {post.status === "published" && (
                            <>
                              <span className="text-white/15 text-xs">·</span>
                              <span className="flex items-center gap-1 text-white/25 text-xs">
                                <FaEye size={9} />
                                {post.views.toLocaleString()} views
                              </span>
                              <span className="text-white/15 text-xs">·</span>
                              <span className="text-white/25 text-xs">
                                {post.readTime} read
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                            post.status === "published"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-white/5 text-white/30 border-white/8"
                          }`}
                        >
                          {post.status === "published" ? "Published" : "Draft"}
                        </span>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setPostMenuOpen(
                                postMenuOpen === post.id ? null : post.id,
                              )
                            }
                            className="text-white/20 hover:text-white/50 transition-colors p-1"
                          >
                            <FaEllipsis size={14} />
                          </button>
                          {postMenuOpen === post.id && (
                            <div className="absolute right-0 top-full mt-1 w-36 bg-[#1a1a1a] border border-white/8 rounded-xl shadow-2xl z-10 overflow-hidden">
                              <button
                                onClick={() => {
                                  navigate("new-post");
                                  setPostMenuOpen(null);
                                }}
                                className="w-full text-left px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 text-xs transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setPostMenuOpen(null)}
                                className="w-full text-left px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 text-xs transition-colors"
                              >
                                Duplicate
                              </button>
                              <div className="border-t border-white/6" />
                              <button
                                onClick={() => setPostMenuOpen(null)}
                                className="w-full text-left px-4 py-2.5 text-red-400/70 hover:text-red-400 hover:bg-red-500/5 text-xs transition-colors flex items-center gap-2"
                              >
                                <FaTrash size={10} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view === "analytics" && (
              <div className="max-w-5xl mx-auto space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/4 border border-white/8 rounded-2xl p-4 sm:p-5"
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

                <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
                  <h3
                    className="text-white font-bold text-base mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Views over the last 6 months
                  </h3>
                  <div className="flex items-end gap-2 sm:gap-3 h-44">
                    {ANALYTICS_DATA.map((d) => (
                      <div
                        key={d.month}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <span className="text-white/30 text-[10px]">
                          {d.views >= 1000
                            ? `${(d.views / 1000).toFixed(1)}k`
                            : d.views}
                        </span>
                        <div
                          className="w-full rounded-t-lg bg-amber-400/15 relative overflow-hidden group transition-all duration-300 hover:bg-amber-400/25"
                          style={{ height: `${(d.views / MAX_VIEWS) * 140}px` }}
                        >
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-amber-400/60 rounded-t-lg transition-all duration-700"
                            style={{ height: "100%" }}
                          />
                        </div>
                        <span className="text-white/20 text-[10px]">
                          {d.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
                  <h3
                    className="text-white font-bold text-base mb-5"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Top performing posts
                  </h3>
                  <div className="space-y-4">
                    {POSTS.filter((p) => p.status === "published")
                      .sort((a, b) => b.views - a.views)
                      .map((post, i) => (
                        <div key={post.id} className="flex items-center gap-4">
                          <span
                            className="text-xs font-bold w-5 shrink-0 text-center"
                            style={{
                              color:
                                i === 0 ? "#E8A838" : "rgba(255,255,255,0.2)",
                            }}
                          >
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-white/70 text-sm truncate">
                              {post.title}
                            </p>
                            <div className="mt-1.5 w-full bg-white/5 rounded-full h-1">
                              <div
                                className="h-1 rounded-full bg-amber-400/50"
                                style={{
                                  width: `${(post.views / 5120) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-white/35 text-xs shrink-0">
                            {post.views.toLocaleString()} views
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
