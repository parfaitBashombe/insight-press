import { useState } from "react";
import { FaPen, FaTwitter, FaCheck, FaTrash } from "react-icons/fa";
import { FaCamera } from "react-icons/fa6";
import { useAuth } from "@/lib/context/auth-context";
import { updateProfile, changePassword } from "@/lib/api/auth";
import { ImageUploadModal } from "@/components/dashboard/image-upload-modal";

type Toast = { message: string; type: "success" | "error" } | null;

const ACCENT_COLORS = ["#E8A838", "#5B8DEF", "#3DBDA7", "#E87B5B", "#9B7FE8"];
const accentFor = (id: string) => ACCENT_COLORS[id.charCodeAt(0) % ACCENT_COLORS.length];
const initials = (name: string) =>
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

export const SettingsView = () => {
  const { user, updateUser } = useAuth();

  const [profileForm, setProfileForm] = useState({
    fullname: user?.fullname ?? "",
    bio: user?.bio ?? "",
    twitter: user?.twitter ?? "",
    department: user?.department ?? "",
    avatar: user?.avatar ?? "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [savingPassword, setSavingPassword] = useState(false);

  const [toast, setToast] = useState<Toast>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApplyAvatar = async (url: string) => {
    if (!user) return;
    setAvatarPreview(url);
    setProfileForm((prev) => ({ ...prev, avatar: url }));
    setShowAvatarModal(false);
    try {
      const res = await updateProfile(user.user_id, { avatar: url });
      updateUser(res.data);
      setProfileForm((prev) => ({ ...prev, avatar: res.data.avatar ?? url }));
      setAvatarPreview(null);
      showToast("Avatar updated.", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to save avatar.", "error");
    }
  };

  const handleProfileSave = async () => {
    if (!user) return;
    setSavingProfile(true);
    try {
      const payload: Record<string, string> = {};
      if (profileForm.fullname !== (user.fullname ?? "")) payload.fullname = profileForm.fullname.trim();
      if (profileForm.bio !== (user.bio ?? "")) payload.bio = profileForm.bio.trim();
      if (profileForm.twitter !== (user.twitter ?? "")) payload.twitter = profileForm.twitter.trim();
      if (profileForm.department !== (user.department ?? "")) payload.department = profileForm.department.trim();
      if (profileForm.avatar !== (user.avatar ?? "")) payload.avatar = profileForm.avatar.trim();

      const res = await updateProfile(user.user_id, payload);
      updateUser(res.data);
      setAvatarPreview(null);
      showToast("Profile updated successfully.", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update profile.", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      showToast("Please fill in both password fields.", "error");
      return;
    }
    setSavingPassword(true);
    try {
      await changePassword({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword });
      setPasswordForm({ currentPassword: "", newPassword: "" });
      showToast("Password changed successfully.", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to change password.", "error");
    } finally {
      setSavingPassword(false);
    }
  };

  const displayAvatar = avatarPreview ?? user?.avatar ?? null;
  const color = user ? accentFor(user.user_id) : "#E8A838";

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors placeholder-white/20";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {showAvatarModal && (
        <ImageUploadModal
          onApply={handleApplyAvatar}
          onClose={() => setShowAvatarModal(false)}
        />
      )}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium shadow-2xl backdrop-blur-sm border ${
          toast.type === "success"
            ? "bg-green-500/10 border-green-500/25 text-green-400"
            : "bg-red-500/10 border-red-500/25 text-red-400"
        }`}>
          {toast.type === "success" && <FaCheck size={12} />}
          {toast.message}
        </div>
      )}

      {/* Profile card */}
      <div className="bg-white/4 border border-white/8 rounded-2xl p-6 sm:p-8">
        <h3 className="text-white font-bold text-lg mb-6 font-playfair">Public Profile</h3>

        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden">
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt={user?.fullname}
                    className="w-full h-full object-cover"
                    onError={() => setAvatarPreview(null)}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-3xl font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {user ? initials(user.fullname) : "??"}
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-lg hover:bg-amber-300 transition-colors"
                title="Change avatar"
              >
                <FaCamera size={11} className="text-[#0C0C0C]" />
              </button>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm font-medium">{user?.fullname}</p>
              <p className="text-white/30 text-xs mb-2">{user?.email}</p>
              <RoleBadge role={user?.role?.name} />
            </div>
          </div>

          {/* Form fields */}
          <div className="flex-1 space-y-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Display Name</label>
                <input
                  type="text"
                  value={profileForm.fullname}
                  onChange={(e) => setProfileForm({ ...profileForm, fullname: e.target.value })}
                  className={inputCls}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Department</label>
                <input
                  type="text"
                  value={profileForm.department}
                  onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. Engineering, Design…"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <FaTwitter size={11} className="text-sky-400" /> Twitter / X Handle
              </label>
              <input
                type="text"
                value={profileForm.twitter}
                onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                className={inputCls}
                placeholder="@yourhandle"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Bio</label>
              <textarea
                rows={4}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className={`${inputCls} resize-none`}
                placeholder="Tell readers about yourself…"
              />
              <p className="text-white/30 text-xs text-right">{profileForm.bio.length}/160</p>
            </div>

            <button
              onClick={handleProfileSave}
              disabled={savingProfile}
              className="bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
            >
              {savingProfile ? (
                <><div className="w-3.5 h-3.5 border-2 border-[#0C0C0C]/30 border-t-[#0C0C0C] rounded-full animate-spin" /> Saving…</>
              ) : (
                <><FaPen size={11} /> Save Changes</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Account settings */}
      <div className="bg-white/4 border border-white/8 rounded-2xl p-6 sm:p-8">
        <h3 className="text-white font-bold text-lg mb-6 font-playfair">Account Settings</h3>
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-1.5">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              value={user?.email ?? ""}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 text-sm outline-none cursor-not-allowed"
            />
            <p className="text-white/30 text-xs mt-1">To change your email, please contact support.</p>
          </div>

          <div className="pt-4 border-t border-white/6">
            <h4 className="text-white/80 font-medium text-sm mb-4">Change Password</h4>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className={inputCls}
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className={inputCls}
              />
              <button
                onClick={handlePasswordChange}
                disabled={savingPassword}
                className="border border-white/10 hover:border-amber-400/40 hover:text-amber-400 text-white/70 font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-200 disabled:opacity-50"
              >
                {savingPassword ? "Updating…" : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6 sm:p-8">
        <h3 className="text-red-400 font-bold text-lg mb-2 font-playfair">Danger Zone</h3>
        <p className="text-white/50 text-sm mb-6">
          Once you delete your account, there is no going back. All of your posts, drafts, and data will be permanently removed.
        </p>
        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 flex items-center gap-2">
          <FaTrash size={12} /> Delete Account
        </button>
      </div>
    </div>
  );
};
