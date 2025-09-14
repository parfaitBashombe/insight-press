"use client";

import { useAtom } from "jotai";
import { queryAtom } from "@/lib/store/post-atoms";
import { fetchPostsAtom } from "@/lib/posts/fetch-posts";
import { useEffect } from "react";

export default function SearchBar() {
  const [query, setQuery] = useAtom(queryAtom);
  const [, fetchPosts] = useAtom(fetchPostsAtom);

  // Refetch posts whenever the query changes
  useEffect(() => {
    fetchPosts(true); // reset page to 1 and fetch posts
  }, [query, fetchPosts]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
