import { ArrowRight } from "lucide-react";

export default function PostCardSkeleton() {
  return (
    <div className="block bg-white rounded-2xl overflow-hidden shadow-lg h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full h-56 bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

        {/* Content */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-6">
          <div className="h-5 bg-gray-200 rounded-full w-12"></div>
          <div className="h-5 bg-gray-200 rounded-full w-16"></div>
        </div>

        {/* Author & Read More */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>

          <div className="flex items-center text-gray-300">
            <span className="text-sm font-medium mr-1">Read More</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
