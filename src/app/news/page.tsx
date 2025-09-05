"use client";

import { useAtom } from "jotai";
import {
  postsAtom,
  queryAtom,
  pageAtom,
  hasMoreAtom,
  loadingAtom,
  fetchPostsAtom,
  subscribePostsAtom, // subscription atom
} from "@/lib/store/post-store";
import { useEffect } from "react";
import PostCard from "@/components/home-page/post-card";
import PostCardSkeleton from "@/components/skeletons/post-card";
import Image from "next/image";

export default function NewsPage() {
  const [posts] = useAtom(postsAtom);
  const [query, setQuery] = useAtom(queryAtom);
  const [page, setPage] = useAtom(pageAtom);
  const [hasMore] = useAtom(hasMoreAtom);
  const [loading] = useAtom(loadingAtom);
  const [, fetchPosts] = useAtom(fetchPostsAtom);
  const [, subscribePosts] = useAtom(subscribePostsAtom);

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Latest News
        </h1>
        <p className="text-center text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Browse the latest articles and insights. Use the search below to
          quickly find posts on topics that interest you.
        </p>

        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {loading && posts.length === 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}

              {loading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <PostCardSkeleton key={`loading-${i}`} />
                ))}
            </div>

            {hasMore && !loading && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-10 bg-gray-100 py-6 px-8 rounded-lg shadow-md max-w-md mx-auto flex flex-col items-center space-y-4">
            {/* Image */}
            <Image
              width={128}
              height={128}
              src="https://ik.imagekit.io/zzot6yvyh/not%20found.png?updatedAt=1757000527888"
              alt="Not Found"
              className="object-contain"
            />

            {/* Main message */}
            <h3 className="text-gray-700 text-lg md:text-xl font-medium">
              {query ? `No posts found for "${query}"` : "No posts available"}
            </h3>

            {/* Optional subtext */}
            <p className="text-gray-500 text-sm md:text-base">
              Try adjusting your search or check back later for new content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
