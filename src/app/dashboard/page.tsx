import PostList from "@/components/dashboard/posts-list";
import PostForm from "@/components/dashboard/post-form";

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Create a New Post
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Share your thoughts while catching up on the latest stories.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <PostList />
          <PostForm />
        </div>
      </div>
    </div>
  );
}
