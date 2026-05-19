import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaCheck, FaTrash } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { updateProfile, changePassword } from "@/lib/api/auth";

type ToastState = { message: string; type: "success" | "error" } | null;

export const SettingsView = () => {
  const { user, updateUser } = useAuth();

  const [profileForm, setProfileForm] = useState({
    fullname: user?.fullname ?? "",
    bio: user?.bio ?? "",
    twitter: user?.twitter ?? "",
    department: user?.department ?? "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleProfileSave = async () => {
    if (!user) return;
    setSavingProfile(true);
    try {
      const res = await updateProfile(user.user_id, {
        fullname: profileForm.fullname || undefined,
        bio: profileForm.bio || undefined,
        twitter: profileForm.twitter || undefined,
        department: profileForm.department || undefined,
      });
      updateUser(res.data);
      showToast("Profile updated successfully.", "success");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to update profile.",
        "error",
      );
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
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: "", newPassword: "" });
      showToast("Password changed successfully.", "success");
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to change password.",
        "error",
      );
    } finally {
      setSavingPassword(false);
    }
  };

  const displayInitials = profileForm.fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium shadow-2xl backdrop-blur-sm border transition-all ${
            toast.type === "success"
              ? "bg-green-500/10 border-green-500/25 text-green-400"
              : "bg-red-500/10 border-red-500/25 text-red-400"
          }`}
        >
          {toast.type === "success" && <FaCheck size={12} />}
          {toast.message}
        </div>
      )}

      <div className="bg-white/4 border border-white/8 rounded-2xl p-6 sm:p-8">
        <h3 className="text-white font-bold text-lg mb-6 font-playfair">Public Profile</h3>
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="w-24 h-24 rounded-full bg-amber-400 flex items-center justify-center text-3xl font-bold text-[#0C0C0C] relative group cursor-pointer overflow-hidden">
              {displayInitials}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPen size={16} className="text-white" />
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profileForm.fullname}
                  onChange={(e) => setProfileForm({ ...profileForm, fullname: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                  Department
                </label>
                <input
                  type="text"
                  value={profileForm.department}
                  onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors"
                  placeholder="e.g. Engineering, Design…"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                Twitter / X Handle
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">@</span>
                <input
                  type="text"
                  value={profileForm.twitter}
                  onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors"
                  placeholder="yourhandle"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Bio</label>
              <textarea
                rows={4}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors resize-none"
                placeholder="Tell readers about yourself…"
              />
              <p className="text-white/30 text-xs text-right">{profileForm.bio.length}/160</p>
            </div>
            <button
              onClick={handleProfileSave}
              disabled={savingProfile}
              className="bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 disabled:opacity-50"
            >
              {savingProfile ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/4 border border-white/8 rounded-2xl p-6 sm:p-8">
        <h3 className="text-white font-bold text-lg mb-6 font-playfair">Account Settings</h3>
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-1.5">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Email Address
            </label>
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors"
              />
              <input
                type="password"
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors"
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
