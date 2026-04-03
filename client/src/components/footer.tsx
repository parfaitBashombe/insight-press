import { BsShieldCheck } from "react-icons/bs";
import { FaPen } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="bg-[#0C0C0C] border-t border-white/6 px-6 py-14"
      id="contact"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
                <FaPen size={12} className="text-[#0C0C0C]" />
              </span>
              <span
                className="text-white text-lg font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Inscribe
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed">
              A curated publishing platform for verified voices.
            </p>
          </div>

          {/* Links */}
          {[
            {
              heading: "Platform",
              links: [
                "How It Works",
                "Become Verified",
                "Blog Editor",
                "Dashboard",
              ],
            },
            {
              heading: "Company",
              links: ["About Us", "Blog", "Careers", "Press Kit"],
            },
            {
              heading: "Support",
              links: [
                "Help Center",
                "Contact Us",
                "Privacy Policy",
                "Terms of Service",
              ],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h4 className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} Inscribe. All rights reserved.
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
