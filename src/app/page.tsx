"use client";

import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";

// ----- Atoms -----
import {
  postsAtom,
  featuredPostsAtom,
  loadingAtom,
} from "@/lib/store/post-atoms";

// ----- Posts logic -----
import { fetchPostsAtom } from "@/lib/posts/fetch-posts";
import { fetchFeaturedPostsAtom } from "@/lib/posts/fetch-featured-posts";
import { subscribePostsAtom } from "@/lib/posts/suscribe-posts";

// ----- Components -----
import FeaturedSlider from "@/components/home-page/featured-slider";
import PostCardSkeleton from "@/components/skeletons/post-card";
import FeaturedArticleSkeleton from "@/components/skeletons/featured-article";
import NewsLetter from "@/components/home-page/news-letter";
import PostCard from "@/components/admin/post-card";

// ----- Icons & Links -----
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PostsPage() {
  const posts = useAtomValue(postsAtom);
  const featuredPosts = useAtomValue(featuredPostsAtom);
  const loading = useAtomValue(loadingAtom);

  const fetchPosts = useSetAtom(fetchPostsAtom);
  const fetchFeaturedPosts = useSetAtom(fetchFeaturedPostsAtom);
  const subscribePosts = useSetAtom(subscribePostsAtom);

  // Regular (non-featured) posts
  const regularPosts = posts.filter((post) => !post.isFeatured);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const loadData = async () => {
      try {
        // Always fetch fresh data on component mount
        await Promise.all([
          fetchPosts(true), // reset posts
          fetchFeaturedPosts(),
        ]);

        // Set up subscription after initial data load
        unsubscribe = subscribePosts();
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [fetchPosts, fetchFeaturedPosts, subscribePosts]);

  const showSkeleton = loading && posts.length === 0;

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
