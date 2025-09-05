const FeaturedArticleSkeleton = () => {
  return (
    <section className="w-full h-full animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full bg-white rounded-2xl md:rounded-3xl shadow-md overflow-hidden">
        {/* Image Skeleton */}
        <div className="relative w-full h-56 sm:h-72 md:h-full bg-gray-200" />

        {/* Content Skeleton */}
        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center space-y-4">
          {/* Category */}
          <div className="w-24 h-6 rounded-full bg-gray-300" />

          {/* Title */}
          <div className="w-3/4 h-8 sm:h-10 md:h-12 rounded bg-gray-300" />

          {/* Content snippet */}
          <div className="space-y-2">
            <div className="w-full h-4 rounded bg-gray-200" />
            <div className="w-full h-4 rounded bg-gray-200" />
            <div className="w-5/6 h-4 rounded bg-gray-200" />
          </div>

          {/* Author & Date */}
          <div className="flex items-center gap-x-6 gap-y-3">
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-300" />
              <div className="w-16 h-4 rounded bg-gray-300" />
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-300" />
              <div className="w-12 h-4 rounded bg-gray-300" />
            </div>
          </div>

          {/* Read Full Story */}
          <div className="w-32 h-4 rounded bg-gray-300 mt-2" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticleSkeleton;
