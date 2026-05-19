import { useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { FaXmark, FaEllipsis } from "react-icons/fa6";
import { getUsers, getRoles, updateUserRole, updateUserStatus } from "@/lib/api/admin";
import type { AdminUser, Role } from "@/types/admin";

const STATUSES = [
  { label: "All", value: undefined },
  { label: "Active", value: true },
  { label: "Suspended", value: false },
];

export const AdminUsersView = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsers({
        page,
        pageSize: 10,
        search: search || undefined,
        roleId: roleFilter || undefined,
        status: statusFilter,
      });
      setUsers(res.data.data);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch {
    } finally {
      setLoading(false);
    }
  }, [page, search, roleFilter, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    getRoles().then((res) => setRoles(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, roleFilter, statusFilter]);

  const handleRoleChange = async (userId: string, roleId: string) => {
    setUpdating(userId);
    try {
      await updateUserRole(userId, roleId);
      await fetchUsers();
    } catch {
    } finally {
      setUpdating(null);
      setMenuOpen(null);
    }
  };

  const handleStatusToggle = async (user: AdminUser) => {
    setUpdating(user.user_id);
    try {
      await updateUserStatus(user.user_id, !user.status);
      await fetchUsers();
    } catch {
    } finally {
      setUpdating(null);
      setMenuOpen(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <FaSearch size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-amber-400/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
            >
              <FaXmark size={11} />
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/70 outline-none focus:border-amber-400/50 transition-colors"
          >
            <option value="">All Roles</option>
            {roles.map((r) => (
              <option key={r.role_id} value={r.role_id}>{r.name}</option>
            ))}
          </select>

          <div className="flex gap-1">
            {STATUSES.map((s) => (
              <button
                key={s.label}
                onClick={() => setStatusFilter(s.value)}
                className={`text-xs px-3 py-2 rounded-xl border transition-all ${
                  statusFilter === s.value
                    ? "bg-white/10 text-white border-white/20"
                    : "border-white/8 text-white/40 hover:text-white/70"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-white/30 text-xs">{total} user{total !== 1 ? "s" : ""} found</div>

      <div className="space-y-2">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="bg-white/4 border border-white/8 rounded-2xl h-16 animate-pulse" />
          ))
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-white/30 text-sm">No users match your filters.</div>
        ) : (
          users.map((user) => (
            <div
              key={user.user_id}
              className="bg-white/4 border border-white/8 rounded-2xl px-5 py-4 flex items-center gap-4 hover:bg-white/[0.07] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-[#0C0C0C] shrink-0">
                {user.fullname.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm font-medium truncate">{user.fullname}</p>
                <p className="text-white/30 text-xs truncate">{user.email}</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <span
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                    user.status
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}
                >
                  {user.status ? "Active" : "Suspended"}
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-400">
                  {user.role.name}
                </span>
              </div>
              <div className="relative shrink-0">
                <button
                  onClick={() => setMenuOpen(menuOpen === user.user_id ? null : user.user_id)}
                  disabled={updating === user.user_id}
                  className="text-white/25 hover:text-white/60 transition-colors p-1 disabled:opacity-40"
                >
                  <FaEllipsis size={14} />
                </button>
                {menuOpen === user.user_id && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-[#1a1a1a] border border-white/8 rounded-xl shadow-2xl z-10 overflow-hidden">
                    <div className="px-3 py-2 border-b border-white/6">
                      <p className="text-white/30 text-[10px] uppercase tracking-wider font-semibold">Change Role</p>
                    </div>
                    {roles.map((r) => (
                      <button
                        key={r.role_id}
                        onClick={() => handleRoleChange(user.user_id, r.role_id)}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                          user.role.name === r.name
                            ? "text-amber-400 bg-amber-400/5"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {r.name}
                      </button>
                    ))}
                    <div className="border-t border-white/6" />
                    <button
                      onClick={() => handleStatusToggle(user)}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                        user.status
                          ? "text-red-400/70 hover:text-red-400 hover:bg-red-500/5"
                          : "text-green-400/70 hover:text-green-400 hover:bg-green-500/5"
                      }`}
                    >
                      {user.status ? "Suspend User" : "Reinstate User"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-xs px-4 py-2 rounded-xl border border-white/8 text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          <span className="text-white/30 text-xs">{page} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="text-xs px-4 py-2 rounded-xl border border-white/8 text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
