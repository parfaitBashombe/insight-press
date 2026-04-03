import { useEffect, useState } from "react";
import { FaBars, FaChevronRight, FaPen, FaTimes } from "react-icons/fa";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#" },
  { label: "Blogs", href: "#blogs" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const useScrolled = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
};

const Navbar = () => {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0C0C0C]/95 backdrop-blur-md border-b border-white/6 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-17 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <FaPen size={12} className="text-[#0C0C0C]" />
          </span>
          <span
            className="text-white text-lg font-semibold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Inscribe
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/60 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200 px-3 py-1.5"
          >
            Sign In
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/20 hover:-translate-y-px"
          >
            Get Verified
            <FaChevronRight size={12} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0C0C0C]/98 backdrop-blur-md border-t border-white/6 px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-white text-sm font-medium py-1 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/8 flex flex-col gap-3">
            <a href="#" className="text-white/60 text-sm font-medium py-1">
              Sign In
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 text-[#0C0C0C] text-sm font-semibold px-5 py-3 rounded-full"
            >
              Get Verified
              <FaChevronRight size={12} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
