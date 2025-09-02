import { posts } from "@/data/posts";
import PostCard from "@/components/post-card";
import Link from "next/link";
import FeaturedSlider from "@/components/featured-slider";
import { Mail, ArrowRight } from "lucide-react";

const Page = () => {
  const news = posts.filter((post) => !post.isFeatured);
  const featuredArticles = posts.filter((post) => post.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24">
        {/* Featured Slider */}
        <FeaturedSlider featuredArticles={featuredArticles} />

        {/* Latest Stories */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Latest Stories
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Dive into our most recent articles for fresh insights, trends, and
              perspectives from our expert team.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 6).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/news"
              className="group inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            >
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <section className="relative">
          <div className="relative bg-white border border-gray-200 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden">
            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Stay in the Loop
              </h3>
              <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Get our latest articles, exclusive content, and insights
                delivered straight to your inbox. No spam, we promise.
              </p>

              <form className="mt-8 flex flex-col sm:flex-row items-center justify-center max-w-lg mx-auto gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-gray-500 text-sm mt-5">
                Join our community of thousands of readers.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
