import { Suspense } from "react";
import NewsFeed from "@/components/news-feed";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { Globe, PenTool, Zap } from "lucide-react";

const Page = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-10/12 mx-auto py-32 md:py-48 flex flex-col items-center justify-center text-center overflow-hidden border-b border-[#e5e0d8]">
        {/* Subtle background decoration */}
        <div
          className="absolute inset-0 z-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #8b5a2b 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="relative z-10">
          <span className="inline-block py-1 px-3 mb-6 border border-accent text-accent font-sans text-xs uppercase tracking-widest rounded-full">
            The New Standard in Media
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight mb-8 leading-[1.1]">
            Read the world, <br />
            <span className="text-accent italic font-light">beautifully.</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#5c5853] mb-12 max-w-2xl mx-auto leading-relaxed font-serif">
            We cut through the noise to bring you curated global headlines and
            deep editorial insights in an ad-free, distraction-free environment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/news"
              className="w-full sm:w-auto bg-foreground text-background font-sans px-10 py-5 uppercase tracking-widest text-sm hover:bg-accent transition-colors duration-300 shadow-lg"
            >
              Start Reading
            </Link>
            <a
              href="#about"
              className="w-full sm:w-auto bg-transparent border border-foreground text-foreground font-sans px-10 py-5 uppercase tracking-widest text-sm hover:bg-[#e5e0d8] transition-colors duration-300"
            >
              Our Mission
            </a>
          </div>
        </div>
      </section>

      {/* About / Value Proposition Section */}
      <section
        id="about"
        className="py-24 bg-[#f4ece3] border-b border-[#e5e0d8]"
      >
        <div className="w-10/12 mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Why Insight Press?
            </h2>
            <p className="font-sans text-[#5c5853] max-w-2xl mx-auto text-lg">
              Our platform is designed for the modern reader who values clarity,
              design, and truth above all else.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="flex flex-col border-t border-accent pt-6 items-center md:items-start">
              <Globe className="text-accent mb-6" size={40} strokeWidth={1.5} />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                Global Reach
              </h3>
              <p className="font-sans text-[#5c5853] leading-relaxed">
                Access real-time breaking news and stories from trusted
                publishers across 50+ countries in one unified feed.
              </p>
            </div>
            <div className="flex flex-col border-t border-accent pt-6 items-center md:items-start">
              <PenTool
                className="text-accent mb-6"
                size={40}
                strokeWidth={1.5}
              />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                Editorial Design
              </h3>
              <p className="font-sans text-[#5c5853] leading-relaxed">
                Experience a reading layout inspired by the world&apos;s most
                premium magazines, easy on the eyes and built for focus.
              </p>
            </div>
            <div className="flex flex-col border-t border-accent pt-6 items-center md:items-start">
              <Zap className="text-accent mb-6" size={40} strokeWidth={1.5} />
              <h3 className="font-serif text-2xl font-bold mb-3 text-foreground">
                Instant Search
              </h3>
              <p className="font-sans text-[#5c5853] leading-relaxed">
                Uncover the topics that matter to you with blazing fast API
                integrations that fetch archived and live journalism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-24">
        <div className="w-10/12 mx-auto">
          <div className="flex items-end justify-between border-b-2 border-foreground pb-4 mb-12">
            <div>
              <span className="text-accent font-sans text-xs uppercase tracking-widest font-bold mb-2 block">
                Live Feed
              </span>
              <h2 className="text-4xl font-serif font-bold text-foreground">
                Top Stories
              </h2>
            </div>
            <Link
              href="/news"
              className="text-sm font-sans uppercase tracking-widest text-accent hover:text-foreground transition-colors hidden sm:block"
            >
              View All News &rarr;
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="h-64 flex items-center justify-center text-[#8c857d] font-serif italic text-xl">
                Curating the feed...
              </div>
            }
          >
            <NewsFeed query="latest" limit={4} />
          </Suspense>

          <div className="mt-12 text-center sm:hidden">
            <Link
              href="/news"
              className="inline-block border border-foreground text-foreground px-8 py-4 font-sans uppercase tracking-widest text-sm"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-[#e5e0d8] py-16">
        <div className="w-10/12 mx-auto grid md:grid-cols-2 gap-8 items-center border-b border-[#5c5853] pb-12 mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-4 flex items-center gap-2">
              <Globe size={28} /> Insight Press.
            </h2>
            <p className="font-sans text-[#8c857d] max-w-sm">
              The premier destination for distraction-free, elegant journalism
              tailored to your interests.
            </p>
          </div>
          <div className="flex md:justify-end space-x-8 font-sans text-sm uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/news" className="hover:text-white transition-colors">
              Discover
            </Link>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
          </div>
        </div>
        <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-sans text-[#8c857d]">
          <p>© 2026 Insight Press. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Powered by Newsdata.io API</p>
        </div>
      </footer>
    </main>
  );
};

export default Page;
