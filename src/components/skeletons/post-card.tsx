import { ArrowRight } from "lucide-react";

export default function PostCardSkeleton() {
  return (
    <div className="block bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-full animate-pulse backdrop-blur-sm">
      {/* Image Skeleton */}
      <div className="relative w-full h-56 bg-gray-200">
        {/* Category Tag Skeleton */}
        <div className="absolute top-4 left-4 z-10">
          <div className="h-8 w-20 bg-white/90 rounded-2xl border border-white/50 shadow-lg backdrop-blur-md"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-8 flex flex-col flex-grow space-y-4">
        {/* Title */}
        <div className="space-y-3">
          <div className="h-7 bg-gray-200 rounded-lg w-4/5"></div>
          <div className="h-7 bg-gray-200 rounded-lg w-3/5"></div>
        </div>

        {/* Content Lines */}
        <div className="space-y-3 pt-2">
          <div className="h-5 bg-gray-200 rounded w-full"></div>
          <div className="h-5 bg-gray-200 rounded w-5/6"></div>
          <div className="h-5 bg-gray-200 rounded w-4/5"></div>
        </div>

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-7 w-16 bg-gray-200 rounded-full border border-gray-200"></div>
          <div className="h-7 w-20 bg-gray-200 rounded-full border border-gray-200"></div>
          <div className="h-7 w-14 bg-gray-200 rounded-full border border-gray-200"></div>
        </div>

        {/* Spacer to push author section to bottom */}
        <div className="flex-grow"></div>

        {/* Author & Read More Skeleton - Always at bottom */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            {/* Author Avatar with Status Indicator */}
            <div className="relative">
              <div className="w-11 h-11 bg-gray-200 rounded-full border-2 border-gray-200 shadow-sm"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-200 rounded-full border-2 border-white shadow-sm"></div>
            </div>

            {/* Author Info */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Read More Skeleton */}
          <div className="flex items-center text-gray-300 opacity-60">
            <div className="flex items-center">
              <div className="h-4 w-20 bg-gray-200 rounded mr-2"></div>
              <div className="p-1.5 rounded-full bg-gray-100">
                <ArrowRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
