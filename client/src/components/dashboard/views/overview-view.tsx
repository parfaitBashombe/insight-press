import { FaEye, FaFeatherAlt, FaArrowRight } from "react-icons/fa";
import { STATS, POSTS } from "@/components/dashboard/mock-data";
import type { View } from "@/components/dashboard/types";

interface Props {
  navigate: (v: View) => void;
}

export const OverviewView = ({ navigate }: Props) => (
  <div className="max-w-6xl mx-auto space-y-8">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-full bg-amber-400 flex items-center justify-center text-sm font-bold text-[#0C0C0C] shrink-0">
        AO
      </div>
      <div>
        <p className="text-white/30 text-xs">Good morning,</p>
        <h1 className="text-white text-xl sm:text-2xl font-bold font-playfair">
          Amara Osei
        </h1>
      </div>
      <div className="ml-auto hidden sm:flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1.5">
        <FaFeatherAlt size={9} className="text-amber-400" />
        <span className="text-amber-400 text-[10px] font-semibold">Verified Author</span>
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
            style={{ backgroundColor: `${stat.color}22`, color: stat.color }}
          >
            {stat.icon}
          </div>
          <p className="text-white text-xl sm:text-2xl font-bold mb-0.5">{stat.value}</p>
          <p className="text-white/35 text-xs mb-2">{stat.label}</p>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
          >
            {stat.delta} this month
          </span>
        </div>
      ))}
    </div>

    <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-base font-playfair">Recent Posts</h3>
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
              <p className="text-white/25 text-xs mt-0.5">{post.date}</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              {post.status === "published" ? (
                <>
                  <span className="flex items-center gap-1 text-white/30 text-xs">
                    <FaEye size={10} /> {post.views.toLocaleString()}
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
        <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-1">Ready to write?</p>
        <p className="text-white text-lg sm:text-xl font-bold font-playfair">Start your next piece.</p>
        <p className="text-white/40 text-sm mt-1">Your last draft was saved 2 days ago.</p>
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
