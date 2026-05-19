import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { getPromotionRequests, approvePromotion, rejectPromotion } from "@/lib/api/admin";
import type { PromotionRequest } from "@/types/admin";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  APPROVED: "bg-green-500/10 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export const AdminPromotionsView = () => {
  const [requests, setRequests] = useState<PromotionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);

  const fetchRequests = () => {
    setLoading(true);
    getPromotionRequests()
      .then((res) => setRequests(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handle = async (id: string, action: "approve" | "reject") => {
    setActing(id);
    try {
      if (action === "approve") {
        await approvePromotion(id);
      } else {
        await rejectPromotion(id);
      }
      fetchRequests();
    } catch {
    } finally {
      setActing(null);
    }
  };

  const pending = requests.filter((r) => r.status === "PENDING");
  const reviewed = requests.filter((r) => r.status !== "PENDING");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-white font-bold text-xl font-playfair">Promotion Requests</h2>
        <p className="text-white/40 text-sm mt-1">
          Review reader applications to become verified writers.
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/4 border border-white/8 rounded-2xl h-28 animate-pulse" />
          ))}
        </div>
      ) : pending.length === 0 && reviewed.length === 0 ? (
        <div className="text-center py-20 text-white/30 text-sm">No promotion requests yet.</div>
      ) : (
        <>
          {pending.length > 0 && (
            <div className="space-y-3">
              <p className="text-white/30 text-[10px] font-semibold tracking-widest uppercase">
                Pending ({pending.length})
              </p>
              {pending.map((req) => (
                <div
                  key={req.promotion_request_id}
                  className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-[#0C0C0C] shrink-0">
                      {req.user.fullname.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-white/80 text-sm font-semibold">{req.user.fullname}</p>
                        <span className="text-white/25 text-xs">·</span>
                        <p className="text-white/40 text-xs">{req.user.email}</p>
                      </div>
                      <p className="text-white/30 text-xs mb-3">
                        Current role: <span className="text-amber-400">{req.user.role.name}</span>
                        {" → "}
                        Requesting: <span className="text-amber-400">{req.role.name}</span>
                      </p>
                      <div className="bg-white/4 border border-white/6 rounded-xl px-4 py-3">
                        <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5">Reason</p>
                        <p className="text-white/70 text-sm leading-relaxed">{req.reason}</p>
                      </div>
                      <p className="text-white/20 text-[11px] mt-3">
                        Submitted {new Date(req.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <button
                        onClick={() => handle(req.promotion_request_id, "approve")}
                        disabled={acting === req.promotion_request_id}
                        className="inline-flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 font-semibold px-4 py-2 rounded-xl text-xs transition-all disabled:opacity-50"
                      >
                        <FaCheck size={10} /> Approve
                      </button>
                      <button
                        onClick={() => handle(req.promotion_request_id, "reject")}
                        disabled={acting === req.promotion_request_id}
                        className="inline-flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-semibold px-4 py-2 rounded-xl text-xs transition-all disabled:opacity-50"
                      >
                        <FaXmark size={11} /> Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {reviewed.length > 0 && (
            <div className="space-y-3">
              <p className="text-white/30 text-[10px] font-semibold tracking-widest uppercase">
                Reviewed ({reviewed.length})
              </p>
              {reviewed.map((req) => (
                <div
                  key={req.promotion_request_id}
                  className="bg-white/[0.02] border border-white/6 rounded-2xl px-5 py-4 flex items-center gap-4 opacity-60"
                >
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/50 shrink-0">
                    {req.user.fullname.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-sm font-medium truncate">{req.user.fullname}</p>
                    <p className="text-white/25 text-xs">{req.user.email}</p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${STATUS_STYLES[req.status]}`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
