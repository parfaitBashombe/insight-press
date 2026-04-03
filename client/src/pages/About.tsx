import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
  FaQuoteLeft,
  FaFeatherAlt,
  FaUsers,
  FaGlobe,
  FaCode,
} from "react-icons/fa";

const useInView = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
};

const STATS = [
  {
    value: "2,400+",
    label: "Verified Authors",
    icon: <FaShieldAlt size={18} />,
  },
  { value: "18K+", label: "Posts Published", icon: <FaFeatherAlt size={18} /> },
  { value: "140+", label: "Countries Reached", icon: <FaGlobe size={18} /> },
  { value: "4.9★", label: "Author Rating", icon: <FaUsers size={18} /> },
];

const TEAM = [
  {
    name: "Parfait Bashombe",
    role: "Founder & Full-Stack Developer",
    bio: "Built Insight Press from the ground up. A full-stack developer from the Democratic Republic of Congo, based in Kampala, Uganda — on a mission to give verified writers a platform they deserve.",
    initials: "PB",
    color: "#E8A838",
  },
];

const VALUES = [
  {
    title: "Trust over traffic",
    description:
      "We'd rather have 2,000 verified, credible authors than 200,000 anonymous ones. Quality is not a feature — it's the product.",
    accent: "#E8A838",
  },
  {
    title: "Writers first",
    description:
      "Every product decision starts with one question: does this help writers do their best work? If the answer is no, we don't build it.",
    accent: "#5B8DEF",
  },
  {
    title: "Radical transparency",
    description:
      "Our verification criteria are public. Our review timelines are published. We believe you deserve to know exactly how this platform works.",
    accent: "#3DBDA7",
  },
];

const AboutPage = () => {
  const { ref: storyRef, inView: storyInView } = useInView();
  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: teamRef, inView: teamInView } = useInView();
  const { ref: valuesRef, inView: valuesInView } = useInView();

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <section className="bg-[#0C0C0C] pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full bg-amber-500/6 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-5">
            Our Story
          </p>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.06] mb-7"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Built for writers. <br />
            <span className="text-amber-400">Obsessed with trust.</span>
          </h1>
          <p className="text-white/45 text-xl leading-relaxed max-w-2xl mx-auto">
            Insight Press was born from a simple frustration: too many platforms
            reward noise over depth. We built the platform we wished existed —
            one where verification is a feature, not a footnote.
          </p>
        </div>
      </section>

      <section className="bg-[#F8F6F1] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            ref={storyRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div
              className={`transition-all duration-700 ${storyInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <div className="bg-[#0C0C0C] rounded-3xl p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -translate-y-8 translate-x-8 blur-2xl" />
                <FaQuoteLeft
                  size={32}
                  className="text-amber-400 mb-6 relative z-10"
                />
                <blockquote
                  className="text-white text-2xl font-semibold leading-snug mb-8 relative z-10"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "The internet has too many opinions and not enough authors. I
                  built Insight Press to change that ratio."
                </blockquote>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-[#0C0C0C]">
                    PB
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      Parfait Bashombe
                    </p>
                    <p className="text-white/40 text-xs">
                      Founder & Full-Stack Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-700 delay-150 ${storyInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              <h2
                className="text-4xl font-bold text-[#1A1A1A] leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                How Insight Press began
              </h2>
              <div className="space-y-4 text-[#6B6B6B] text-base leading-relaxed">
                <p>
                  Parfait Bashombe — a full-stack developer from the Democratic
                  Republic of Congo, now based in Kampala, Uganda — grew tired
                  of watching talented writers get buried beneath
                  algorithm-optimised content farms.
                </p>
                <p>
                  He asked a deceptively simple question:{" "}
                  <span className="text-[#1A1A1A] font-medium">
                    what if readers could trust every single author on a
                    platform, by design?
                  </span>
                </p>
                <p>
                  Insight Press launched with a single promise: every post you
                  read here comes from a real person with a real verified
                  identity. No bots, no ghostwriters, no content mills — just
                  writers who mean what they say.
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  "Designed & built solo in Kampala, Uganda",
                  "Founded by a developer from DR Congo",
                  "Zero venture funding — community-driven",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#3A3A3A]"
                  >
                    <FaCheckCircle
                      size={14}
                      className="text-amber-500 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0C0C0C] py-20 px-6">
        <div
          ref={statsRef}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-[#0C0C0C] p-10 text-center transition-all duration-700 ${statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex justify-center mb-4 text-amber-400">
                {stat.icon}
              </div>
              <div
                className="text-4xl font-bold text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </div>
              <div className="text-white/30 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F8F6F1] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-4">
              The Builder
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              One vision. One builder.
            </h2>
          </div>

          <div ref={teamRef} className="flex justify-center">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className={`group bg-white border border-[#E8E4DC] rounded-2xl p-10 max-w-sm w-full hover:shadow-xl hover:border-amber-200 hover:-translate-y-1 transition-all duration-500 ${teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative mb-6 w-fit">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center bg-amber-400">
                    <FaCode size={10} className="text-[#0C0C0C]" />
                  </div>
                </div>
                <h3
                  className="text-[#1A1A1A] font-bold text-xl mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-xs font-semibold tracking-wide mb-4"
                  style={{ color: member.color }}
                >
                  {member.role}
                </p>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                  {member.bio}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs text-[#9B9B9B]">
                  <FaGlobe size={11} />
                  <span>Kampala, Uganda · DR Congo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0C0C0C] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              What We Believe
            </p>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our values aren't a slide deck.
            </h2>
          </div>

          <div
            ref={valuesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className={`border border-white/8 rounded-2xl p-8 hover:bg-white/3 transition-all duration-500 ${valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div
                  className="w-1 h-12 rounded-full mb-6"
                  style={{ backgroundColor: value.accent }}
                />
                <h3
                  className="text-white text-2xl font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {value.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F6F1] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to join us?
          </h2>
          <p className="text-[#6B6B6B] text-lg mb-10">
            Apply for verification and start building your audience on a
            platform that believes in what you write.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/verify-request"
              className="inline-flex items-center gap-2.5 bg-[#0C0C0C] hover:bg-[#1A1A1A] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm"
            >
              Apply for Verification
              <FaArrowRight size={13} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] font-medium text-sm transition-colors duration-200"
            >
              Talk to the team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
