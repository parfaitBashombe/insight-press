"use client";

import { useEffect, useRef, useCallback } from "react";
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
import SearchBar from "./search-bar";

export default function NewsPageContent() {
  const posts = useAtomValue(postsAtom);
  const loading = useAtomValue(loadingAtom);
  const hasMore = useAtomValue(hasMoreAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [, fetchPosts] = useAtom(fetchPostsAtom);
  const [, subscribePosts] = useAtom(subscribePostsAtom);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Initial load + subscription
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const loadData = async () => {
      await fetchPosts(true);
      unsubscribe = subscribePosts();
    };

    loadData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchPosts, subscribePosts]);

  // Fetch posts whenever page changes (append)
  useEffect(() => {
    if (page > 1) {
      fetchPosts(false);
    }
  }, [page, fetchPosts]);

  // Infinite scroll
  const loadMore = useCallback(() => {
    if (!loading && hasMore) setPage((p) => p + 1);
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
      if (entries[0].isIntersecting) loadMore();
    }, options);

    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loadMore, hasMore, loading]);

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

        {/* Search Bar */}
        <SearchBar />

        {/* Posts Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
            You&apos;ve reached the end of all posts.
          </p>
        )}

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-400 py-8 md:py-12">
            No posts available.
          </p>
        )}
      </div>
    </div>
  );
}
