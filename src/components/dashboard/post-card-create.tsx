import { IPost } from "@/data/posts";
import { Trash2 } from "lucide-react";

interface Props {
  post: IPost;
}

export default function PostCardCreate({ post }: Props) {
  return (
    <div className="relative flex items-center bg-white shadow-md rounded-2xl p-4 transition-all duration-300 hover:shadow-xl">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 mr-4 rounded-xl overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-snug mb-2 line-clamp-2">
          {post.content}
        </p>
        <span className="text-gray-500 text-xs sm:text-sm font-medium">
          By {post.author.name}
        </span>
      </div>
      <button
        // onClick={() => onDelete && onDelete(post.id)}
        className="ml-4 p-2 text-red-500 hover:text-red-700 transition-colors rounded-full hover:bg-red-50"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
