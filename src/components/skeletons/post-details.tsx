const PostDetailSkeleton = () => {
  return (
    <article className="max-w-3xl mx-auto py-10 px-4 animate-pulse space-y-6">
      {/* Featured Image */}
      <div className="h-96 w-full bg-gray-300 rounded-lg"></div>

      {/* Title */}
      <div className="h-10 w-3/4 bg-gray-300 rounded"></div>

      {/* Author + Date */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
        <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
        <div className="h-4 w-3/6 bg-gray-300 rounded"></div>
      </div>

      {/* Back Link */}
      <div className="h-6 w-32 bg-gray-300 rounded mt-6"></div>
    </article>
  );
};

export default PostDetailSkeleton;
