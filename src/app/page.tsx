"use client";

import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  postsAtom,
  featuredPostsAtom,
  loadingAtom,
  fetchPostsAtom,
  fetchFeaturedPostsAtom,
  subscribePostsAtom,
} from "@/lib/store/post-store";
import FeaturedSlider from "@/components/home-page/featured-slider";
import PostCardSkeleton from "@/components/skeletons/post-card";
import FeaturedArticleSkeleton from "@/components/skeletons/featured-article";
import NewsLetter from "@/components/home-page/news-letter";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostCard from "@/components/admin/post-card";

export default function Page() {
  const [posts] = useAtom(postsAtom);
  const [featuredPosts] = useAtom(featuredPostsAtom);
  const [loading] = useAtom(loadingAtom);

  const [, fetchPosts] = useAtom(fetchPostsAtom);
  const [, fetchFeaturedPosts] = useAtom(fetchFeaturedPostsAtom);
  const [, subscribePosts] = useAtom(subscribePostsAtom);

  const [firstRender, setFirstRender] = useState(true);

  // Separate regular posts
  const regularPosts = posts.filter((post) => !post.isFeatured);

  useEffect(() => {
    // Define an async function inside useEffect
    const loadPosts = async () => {
      await fetchPosts(true); // fetch paginated posts
      await fetchFeaturedPosts(); // fetch featured posts
    };

    loadPosts(); // call the async function

    const unsubscribe = subscribePosts(); // subscription is fine

    return () => {
      unsubscribe(); // cleanup subscription
    };
  }, [fetchPosts, fetchFeaturedPosts, subscribePosts]);

  useEffect(() => {
    if (posts.length > 0 || featuredPosts.length > 0) {
      setFirstRender(false);
    }
  }, [posts, featuredPosts]);

  const showSkeleton = loading || firstRender;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-24">
        {/* Featured Slider */}
        {showSkeleton ? (
          <FeaturedArticleSkeleton />
        ) : (
          <FeaturedSlider featuredArticles={featuredPosts} />
        )}

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

          {showSkeleton ? (
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.slice(0, 3).map((post) => (
                  <PostCard isAdmin={false} key={post.id} post={post} />
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
            </>
          )}
        </section>

        {/* Newsletter */}
        <NewsLetter />
      </div>
    </div>
  );
}
