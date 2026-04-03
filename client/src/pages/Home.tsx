import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaFeatherAlt,
  FaTachometerAlt,
  FaLock,
  FaRss,
  FaMagic,
  FaArrowRight,
  FaQuoteLeft,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

const HomePage = () => {
  useEffect(() => {
    const existingFonts = document.getElementById("inscribe-fonts");
    if (existingFonts) return;
    const fontLink = document.createElement("link");
    fontLink.id = "inscribe-fonts";
    fontLink.rel = "stylesheet";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(fontLink);
  }, []);

  const platformFeatures = [
    {
      icon: <FaShieldAlt size={20} />,
      title: "Verified Authors Only",
      description:
        "Every publisher goes through a trust-based verification process, ensuring your readers always get credible, authentic content.",
    },
    {
      icon: <FaFeatherAlt size={20} />,
      title: "Effortless Publishing",
      description:
        "A distraction-free editor with rich formatting, auto-save, and one-click publish. Writing has never felt this smooth.",
    },
    {
      icon: <FaTachometerAlt size={20} />,
      title: "Personal Dashboard",
      description:
        "Track views, engagement, and reader growth from a clean, intuitive dashboard built around your workflow.",
    },
    {
      icon: <FaLock size={20} />,
      title: "Privacy & Security",
      description:
        "End-to-end data protection with enterprise-grade security. Your content and your readers are always safe.",
    },
    {
      icon: <FaRss size={20} />,
      title: "Built-in Discovery",
      description:
        "Smart tags and curated feeds help your posts reach the right readers organically — no algorithm hacks needed.",
    },
    {
      icon: <FaMagic size={20} />,
      title: "AI Writing Assist",
      description:
        "Optional AI suggestions to help you refine tone, structure, and clarity — you stay in control of every word.",
    },
  ];

  const onboardingSteps = [
    {
      number: "01",
      title: "Create an Account",
      description:
        "Sign up in under a minute. No credit card, no friction — just your name and email.",
      badge: "Free forever",
    },
    {
      number: "02",
      title: "Get Verified",
      description:
        "Submit a brief profile. Our team reviews and verifies you within 24 hours to maintain platform quality.",
      badge: "24-hour review",
    },
    {
      number: "03",
      title: "Start Publishing",
      description:
        "Open the editor and write. When you're ready, hit publish — your post goes live instantly to your audience.",
      badge: "Instant publish",
    },
  ];

  const featuredBlogPosts = [
    {
      category: "Design",
      title: "The Invisible Grid: How Whitespace Shapes Reader Trust",
      excerpt:
        "Great design isn't about what you add — it's about the breath you leave between ideas. Here's how whitespace communicates credibility.",
      author: "Amara Osei",
      role: "Product Designer",
      readTime: "5 min read",
      initials: "AO",
      accentColor: "#E8A838",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&q=80&auto=format&fit=crop",
      imageAlt: "Abstract colourful design shapes",
    },
    {
      category: "Engineering",
      title: "Building for the Long Run: Why Boring Tech Wins",
      excerpt:
        "Chasing trends is tempting. But the most resilient products are built on dull, proven foundations that scale quietly for years.",
      author: "James Mwangi",
      role: "Senior Engineer",
      readTime: "7 min read",
      initials: "JM",
      accentColor: "#5B8DEF",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80&auto=format&fit=crop",
      imageAlt: "Code on a dark monitor screen",
    },
    {
      category: "Writing",
      title: "The First Sentence Is Everything — Here's How to Write One",
      excerpt:
        "Readers decide within three seconds. A masterful opening doesn't announce itself — it simply pulls you forward without asking.",
      author: "Lena Kovač",
      role: "Journalist & Author",
      readTime: "4 min read",
      initials: "LK",
      accentColor: "#3DBDA7",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&q=80&auto=format&fit=crop",
      imageAlt: "Open notebook with a pen",
    },
  ];

  const authorTestimonials = [
    {
      quote:
        "I've tried a dozen platforms. Inscribe is the first that felt like it was designed for serious writers — not just content farms. The verification system gives readers confidence they rarely get elsewhere.",
      name: "Daniel Achebe",
      role: "Independent Journalist",
      initials: "DA",
      stars: 5,
    },
    {
      quote:
        "The onboarding was painless and the editor is genuinely beautiful. Getting verified took less than a day, and my first post got more engagement than my Medium posts ever did.",
      name: "Sophie Renault",
      role: "Tech Blogger & Consultant",
      initials: "SR",
      stars: 5,
    },
    {
      quote:
        "I love that the platform curates quality. Knowing every author is verified makes Inscribe feel like a professional publication, not just another blog site.",
      name: "Kwame Asante",
      role: "Marketing Strategist",
      initials: "KA",
      stars: 5,
    },
  ];

  const platformStatistics = [
    { value: "2,400+", label: "Verified Authors" },
    { value: "18K+", label: "Posts Published" },
    { value: "< 24h", label: "Verification Time" },
    { value: "99.9%", label: "Uptime SLA" },
  ];

  return (
    <div className="font-dm-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#0C0C0C] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full bg-amber-500/5 blur-[120px]" />
          <div className="absolute top-0 right-0 w-100 h-100 rounded-full bg-blue-500/5 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2 mb-10 backdrop-blur-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-white/70 text-xs font-medium tracking-widest uppercase">
                Verified Authors Platform
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight mb-8 font-playfair">
              Write with{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-amber-400">Authority.</span>
                <span className="absolute bottom-1 left-0 right-0 h-0.75 bg-amber-400/30 rounded-full" />
              </span>
              <br />
              Publish with <span className="text-white/30">Confidence.</span>
            </h1>
            <p className="text-white/50 text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl font-light">
              Inscribe is a curated publishing platform where every voice is
              verified. Apply to become an author, get approved, and start
              reaching readers who trust what they read.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/25 hover:-translate-y-0.5 text-base"
              >
                Start Writing{" "}
                <FaArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium px-6 py-4 rounded-full border border-white/10 hover:border-white/25 transition-all duration-300 text-base hover:bg-white/4"
              >
                Explore Blogs
              </Link>
            </div>
            <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
              <div className="flex -space-x-3">
                {["#E8A838", "#5B8DEF", "#3DBDA7", "#E87B5B"].map(
                  (color, index) => (
                    <div
                      key={index}
                      className="w-9 h-9 rounded-full border-2 border-[#0C0C0C] flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {["AO", "JM", "LK", "SR"][index]}
                    </div>
                  ),
                )}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} size={13} className="text-amber-400" />
                  ))}
                </div>
                <p className="text-white/40 text-sm">
                  Trusted by{" "}
                  <span className="text-white/70 font-medium">
                    2,400+ verified authors
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-85 -mr-5">
            <div className="bg-white/4 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-white/40 text-xs font-medium">
                  Live post · 3 min ago
                </span>
              </div>
              <h3 className="text-white text-base font-semibold mb-2 leading-snug font-playfair">
                The Art of Saying Less: Writing for the Modern Reader
              </h3>
              <p className="text-white/40 text-xs leading-relaxed mb-4">
                In an era of endless content, the most powerful writing knows
                exactly when to stop...
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-[10px] font-bold text-[#0C0C0C]">
                    AO
                  </div>
                  <span className="text-white/50 text-xs">Amara Osei</span>
                </div>
                <div className="flex items-center gap-1 bg-amber-400/10 rounded-full px-2.5 py-1">
                  <FaShieldAlt size={10} className="text-amber-400" />
                  <span className="text-amber-400 text-[10px] font-semibold">
                    Verified
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white/3 border border-white/[0.07] rounded-2xl p-4 backdrop-blur-md mt-3 ml-6 opacity-60">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-white/40 text-xs font-medium">
                  Draft saved
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mb-2 w-3/4" />
              <div className="h-2 bg-white/10 rounded-full mb-2" />
              <div className="h-2 bg-white/10 rounded-full w-1/2" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#F8F6F1] to-transparent pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="bg-[#F8F6F1] py-28 px-6" id="about">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-16">
            <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-4">
              Why Inscribe
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4 font-playfair">
              A platform built for serious writers.
            </h2>
            <p className="text-[#6B6B6B] text-lg leading-relaxed">
              Every feature is designed to protect your voice, grow your
              readership, and make publishing feel effortless.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {platformFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl p-7 border border-[#E8E4DC] hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/60 transition-all duration-500 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-5 group-hover:bg-amber-400 group-hover:border-amber-400 group-hover:text-[#0C0C0C] transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-[#1A1A1A] font-semibold text-lg mb-2 leading-snug font-playfair">
                  {feature.title}
                </h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#0C0C0C] py-28 px-6 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-amber-500/5 blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center max-w-xl mx-auto mb-20">
            <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
              How It Works
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 font-playfair">
              From zero to published in three steps.
            </h2>
            <p className="text-white/40 text-lg leading-relaxed">
              The path to becoming a verified Inscribe author is designed to be
              smooth, fast, and transparent.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-linear-to-r from-amber-400/30 via-amber-400/60 to-amber-400/30" />
            {onboardingSteps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-col items-start"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-white/4 border border-white/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-amber-400 font-playfair">
                      {step.number}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-3 font-playfair">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  {step.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-amber-400 text-xs font-medium">
                  <FaCheckCircle size={14} className="text-amber-400" />
                  <span>{step.badge}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              to="/verify-request"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/25 hover:-translate-y-0.5 text-base"
            >
              Apply for Verification <FaArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="bg-[#F8F6F1] py-28 px-6" id="blogs">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div className="max-w-lg">
              <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-4">
                Featured Posts
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight font-playfair">
                Words worth reading.
              </h2>
            </div>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-amber-600 font-medium text-sm hover:gap-3 transition-all duration-200"
            >
              View all blogs <FaArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBlogPosts.map((blogPost) => (
              <article
                key={blogPost.title}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-50 transition-all duration-500 cursor-pointer flex flex-col"
              >
                <div className="relative overflow-hidden h-48 bg-[#F0EDE7] shrink-0">
                  <img
                    src={blogPost.image}
                    alt={blogPost.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full text-white shadow-lg"
                    style={{ backgroundColor: blogPost.accentColor }}
                  >
                    {blogPost.category}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white/30 to-transparent" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-[#1A1A1A] font-bold text-xl leading-snug mb-3 group-hover:text-amber-700 transition-colors duration-200 flex-1 font-playfair">
                    {blogPost.title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">
                    {blogPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#F0EDE7]">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ backgroundColor: blogPost.accentColor }}
                      >
                        {blogPost.initials}
                      </div>
                      <div>
                        <p className="text-[#1A1A1A] text-xs font-semibold">
                          {blogPost.author}
                        </p>
                        <p className="text-[#9B9B9B] text-[11px]">
                          {blogPost.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#9B9B9B] text-xs">
                      <FaShieldAlt size={11} className="text-amber-500" />
                      <span>{blogPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-amber-600 text-xs font-semibold tracking-widest uppercase mb-4">
              Testimonials
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight font-playfair">
              Authors who made the leap.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {authorTestimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-[#F8F6F1] border border-[#E8E4DC] rounded-2xl p-8 flex flex-col transition-all duration-700 hover:shadow-xl hover:shadow-amber-100/50 hover:-translate-y-1"
              >
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(testimonial.stars)].map((_, index) => (
                    <FaStar key={index} size={14} className="text-amber-400" />
                  ))}
                </div>
                <FaQuoteLeft size={26} className="text-amber-200 mb-3" />
                <p className="text-[#3A3A3A] text-sm leading-relaxed flex-1 mb-8">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#E8E4DC]">
                  <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-[#0C0C0C] shrink-0">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] text-sm font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-[#9B9B9B] text-xs">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-full px-2.5 py-1">
                    <FaShieldAlt size={11} className="text-amber-500" />
                    <span className="text-amber-600 text-[10px] font-semibold">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0C0C0C] py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 rounded-full bg-amber-500/8 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-2 mb-8">
            <FaShieldAlt size={14} className="text-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
              Join 2,400+ Verified Authors
            </span>
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6 font-playfair">
            Your words deserve{" "}
            <span className="text-amber-400">a trusted stage.</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Apply for verification today. Start building an audience that trusts
            your expertise. Publishing has never felt this intentional.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/verify-request"
              className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-[#0C0C0C] font-bold px-10 py-5 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/30 hover:-translate-y-0.5 text-base"
            >
              Apply for Verification{" "}
              <FaArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-base font-medium transition-colors duration-200"
            >
              Learn more about the process
            </Link>
          </div>
          <div className="mt-20 pt-12 border-t border-white/6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {platformStatistics.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white mb-1 font-playfair">
                  {stat.value}
                </div>
                <div className="text-white/30 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
