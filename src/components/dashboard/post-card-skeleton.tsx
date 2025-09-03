export default function PostCardSkeleton() {
  return (
    <div className="flex items-center bg-white shadow-md rounded-2xl p-4 animate-pulse space-x-4">
      {/* Cover image skeleton */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-xl flex-shrink-0" />

      <div className="flex-1 space-y-2">
        {/* Title skeleton */}
        <div className="h-6 sm:h-7 bg-gray-300 rounded w-3/4"></div>

        {/* Content skeleton */}
        <div className="space-y-1">
          <div className="h-4 sm:h-5 bg-gray-300 rounded w-full"></div>
          <div className="h-4 sm:h-5 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Author skeleton */}
        <div className="flex items-center space-x-2 mt-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Delete button skeleton */}
      <div className="w-8 h-8 bg-gray-300 rounded-full ml-4" />
    </div>
  );
}
