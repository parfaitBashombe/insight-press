"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/news?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/news");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-2xl mx-auto shadow-sm -mt-6 z-10 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for breaking news, topics..."
        className="w-full px-6 py-4 rounded-l-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 text-lg transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-100"
      />
      <button
        type="submit"
        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-2xl font-medium text-lg transition-colors cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
