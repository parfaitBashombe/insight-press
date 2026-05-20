import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars, FaChevronRight, FaPen, FaXmark } from "react-icons/fa6";
import { FaTachometerAlt, FaSignOutAlt, FaFeatherAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/lib/context/auth-context";

interface NavLinkItem {
  label: string;
  to: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", to: "/" },
  { label: "Blogs", to: "/blogs" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const ACCENT_COLORS = ["#E8A838", "#5B8DEF", "#3DBDA7", "#E87B5B", "#9B7FE8"];
const accentFor = (id: string) => ACCENT_COLORS[id.charCodeAt(0) % ACCENT_COLORS.length];
const userInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const useScrolled = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
};

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5">
    <span className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-400/20">
      <FaPen size={14} className="text-[#0C0C0C]" />
    </span>
    <span
      className="text-white text-xl font-bold tracking-tight"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      Insight Press
    </span>
  </Link>
);

const RoleBadge = ({ role }: { role?: string }) => {
  if (!role) return null;
  const map: Record<string, { label: string; cls: string }> = {
    WRITER: { label: "Writer", cls: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
    ADMIN: { label: "Admin", cls: "text-red-400 bg-red-400/10 border-red-400/20" },
    READER: { label: "Reader", cls: "text-white/40 bg-white/5 border-white/10" },
  };
  const s = map[role] ?? map.READER;
  return (
    <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border ${s.cls}`}>
      {s.label}
    </span>
  );
};

const UserAvatar = ({
  user,
  size = "sm",
  className = "",
}: {
  user: { user_id: string; fullname: string; avatar?: string | null };
  size?: "sm" | "md";
  className?: string;
}) => {
  const color = accentFor(user.user_id);
  const dim = size === "sm" ? "w-9 h-9 text-xs" : "w-10 h-10 text-sm";
  return (
    <div className={`${dim} rounded-full overflow-hidden shrink-0 ${className}`}>
      {user.avatar ? (
        <img src={user.avatar} alt={user.fullname} className="w-full h-full object-cover" />
      ) : (
        <div
          className={`${dim} flex items-center justify-center font-bold text-white`}
          style={{ backgroundColor: color }}
        >
          {userInitials(user.fullname)}
        </div>
      )}
    </div>
  );
};

const ProfileDropdown = ({ onClose }: { onClose: () => void }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  const handleLogout = async () => {
    onClose();
    await logout();
    navigate("/");
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-[#111111] border border-white/8 rounded-2xl shadow-2xl z-50 overflow-hidden">
      <div className="px-4 py-3.5 border-b border-white/6 flex items-center gap-3">
        <UserAvatar user={user} size="sm" />
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold leading-tight truncate">{user.fullname}</p>
          <p className="text-white/35 text-xs truncate">{user.email}</p>
        </div>
        <RoleBadge role={user.role?.name} />
      </div>

      <div className="py-1.5">
        <Link
          to="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/4 transition-colors text-sm"
        >
          <FaTachometerAlt size={13} className="text-white/30" />
          Dashboard
        </Link>
        <Link
          to="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/4 transition-colors text-sm"
        >
          <FaUserCircle size={13} className="text-white/30" />
          My Profile
        </Link>
        {user.role?.name === "WRITER" && (
          <Link
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/4 transition-colors text-sm"
          >
            <FaFeatherAlt size={13} className="text-white/30" />
            My Articles
          </Link>
        )}
      </div>

      <div className="border-t border-white/6 py-1.5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-colors text-sm cursor-pointer"
        >
          <FaSignOutAlt size={13} />
          Sign out
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `relative py-3 text-base font-medium transition-all duration-300 group flex items-center justify-between w-full ${
      isActive ? "text-amber-400" : "text-white/70 hover:text-white"
    }`;

  const underlineStyles = (isActive: boolean) =>
    `absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${
      isActive ? "w-full" : "w-0 group-hover:w-full"
    }`;

  const handleMobileLogout = async () => {
    setOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0C0C0C] border-b border-white/10 shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} to={link.to} className={linkStyles}>
              {({ isActive }) => (
                <div className="relative py-1">
                  {link.label}
                  <span className={underlineStyles(isActive)} />
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="ring-2 ring-transparent group-hover:ring-amber-400/40 rounded-full transition-all duration-200">
                  <UserAvatar user={user} size="sm" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-medium leading-tight">{user.fullname.split(" ")[0]}</p>
                  <RoleBadge role={user.role?.name} />
                </div>
                <FaChevronRight
                  size={10}
                  className={`text-white/30 transition-transform duration-200 ${dropdownOpen ? "rotate-90" : ""}`}
                />
              </button>
              {dropdownOpen && <ProfileDropdown onClose={() => setDropdownOpen(false)} />}
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-white/60 hover:text-white text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/verify-request"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] text-sm font-bold px-6 py-2.5 rounded-full transition-all"
              >
                Get Verified
                <FaChevronRight size={10} />
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden text-white/80 p-2 cursor-pointer" onClick={() => setOpen(true)}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-100 lg:hidden transition-[visibility] duration-500 ${
          open ? "visible" : "invisible delay-500"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute top-0 left-0 h-full w-70 sm:w-[320px] bg-[#0C0C0C] border-r border-white/10 shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            <Logo />
            <button onClick={() => setOpen(false)} className="text-white/40 p-2 hover:text-white cursor-pointer">
              <FaXmark size={24} />
            </button>
          </div>

          {user && (
            <div className="px-6 py-4 border-b border-white/6 flex items-center gap-3">
              <UserAvatar user={user} size="md" />
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{user.fullname}</p>
                <p className="text-white/35 text-xs truncate">{user.email}</p>
              </div>
              <RoleBadge role={user.role?.name} />
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-8 py-10">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              Menu Navigation
            </p>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.label} to={link.to} onClick={() => setOpen(false)} className={linkStyles}>
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    </>
                  )}
                </NavLink>
              ))}
              {user && (
                <>
                  <NavLink to="/dashboard" onClick={() => setOpen(false)} className={linkStyles}>
                    {({ isActive }) => (
                      <>
                        <span>Dashboard</span>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </>
                    )}
                  </NavLink>
                  <NavLink to="/profile" onClick={() => setOpen(false)} className={linkStyles}>
                    {({ isActive }) => (
                      <>
                        <span>My Profile</span>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </>
                    )}
                  </NavLink>
                </>
              )}
            </nav>
          </div>

          <div className="mt-auto p-8 border-t border-white/10 bg-white/2 flex flex-col gap-4">
            {user ? (
              <button
                onClick={handleMobileLogout}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-red-400/20 text-red-400/70 font-semibold text-sm hover:bg-red-400/5 hover:text-red-400 transition-colors cursor-pointer"
              >
                <FaSignOutAlt size={13} />
                Sign out
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="flex items-center justify-center w-full py-4 rounded-xl border border-white/10 text-white font-semibold text-sm hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/verify-request"
                  className="flex items-center justify-center gap-3 bg-amber-400 text-[#0C0C0C] font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform text-sm"
                >
                  Get Verified
                  <FaChevronRight size={12} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
