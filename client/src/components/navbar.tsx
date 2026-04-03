/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaBars, FaChevronRight, FaPen, FaXmark } from "react-icons/fa6";

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

const Navbar = () => {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `relative py-3 text-base font-medium transition-all duration-300 group flex items-center justify-between w-full ${
      isActive ? "text-amber-400" : "text-white/70 hover:text-white"
    }`;

  const underlineStyles = (isActive: boolean) =>
    `absolute bottom-0 left-0 h-0.5 bg-amber-400 transition-all duration-300 ${
      isActive ? "w-full" : "w-0 group-hover:w-full"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0C0C0C] border-b border-white/10 shadow-2xl"
          : "bg-transparent"
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

        <div className="hidden lg:flex items-center gap-6">
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
        </div>

        <button
          className="lg:hidden text-white/80 p-2"
          onClick={() => setOpen(true)}
        >
          <FaBars size={24} />
        </button>
      </div>

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
            <button
              onClick={() => setOpen(false)}
              className="text-white/40 p-2 hover:text-white"
            >
              <FaXmark size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-10">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              Menu Navigation
            </p>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.label} to={link.to} className={linkStyles}>
                  {({ isActive }) => (
                    <>
                      <span>{link.label}</span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-8 border-t border-white/10 bg-white/2 flex flex-col gap-4">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
