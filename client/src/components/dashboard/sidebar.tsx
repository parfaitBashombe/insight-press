import { Link, useNavigate } from "react-router-dom";
import { FaPen, FaFeatherAlt } from "react-icons/fa";
import { FaHouse, FaChartLine, FaGear, FaPlus, FaList, FaComment, FaImage, FaCheck, FaArrowRightFromBracket } from "react-icons/fa6";
import type { View } from "./types";
import { useAuth } from "../../context/AuthContext";

const NavItem = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
        : "text-white/40 hover:text-white/70 hover:bg-white/4"
    }`}
  >
    <span className={active ? "text-amber-400" : "text-white/30"}>{icon}</span>
    {label}
    {active && <FaCheck size={9} className="text-amber-400 ml-auto" />}
  </button>
);

const navItems: { icon: React.ReactNode; label: string; id: View }[] = [
  { icon: <FaHouse size={14} />, label: "Overview", id: "overview" },
  { icon: <FaPlus size={14} />, label: "New Post", id: "new-post" },
  { icon: <FaList size={14} />, label: "My Posts", id: "my-posts" },
  { icon: <FaComment size={14} />, label: "Comments", id: "comments" },
  { icon: <FaImage size={14} />, label: "Media Library", id: "media" },
  { icon: <FaChartLine size={14} />, label: "Analytics", id: "analytics" },
];

export const Sidebar = ({
  mobile = false,
  view,
  navigate,
}: {
  mobile?: boolean;
  view: View;
  navigate: (v: View) => void;
}) => {
  const { user, logout } = useAuth();
  const reactNavigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    reactNavigate("/signin");
  };

  const initials = user?.fullname
    ? user.fullname.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "??";

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
        <span className="text-white text-lg font-semibold font-playfair">
          Insight Press
        </span>
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
            active={view === item.id}
            onClick={() => navigate(item.id)}
          />
        ))}
      </nav>

      <div className="border-t border-white/6 pt-4 mt-auto space-y-1">
        <NavItem
          icon={<FaGear size={14} />}
          label="Settings"
          active={view === "settings"}
          onClick={() => navigate("settings")}
        />
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-red-400/70 hover:text-red-400 hover:bg-red-500/10"
        >
          <span className="text-red-400/50"><FaArrowRightFromBracket size={14} /></span>
          Sign out
        </button>
      </div>

      <div className="mt-4 p-3 bg-white/4 border border-white/8 rounded-xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-[#0C0C0C] shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-white/80 text-xs font-semibold truncate">{user?.fullname}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <FaFeatherAlt size={8} className="text-amber-400" />
            <p className="text-white/30 text-[10px]">Verified Author</p>
          </div>
        </div>
      </div>
    </div>
  );
};
