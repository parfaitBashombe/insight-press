const ACCENT_COLORS = ["#E8A838", "#5B8DEF", "#3DBDA7", "#E87B5B", "#9B7FE8"];

// eslint-disable-next-line react-refresh/only-export-components
export const accentFor = (id: string) =>
  ACCENT_COLORS[id.charCodeAt(0) % ACCENT_COLORS.length];

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

interface AvatarProps {
  name: string;
  avatar?: string | null;
  id?: string;
  size?: number;
  rounded?: "full" | "2xl" | "3xl";
  className?: string;
  textSize?: string;
}

export const Avatar = ({
  name,
  avatar,
  id,
  size = 8,
  rounded = "full",
  className = "",
  textSize,
}: AvatarProps) => {
  const color = id ? accentFor(id) : "#E8A838";
  const dim = `w-${size} h-${size}`;
  const fontSize = textSize ?? (size <= 7 ? "text-[10px]" : size <= 9 ? "text-xs" : size <= 12 ? "text-sm" : "text-xl");
  const shape = `rounded-${rounded}`;

  return (
    <div className={`${dim} ${shape} overflow-hidden shrink-0 ${className}`}>
      {avatar ? (
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center font-bold text-white ${fontSize}`}
          style={{ backgroundColor: color }}
        >
          {initials(name)}
        </div>
      )}
    </div>
  );
};
