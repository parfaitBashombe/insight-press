import { useState } from "react";
import { FaFeatherAlt, FaArrowRight } from "react-icons/fa";
import { requestPromotion } from "@/lib/api/auth";

export const ReaderOverviewView = () => {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (reason.trim().length < 20) {
      setError("Please write at least 20 characters explaining why you'd like to become a writer.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await requestPromotion({ requested_role: "WRITER", reason: reason.trim() });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
            <FaFeatherAlt size={22} className="text-green-400" />
          </div>
          <h2 className="text-white text-xl font-bold font-playfair mb-2">Application Submitted</h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Your request to become a verified writer has been sent for review. You'll be notified once an admin has reviewed your application — typically within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-gradient-to-br from-amber-400/8 to-amber-500/4 border border-amber-400/15 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center">
            <FaFeatherAlt size={16} className="text-amber-400" />
          </div>
          <div>
            <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Your Current Status</p>
            <h2 className="text-white text-lg font-bold font-playfair">Reader Account</h2>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          You can read and explore all published content on Insight Press. To publish your own articles, apply to become a verified writer.
        </p>
      </div>

      <div className="bg-white/4 border border-white/8 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-white font-bold text-lg font-playfair mb-1">Apply to Become a Writer</h3>
          <p className="text-white/40 text-sm">Tell us why you want to publish on Insight Press. Our team reviews every application.</p>
        </div>

        <div className="space-y-2">
          <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
            Your Reason <span className="text-amber-400">*</span>
          </label>
          <textarea
            rows={5}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe your writing background, the topics you'd cover, and why you'd be a valuable contributor to the platform…"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors resize-none placeholder-white/20"
          />
          <div className="flex items-center justify-between">
            <p className="text-white/25 text-xs">{reason.length} characters (min. 20)</p>
            {error && <p className="text-red-400 text-xs">{error}</p>}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting || reason.trim().length < 20}
          className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-[#0C0C0C] font-bold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20"
        >
          {submitting ? "Submitting…" : "Submit Application"}
          {!submitting && <FaArrowRight size={12} />}
        </button>
      </div>
    </div>
  );
};
