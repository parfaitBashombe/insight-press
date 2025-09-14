import PostList from "@/components/dashboard/posts-list";
import PostForm from "@/components/dashboard/post-form";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Create a New Post
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Share your thoughts while catching up on the latest stories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <PostForm />
          <div className="">
            <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-6">
              Your Posts
            </h2>
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
}
