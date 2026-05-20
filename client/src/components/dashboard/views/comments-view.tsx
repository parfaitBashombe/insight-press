import { FaFeatherAlt } from "react-icons/fa";

export const CommentsView = () => (
  <div className="max-w-6xl mx-auto space-y-6">
    <div className="bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-lg font-playfair">Comments</h3>
      </div>

      <div className="py-16 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-400/6 border border-amber-400/10 flex items-center justify-center">
          <FaFeatherAlt size={24} className="text-amber-400/30" />
        </div>
        <div>
          <p className="text-white/40 text-base font-bold font-playfair mb-2">Comments coming soon</p>
          <p className="text-white/20 text-sm max-w-sm leading-relaxed">
            Reader comments on your articles will appear here. This feature is currently in development.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white/2 border border-white/6 rounded-2xl p-4 flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-white/4 flex items-center justify-center shrink-0">
        <FaFeatherAlt size={11} className="text-amber-400/40" />
      </div>
      <p className="text-white/20 text-xs leading-relaxed">
        When live, you'll be able to moderate, approve, reply to, and delete comments directly from this panel.
      </p>
    </div>
  </div>
);
