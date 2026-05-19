import { useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaFeatherAlt,
  FaTwitter,
  FaCamera,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { updateProfile } from "@/lib/api/auth";
import { useAuth } from "@/context/AuthContext";

const ACCENT_COLORS = ["#E8A838", "#5B8DEF", "#3DBDA7", "#E87B5B", "#9B7FE8"];
const accentFor = (id: string) => ACCENT_COLORS[id.charCodeAt(0) % ACCENT_COLORS.length];
const userInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const RoleBadge = ({ role }: { role?: string }) => {
  const map: Record<string, { label: string; cls: string }> = {
    WRITER: { label: "Writer", cls: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    ADMIN: { label: "Admin", cls: "text-red-400 bg-red-400/10 border-red-400/20" },
    READER: { label: "Reader", cls: "text-white/40 bg-white/6 border-white/10" },
  };
  const s = map[role ?? "READER"] ?? map.READER;
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${s.cls}`}>
      {s.label}
    </span>
  );
};

type FormState = {
  fullname: string;
  bio: string;
  twitter: string;
  department: string;
  avatar: string;
};

type Status = "idle" | "saving" | "saved" | "error";

const ProfilePage = () => {
  const { user, loading, updateUser } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/signin" replace />;

  const color = accentFor(user.user_id);
  const displayAvatar = avatarPreview ?? user.avatar ?? null;

  const [form, setForm] = useState<FormState>({
    fullname: user.fullname ?? "",
    bio: user.bio ?? "",
    twitter: user.twitter ?? "",
    department: user.department ?? "",
    avatar: user.avatar ?? "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === "saved" || status === "error") setStatus("idle");
  };

  const handleApplyAvatar = () => {
    const trimmed = avatarUrl.trim();
    if (!trimmed) return;
    setAvatarPreview(trimmed);
    setForm((prev) => ({ ...prev, avatar: trimmed }));
    setShowAvatarInput(false);
    setAvatarUrl("");
    if (status === "saved" || status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullname.trim()) return;
    setStatus("saving");
    setErrorMsg("");
    try {
      const payload: Record<string, string> = {};
      if (form.fullname !== user.fullname) payload.fullname = form.fullname.trim();
      if (form.bio !== (user.bio ?? "")) payload.bio = form.bio.trim();
      if (form.twitter !== (user.twitter ?? "")) payload.twitter = form.twitter.trim();
      if (form.department !== (user.department ?? "")) payload.department = form.department.trim();
      if (form.avatar !== (user.avatar ?? "")) payload.avatar = form.avatar.trim();

      const res = await updateProfile(user.user_id, payload);
      updateUser(res.data);
      setAvatarPreview(null);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400/50 transition-colors placeholder-white/20";

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#0C0C0C]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div className="border-b border-white/6 px-6 py-5 flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-white/40 hover:text-white/70 transition-colors p-2 rounded-xl hover:bg-white/5"
        >
          <FaArrowLeft size={14} />
        </Link>
        <div>
          <h1 className="text-white font-bold text-lg font-playfair">My Profile</h1>
          <p className="text-white/30 text-xs">Member since {memberSince}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        {/* Avatar card */}
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl overflow-hidden">
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={user.fullname}
                  className="w-full h-full object-cover"
                  onError={() => setAvatarPreview(null)}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-2xl font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {userInitials(user.fullname)}
                </div>
              )}
            </div>
            <button
              onClick={() => { setShowAvatarInput((v) => !v); setAvatarUrl(""); }}
              className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-lg hover:bg-amber-300 transition-colors cursor-pointer"
              title="Change avatar"
            >
              <FaCamera size={11} className="text-[#0C0C0C]" />
            </button>
          </div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h2 className="text-white text-xl font-bold font-playfair mb-1">{user.fullname}</h2>
            <p className="text-white/40 text-sm mb-3">{user.email}</p>
            <RoleBadge role={user.role?.name} />
          </div>
        </div>

        {/* Avatar URL input */}
        {showAvatarInput && (
          <div className="bg-white/4 border border-amber-400/20 rounded-2xl p-5 space-y-3">
            <p className="text-white/60 text-sm font-medium">Paste an image URL</p>
            <div className="flex gap-2">
              <input
                ref={avatarInputRef}
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className={`${inputCls} flex-1`}
                autoFocus
              />
              <button
                onClick={handleApplyAvatar}
                disabled={!avatarUrl.trim()}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-[#0C0C0C] font-bold rounded-xl text-sm transition-colors cursor-pointer"
              >
                <FaCheck size={13} />
              </button>
              <button
                onClick={() => { setShowAvatarInput(false); setAvatarUrl(""); }}
                className="px-4 py-2 bg-white/8 hover:bg-white/12 text-white/60 rounded-xl text-sm transition-colors cursor-pointer"
              >
                <FaTimes size={13} />
              </button>
            </div>
            <p className="text-white/20 text-xs">
              Tip: Use a direct image link (e.g. from Gravatar, GitHub, or Unsplash).
            </p>
          </div>
        )}

        {/* Edit form */}
        <form onSubmit={handleSubmit} className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-5">
          <h3 className="text-white font-bold font-playfair text-base mb-1">Edit Profile</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                Full Name <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputCls}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="e.g. Engineering, Design"
                className={inputCls}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">Bio</label>
            <textarea
              name="bio"
              rows={3}
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell readers a little about yourself…"
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-white/50 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <FaTwitter size={11} className="text-sky-400" /> Twitter / X handle
            </label>
            <input
              type="text"
              name="twitter"
              value={form.twitter}
              onChange={handleChange}
              placeholder="@yourhandle"
              className={inputCls}
            />
          </div>

          {errorMsg && (
            <p className="text-red-400 text-sm">{errorMsg}</p>
          )}

          <div className="flex items-center justify-between pt-2">
            {status === "saved" && (
              <span className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <FaCheck size={12} /> Changes saved
              </span>
            )}
            {status !== "saved" && <span />}
            <button
              type="submit"
              disabled={status === "saving" || !form.fullname.trim()}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-[#0C0C0C] font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20 cursor-pointer"
            >
              {status === "saving" ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#0C0C0C]/30 border-t-[#0C0C0C] rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>

        {/* Info card */}
        <div className="bg-white/3 border border-white/6 rounded-2xl p-5 flex items-start gap-3">
          <FaFeatherAlt size={14} className="text-amber-400/60 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="text-white/50 text-xs">
              Your <span className="text-white/70 font-medium">email address</span> cannot be changed from this page.
            </p>
            <p className="text-white/50 text-xs">
              To change your password, use the{" "}
              <Link to="/dashboard" className="text-amber-400 hover:underline">
                Security settings
              </Link>{" "}
              in your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
