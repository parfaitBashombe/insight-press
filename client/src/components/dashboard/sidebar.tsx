import { Link, useNavigate } from "react-router-dom";
import { FaPen, FaFeatherAlt } from "react-icons/fa";
import {
  FaHouse,
  FaChartLine,
  FaGear,
  FaPlus,
  FaList,
  FaComment,
  FaImage,
  FaCheck,
  FaArrowRightFromBracket,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa6";
import type { View, WriterView, AdminView, ReaderView } from "@/components/dashboard/types";
import { useAuth } from "@/context/AuthContext";

type NavItemConfig = {
  icon: React.ReactNode;
  label: string;
  id: View;
};

const writerNavItems: NavItemConfig[] = [
  { icon: <FaHouse size={14} />, label: "Overview", id: "overview" as WriterView },
  { icon: <FaPlus size={14} />, label: "New Post", id: "new-post" as WriterView },
  { icon: <FaList size={14} />, label: "My Posts", id: "my-posts" as WriterView },
  { icon: <FaComment size={14} />, label: "Comments", id: "comments" as WriterView },
  { icon: <FaImage size={14} />, label: "Media Library", id: "media" as WriterView },
  { icon: <FaChartLine size={14} />, label: "Analytics", id: "analytics" as WriterView },
];

const adminNavItems: NavItemConfig[] = [
  { icon: <FaHouse size={14} />, label: "Overview", id: "admin-overview" as AdminView },
  { icon: <FaUsers size={14} />, label: "Users", id: "admin-users" as AdminView },
  { icon: <FaClipboardList size={14} />, label: "Promotions", id: "admin-promotions" as AdminView },
];

const readerNavItems: NavItemConfig[] = [
  { icon: <FaHouse size={14} />, label: "Overview", id: "reader-overview" as ReaderView },
];

const NavItem = ({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
        : "text-white/40 hover:text-white/70 hover:bg-white/4"
    }`}
  >
    <span className={isActive ? "text-amber-400" : "text-white/30"}>{icon}</span>
    {label}
    {isActive && <FaCheck size={9} className="text-amber-400 ml-auto" />}
  </button>
);

const roleLabel: Record<string, string> = {
  ADMIN: "Administrator",
  WRITER: "Verified Author",
  READER: "Reader",
};

export const Sidebar = ({
  mobile = false,
  currentView,
  navigate,
}: {
  mobile?: boolean;
  currentView: View;
  navigate: (v: View) => void;
}) => {
  const { user, logout } = useAuth();
  const routerNavigate = useNavigate();

  const roleName = user?.role?.name ?? "READER";

  const navItems =
    roleName === "ADMIN"
      ? adminNavItems
      : roleName === "WRITER"
      ? writerNavItems
      : readerNavItems;

  const userInitials = user?.fullname
    ? user.fullname
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  const handleLogout = async () => {
    await logout();
    routerNavigate("/signin");
  };

  return (
    <div
      className={`${
        mobile ? "flex flex-col h-full" : "hidden lg:flex flex-col h-full"
      } w-64 bg-[#0C0C0C] border-r border-white/6 px-4 py-6 shrink-0`}
    >
      <Link to="/" className="flex items-center gap-2.5 mb-8 group w-fit">
        <span className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <FaPen size={13} className="text-[#0C0C0C]" />
        </span>
        <span className="text-white text-lg font-semibold font-playfair">Insight Press</span>
      </Link>

      <p className="text-white/20 text-[10px] font-semibold tracking-widest uppercase mb-3 px-1">
        Workspace
      </p>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={currentView === item.id}
            onClick={() => navigate(item.id)}
          />
        ))}
      </nav>

      <div className="border-t border-white/6 pt-4 mt-auto space-y-1">
        <NavItem
          icon={<FaGear size={14} />}
          label="Settings"
          isActive={currentView === "settings"}
          onClick={() => navigate("settings")}
        />
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-red-400/70 hover:text-red-400 hover:bg-red-500/10"
        >
          <span className="text-red-400/50">
            <FaArrowRightFromBracket size={14} />
          </span>
          Sign out
        </button>
      </div>

      <div className="mt-4 p-3 bg-white/4 border border-white/8 rounded-xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-[#0C0C0C] shrink-0">
          {userInitials}
        </div>
        <div className="min-w-0">
          <p className="text-white/80 text-xs font-semibold truncate">{user?.fullname}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <FaFeatherAlt size={8} className="text-amber-400" />
            <p className="text-white/30 text-[10px]">{roleLabel[roleName] ?? roleName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
