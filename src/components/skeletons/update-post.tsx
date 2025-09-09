const UpdatePostSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6 animate-pulse">
      {/* Heading */}
      <div className="h-8 w-48 bg-gray-200 rounded-md" />

      <div className="space-y-6">
        {/* Cover Image */}
        <div>
          <div className="h-6 w-32 mb-2 bg-gray-200 rounded-md" />
          <div className="h-96 w-full rounded-lg bg-gray-200" />
          <div className="h-9 w-1/2 mt-3 bg-gray-200 rounded-md" />
        </div>

        {/* Title */}
        <div>
          <div className="h-6 w-20 mb-2 bg-gray-200 rounded-md" />
          <div className="h-10 w-full rounded-lg bg-gray-200" />
        </div>

        {/* Author */}
        <div>
          <div className="h-6 w-24 mb-2 bg-gray-200 rounded-md" />
          <div className="h-10 w-full rounded-lg bg-gray-200" />
        </div>

        {/* Content */}
        <div>
          <div className="h-6 w-24 mb-2 bg-gray-200 rounded-md" />
          <div className="h-32 w-full rounded-lg bg-gray-200" />
        </div>

        {/* Tags */}
        <div>
          <div className="h-6 w-20 mb-2 bg-gray-200 rounded-md" />
          <div className="flex gap-2">
            <div className="h-10 w-full rounded-lg bg-gray-200" />
            <div className="h-10 w-20 rounded-lg bg-gray-200" />
          </div>
          <div className="flex gap-2 mt-3">
            <div className="h-8 w-16 rounded-full bg-gray-200" />
            <div className="h-8 w-20 rounded-full bg-gray-200" />
            <div className="h-8 w-14 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <div className="h-10 w-24 rounded-lg bg-gray-200" />
          <div className="h-10 w-32 rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default UpdatePostSkeleton;
