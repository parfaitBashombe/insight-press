"use client";

import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  postsAtom,
  loadingAtom,
  fetchPostsAtom,
  subscribePostsAtom,
  hasMoreAtom,
  queryAtom,
  pageAtom,
} from "@/lib/store/post-store";
import PostCardSkeleton from "@/components/skeletons/post-card";
import PostCard from "@/components/admin/post-card";
import PostFilterPanel from "@/components/admin/post-filter-panel";
import { categories } from "@/components/dashboard/post-form";

export default function AdminPostsReadOnly() {
  const [posts] = useAtom(postsAtom);
  const query = useAtomValue(queryAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [hasMore] = useAtom(hasMoreAtom);
  const [loading] = useAtom(loadingAtom);
  const [, fetchPosts] = useAtom(fetchPostsAtom);
  const [, subscribePosts] = useAtom(subscribePostsAtom);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setPage(1);
    fetchPosts(true);
  }, [query, fetchPosts, setPage]);

  useEffect(() => {
    if (page > 1) fetchPosts();
  }, [page, fetchPosts]);

  useEffect(() => {
    fetchPosts(true);

    let cleanup: (() => void) | undefined;

    const setupSubscription = async () => {
      cleanup = await subscribePosts();
    };

    setupSubscription();

    return () => {
      if (cleanup) cleanup();
    };
  }, [fetchPosts, subscribePosts]);

  const loadMore = () => setPage((prev) => prev + 1);

  const tags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-24">
        {/* Page Header */}
        <header className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Posts Overview
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-3 md:mt-4">
            Browse all posts fetched from the database. Read-only view with live
            updates.
          </p>
        </header>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full py-3 px-4 bg-white rounded-xl shadow-md flex items-center justify-between"
          >
            <span className="font-medium">Filter Posts</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Main Content Grid: Filter + Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 md:gap-8">
          {/* Filter Panel */}
          <div className={`${isFilterOpen ? "block" : "hidden"} lg:block`}>
            <PostFilterPanel categories={categories} tags={tags} />
          </div>

          {/* Posts Section */}
          {loading ? (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-6 md:space-y-8">
              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
                {posts.map((post) => (
                  <PostCard isAdmin={true} key={post.id} post={post} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center">
                  <button
                    onClick={loadMore}
                    className="px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm md:text-base"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8 md:py-12 col-span-full">
              No posts available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
