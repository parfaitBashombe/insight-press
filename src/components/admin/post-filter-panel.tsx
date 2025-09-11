import { Category } from "@/lib/hooks/add-post-action";
import { queryAtom } from "@/lib/store/post-store";
import { useAtom } from "jotai";
import { useState } from "react";

interface PostFilterPanelProps {
  categories: Category[];
  tags: string[];
}

export default function PostFilterPanel({
  categories,
  tags,
}: PostFilterPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [visibleTagsCount, setVisibleTagsCount] = useState(5);
  const [query, setQuery] = useAtom(queryAtom);

  // Function to load more tags
  const loadMoreTags = () => {
    setVisibleTagsCount((prev) => prev + 5);
  };

  const showLessTags = () => {
    setVisibleTagsCount(5);
  };

  const visibleTags = tags.slice(0, visibleTagsCount);

  return (
    <aside className="w-full p-4 sm:p-6 bg-white rounded-2xl shadow-md space-y-4 sm:space-y-6 sticky top-24 h-fit">
      <h3 className="text-lg font-semibold text-gray-900">Filter Posts</h3>

      {/* Search Input */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Search</p>
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
        />
      </div>

      {/* Category Filter */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Tags Filter */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Tags</p>
        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                )
              }
              className={`px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm rounded-full border transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Show More/Show Less buttons */}
        {tags.length > 5 && (
          <div className="mt-3">
            {visibleTagsCount < tags.length ? (
              <button
                type="button"
                onClick={loadMoreTags}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                + Show more
              </button>
            ) : (
              <button
                type="button"
                onClick={showLessTags}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                - Show less
              </button>
            )}
          </div>
        )}
      </div>

      {/* Featured Filter */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featuredOnly"
          checked={showFeaturedOnly}
          onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="featuredOnly"
          className="text-sm text-gray-700 font-medium"
        >
          Show Featured Only
        </label>
      </div>

      {/* Reset Button */}
      <button
        type="button"
        onClick={() => {
          setSelectedCategory(null);
          setSelectedTags([]);
          setShowFeaturedOnly(false);
          setQuery(""); // Also reset the search query
        }}
        className="w-full py-2 mt-2 sm:mt-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Reset Filters
      </button>
    </aside>
  );
}
