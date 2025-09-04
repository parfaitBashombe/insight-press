import { Post } from "@/lib/types/post-data";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  post: Post;
}

export default function PostCardCreate({ post }: Props) {
  return (
    <Link
      href={`/news/${post.id}`}
      className="relative flex items-center bg-white shadow-md rounded-2xl p-4 transition-all duration-300 hover:shadow-xl"
    >
      {/* Cover image */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 mr-4 rounded-xl overflow-hidden">
        <Image
          src={post.cover_img}
          alt={post.title}
          className="object-cover w-full h-full"
          fill
        />
      </div>

      <div className="flex-grow">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight">
          {post.title}
        </h3>

        {/* Content */}
        <p className="text-gray-600 text-sm sm:text-base leading-snug mb-2 line-clamp-2">
          {post.content}
        </p>

        {/* Author */}
        <div className="flex items-center space-x-2">
          <div className="relative w-6 h-6 sm:w-8 sm:h-8">
            <Image
              fill
              src={
                post.author_avatar ||
                "https://ik.imagekit.io/zzot6yvyh/Profile_avatar.png?updatedAt=1744066805592"
              }
              alt={"Author"}
              className=" rounded-full object-cover"
            />
          </div>

          <span className="text-gray-500 text-xs sm:text-sm font-medium">
            By {post.author_name}
          </span>
        </div>
      </div>

      {/* Delete button */}
      <button
        // onClick={() => onDelete && onDelete(post.id)}
        className="ml-4 p-2 text-red-500 hover:text-red-700 transition-colors rounded-full hover:bg-red-50"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </Link>
  );
}
