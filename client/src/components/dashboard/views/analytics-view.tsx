import { STATS, POSTS, ANALYTICS_DATA, MAX_VIEWS } from "@/components/dashboard/mock-data";

export const AnalyticsView = () => (
  <div className="max-w-6xl mx-auto space-y-8">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/4 border border-white/8 rounded-2xl p-4 sm:p-5"
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
            style={{ backgroundColor: `${stat.color}22`, color: stat.color }}
          >
            {stat.icon}
          </div>
          <p className="text-white text-xl sm:text-2xl font-bold mb-0.5">{stat.value}</p>
          <p className="text-white/35 text-xs">{stat.label}</p>
        </div>
      ))}
    </div>

    <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
      <h3 className="text-white font-bold text-base mb-6 font-playfair">
        Views over the last 6 months
      </h3>
      <div className="flex items-end gap-2 sm:gap-3 h-44">
        {ANALYTICS_DATA.map((d) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
            <span className="text-white/30 text-[10px]">
              {d.views >= 1000 ? `${(d.views / 1000).toFixed(1)}k` : d.views}
            </span>
            <div
              className="w-full rounded-t-lg bg-amber-400/15 relative overflow-hidden group transition-all duration-300 hover:bg-amber-400/25"
              style={{ height: `${(d.views / MAX_VIEWS) * 140}px` }}
            >
              <div className="absolute bottom-0 left-0 right-0 bg-amber-400/60 rounded-t-lg transition-all duration-700" style={{ height: "100%" }} />
            </div>
            <span className="text-white/20 text-[10px]">{d.month}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
      <h3 className="text-white font-bold text-base mb-5 font-playfair">
        Top performing posts
      </h3>
      <div className="space-y-4">
        {POSTS.filter((p) => p.status === "published")
          .sort((a, b) => b.views - a.views)
          .map((post, i) => (
            <div key={post.id} className="flex items-center gap-4">
              <span
                className="text-xs font-bold w-5 shrink-0 text-center"
                style={{ color: i === 0 ? "#E8A838" : "rgba(255,255,255,0.2)" }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white/70 text-sm truncate">{post.title}</p>
                <div className="mt-1.5 w-full bg-white/5 rounded-full h-1">
                  <div
                    className="h-1 rounded-full bg-amber-400/50"
                    style={{ width: `${(post.views / 5120) * 100}%` }}
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
);
