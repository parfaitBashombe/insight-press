import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

export const SettingsView = () => (
  <div className="max-w-6xl mx-auto space-y-8">
    {/* Public Profile */}
    <div className="bg-white/4 border border-white/8 rounded-2xl p-6 sm:p-8">
      <h3 className="text-white font-bold text-lg mb-6 font-playfair">Public Profile</h3>
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-amber-400 flex items-center justify-center text-3xl font-bold text-[#0C0C0C] shrink-0 relative group cursor-pointer">
            AO
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FaPen size={16} className="text-white" />
            </div>
          </div>
          <button className="text-white/40 hover:text-white text-xs font-semibold transition-colors">
            Change Avatar
          </button>
        </div>

        <div className="flex-1 space-y-5 w-full">
          <div className="space-y-1.5">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
              Display Name
            </label>
            <input
              type="text"
              defaultValue="Amara Osei"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">Bio</label>
            <textarea
              rows={4}
              defaultValue="Writing about design, technology, and the intersections between them. Verified Author at Insight Press."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors resize-none"
            />
            <p className="text-white/30 text-xs text-right">0/160</p>
          </div>
          <button className="bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>

    {/* Account Settings */}
    <div className="bg-white/4 border border-white/8 rounded-2xl p-6 sm:p-8">
      <h3 className="text-white font-bold text-lg mb-6 font-playfair">Account Settings</h3>
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-1.5">
          <label className="text-white/60 text-xs font-semibold uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            defaultValue="amara.osei@example.com"
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
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-amber-400/50 transition-colors"
            />
            <button className="border border-white/10 hover:border-white/20 text-white hover:text-white/90 font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-200">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Danger Zone */}
    <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6 sm:p-8">
      <h3 className="text-red-400 font-bold text-lg mb-2 font-playfair">Danger Zone</h3>
      <p className="text-white/50 text-sm mb-6">
        Once you delete your account, there is no going back. All of your posts, drafts, and analytics will be permanently removed.
      </p>
      <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 flex items-center gap-2">
        <FaTrash size={12} /> Delete Account
      </button>
    </div>
  </div>
);
