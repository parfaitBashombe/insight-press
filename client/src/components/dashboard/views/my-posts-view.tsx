import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaPlus, FaEllipsis, FaTrash } from "react-icons/fa6";
import { POSTS } from "@/components/dashboard/mock-data";
import type { View } from "@/components/dashboard/types";

interface Props {
  navigate: (v: View) => void;
}

export const MyPostsView = ({ navigate }: Props) => {
  const [postFilter, setPostFilter] = useState<"All" | "Published" | "Drafts">("All");
  const [postMenuOpen, setPostMenuOpen] = useState<number | null>(null);

  const filteredPosts = POSTS.filter(
    (p) => postFilter === "All" || p.status.toLowerCase() === postFilter.toLowerCase()
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          {(["All", "Published", "Drafts"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setPostFilter(f)}
              className={`text-xs px-4 py-2 rounded-full border transition-all duration-150 ${
                postFilter === f
                  ? "bg-white/10 text-white border-white/20"
                  : "border-white/8 text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate("new-post")}
          className="ml-auto inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-4 py-2 rounded-full text-xs transition-all duration-200"
        >
          <FaPlus size={10} /> New Post
        </button>
      </div>

      <div className="space-y-2">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="group bg-white/4 hover:bg-white/[0.07] border border-white/6 rounded-2xl px-5 py-4 flex items-center gap-4 transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-sm font-medium truncate group-hover:text-white transition-colors">
                {post.title}
              </p>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="text-white/25 text-xs">{post.date}</span>
                {post.status === "published" && (
                  <>
                    <span className="text-white/15 text-xs">·</span>
                    <span className="flex items-center gap-1 text-white/25 text-xs">
                      <FaEye size={9} /> {post.views.toLocaleString()} views
                    </span>
                    <span className="text-white/15 text-xs">·</span>
                    <span className="text-white/25 text-xs">{post.readTime} read</span>
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
                    setPostMenuOpen(postMenuOpen === post.id ? null : post.id)
                  }
                  className="text-white/20 hover:text-white/50 transition-colors p-1"
                >
                  <FaEllipsis size={14} />
                </button>
                {postMenuOpen === post.id && (
                  <div className="absolute right-0 top-full mt-1 w-36 bg-[#1a1a1a] border border-white/8 rounded-xl shadow-2xl z-10 overflow-hidden">
                    <button
                      onClick={() => { navigate("new-post"); setPostMenuOpen(null); }}
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
                      <FaTrash size={10} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
