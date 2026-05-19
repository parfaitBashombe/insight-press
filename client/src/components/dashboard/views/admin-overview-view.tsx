import { useEffect, useState } from "react";
import { FaUsers, FaBookOpen, FaUserClock } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { getAdminStats } from "@/lib/api/admin";
import type { AdminStats } from "@/types/admin";
import type { AdminView } from "@/components/dashboard/types";

interface Props {
  navigate: (v: AdminView) => void;
}

export const AdminOverviewView = ({ navigate }: Props) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then((res) => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        {
          label: "Total Users",
          value: stats.users.total,
          sub: `${stats.users.active} active · ${stats.users.suspended} suspended`,
          icon: <FaUsers size={15} />,
          color: "#5B8DEF",
        },
        {
          label: "Total Articles",
          value: stats.articles.total,
          sub: `${stats.articles.published} published · ${stats.articles.drafts} drafts`,
          icon: <FaBookOpen size={15} />,
          color: "#3DBDA7",
        },
        {
          label: "Pending Promotions",
          value: stats.promotionRequests.pending,
          sub: "Awaiting your review",
          icon: <FaUserClock size={15} />,
          color: "#E8A838",
          action: () => navigate("admin-promotions"),
        },
      ]
    : [];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-white text-2xl font-bold font-playfair">Platform Overview</h1>
        <p className="text-white/40 text-sm mt-1">Live stats for the Insight Press platform.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/4 border border-white/8 rounded-2xl p-5 animate-pulse h-28" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((s) => (
            <div
              key={s.label}
              onClick={s.action}
              className={`bg-white/4 border border-white/8 rounded-2xl p-5 hover:bg-white/[0.07] transition-colors duration-200 ${s.action ? "cursor-pointer" : ""}`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${s.color}22`, color: s.color }}
              >
                {s.icon}
              </div>
              <p className="text-white text-2xl font-bold mb-0.5">{s.value}</p>
              <p className="text-white/35 text-xs mb-1">{s.label}</p>
              <p className="text-white/25 text-[11px]">{s.sub}</p>
              {s.action && (
                <div className="mt-3 flex items-center gap-1 text-amber-400 text-xs font-medium">
                  Review <FaArrowRight size={9} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => navigate("admin-users")}
          className="bg-white/4 border border-white/8 rounded-2xl p-6 hover:bg-white/[0.07] cursor-pointer transition-colors duration-200 group"
        >
          <FaUsers size={20} className="text-amber-400 mb-4" />
          <h3 className="text-white font-bold text-base font-playfair mb-1">Manage Users</h3>
          <p className="text-white/40 text-sm mb-4">View, search, and update roles or statuses for all platform members.</p>
          <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold group-hover:gap-2.5 transition-all">
            Go to users <FaArrowRight size={10} />
          </span>
        </div>
        <div
          onClick={() => navigate("admin-promotions")}
          className="bg-white/4 border border-white/8 rounded-2xl p-6 hover:bg-white/[0.07] cursor-pointer transition-colors duration-200 group"
        >
          <FaUserClock size={20} className="text-amber-400 mb-4" />
          <h3 className="text-white font-bold text-base font-playfair mb-1">Promotion Requests</h3>
          <p className="text-white/40 text-sm mb-4">Review reader applications to become verified writers on the platform.</p>
          <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold group-hover:gap-2.5 transition-all">
            Review requests <FaArrowRight size={10} />
          </span>
        </div>
      </div>
    </div>
  );
};
