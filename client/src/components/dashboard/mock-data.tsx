import { FaEye, FaUsers, FaBookOpen, FaClock } from "react-icons/fa";

export const STATS = [
  { label: "Total Views", value: "24,831", delta: "+12%", icon: <FaEye size={15} />, color: "#E8A838" },
  { label: "Followers", value: "1,204", delta: "+8%", icon: <FaUsers size={15} />, color: "#5B8DEF" },
  { label: "Posts Published", value: "38", delta: "+3", icon: <FaBookOpen size={15} />, color: "#3DBDA7" },
  { label: "Avg. Read Time", value: "4m 12s", delta: "+0:24", icon: <FaClock size={15} />, color: "#E87B5B" },
];

export const POSTS = [
  { id: 1, title: "The Invisible Grid: How Whitespace Shapes Reader Trust", views: 3240, status: "published", date: "Mar 28, 2026", readTime: "5 min" },
  { id: 2, title: "Building for the Long Run: Why Boring Tech Wins", views: 1870, status: "published", date: "Mar 21, 2026", readTime: "7 min" },
  { id: 3, title: "The First Sentence Is Everything", views: 5120, status: "published", date: "Mar 14, 2026", readTime: "4 min" },
  { id: 4, title: "Notes on Creative Exhaustion", views: 0, status: "draft", date: "Apr 1, 2026", readTime: "—" },
  { id: 5, title: "Why I Stopped Using AI for First Drafts", views: 0, status: "draft", date: "Apr 2, 2026", readTime: "—" },
];

export const COMMENTS = [
  { id: 1, author: "Jane Doe", content: "This structure really changed how I think about layout. Thanks for sharing!", postTitle: "The Invisible Grid: How Whitespace Shapes Reader Trust", date: "Apr 3, 2026", status: "approved" },
  { id: 2, author: "John Smith", content: "I somewhat disagree, density has its place in data-heavy apps.", postTitle: "The Invisible Grid: How Whitespace Shapes Reader Trust", date: "Apr 2, 2026", status: "pending" },
  { id: 3, author: "Sarah Lee", content: "Great read! Looking forward to part 2.", postTitle: "Building for the Long Run: Why Boring Tech Wins", date: "Mar 25, 2026", status: "approved" },
];

export const MEDIA = [
  { id: 1, url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400", name: "workspace-hero.jpg", size: "1.2 MB", date: "Mar 10, 2026" },
  { id: 2, url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400", name: "code-snippet.png", size: "2.4 MB", date: "Mar 12, 2026" },
  { id: 3, url: "https://images.unsplash.com/photo-1507238691740-187a552e4ec7?auto=format&fit=crop&q=80&w=400", name: "meeting-notes.jpg", size: "840 KB", date: "Mar 20, 2026" },
  { id: 4, url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400", name: "server-rack.jpg", size: "3.1 MB", date: "Apr 1, 2026" },
];

export const ANALYTICS_DATA = [
  { month: "Oct", views: 1200 },
  { month: "Nov", views: 1800 },
  { month: "Dec", views: 1400 },
  { month: "Jan", views: 2100 },
  { month: "Feb", views: 3200 },
  { month: "Mar", views: 4800 },
];

export const MAX_VIEWS = Math.max(...ANALYTICS_DATA.map((d) => d.views));

export const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

export const quillFormats = [
  "header", "bold", "italic", "underline", "strike",
  "blockquote", "list", "bullet", "link", "image",
];
