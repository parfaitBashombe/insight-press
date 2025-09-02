import { posts } from "@/data/posts";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const Page = ({ params }: Props) => {
  const post = posts.find((post) => post.id === params.id);

  if (!post) {
    return <p className="text-center text-gray-600 mt-10">Post not found.</p>;
  }

  return (
    <article className="max-w-3xl mx-auto px-4">
      {/* Featured Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Author + Date */}
      <div className="flex items-center mb-6">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <p className="font-medium text-gray-700">{post.author.name}</p>
          <p className="text-sm text-gray-400">{post.date}</p>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
      </div>

      {/* Back Link */}
      <Link href="/news" className="text-blue-600 font-medium hover:underline">
        ← Back to News
      </Link>
    </article>
  );
};

export default Page;
