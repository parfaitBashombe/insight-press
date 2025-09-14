"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  postsAtom,
  loadingAtom,
  hasMoreAtom,
  pageAtom,
} from "@/lib/store/post-atoms";
import { fetchPostsAtom } from "@/lib/posts/fetch-posts";
import { subscribePostsAtom } from "@/lib/posts/suscribe-posts";
import PostCardSkeleton from "@/components/skeletons/post-card";
import PostCard from "@/components/admin/post-card";
import PostFilterPanel from "@/components/admin/post-filter-panel";
import { categories } from "@/components/dashboard/post-form";

export default function NewsPageContent() {
  const posts = useAtomValue(postsAtom);
  const loading = useAtomValue(loadingAtom);
  const hasMore = useAtomValue(hasMoreAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [, fetchPosts] = useAtom(fetchPostsAtom);
  const [, subscribePosts] = useAtom(subscribePostsAtom);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Initial load + subscription
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const loadData = async () => {
      await fetchPosts(true); // reset posts and page to 1
      unsubscribe = subscribePosts();
    };

    loadData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch posts whenever page changes (append)
  useEffect(() => {
    if (page > 1) {
      fetchPosts(false);
    }
  }, [page, fetchPosts]);

  // Infinite scroll
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((p) => p + 1);
    }
  }, [loading, hasMore, setPage]);

  // Intersection Observer
  useEffect(() => {
    if (!hasMore || loading) return;

    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, options);

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loadMore, hasMore, loading]);

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

        {/* Mobile Filter Toggle */}
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 md:gap-8">
          {/* Filter Panel */}
          <div className={`${isFilterOpen ? "block" : "hidden"} lg:block`}>
            <PostFilterPanel categories={categories} tags={tags} />
          </div>

          {/* Posts */}
          <div className="space-y-6 md:space-y-8">
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
              {posts.map((post) => (
                <PostCard isAdmin={false} key={post.id} post={post} />
              ))}

              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <PostCardSkeleton key={`skeleton-${i}`} />
                ))}
            </div>

            {/* Infinite scroll trigger */}
            {hasMore && (
              <div
                ref={loadMoreRef}
                className="h-10 flex items-center justify-center"
              >
                {loading && (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                )}
              </div>
            )}

            {/* End message */}
            {!hasMore && posts.length > 0 && (
              <p className="text-center text-gray-400 py-4">
                You've reached the end of all posts.
              </p>
            )}
          </div>
        </div>

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-400 py-8 md:py-12 col-span-full">
            No posts available.
          </p>
        )}
      </div>
    </div>
  );
}
