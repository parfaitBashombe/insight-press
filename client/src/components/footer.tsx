import React from "react";
import { Link } from "react-router-dom";
import { BsShieldCheck } from "react-icons/bs";
import { FaPen } from "react-icons/fa";

interface FooterLink {
  label: string;
  to: string;
}

interface FooterSection {
  heading: string;
  links: FooterLink[];
}

const FOOTER_NAVIGATION: FooterSection[] = [
  {
    heading: "Platform",
    links: [
      { label: "How It Works", to: "/about" },
      { label: "Become Verified", to: "/verify-request" },
      { label: "Blog Editor", to: "/editor" },
      { label: "Dashboard", to: "/dashboard" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Blog", to: "/blogs" },
      { label: "Careers", to: "/careers" },
      { label: "Press Kit", to: "/press" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", to: "/help" },
      { label: "Contact Us", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[#0C0C0C] border-t border-white/6 px-6 py-14"
      id="contact"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <span className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <FaPen size={12} className="text-[#0C0C0C]" />
              </span>
              <span
                className="text-white text-lg font-semibold tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Insight Press
              </span>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed">
              A curated publishing platform for verified voices.
            </p>
          </div>

          {FOOTER_NAVIGATION.map((section) => (
            <div key={section.heading}>
              <h4 className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-5">
                {section.heading}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            © {currentYear} Insight Press. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/20 text-sm">
            <BsShieldCheck size={13} className="text-amber-400/50" />
            <span>Verified publishing platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
