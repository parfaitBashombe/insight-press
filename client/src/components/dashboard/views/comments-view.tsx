import { FaTag } from "react-icons/fa6";
import { COMMENTS } from "@/components/dashboard/mock-data";

export const CommentsView = () => (
  <div className="max-w-6xl mx-auto space-y-6">
    <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-lg font-playfair">Recent Comments</h3>
      </div>
      <div className="space-y-4">
        {COMMENTS.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/[0.07] transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                  {comment.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{comment.author}</p>
                  <p className="text-white/30 text-[10px]">{comment.date}</p>
                </div>
              </div>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                  comment.status === "approved"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-amber-400/10 text-amber-400"
                }`}
              >
                {comment.status}
              </span>
            </div>
            <p className="text-white/70 text-sm italic border-l-2 border-[#E8A838] pl-3 mb-3">
              "{comment.content}"
            </p>
            <p className="text-white/30 text-xs flex items-center gap-1.5 mb-4">
              <FaTag size={10} className="text-amber-400/50" /> On:{" "}
              <span className="text-white/50">{comment.postTitle}</span>
            </p>
            <div className="flex items-center gap-2">
              {comment.status !== "approved" && (
                <button className="text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1.5 rounded-lg transition-colors font-semibold">
                  Approve
                </button>
              )}
              <button className="text-xs bg-white/5 hover:bg-white/10 text-white/70 px-3 py-1.5 rounded-lg transition-colors">
                Reply
              </button>
              <button className="text-xs text-red-400/70 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors ml-auto">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
